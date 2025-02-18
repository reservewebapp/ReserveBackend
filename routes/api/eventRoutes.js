import express from "express";
import { getEventsByCalendar, createEvent } from "../../controllers/eventController.js";

const router = express.Router();
router.get("/:calendarId", getEventsByCalendar);
router.post("/", createEvent);

export default router;
