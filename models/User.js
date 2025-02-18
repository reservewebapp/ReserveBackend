import pool from "../config/db.js";

class User {
  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ name, email, password }) {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result.insertId;
  }
}

export default User;
