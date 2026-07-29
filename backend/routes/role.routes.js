const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { checkPermission } = require("../middleware/permission.middleware");

// ดึงรายการสิทธิ์ทั้งหมดแยกตาม Role (ต้องล็อกอิน และต้องมีสิทธิ์ตรวจสอบ Role)
router.get("/permissions-matrix", verifyToken, checkPermission("role.view"), roleController.getRolePermissions);

module.exports = router;