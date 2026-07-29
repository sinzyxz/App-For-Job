const db = require("../config/db");

// ดึงรายการสิทธิ์ทั้งหมดแยกตาม Role
async function getRolePermissions(req, res) {
    try {
        const [rows] = await db.query(`
            SELECT 
                r.role_id, 
                r.role_name,
                JSON_ARRAYAGG(p.permission_name) AS permissions
            FROM roles r
            LEFT JOIN role_permissions rp ON r.role_id = rp.role_id
            LEFT JOIN permissions p ON rp.permission_id = p.permission_id
            GROUP BY r.role_id, r.role_name
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getRolePermissions };