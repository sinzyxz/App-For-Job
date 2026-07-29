const express = require("express");
const router = express.Router();
const workflowController = require("../controllers/workflow.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/send", verifyToken, workflowController.sendDocument);
router.post("/approve", verifyToken, workflowController.approveDocument);
router.get("/history/:document_id", verifyToken, workflowController.getDocumentHistory);

module.exports = router;