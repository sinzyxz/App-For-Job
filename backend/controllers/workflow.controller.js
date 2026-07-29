const db = require("../config/db");

// 1. ส่งเอกสารให้ผู้อนุมัติ/ผู้รับ
async function sendDocument(req, res) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const { document_id, to_user, note } = req.body;
        const from_user = req.user.user_id;

        // ดึงสถานะเดิม
        const [doc] = await connection.query(`SELECT status FROM documents WHERE document_id = ?`, [document_id]);
        if (!doc.length) return res.status(404).json({ message: "Document not found" });

        const oldStatus = doc[0].status;
        const newStatus = "Waiting";

        // ปรับสถานะเอกสารเป็น Waiting
        await connection.query(
            `UPDATE documents SET status = ?, current_owner = ? WHERE document_id = ?`,
            [newStatus, to_user, document_id]
        );

        // บันทึก Route การส่ง
        await connection.query(
            `INSERT INTO document_routes (document_id, from_user, to_user, action, note)
             VALUES (?, ?, ?, 'Send', ?)`,
            [document_id, from_user, to_user, note || null]
        );

        // บันทึก History
        await connection.query(
            `INSERT INTO document_status_history (document_id, old_status, new_status, changed_by, remark)
             VALUES (?, ?, ?, ?, ?)`,
            [document_id, oldStatus, newStatus, from_user, note || 'Send document']
        );

        // แจ้งเตือนผู้รับ
        await connection.query(
            `INSERT INTO notifications (user_id, title, message, document_id, notification_type)
             VALUES (?, 'Document Waiting', 'You have a document waiting for review', ?, 'Workflow')`,
            [to_user, document_id]
        );

        await connection.commit();
        res.json({ message: "Document sent successfully" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ message: err.message });
    } finally {
        connection.release();
    }
}

// 2. อนุมัติเอกสาร
async function approveDocument(req, res) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const { document_id, remark } = req.body;
        const action_by = req.user.user_id;

        const [doc] = await connection.query(`SELECT status FROM documents WHERE document_id = ?`, [document_id]);
        if (!doc.length) return res.status(404).json({ message: "Document not found" });

        const oldStatus = doc[0].status;
        const newStatus = "Approved";

        // ปรับสถานะเอกสารเป็น Approved
        await connection.query(
            `UPDATE documents SET status = ? WHERE document_id = ?`,
            [newStatus, document_id]
        );

        // บันทึก Route
        await connection.query(
            `INSERT INTO document_routes (document_id, from_user, to_user, action, note)
             VALUES (?, ?, ?, 'Approve', ?)`,
            [document_id, action_by, action_by, remark || null]
        );

        // บันทึก History
        await connection.query(
            `INSERT INTO document_status_history (document_id, old_status, new_status, changed_by, remark)
             VALUES (?, ?, ?, ?, ?)`,
            [document_id, oldStatus, newStatus, action_by, remark || 'Approved document']
        );

        // บันทึก Audit Log
        await connection.query(
            `INSERT INTO audit_logs (user_id, action, table_name, record_id, detail)
             VALUES (?, 'APPROVE', 'documents', ?, 'Approve Document')`,
            [action_by, document_id]
        );

        await connection.commit();
        res.json({ message: "Document approved successfully" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ message: err.message });
    } finally {
        connection.release();
    }
}

// 3. ดูประวัติเส้นทางเดินเอกสาร (Timeline / Route)
async function getDocumentHistory(req, res) {
    try {
        const [history] = await db.query(
            `SELECT dr.*, u1.fullname AS sender_name, u2.fullname AS receiver_name
             FROM document_routes dr
             LEFT JOIN users u1 ON dr.from_user = u1.user_id
             LEFT JOIN users u2 ON dr.to_user = u2.user_id
             WHERE dr.document_id = ?
             ORDER BY dr.action_date ASC`,
            [req.params.document_id]
        );
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { sendDocument, approveDocument, getDocumentHistory };