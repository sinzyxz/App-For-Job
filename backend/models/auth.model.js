const db = require("../config/db");

async function findUserByUsername(username) {
    const [rows] = await db.query(
        `SELECT u.*, r.role_name AS role_name 
         FROM users u 
         LEFT JOIN roles r ON u.role_id = r.role_id 
         WHERE u.username = ?`,
        [username]
    );
    return rows[0];
}

async function findUserById(id) {
    const [rows] = await db.query(
        `SELECT u.*, r.role_name AS role_name 
         FROM users u 
         LEFT JOIN roles r ON u.role_id = r.role_id 
         WHERE u.user_id = ?`,
        [id]
    );
    return rows[0];
}

module.exports = {
    findUserByUsername,
    findUserById
};