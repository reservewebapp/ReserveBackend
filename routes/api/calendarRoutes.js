import express from "express";
import { getCalendarsByUser, createCalendar } from "../../controllers/calendarController.js";

const router = express.Router();

router.get("/:userId", getCalendarsByUser);
router.post("/", createCalendar);

export default router;
