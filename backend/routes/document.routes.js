const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// 1. สร้างเอกสาร: อนุญาตให้ Admin (1), Manager (2) และ Officer (3) สร้างได้[cite: 1]
router.post(
  "/", 
  verifyToken, 
  authorizeRoles("1", "2", "3", "Admin", "Manager", "Officer"), 
  documentController.createDocument
);

// 2. ดูรายการเอกสารทั้งหมด / ดูรายชิ้น: ทุกคนเข้าถึงได้[cite: 1]
router.get(
  "/", 
  verifyToken, 
  authorizeRoles("1", "2", "3", "4", "Admin", "Manager", "Officer", "Viewer"),
  documentController.getDocuments
);

router.get(
  "/:id", 
  verifyToken, 
  authorizeRoles("1", "2", "3", "4", "Admin", "Manager", "Officer", "Viewer"),
  documentController.getDocumentById
);

// 3. ส่งเอกสาร / ดำเนินการ: เฉพาะ Officer (3) และ Admin (1)[cite: 1]
router.post(
  "/submit", 
  verifyToken, 
  authorizeRoles("1", "3", "Admin", "Officer"),
  documentController.submitDocument
);

// 4. ลบเอกสาร: เฉพาะ Admin (1) เท่านั้น[cite: 1]
router.delete(
  "/:document_id", 
  verifyToken, 
  authorizeRoles("1", "Admin"),
  documentController.removeDocument
);

// 5. ไม่อนุมัติ/ตีกลับเอกสาร (Reject): เฉพาะ Manager (2) และ Admin (1)[cite: 1]
router.post(
  "/reject", 
  verifyToken, 
  authorizeRoles("1", "2", "Admin", "Manager"),
  documentController.rejectDocument
);

module.exports = router;