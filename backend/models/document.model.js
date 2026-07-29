const db = require("../config/db");

// 1. สร้างเอกสารใหม่ พร้อมระบบ Running Number (ป้องกันเลขซ้ำด้วย FOR UPDATE)
async function createDocumentWithRunningNo(docData, userId) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const currentYear = new Date().getFullYear();
        const docType = docData.document_type; // 'INCOMING' หรือ 'OUTGOING'

        // ดึงและ Lock แถว running_numbers ของปีและประเภทนั้นๆ
        const [runningRows] = await connection.query(
            `SELECT * FROM running_numbers WHERE year = ? AND document_type = ? FOR UPDATE`,
            [currentYear, docType]
        );

        let nextNum = 1;
        let prefix = docType === 'INCOMING' ? 'IN' : 'OUT';
        let digit = 6;

        if (runningRows.length > 0) {
            nextNum = runningRows[0].last_number + 1;
            prefix = runningRows[0].prefix || prefix;
            digit = runningRows[0].digit || 6;

            // อัปเดต last_number ล่าสุด
            await connection.query(
                `UPDATE running_numbers SET last_number = ? WHERE running_id = ?`,
                [nextNum, runningRows[0].running_id]
            );
        } else {
            // ถ้ายังไม่มีแถวของปีนี้ ให้ Insert ใหม่
            await connection.query(
                `INSERT INTO running_numbers (year, document_type, last_number, prefix, digit) VALUES (?, ?, 1, ?, 6)`,
                [currentYear, docType, prefix]
            );
        }

        // จัด Format เลขเอกสาร เช่น IN-2026-000006
        const paddedNum = String(nextNum).padStart(digit, '0');
        const document_no = `${prefix}-${currentYear}-${paddedNum}`;

        // Insert ลงตาราง documents
        const [docResult] = await connection.query(
            `INSERT INTO documents 
             (document_no, external_ref, document_type, subject, description, sender_name, receiver_name, document_date, due_date, priority, created_by, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Draft')`,
            [
                document_no,
                docData.external_ref || null,
                docType,
                docData.subject,
                docData.description || null,
                docData.sender_name || null,
                docData.receiver_name || null,
                docData.document_date || null,
                docData.due_date || null,
                docData.priority || 'Normal',
                userId
            ]
        );

        const newDocId = docResult.insertId;

        // บันทึก Audit Log
        await connection.query(
            `INSERT INTO audit_logs (user_id, action, table_name, record_id, detail)
             VALUES (?, 'CREATE', 'documents', ?, ?)`,
            [userId, newDocId, `Created document ${document_no}`]
        );

        await connection.commit();
        return { document_id: newDocId, document_no };

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

// 2. ดึงรายการเอกสารทั้งหมด (กรอง Draft ให้เห็นเฉพาะของตัวเอง ยกเว้น Admin)
async function getAllDocuments(userId, userRole) {
    const isAdmin = userRole === "1" || userRole === "Admin" || userRole === "ADMIN";

    let query = `
        SELECT d.*, u.fullname AS creator_name 
        FROM documents d 
        LEFT JOIN users u ON d.created_by = u.user_id 
        WHERE d.is_deleted = 0
    `;
    let params = [];

    // ถ้าไม่ใช่ Admin ให้เห็นเอกสารทั่วไปทั้งหมด แต่ถ้าสถานะเป็น 'Draft' ต้องเป็นของตัวเองเท่านั้น
    if (!isAdmin) {
        query += ` AND (d.status != 'Draft' OR d.created_by = ?)`;
        params.push(userId);
    }

    query += ` ORDER BY d.created_at DESC`;

    const [rows] = await db.query(query, params);
    return rows;
}

// 3. ดึงรายละเอียดเอกสารตาม ID
async function getDocumentById(id) {
    const [rows] = await db.query(
        `SELECT d.*, u.fullname AS creator_name 
         FROM documents d 
         LEFT JOIN users u ON d.created_by = u.user_id 
         WHERE d.document_id = ? AND d.is_deleted = 0`,
        [id]
    );
    return rows[0];
}

