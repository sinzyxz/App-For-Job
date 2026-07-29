const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user ถูกแนบมาจาก verifyToken แล้ว (รองรับทั้ง role_id และ role_name)
    const userRole = req.user.role_name || String(req.user.role_id);

    // แปลง allowedRoles ให้เป็นรูปแบบที่เทียบเคียงกันได้ง่าย
    const isAllowed = allowedRoles.some(role => 
      String(role) === String(req.user.role_id) || 
      String(role).toLowerCase() === String(req.user.role_name).toLowerCase()
    );

    if (!isAllowed) {
      return res.status(403).json({ 
        message: "Access Denied: คุณไม่มีสิทธิ์ใช้งานฟังก์ชันนี้" 
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };