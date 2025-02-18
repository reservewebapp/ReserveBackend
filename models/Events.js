import pool from "../config/db.js";

class Event {
  static async findByCalendarId(calendarId) {
    const [rows] = await pool.execute("SELECT * FROM events WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ title, date, userId }) {
    const [result] = await pool.execute(
      "INSERT INTO events (title, date, user_id) VALUES (?, ?, ?)",
      [title, date, userId]
    );
    return result.insertId;
  }
}

export default Event;
