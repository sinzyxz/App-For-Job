const express = require("express");
const router = express.Router();
const auditController = require("../controllers/audit.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, auditController.getAuditLogs);

module.exports = router;