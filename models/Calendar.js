import pool from "../config/db.js";

class Calendar {
  static async findByUserId(userId) {
    const [rows] = await pool.execute("SELECT * FROM calendars WHERE user_id = ?", [userId]);
    return rows;
  }
  
  static async create({ userId, title }) {
    const [result] = await pool.execute(
      "INSERT INTO calendars (user_id, title) VALUES (?, ?)",
      [userId, title]
    );
    return result.insertId;
  }
}

export default Calendar;