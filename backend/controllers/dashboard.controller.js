const db = require("../config/db");

async function getDashboardStats(req, res) {
    try {
        const userId = req.user.user_id;

        // 1. นับจำนวนเอกสารแยกตามสถานะ
        const [statusCounts] = await db.query(
            `SELECT status, COUNT(*) AS count 
             FROM documents 
             WHERE is_deleted = 0 
             GROUP BY status`
        );

        // 2. ดึงจำนวนเอกสารที่รอผู้ใช้งานคนนี้อนุมัติ/จัดการ
        const [pendingCount] = await db.query(
            `SELECT COUNT(*) AS pending_count 
             FROM documents 
             WHERE current_owner = ? AND status = 'Waiting' AND is_deleted = 0`,
            [userId]
        );

        // 3. ดึงเอกสารล่าสุด 5 รายการ
        const [recentDocuments] = await db.query(
            `SELECT document_id, document_no, subject, status, created_at 
             FROM documents 
             WHERE is_deleted = 0 
             ORDER BY created_at DESC 
             LIMIT 5`
        );

        res.json({
            status_summary: statusCounts,
            pending_for_me: pendingCount[0].pending_count,
            recent_documents: recentDocuments
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getDashboardStats };