// 4. ส่งเอกสาร (เพิ่มการตรวจสอบสิทธิ์ว่าถ้าไม่ใช่ Admin ต้องเป็นเจ้าของเอกสารเท่านั้นถึงจะกดได้)
async function updateStatusToWaiting(document_id, userId, userRole, to_user = 2, note = "ส่งตรวจสอบ / รออนุมัติ") {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // ดึงข้อมูลสถานะและผู้สร้างเอกสาร
        const [doc] = await connection.query(`SELECT status, created_by FROM documents WHERE document_id = ?`, [document_id]);
        if (!doc.length) throw new Error("Document not found");

        const oldStatus = doc[0].status;
        const creatorId = doc[0].created_by;
        const isAdmin = userRole === "1" || userRole === "Admin" || userRole === "ADMIN";
        const isOwner = creatorId === userId;

        // ถ้าไม่ใช่ Admin และไม่ใช่เจ้าของ ห้ามทำรายการส่งตรวจ
        if (!isAdmin && !isOwner) {
            throw new Error("คุณไม่มีสิทธิ์ส่งตรวจอนุมัติเอกสารของผู้อื่น");
        }

        const newStatus = "Waiting";

        // อัปเดตสถานะและกำหนดผู้ถือครองเอกสารปัจจุบัน (current_owner)
        await connection.query(
            `UPDATE documents SET status = ?, current_owner = ? WHERE document_id = ?`,
            [newStatus, to_user, document_id]
        );

        // บันทึก Route การส่งเอกสาร
        await connection.query(
            `INSERT INTO document_routes (document_id, from_user, to_user, action, note)
             VALUES (?, ?, ?, 'Send', ?)`,
            [document_id, userId, to_user, note]
        );

        // บันทึกประวัติการเปลี่ยนสถานะ
        await connection.query(
            `INSERT INTO document_status_history (document_id, old_status, new_status, changed_by, remark)
             VALUES (?, ?, ?, ?, ?)`,
            [document_id, oldStatus, newStatus, userId, note]
        );

        // สร้าง Notification แจ้งเตือนผู้รับ
        await connection.query(
            `INSERT INTO notifications (user_id, title, message, document_id, notification_type)
             VALUES (?, 'Document Waiting', 'You have a document waiting for review', ?, 'Workflow')`,
            [to_user, document_id]
        );

        await connection.commit();
        return { document_id, status: newStatus };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

// 5. ลบเอกสาร (Soft Delete) และบันทึก Audit Log
async function deleteDocument(document_id, userId) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // ตรวจสอบว่าเอกสารมีอยู่จริงและยังไม่ถูกลบ
        const [doc] = await connection.query(
            `SELECT * FROM documents WHERE document_id = ? AND is_deleted = 0`, 
            [document_id]
        );
        if (!doc.length) throw new Error("Document not found");

        // ทำ Soft Delete
        await connection.query(
            `UPDATE documents SET is_deleted = 1, deleted_at = NOW(), updated_by = ? WHERE document_id = ?`,
            [userId, document_id]
        );

        // บันทึก Audit Log
        await connection.query(
            `INSERT INTO audit_logs (user_id, action, table_name, record_id, detail)
             VALUES (?, 'DELETE', 'documents', ?, ?)`,
            [userId, document_id, `Deleted document ${doc[0].document_no}`]
        );

        await connection.commit();
        return { message: "Document deleted successfully" };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

// 6. ปฏิเสธเอกสาร (Waiting -> Rejected)
async function updateStatusToRejected(document_id, userId, remark = "ไม่อนุมัติ") {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // ดึงสถานะเดิมและข้อมูลเอกสาร
        const [doc] = await connection.query(`SELECT status, document_no, created_by FROM documents WHERE document_id = ?`, [document_id]);
        if (!doc.length) throw new Error("Document not found");

        const oldStatus = doc[0].status;
        const newStatus = "Rejected";
        const creatorId = doc[0].created_by; // ส่งเรื่องกลับหาผู้สร้างต้นฉบับ

        // อัปเดตสถานะเอกสารเป็น Rejected และคืนเจ้าของกลับไปหาผู้สร้าง
        await connection.query(
            `UPDATE documents SET status = ?, current_owner = ? WHERE document_id = ?`,
            [newStatus, creatorId, document_id]
        );

        // บันทึก Route การปฏิเสธเอกสารลง document_routes
        await connection.query(
            `INSERT INTO document_routes (document_id, from_user, to_user, action, note)
             VALUES (?, ?, ?, 'Reject', ?)`,
            [document_id, userId, creatorId, remark]
        );

        // บันทึกประวัติการเปลี่ยนสถานะลง document_status_history
        await connection.query(
            `INSERT INTO document_status_history (document_id, old_status, new_status, changed_by, remark)
             VALUES (?, ?, ?, ?, ?)`,
            [document_id, oldStatus, newStatus, userId, remark]
        );

        // สร้าง Notification แจ้งเตือนไปยังผู้สร้างเอกสารว่าถูกปฏิเสธ
        await connection.query(
            `INSERT INTO notifications (user_id, title, message, document_id, notification_type)
             VALUES (?, 'Document Rejected', ?, ?, 'Workflow')`,
            [creatorId, `Your document ${doc[0].document_no} was rejected. Remark: ${remark}`, document_id]
        );

        await connection.commit();
        return { document_id, status: newStatus };
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

module.exports = {
    createDocumentWithRunningNo,
    getAllDocuments,
    getDocumentById,
    updateStatusToWaiting,
    deleteDocument,
    updateStatusToRejected
};