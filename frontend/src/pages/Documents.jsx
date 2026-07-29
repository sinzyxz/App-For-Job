import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Paperclip,
  Eye,
  PlusCircle,
  History,
  AlertCircle,
  X,
  FileCheck,
  XCircle
} from "lucide-react";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= 📌 กำหนด Role ของผู้ใช้งานตาม Database =================
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("role_id") || localStorage.getItem("role") || "3";
  });
  // =====================================================================

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modal States
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docHistory, setDocHistory] = useState([]);
  const [docFiles, setDocFiles] = useState([]);
  const [approveRemark, setApproveRemark] = useState("");
  const [rejectRemark, setRejectRemark] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Filter Effect
  useEffect(() => {
    let result = documents;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.document_no?.toLowerCase().includes(term) ||
          doc.subject?.toLowerCase().includes(term) ||
          doc.sender_name?.toLowerCase().includes(term)
      );
    }

    if (selectedType !== "ALL") {
      result = result.filter((doc) => doc.document_type === selectedType);
    }

    if (selectedStatus !== "ALL") {
      result = result.filter((doc) => doc.status === selectedStatus);
    }

    setFilteredDocs(result);
  }, [searchTerm, selectedType, selectedStatus, documents]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/documents");
      setDocuments(res.data);
      setFilteredDocs(res.data);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลรายการเอกสารได้ กรุณาลองใหม่อีกครั้ง");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Safe Modal Open Helper (ป้องกัน Bug กรณี DOM ยังไม่พร้อม)
  const openModalElement = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  };

  const closeModalElement = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal && typeof modal.close === "function") {
      modal.close();
    }
  };

  // เปิด Modal ดูรายละเอียด + History + Files
  const handleOpenDetail = async (doc) => {
    setSelectedDoc(doc);
    setDocHistory([]);
    setDocFiles([]);
    openModalElement("detail_modal");

    try {
      const [resHistory, resFiles] = await Promise.all([
        API.get(`/workflow/history/${doc.document_id}`).catch(() => ({ data: [] })),
        API.get(`/files/${doc.document_id}/files`).catch(() => ({ data: [] }))
      ]);

      setDocHistory(resHistory.data);
      setDocFiles(resFiles.data);
    } catch (err) {
      console.error("Failed to load details", err);
    }
  };

  // เปิด Modal ยืนยันการอนุมัติ
  const handleOpenApprove = (doc) => {
    setSelectedDoc(doc);
    setApproveRemark("");
    openModalElement("approve_modal");
  };

  // เปิด Modal ปฏิเสธเอกสาร
  const handleOpenReject = (doc) => {
    setSelectedDoc(doc);
    setRejectRemark("");
    openModalElement("reject_modal");
  };

  // กดยืนยันอนุมัติเอกสาร
  const handleConfirmApprove = async () => {
    if (!selectedDoc) return;
    setActionLoading(true);
    try {
      await API.post("/workflow/approve", {
        document_id: selectedDoc.document_id,
        remark: approveRemark.trim() || "อนุมัติเรียบร้อย"
      });
      closeModalElement("approve_modal");
      closeModalElement("detail_modal");
      fetchDocuments();
    } catch (err) {
      alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการอนุมัติเอกสาร");
    } finally {
      setActionLoading(false);
    }
  };

  // กดยืนยันปฏิเสธเอกสาร
  const handleConfirmReject = async () => {
    if (!selectedDoc) return;
    if (!rejectRemark.trim()) {
      alert("กรุณาระบุเหตุผลในการปฏิเสธเอกสาร");
      return;
    }
    setActionLoading(true);
    try {
      await API.post("/workflow/reject", {
        document_id: selectedDoc.document_id,
        remark: rejectRemark.trim()
      });
      closeModalElement("reject_modal");
      closeModalElement("detail_modal");
      fetchDocuments();
    } catch (err) {
      alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการปฏิเสธเอกสาร");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="badge badge-success gap-1 text-white"><CheckCircle2 size={12} /> Approved</span>;
      case "Waiting":
        return <span className="badge badge-warning gap-1"><Clock size={12} /> Waiting</span>;
      case "Rejected":
        return <span className="badge badge-error gap-1 text-white"><XCircle size={12} /> Rejected</span>;
      default:
        return <span className="badge badge-ghost">{status || "Draft"}</span>;
    }
  };

  // ================= 🛡️ ฟังก์ชันเช็คสิทธิ์ (Permissions Mapping) =================
  const isAdmin = userRole === "1" || userRole === 1 || userRole === "Admin" || userRole === "ADMIN";
  const isManager = userRole === "2" || userRole === 2 || userRole === "Manager" || userRole === "MANAGER";
  const isOfficer = userRole === "3" || userRole === 3 || userRole === "Officer" || userRole === "OFFICER";
  
  const canCreate = isAdmin || isOfficer;                    
  const canApprove = isAdmin || isManager;                     
  const canDelete = isAdmin;                                   
  // ======================================================================

  const getRoleDisplayName = (role) => {
    switch (String(role)) {
      case "1": case "Admin": case "ADMIN": return "Admin (ผู้ดูแลระบบ)";
      case "2": case "Manager": case "MANAGER": return "Manager (ผู้อำนวยการ/ผู้อนุมัติ)";
      case "3": case "Officer": case "OFFICER": return "Officer (เจ้าหน้าที่)";
      case "4": case "Viewer": case "VIEWER": return "Viewer (ผู้ดูข้อมูล)";
      default: return role;
    }
  };

  return (
    <div className="flex bg-base-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="text-primary" /> รายการเอกสารทั้งหมด
            </h1>
            <p className="text-xs text-base-content/60">
              ค้นหา ติดตามสถานะ และจัดการเอกสารในระบบ (สิทธิ์ของคุณ: <span className="font-semibold text-primary">{getRoleDisplayName(userRole)}</span>)
            </p>
          </div>
          
          {canCreate && (
            <Link to="/documents/create" className="btn btn-primary gap-2 shadow-md">
              <PlusCircle size={18} /> สร้างเอกสารใหม่
            </Link>
          )}
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Search & Filters Bar */}
        <div className="card bg-base-100 shadow-xl border border-base-300 mb-6">
          <div className="card-body p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-base-content/40" size={18} />
                <input
                  type="text"
                  placeholder="ค้นหาเลขที่เอกสาร, ชื่อเรื่อง, ผู้ส่ง..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full pl-10 focus:input-primary"
                />
              </div>
            </div>

            <div className="form-control">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="select select-bordered w-full focus:select-primary"
              >
                <option value="ALL">ทุกประเภทเอกสาร</option>
                <option value="INCOMING">📥 หนังสือรับเข้า (INCOMING)</option>
                <option value="OUTGOING">📤 หนังสือส่งออก (OUTGOING)</option>
              </select>
            </div>

            <div className="form-control">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="select select-bordered w-full focus:select-primary"
              >
                <option value="ALL">ทุกสถานะ</option>
                <option value="Draft">Draft</option>
                <option value="Waiting">Waiting</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Table Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-0">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : filteredDocs.length === 0 ? (
              <div className="text-center py-16 text-base-content/50">
                <FileText size={48} className="mx-auto mb-2 opacity-30" />
                ไม่พบรายการเอกสารที่ตรงกับเงื่อนไข
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200/50 text-base-content/70">
                      <th>เลขที่เอกสาร</th>
                      <th>ประเภท</th>
                      <th>ชื่อเรื่อง</th>
                      <th>ผู้สร้าง/ผู้ส่ง</th>
                      <th>สถานะ</th>
                      <th>วันที่สร้าง</th>
                      <th className="text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc) => (
                      <tr key={doc.document_id} className="hover">
                        <td className="font-bold text-primary font-mono">
                          {doc.document_no}
                        </td>
                        <td>
                          <span className={`badge badge-sm font-semibold ${
                            doc.document_type === 'INCOMING' ? 'badge-secondary' : 'badge-accent'
                          }`}>
                            {doc.document_type}
                          </span>
                        </td>
                        <td className="max-w-[220px] truncate font-medium" title={doc.subject}>
                          {doc.subject}
                        </td>
                        <td className="text-xs text-base-content/70">
                          {doc.creator_name || doc.sender_name || "-"}
                        </td>
                        <td>{getStatusBadge(doc.status)}</td>
                        <td className="text-xs text-base-content/60">
                          {doc.created_at ? new Date(doc.created_at).toLocaleDateString("th-TH") : "-"}
                        </td>
                        <td className="text-center">
                          <div className="flex justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(doc)}
                              className="btn btn-ghost btn-xs text-info gap-1"
                              title="ดูรายละเอียด"
                            >
                              <Eye size={16} />
                            </button>

                            {doc.status === "Waiting" && canApprove && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleOpenApprove(doc)}
                                  className="btn btn-success btn-xs text-white gap-1"
                                  title="อนุมัติเอกสาร"
                                >
                                  <CheckCircle2 size={14} /> อนุมัติ
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenReject(doc)}
                                  className="btn btn-error btn-xs text-white gap-1"
                                  title="ปฏิเสธเอกสาร"
                                >
                                  <XCircle size={14} /> ปฏิเสธ
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== 1. MODAL DETAIL & WORKFLOW HISTORY ==================== */}
      <dialog id="detail_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl bg-base-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={18} />
            </button>
          </form>

          {selectedDoc && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-base-200 pb-3">
                <FileCheck className="text-primary" size={24} />
                <div>
                  <h3 className="font-bold text-lg">{selectedDoc.document_no}</h3>
                  <p className="text-xs text-base-content/60">{selectedDoc.subject}</p>
                </div>
              </div>

              {/* Document Meta Info */}
              <div className="grid grid-cols-2 gap-3 text-sm bg-base-200/50 p-4 rounded-xl">
                <div><span className="text-base-content/60">ประเภท:</span> <span className="font-semibold">{selectedDoc.document_type}</span></div>
                <div><span className="text-base-content/60">สถานะ:</span> {getStatusBadge(selectedDoc.status)}</div>
                <div><span className="text-base-content/60">เลขภายนอก:</span> {selectedDoc.external_ref || "-"}</div>
                <div><span className="text-base-content/60">ความสำคัญ:</span> {selectedDoc.priority || "ปกติ"}</div>
                <div className="col-span-2"><span className="text-base-content/60">รายละเอียด:</span> {selectedDoc.description || "-"}</div>
              </div>

              {/* Action: Send to Review */}
              {(!selectedDoc.status || selectedDoc.status === "Draft") && canCreate && (
                <div className="card bg-base-200 p-4 rounded-xl flex flex-row items-center justify-between">
                  <div>
                    <h5 className="font-bold text-sm">การดำเนินการเอกสาร</h5>
                    <p className="text-xs text-base-content/60">เอกสารนี้ยังอยู่ในสถานะร่าง คุณสามารถส่งต่อเพื่อเข้าสู่กระบวนการพิจารณาได้</p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        setActionLoading(true);
                        await API.post("/workflow/send", {
                          document_id: selectedDoc.document_id,
                          note: "ส่งตรวจสอบ / รออนุมัติ"
                        });
                        closeModalElement("detail_modal");
                        fetchDocuments(); 
                      } catch (err) {
                        alert(err.response?.data?.message || "ไม่สามารถส่งเอกสารได้");
                      } finally {
                        setActionLoading(false);
                      }
                    }}
                    className="btn btn-primary btn-sm gap-1"
                    disabled={actionLoading}
                  >
                    {actionLoading ? <span className="loading loading-spinner loading-xs"></span> : "ส่งตรวจสอบ / อนุมัติ"}
                  </button>
                </div>
              )}

              {/* Action: Delete Document */}
              {canDelete && (
                <div className="flex flex-row items-center justify-between bg-error/10 p-4 rounded-xl border border-error/20">
                  <div>
                    <p className="text-xs text-base-content/60">คุณมีสิทธิ์ผู้ดูแลระบบ (Admin) สามารถลบเอกสารนี้ออกจากระบบได้ทันที</p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!window.confirm(`คุณต้องการลบเอกสารเลขที่ ${selectedDoc.document_no} นี้ใช่หรือไม่?`)) return;
                      try {
                        setActionLoading(true);
                        await API.delete(`/documents/${selectedDoc.document_id}`);
                        closeModalElement("detail_modal");
                        fetchDocuments(); 
                      } catch (err) {
                        alert(err.response?.data?.message || "ไม่สามารถลบเอกสารได้");
                      } finally {
                        setActionLoading(false);
                      }
                    }}
                    className="btn btn-error btn-sm gap-1 text-white"
                    disabled={actionLoading}
                  >
                    {actionLoading ? <span className="loading loading-spinner loading-xs"></span> : "ลบเอกสาร"}
                  </button>
                </div>
              )}

              {/* Files Section */}
              <div>
                <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
                  <Paperclip size={16} /> ไฟล์แนบในระบบ
                </h4>
                {docFiles.length === 0 ? (
                  <p className="text-xs text-base-content/50">ไม่มีไฟล์แนบ</p>
                ) : (
                  <div className="space-y-2">
                    {docFiles.map((file) => (
                      <div key={file.file_id} className="flex justify-between items-center bg-base-200 p-2.5 rounded-lg text-xs">
                        <span className="truncate max-w-[300px] font-medium">{file.file_name}</span>
                        <a
                          href={`${API.defaults.baseURL || "http://localhost:5000"}/${file.file_path}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-xs"
                        >
                          เปิดดูไฟล์
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline Route History Section */}
              <div>
                <h4 className="font-bold text-sm mb-3 flex items-center gap-1">
                  <History size={16} /> ประวัติเส้นทางเดินเอกสาร (Workflow History)
                </h4>
                {docHistory.length === 0 ? (
                  <p className="text-xs text-base-content/50">ยังไม่มีประวัติการส่งต่อ</p>
                ) : (
                  <ul className="timeline timeline-vertical timeline-compact">
                    {docHistory.map((h, index) => (
                      <li key={h.route_id || index}>
                        {index > 0 && <hr />}
                        <div className="timeline-middle text-primary">
                          <CheckCircle2 size={16} />
                        </div>
                        <div className="timeline-end timeline-box bg-base-200/70 border-none text-xs p-3 my-1">
                          <div className="font-bold text-primary">{h.action} - จาก {h.sender_name || "ระบบ"}</div>
                          {h.receiver_name && <div>ส่งถึง: {h.receiver_name}</div>}
                          {h.note && <div className="text-base-content/70 mt-1">บันทึก: "{h.note}"</div>}
                          <div className="text-[10px] text-base-content/50 mt-1">
                            {h.action_date ? new Date(h.action_date).toLocaleString("th-TH") : ""}
                          </div>
                        </div>
                        {index < docHistory.length - 1 && <hr />}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* ==================== 2. MODAL APPROVE CONFIRM ==================== */}
      <dialog id="approve_modal" className="modal">
        <div className="modal-box bg-base-100">
          <h3 className="font-bold text-lg text-success flex items-center gap-2">
            <CheckCircle2 /> ยืนยันการอนุมัติเอกสาร
          </h3>
          <p className="py-2 text-sm text-base-content/70">
            คุณกำลังจะอนุมัติเอกสารเลขที่ <span className="font-bold text-primary">{selectedDoc?.document_no}</span>
          </p>

          <div className="form-control my-4">
            <label className="label">
              <span className="label-text font-medium">หมายเหตุ / ความเห็นเพิ่มเติม</span>
            </label>
            <textarea
              value={approveRemark}
              onChange={(e) => setApproveRemark(e.target.value)}
              placeholder="ระบุหมายเหตุการอนุมัติ (ถ้ามี)..."
              className="textarea textarea-bordered focus:textarea-primary h-20"
            ></textarea>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button type="submit" className="btn btn-ghost" disabled={actionLoading}>ยกเลิก</button>
            </form>
            <button
              type="button"
              onClick={handleConfirmApprove}
              className="btn btn-success text-white"
              disabled={actionLoading}
            >
              {actionLoading ? <span className="loading loading-spinner loading-xs"></span> : "ยืนยันการอนุมัติ"}
            </button>
          </div>
        </div>
      </dialog>

      {/* ==================== 3. MODAL REJECT CONFIRM ==================== */}
      <dialog id="reject_modal" className="modal">
        <div className="modal-box bg-base-100">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            <XCircle /> ยืนยันการปฏิเสธเอกสาร
          </h3>
          <p className="py-2 text-sm text-base-content/70">
            คุณกำลังจะปฏิเสธเอกสารเลขที่ <span className="font-bold text-primary">{selectedDoc?.document_no}</span>
          </p>

          <div className="form-control my-4">
            <label className="label">
              <span className="label-text font-medium">เหตุผลในการปฏิเสธ <span className="text-error">*</span></span>
            </label>
            <textarea
              value={rejectRemark}
              onChange={(e) => setRejectRemark(e.target.value)}
              placeholder="ระบุเหตุผลที่ไม่ผ่านการอนุมัติ..."
              className="textarea textarea-bordered focus:textarea-error h-20"
            ></textarea>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button type="submit" className="btn btn-ghost" disabled={actionLoading}>ยกเลิก</button>
            </form>
            <button
              type="button"
              onClick={handleConfirmReject}
              className="btn btn-error text-white"
              disabled={actionLoading}
            >
              {actionLoading ? <span className="loading loading-spinner loading-xs"></span> : "ยืนยันการปฏิเสธ"}
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
}