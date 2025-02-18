import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected Successfully");
    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Test DB Connection on Server Start
testDBConnection();

export default pool;
