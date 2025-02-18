import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);

    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
