import pool from "../config/db.js";

class User {  
  static async findById(id) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [idusers]
    );
    return rows[0];
  }
  // 🔹 Create a new user
  static async create({
    first_name,
    last_name,
    email,
    username,
    idpassword,
    iduser_level,
    iddepartment,
    iduser_role,
  }) {
    const [result] = await pool.execute(
      `INSERT INTO users 
      (first_name, last_name, email, username, created_login, last_login, idpassword, iduser_level, iddepartment, iduser_role) 
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, NULL, ?, ?, ?, ?)`,
      [first_name, last_name, email, username, idpassword, iduser_level, iddepartment, iduser_role]
    );
    return result.insertId; // Returns the new user's ID
  }
  // 🔹 Update last login time
  static async updateLastLogin(idusers) {
    await pool.execute(
      "UPDATE users SET last_login = NOW() WHERE idusers = ?",
      [idusers]
    );
  }

  // 🔹 Delete user by ID
  static async delete(idusers) {
    await pool.execute("DELETE FROM users WHERE idusers = ?", [idusers]);
  }

} // ✅ Default export User
export default User;