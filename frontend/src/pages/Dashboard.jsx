import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import {
  LayoutDashboard,
  Clock,
  CheckCircle2,
  FileText,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileEdit,
  XCircle
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูล Dashboard ได้");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ดึงจำนวนของแต่ละสถานะจาก status_summary
  const getStatusCount = (statusName) => {
    if (!stats?.status_summary) return 0;
    const found = stats.status_summary.find(
      (s) => s.status?.toLowerCase() === statusName.toLowerCase()
    );
    return found ? Number(found.count) : 0;
  };

  // ฟังก์ชันแปลงสี Badge ตามสถานะเอกสาร
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="badge badge-success badge-sm gap-1 text-white"><CheckCircle2 size={12} /> Approved</span>;
      case "Waiting":
      case "Pending":
        return <span className="badge badge-warning badge-sm gap-1"><Clock size={12} /> Waiting</span>;
      case "Draft":
        return <span className="badge badge-ghost badge-sm gap-1"><FileEdit size={12} /> Draft</span>;
      case "Rejected":
        return <span className="badge badge-error badge-sm gap-1 text-white"><XCircle size={12} /> Rejected</span>;
      default:
        return <span className="badge badge-ghost badge-sm">{status || "Draft"}</span>;
    }
  };

  return (
    <div className="flex bg-base-200 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <LayoutDashboard className="text-primary" /> Dashboard ภาพรวมระบบ
            </h1>
            <p className="text-xs text-base-content/60">
              ติดตามสถานะเอกสารและการดำเนินงานในระบบ e-Document
            </p>
          </div>
          <Link to="/documents/create" className="btn btn-primary gap-2 shadow-md">
            <PlusCircle size={18} /> สร้างเอกสารใหม่
          </Link>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Section 1: Stat Cards Grid (ปรับเป็น 5 คอลัมน์สำหรับสถิติที่เหลือ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: ฉบับร่าง (Draft) */}
              <div className="stat bg-base-100 rounded-box shadow-md border border-base-300">
                <div className="stat-figure text-base-content/50">
                  <div className="p-3 bg-base-200 rounded-2xl">
                    <FileEdit size={24} />
                  </div>
                </div>
                <div className="stat-title text-xs font-medium text-base-content/70">ฉบับร่าง</div>
                <div className="stat-value text-2xl text-base-content/80 mt-1">
                  {getStatusCount("Draft")}
                </div>
                <div className="stat-desc text-[10px] mt-1">ยังส่งไม่สมบูรณ์</div>
              </div>

              {/* Card 2: รออนุมัติ (Waiting / Pending) */}
              <div className="stat bg-base-100 rounded-box shadow-md border border-base-300">
                <div className="stat-figure text-warning">
                  <div className="p-3 bg-warning/10 rounded-2xl">
                    <Clock size={24} />
                  </div>
                </div>
                <div className="stat-title text-xs font-medium text-base-content/70">รออนุมัติ</div>
                <div className="stat-value text-2xl text-warning mt-1">
                  {stats?.pending_for_me ?? getStatusCount("Waiting")}
                </div>
                <div className="stat-desc text-[10px] mt-1">รายการรอการดำเนินการ</div>
              </div>

              {/* Card 3: อนุมัติแล้ว (Approved) */}
              <div className="stat bg-base-100 rounded-box shadow-md border border-base-300">
                <div className="stat-figure text-success">
                  <div className="p-3 bg-success/10 rounded-2xl">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
                <div className="stat-title text-xs font-medium text-base-content/70">อนุมัติแล้ว</div>
                <div className="stat-value text-2xl text-success mt-1">
                  {getStatusCount("Approved")}
                </div>
                <div className="stat-desc text-[10px] text-success flex items-center gap-1 mt-1">
                  <TrendingUp size={12} /> ผ่านการอนุมัติ
                </div>
              </div>

              {/* Card 4: ไม่อนุมัติ (Rejected) */}
              <div className="stat bg-base-100 rounded-box shadow-md border border-base-300">
                <div className="stat-figure text-error">
                  <div className="p-3 bg-error/10 rounded-2xl">
                    <XCircle size={24} />
                  </div>
                </div>
                <div className="stat-title text-xs font-medium text-base-content/70">ไม่อนุมัติ</div>
                <div className="stat-value text-2xl text-error mt-1">
                  {getStatusCount("Rejected")}
                </div>
                <div className="stat-desc text-[10px] mt-1">ถูกปฏิเสธเอกสาร</div>
              </div>

              {/* Card 5: รวมทั้งหมด */}
              <div className="stat bg-base-100 rounded-box shadow-md border border-base-300">
                <div className="stat-figure text-primary">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <FileText size={24} />
                  </div>
                </div>
                <div className="stat-title text-xs font-medium text-base-content/70">เอกสารทั้งหมด</div>
                <div className="stat-value text-2xl text-primary mt-1">
                  {stats?.status_summary?.reduce((acc, curr) => acc + Number(curr.count), 0) || 0}
                </div>
                <div className="stat-desc text-[10px] mt-1">รายการรวมในระบบ</div>
              </div>

            </div>

            {/* Section 2: Recent Documents Table & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* ตารางเอกสารล่าสุด */}
              <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-lg">เอกสารล่าสุดในระบบ</h2>
                    <Link to="/documents" className="btn btn-ghost btn-xs gap-1 text-primary">
                      ดูทั้งหมด <ArrowRight size={14} />
                    </Link>
                  </div>

                  {stats?.recent_documents?.length === 0 ? (
                    <div className="text-center py-8 text-base-content/50">
                      ยังไม่มีรายการเอกสารในขณะนี้
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr className="text-base-content/70">
                            <th>เลขที่เอกสาร</th>
                            <th>ชื่อเรื่อง</th>
                            <th>สถานะ</th>
                            <th>วันที่สร้าง</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats?.recent_documents?.map((doc) => (
                            <tr key={doc.document_id} className="hover">
                              <td className="font-bold text-primary font-mono">
                                {doc.document_no}
                              </td>
                              <td className="max-w-[200px] truncate font-medium">
                                {doc.subject}
                              </td>
                              <td>{getStatusBadge(doc.status)}</td>
                              <td className="text-xs text-base-content/60">
                                {new Date(doc.created_at).toLocaleDateString("th-TH")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions / Info Card */}
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body p-6">
                  <h2 className="card-title text-lg mb-4">การจัดการด่วน</h2>
                  
                  <div className="space-y-3">
                    <Link
                      to="/documents/create"
                      className="btn btn-outline btn-primary w-full justify-start gap-3"
                    >
                      <PlusCircle size={20} />
                      สร้างเอกสารรับเข้า/ส่งออก
                    </Link>

                    <Link
                      to="/documents"
                      className="btn btn-outline w-full justify-start gap-3"
                    >
                      <FileText size={20} />
                      ค้นหาเอกสารทั้งหมด
                    </Link>
                  </div>

                  <div className="divider my-4">คำแนะนำ</div>

                  <div className="alert bg-base-200 text-xs text-base-content/70 border-none">
                    <div>
                      💡 **ระบบออกเลข Running Number:**
                      <br />
                      เอกสารรับเข้าจะขึ้นต้นด้วย <code className="font-bold text-primary">IN-YYYYMM-XXX</code>
                      <br />
                      เอกสารส่งออกจะขึ้นต้นด้วย <code className="font-bold text-primary">OUT-YYYYMM-XXX</code>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}