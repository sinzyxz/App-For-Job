import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // เช็คว่ามี Token ในเครื่องไหม ถ้ามีให้ดึงข้อมูล User (/auth/me)
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await API.get("/auth/me");
          // รองรับทั้งกรณีที่ API ส่ง user มาเป็น root หรือ res.data.user
          const userData = res.data.user || res.data;
          
          setUser(userData);
          // 📌 บันทึก Role ลง localStorage เพื่อให้ Frontend นำไปเช็คสิทธิ์ได้ง่าย
          if (userData.role_id) localStorage.setItem("role_id", userData.role_id);
          if (userData.role_name) localStorage.setItem("role_name", userData.role_name);
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("role_id");
          localStorage.removeItem("role_name");
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const res = await API.post("/auth/login", { username, password });
    
    const token = res.data.token;
    const userData = res.data.user || res.data;

    // บันทึก Token และ Role ลงใน localStorage
    localStorage.setItem("token", token);
    if (userData.role_id) {
      localStorage.setItem("role_id", userData.role_id);
    }
    if (userData.role_name) {
      localStorage.setItem("role_name", userData.role_name);
    }

    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role_id");
    localStorage.removeItem("role_name");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};