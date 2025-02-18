import Calendar from  "../models/Calendar.js";

// Get all calendars for a user
export const getCalendarsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const calendars = await Calendar.findByUserId(userId);
    
    if (!calendars.length) {
      return res.status(404).json({ message: "No calendars found for this user" });
    }

    res.json(calendars);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new calendar
export const createCalendar = async (req, res) => {
  try {
    const { userId, title } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: "User ID and title are required" });
    }

    const calendarId = await Calendar.create({ userId, title });

    res.status(201).json({ message: "Calendar created successfully", calendarId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
