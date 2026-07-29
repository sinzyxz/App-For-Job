const Document = require("../models/document.model");

// สร้างเอกสาร
async function createDocument(req, res) {
    try {
        const { document_type, subject } = req.body;

        if (!document_type || !subject) {
            return res.status(400).json({
                message: "document_type and subject are required"
            });
        }

        const userId = req.user.user_id; 
        const result = await Document.createDocumentWithRunningNo(req.body, userId);

        res.status(201).json({
            message: "Document created successfully",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

// ดึงเอกสารทั้งหมด
async function getDocuments(req, res) {
    try {
        const userId = req.user.user_id;
        const userRole = req.user.role || req.user.role_id;

        const documents = await Document.getAllDocuments(userId, userRole);
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ดึงรายละเอียดเอกสาร 1 รายการ
async function getDocumentById(req, res) {
    try {
        const doc = await Document.getDocumentById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ส่งเอกสาร (เพิ่ม userRole เข้าไปในพารามิเตอร์เพื่อให้ Model เช็คสิทธิ์)
async function submitDocument(req, res) {
    try {
        const { document_id } = req.body;
        const userId = req.user.user_id;
        const userRole = req.user.role || req.user.role_id;

        if (!document_id) {
            return res.status(400).json({ message: "document_id is required" });
        }

        const result = await Document.updateStatusToWaiting(document_id, userId, userRole);

        res.json({
            message: "Document submitted successfully",
            data: result
        });
    } catch (err) {
        console.error(err);
        // ถ้าติดเงื่อนไขห้ามส่งของคนอื่น จะโยน Error 403 กลับไป
        const statusCode = err.message.includes("ไม่มีสิทธิ์") ? 403 : 500;
        res.status(statusCode).json({ message: err.message });
    }
}

async function removeDocument(req, res) {
    try {
        const document_id = req.params.id || req.params.document_id;
        const userId = req.user.user_id;

        if (!document_id) {
            return res.status(400).json({ message: "document_id is required" });
        }

        const result = await Document.deleteDocument(document_id, userId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

async function rejectDocument(req, res) {
    try {
        const { document_id, remark } = req.body;
        const userId = req.user.user_id;

        if (!document_id) {
            return res.status(400).json({ message: "document_id is required" });
        }

        const result = await Document.updateStatusToRejected(document_id, userId, remark || "ไม่อนุมัติ");

        res.json({
            message: "Document rejected successfully",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createDocument,
    getDocuments,
    getDocumentById,
    submitDocument,
    removeDocument,
    rejectDocument
};