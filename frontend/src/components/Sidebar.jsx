import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutDashboard, FileText, PlusCircle, LogOut, User } from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ฟังก์ชันเช็คว่าหน้าปัจจุบันตรงกับ Path หรือไม่
  const isActive = (path) => location.pathname === path;

  // ================= 📌 กำหนด Role ของผู้ใช้งานตาม Database =================
  const userRole = user?.role || localStorage.getItem("role") || "3";

  const isAdmin = userRole === "1" || userRole === "Admin" || userRole === "ADMIN";
  const isManager = userRole === "2" || userRole === "Manager" || userRole === "MANAGER"; // ✨ เพิ่ม Manager
  const isOfficer = userRole === "3" || userRole === "Officer" || userRole === "OFFICER";
  
  // สิทธิ์ในการสร้างเอกสาร: ตอนนี้อนุญาตให้ Admin (1), Manager (2) และ Officer (3) สร้างได้
  const canCreate = isAdmin || isManager || isOfficer; 
  // =====================================================================

  // ฟังก์ชันแปลงเลขสิทธิ์ให้แสดงชื่ออ่านง่าย
  const getRoleDisplayName = (role) => {
    switch (role) {
      case "1": case "Admin": case "ADMIN": return "Admin (ผู้ดูแลระบบ)";
      case "2": case "Manager": case "MANAGER": return "Manager (ผู้อำนวยการ/ผู้อนุมัติ)"; // ✨ แก้ไขคำสะกดให้ถูกต้อง
      case "3": case "Officer": case "OFFICER": return "Officer (เจ้าหน้าที่)";
      case "4": case "Viewer": case "VIEWER": return "Viewer (ผู้ดูข้อมูล)";
      default: return role;
    }
  };

  return (
    <div className="w-64 bg-base-200 text-base-content min-h-screen p-4 flex flex-col justify-between border-e border-base-300">
      <div>
        {/* Logo / Header */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="p-2 bg-primary text-primary-content rounded-xl shadow-md">
            📄
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">E-Document</h1>
            <span className="text-xs text-base-content/60">ระบบจัดการเอกสาร</span>
          </div>
        </div>

        {/* Navigation Menu (daisyUI Menu component) */}
        <ul className="menu p-0 w-full gap-1">
          <li>
            <Link
              to="/dashboard"
              className={isActive("/dashboard") ? "active font-medium" : "font-medium"}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/documents"
              className={isActive("/documents") ? "active font-medium" : "font-medium"}
            >
              <FileText size={18} /> รายการเอกสาร
            </Link>
          </li>

          {/* เมนู "สร้างเอกสารใหม่" จะแสดงเมื่อ Admin, Manager หรือ Officer ล็อกอิน */}
          {canCreate && (
            <li>
              <Link
                to="/documents/create"
                className={isActive("/documents/create") ? "active font-medium" : "font-medium"}
              >
                <PlusCircle size={18} /> สร้างเอกสารใหม่
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* User Profile Card & Logout */}
      <div className="space-y-3 pt-4 border-t border-base-300">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-9">
              <span className="text-xs font-semibold">
                {user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User size={16} />}
              </span>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.fullname || "ผู้ใช้งาน"}</p>
            <p className="text-xs text-base-content/60 truncate">{user?.email || "User"}</p>
            <span className="inline-block mt-0.5 text-[10px] badge badge-primary badge-outline font-medium">
              {getRoleDisplayName(userRole)}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-error btn-outline btn-sm w-full gap-2"
        >
          <LogOut size={16} /> ออกจากระบบ
        </button>
      </div>
    </div>
  );
}