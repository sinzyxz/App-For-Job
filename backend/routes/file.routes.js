const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const upload = require("../uploads/uploads");

// อัปโหลดไฟล์แนบ
router.post("/:document_id/upload", verifyToken, upload.single("file"), fileController.uploadFile);
// ดึงรายการไฟล์แนบ
router.get("/:document_id/files", verifyToken, fileController.getDocumentFiles);

module.exports = router;