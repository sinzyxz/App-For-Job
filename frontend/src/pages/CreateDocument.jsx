import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import { FilePlus, Paperclip, Send, ArrowLeft, AlertCircle, ShieldAlert, X } from "lucide-react";

export default function CreateDocument() {
  const navigate = useNavigate();

  // ================= 📌 กำหนด Role ของผู้ใช้งานตาม Database =================
  const [userRole] = useState(() => {
    return localStorage.getItem("role_id") || localStorage.getItem("role") || "3";
  }); 

  const isAdmin = userRole === "1" || userRole === 1 || userRole === "Admin" || userRole === "ADMIN";
  const isManager = userRole === "2" || userRole === 2 || userRole === "Manager" || userRole === "MANAGER"; // ✨ เพิ่มตรวจสอบ Role Manager
  const isOfficer = userRole === "3" || userRole === 3 || userRole === "Officer" || userRole === "OFFICER";
  
  // สิทธิ์ในการสร้างเอกสาร: อนุญาตให้ Admin, Manager และ Officer สร้างได้ตาม Database
  const canCreate = isAdmin || isManager || isOfficer; 
  // =====================================================================

  const [formData, setFormData] = useState({
    document_type: "INCOMING",
    external_ref: "",
    subject: "",
    description: "",
    sender_name: "",
    receiver_name: "",
    priority: "Normal"
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("ขนาดไฟล์ต้องไม่เกิน 10MB");
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      setError("กรุณากรอกชื่อเรื่องเอกสาร");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resDoc = await API.post("/documents", formData);
      const docId = resDoc.data?.data?.document_id || resDoc.data?.document_id;

      if (file && docId) {
        const fileData = new FormData();
        fileData.append("file", file);
        await API.post(`/files/${docId}/upload`, fileData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      navigate("/documents");
    } catch (err) {
      setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกเอกสาร");
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    switch (String(role)) {
      case "1": case "Admin": case "ADMIN": return "Admin (ผู้ดูแลระบบ)";
      case "2": case "Manager": case "MANAGER": return "Manager (ผู้อำนวยการ/ผู้อนุมัติ)";
      case "3": case "Officer": case "OFFICER": return "Officer (เจ้าหน้าที่)";
      case "4": case "Viewer": case "VIEWER": return "Viewer (ผู้ดูข้อมูล)";
      default: return role;
    }
  };

  // ================= 🛡️ Guard: หากไม่มีสิทธิ์สร้างเอกสาร (เหลือแค่ Viewer ที่โดนบล็อก) =================
  if (!canCreate) {
    return (
      <div className="flex bg-base-200 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 lg:p-10 flex items-center justify-center">
          <div className="card bg-base-100 shadow-xl border border-base-300 max-w-md text-center p-8">
            <ShieldAlert size={64} className="mx-auto text-error mb-4" />
            <h2 className="text-xl font-bold mb-2">ไม่มีสิทธิ์เข้าถึงหน้านี้</h2>
            <p className="text-sm text-base-content/60 mb-6">
              บัญชีของคุณ (<span className="font-semibold text-primary">{getRoleDisplayName(userRole)}</span>) ไม่มีสิทธิ์ในการสร้างเอกสารใหม่ หน้านี้อนุญาตเฉพาะ Admin, Manager และ Officer เท่านั้น
            </p>
            <button onClick={() => navigate("/documents")} className="btn btn-primary gap-2">
              <ArrowLeft size={16} /> กลับสู่หน้ารายการเอกสาร
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-base-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/documents")}
              className="btn btn-circle btn-ghost btn-sm"
              title="ย้อนกลับ"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FilePlus className="text-primary" /> สร้างเอกสารใหม่
              </h1>
              <p className="text-xs text-base-content/60">
                กรอกรายละเอียดเอกสารเพื่อออกเลขหนังสือและจัดเก็บบันทึก (สิทธิ์ของคุณ: <span className="font-semibold text-primary">{getRoleDisplayName(userRole)}</span>)
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-6 shadow-sm">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-base-100 shadow-xl border border-base-300 max-w-4xl">
          <form onSubmit={handleSubmit} className="card-body gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">ประเภทเอกสาร <span className="text-error">*</span></span>
                </label>
                <select
                  name="document_type"
                  value={formData.document_type}
                  onChange={handleChange}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="INCOMING">📥 หนังสือรับเข้า (INCOMING)</option>
                  <option value="OUTGOING">📤 หนังสือส่งออก (OUTGOING)</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">เลขที่อ้างอิงภายนอก (ถ้ามี)</span>
                </label>
                <input
                  type="text"
                  name="external_ref"
                  placeholder="เช่น ศธ 0501/123"
                  value={formData.external_ref}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">ระดับความสำคัญ</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="select select-bordered w-full focus:select-primary"
                >
                  <option value="Normal">⚪ ปกติ (Normal)</option>
                  <option value="Medium">🟡 ด่วน (Medium)</option>
                  <option value="High">🔴 ด่วนที่สุด (High)</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">ชื่อเรื่อง <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="ระบุชื่อเรื่องเอกสาร..."
                value={formData.subject}
                onChange={handleChange}
                className="input input-bordered w-full focus:input-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">ผู้ส่ง / หน่วยงานต้นทาง</span>
                </label>
                <input
                  type="text"
                  name="sender_name"
                  placeholder="ระบุชื่อผู้ส่ง หรือ บริษัท/หน่วยงาน"
                  value={formData.sender_name}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">ผู้รับ / หน่วยงานปลายทาง</span>
                </label>
                <input
                  type="text"
                  name="receiver_name"
                  placeholder="ระบุชื่อผู้รับ หรือ แผนก/หน่วยงาน"
                  value={formData.receiver_name}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">รายละเอียดเพิ่มเติม</span>
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="กรอกรายละเอียดหรือใจความสำคัญของเอกสาร..."
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full focus:textarea-primary"
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-1">
                  <Paperclip size={16} /> แนบไฟล์เอกสาร (PDF, PNG, JPG, DOCX - ไม่เกิน 10MB)
                </span>
              </label>

              {!file ? (
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="file-input file-input-bordered file-input-primary w-full"
                />
              ) : (
                <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-300">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Paperclip className="text-primary flex-shrink-0" size={18} />
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <span className="text-xs text-base-content/60">
                      ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="btn btn-circle btn-ghost btn-xs text-error"
                    title="ลบไฟล์"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="card-actions justify-end gap-3 mt-4 border-t border-base-200 pt-4">
              <button
                type="button"
                onClick={() => navigate("/documents")}
                className="btn btn-ghost"
                disabled={loading}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn btn-primary min-w-[140px] gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    บันทึกเอกสาร
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}