const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware"); // นำ Middleware เข้ามาใช้

router.post("/login", authController.login);

// เพิ่ม Route สำหรับเช็คข้อมูลผู้ใช้ที่ล็อกอินอยู่
router.get("/me", verifyToken, authController.getProfile);

// 📌 เพิ่ม Route สำหรับ Logout (ต้องผ่าน verifyToken เพื่อความปลอดภัยในการบันทึก Log หรือตรวจสอบสถานะ)
router.post("/logout", verifyToken, authController.logout);

module.exports = router;