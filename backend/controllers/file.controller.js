const db = require("../config/db");
const path = require("path");

// อัปโหลดไฟล์แนบเข้าเอกสาร
async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const document_id = req.params.document_id;
        const uploaded_by = req.user.user_id;
        const { originalname, filename, size, mimetype } = req.file;
        const ext = path.extname(originalname);

        // บันทึกลงตาราง document_files
        const [result] = await db.query(
            `INSERT INTO document_files (document_id, file_name, file_path, file_size, uploaded_by, mime_type, extension)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [document_id, originalname, `uploads/${filename}`, size, uploaded_by, mimetype, ext]
        );

        // บันทึก Audit Log
        await db.query(
            `INSERT INTO audit_logs (user_id, action, table_name, record_id, detail)
             VALUES (?, 'UPLOAD', 'document_files', ?, ?)`,
            [uploaded_by, result.insertId, `Upload file ${originalname} to document ID ${document_id}`]
        );

        res.status(201).json({
            message: "File uploaded successfully",
            file_id: result.insertId,
            file_name: originalname
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// ดึงรายการไฟล์ของเอกสาร
async function getDocumentFiles(req, res) {
    try {
        const [files] = await db.query(
            `SELECT file_id, file_name, file_size, uploaded_at, mime_type 
             FROM document_files 
             WHERE document_id = ? AND is_deleted = 0`,
            [req.params.document_id]
        );
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { uploadFile, getDocumentFiles };