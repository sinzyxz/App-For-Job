const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "No token provided, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 📌 แนบข้อมูลทั้งหมดที่ถอดรหัสได้จาก Token มาเก็บไว้ใน req.user
    req.user = {
      user_id: decoded.user_id,
      role_id: decoded.role_id,
      role_name: decoded.role_name,
      role: decoded.role_name || decoded.role_id // รองรับทั้งชื่อและไอดี
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };