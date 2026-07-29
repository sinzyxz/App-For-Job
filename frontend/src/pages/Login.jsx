import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FileText, Lock, User, Eye, EyeOff, LogIn, AlertCircle, ShieldCheck } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext); // ดึงฟังก์ชัน login จาก AuthContext
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const usernameTrimmed = formData.username.trim();
    const passwordTrimmed = formData.password.trim();

    if (!usernameTrimmed || !passwordTrimmed) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน");
      return;
    }

    setLoading(true);

    try {
      // เรียกใช้ login() จาก AuthContext (ส่งไปทั้ง Username และ Password)
      await login(usernameTrimmed, passwordTrimmed);
      
      // เมื่อ Login สำเร็จ นำทางไปยัง Dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-300 max-w-4xl w-full overflow-hidden">
        
        {/* Left Side: Branding / Banner */}
        <div className="lg:w-1/2 bg-primary text-primary-content p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <FileText size={320} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <FileText size={32} className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide">e-Document</span>
            </div>
            <h2 className="text-3xl font-extrabold mb-4 leading-tight">
              ระบบสารบรรณและ จัดการเอกสารอิเล็กทรอนิกส์
            </h2>
            <p className="text-sm opacity-90 leading-relaxed">
              ติดตามเส้นทางเดินเอกสาร อนุมัติรวดเร็ว ปลอดภัย และค้นหาง่ายในระบบเดียว
            </p>
          </div>

          <div className="relative z-10 mt-12 pt-6 border-t border-white/20 flex items-center gap-3 text-xs opacity-80">
            <ShieldCheck size={18} />
            <span>ระบบรักษาความปลอดภัยตามมาตรฐานองค์กร</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content">เข้าสู่ระบบ</h2>
            <p className="text-xs text-base-content/60 mt-1">
              กรุณากรอกบัญชีผู้ใช้งานเพื่อเข้าสู่ระบบ
            </p>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="alert alert-error mb-6 shadow-sm text-xs py-3">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username / Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">ชื่อผู้ใช้หรืออีเมล (Username)</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-base-content/40" size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="admin"
                  value={formData.username}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 focus:input-primary text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">รหัสผ่าน (Password)</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-base-content/40" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pl-10 pr-10 focus:input-primary text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    เข้าสู่ระบบ
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Footer Link */}
          <div className="text-center mt-8 text-xs text-base-content/60">
            หากพบปัญหาการเข้าสู่ระบบ กรุณาลองติดต่อ{" "}
            <span className="text-primary font-semibold">ฝ่ายเทคโนโลยีสารสนเทศ (IT)</span>
          </div>
        </div>

      </div>
    </div>
  );
}