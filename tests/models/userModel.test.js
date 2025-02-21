import pool from "../../config/db.js";
import User from "../../models/User.js";

describe("User Model", () => {
  // 🔹 Set up the test database table before tests
  beforeAll(async () => {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        idusers INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(45),
        last_name VARCHAR(45),
        email VARCHAR(45),
        username VARCHAR(45),
        created_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        idpassword INT,
        iduser_level INT,
        iddepartment INT,
        iduser_role INT
      )
    `);
  });

  // 🔹 Clean up after tests
  afterAll(async () => {
    await pool.execute("DROP TABLE IF EXISTS users");
    await pool.end();
  });

  // 🔹 Test user creation
  it("should create a new user", async () => {
    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      idpassword: 1,
      iduser_level: 2,
      iddepartment: 3,
      iduser_role: 4,
    };

    const userId = await User.create(userData);
    expect(userId).toBeDefined(); // Expect the user ID to be generated

    const [user] = await pool.execute("SELECT * FROM users WHERE idusers = ?", [userId]);
    expect(user).toHaveLength(1);
    expect(user[0].first_name).toBe(userData.first_name);
    expect(user[0].last_name).toBe(userData.last_name);
    expect(user[0].email).toBe(userData.email);
    expect(user[0].username).toBe(userData.username);
    expect(user[0].idpassword).toBe(userData.idpassword);
    expect(user[0].iduser_level).toBe(userData.iduser_level);
    expect(user[0].iddepartment).toBe(userData.iddepartment);
    expect(user[0].iduser_role).toBe(userData.iduser_role);
  });

  // 🔹 Test user retrieval by ID
  it("should find a user by ID", async () => {
    const userData = {
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
      username: "janedoe",
      idpassword: 1,
      iduser_level: 2,
      iddepartment: 3,
      iduser_role: 4,
    };

    const userId = await User.create(userData);

    const user = await User.findById(userId);
    expect(user).toBeDefined();
    expect(user.first_name).toBe(userData.first_name);
    expect(user.last_name).toBe(userData.last_name);
    expect(user.email).toBe(userData.email);
    expect(user.username).toBe(userData.username);
  });

  // 🔹 Test updating the last login timestamp
  it("should update last login time", async () => {
    const userData = {
      first_name: "Alice",
      last_name: "Smith",
      email: "alice.smith@example.com",
      username: "alicesmith",
      idpassword: 1,
      iduser_level: 2,
      iddepartment: 3,
      iduser_role: 4,
    };

    const userId = await User.create(userData);

    // Initially last_login should be null
    const [userBeforeUpdate] = await pool.execute("SELECT * FROM users WHERE idusers = ?", [userId]);
    expect(userBeforeUpdate[0].last_login).toBeNull();

    // Update last login
    await User.updateLastLogin(userId);

    // After update, last_login should be set
    const [userAfterUpdate] = await pool.execute("SELECT * FROM users WHERE idusers = ?", [userId]);
    expect(userAfterUpdate[0].last_login).not.toBeNull();
  });

  // 🔹 Test deleting a user
  it("should delete a user", async () => {
    const userData = {
      first_name: "Bob",
      last_name: "Johnson",
      email: "bob.johnson@example.com",
      username: "bobjohnson",
      idpassword: 1,
      iduser_level: 2,
      iddepartment: 3,
      iduser_role: 4,
    };

    const userId = await User.create(userData);

    // Delete the user
    await User.delete(userId);

    const [user] = await pool.execute("SELECT * FROM users WHERE idusers = ?", [userId]);
    expect(user).toHaveLength(0); // User should be deleted
  });
});
