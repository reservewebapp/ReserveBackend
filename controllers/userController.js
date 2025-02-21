import User from "../models/User.js";

// 🔹 Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);

    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};
// 🔹 Create new user
export const createUser = async (req, res) => {
  try {
    const newUserId = await User.create(req.body);
    res.status(201).json({ message: "User created", id: newUserId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update last login
export const updateLastLogin = async (req, res) => {
  try {
    await User.updateLastLogin(req.params.id);
    res.json({ message: "Last login updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
