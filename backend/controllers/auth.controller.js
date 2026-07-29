const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.model");

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and Password are required"
            });
        }

        const user = await Auth.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        if (user.is_active == 0) {
            return res.status(403).json({
                message: "User is inactive"
            });
        }

        const hash = user.password_hash.replace("$2y$", "$2b$");
        const match = await bcrypt.compare(password, hash);

        if (!match) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        // 📌 สร้าง Token โดยแนบ user_id, role_id และ role_name
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role_id: user.role_id,
                role_name: user.role_name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        delete user.password_hash;

        res.json({
            message: "Login Success",
            token,
            user: {
                ...user,
                role: user.role_name || user.role_id // ส่งฟิลด์ role ไปให้ Frontend ใช้งานง่ายขึ้น
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
}

async function getProfile(req, res) {
    try {
        const user = await Auth.findUserById(req.user.user_id); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        delete user.password_hash;
        res.json({
            ...user,
            role: user.role_name || user.role_id
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// 📌 เพิ่มฟังก์ชัน Logout (สำหรับการเก็บบันทึก Log ฝั่ง Server หรือส่ง Response ยืนยัน)
async function logout(req, res) {
    try {
        // หากใช้ JWT แบบ Stateless การ Logout หลักๆ จะเคลียร์ที่ Frontend 
        // แต่สามารถใส่ Endpoint นี้ไว้สำหรับบันทึก Audit Log หรือเคลียร์ฝั่ง Server เพิ่มเติมได้
        res.json({ message: "Logout Success" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    login,
    getProfile,
    logout
};