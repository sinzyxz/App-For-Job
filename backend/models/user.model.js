const db = require("../config/db");

async function getAllUsers() {
    const [rows] = await db.query(`
        SELECT
            user_id,
            username,
            fullname,
            email,
            phone,
            role_id,
            department_id,
            is_active,
            last_login,
            created_at
        FROM users
    `);

    return rows;
}

// ค้นหาข้อมูลผู้ใช้ด้วย ID (ใช้ร่วมกับ /me)
async function findUserById(id) {
    const [rows] = await db.query(
        "SELECT user_id, username, fullname, email, phone, role_id, department_id, is_active FROM users WHERE user_id = ?",
        [id]
    );
    return rows[0];
}

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userRoleId = req.user?.role || req.user?.role_id; // ป้องกันกรณี req.user เป็น undefined

      if (!userRoleId) {
        return res.status(401).json({ message: "ไม่พบข้อมูลสิทธิ์ของผู้ใช้งาน" });
      }
      
      // 📌 แก้ไขตรงนี้: ใส่ [rows] เพื่อดึงเฉพาะข้อมูลแถวออกมาจากผลลัพธ์ของ mysql2
      const [rows] = await db.query(
        `SELECT p.permission_name FROM role_permissions rp 
         JOIN permissions p ON rp.permission_id = p.permission_id 
         WHERE rp.role_id = ?`, 
        [userRoleId]
      );
      
      const permissionList = rows.map(p => p.permission_name);

      // ถ้าเป็น Admin (role_id = 1) หรือมีชื่อ permission ตรงกัน ให้ผ่านไปได้เลย
      if (userRoleId === 1 || userRoleId === "1" || permissionList.includes(requiredPermission)) {
        return next();
      }

      return res.status(403).json({ message: "คุณไม่มีสิทธิ์ใช้งานฟังก์ชันนี้" });
    } catch (err) {
      console.error("Permission Error:", err);
      return res.status(500).json({ message: "เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์" });
    }
  };
};

module.exports = {
    getAllUsers,
    findUserById,
    checkPermission
};