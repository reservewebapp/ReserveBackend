import request from "supertest";
import app from "../../server.js"; // Import Express app
import pool from "../../config/db.js";

describe("User API Routes", () => {
  beforeAll(async () => {
    await pool.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))");
  });

  afterAll(async () => {
    await pool.execute("DROP TABLE users"); // Clean up after tests
    await pool.end();
  });

  test("GET /api/users/:id should return a user", async () => {
    // Insert a user manually
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES ('Test User', 'test@example.com', 'hashedpass')"
    );

    const userId = result.insertId;

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Test User");
  });

  test("POST /api/users should create a new user", async () => {
    const newUser = {
      name: "New User",
      email: "new@example.com",
      password: "securepass123",
    };

    const response = await request(app).post("/api/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "User created successfully");
  });
});
