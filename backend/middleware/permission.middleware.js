const db = require("../config/db");

function checkPermission(requiredPermission) {
    return async (req, res, next) => {
        try {
            // 1. ลองปริ้นท์ดูว่า Token ถอดรหัสมาแล้วได้ค่าอะไรบ้าง
            console.log("--- DEBUG PERMISSION ---");
            console.log("User from Token:", req.user); 
            console.log("Required Permission:", requiredPermission);

            // เซฟค่า role_id (ใส่ ? เผื่อ req.user เป็น undefined)
            const roleId = req.user?.role_id || req.user?.role;

            if (!roleId) {
                console.log("❌ Error: No role_id in token!");
                return res.status(403).json({ message: "Access denied: No role assigned in token" });
            }

            const [rows] = await db.query(
                `SELECT p.permission_name 
                 FROM role_permissions rp
                 JOIN permissions p ON rp.permission_id = p.permission_id
                 WHERE rp.role_id = ? AND p.permission_name = ?`,
                [roleId, requiredPermission]
            );

            console.log("✅ DB Result Query:", rows);

            if (rows.length === 0) {
                console.log(`❌ Error: Role ID ${roleId} doesn't have '${requiredPermission}'`);
                return res.status(403).json({ 
                    message: `Access denied: You do not have permission (${requiredPermission})` 
                });
            }

            next(); 
        } catch (err) {
            console.error("❌ Catch Error:", err);
            res.status(500).json({ message: "Internal server error during permission check" });
        }
    };
}

module.exports = { checkPermission };