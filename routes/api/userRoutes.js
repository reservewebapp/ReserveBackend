import express from "express";
import { 
    getUserById,
    createUser,
    updateLastLogin,
    deleteUser,
} from "../../controllers/userController.js";

const router = express.Router();
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id/login", updateLastLogin);
router.delete("/:id", deleteUser);
export default router;
