const db = require("../config/db");

// ดึงรายการการแจ้งเตือนของผู้ใช้
async function getNotifications(req, res) {
    try {
        const [notifications] = await db.query(
            `SELECT * FROM notifications 
             WHERE user_id = ? 
             ORDER BY created_at DESC 
             LIMIT 20`,
            [req.user.user_id]
        );
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// อัปเดตสถานะเป็นอ่านแล้ว
async function markAsRead(req, res) {
    try {
        await db.query(
            `UPDATE notifications SET is_read = 1 WHERE notification_id = ? AND user_id = ?`,
            [req.params.id, req.user.user_id]
        );
        res.json({ message: "Notification marked as read" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getNotifications, markAsRead };