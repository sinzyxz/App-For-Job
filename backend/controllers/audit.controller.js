const db = require("../config/db");

async function getAuditLogs(req, res) {
    try {
        const [logs] = await db.query(
            `SELECT a.*, u.fullname AS user_fullname 
             FROM audit_logs a
             LEFT JOIN users u ON a.user_id = u.user_id
             ORDER BY a.created_at DESC
             LIMIT 100`
        );
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAuditLogs };