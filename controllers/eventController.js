import Event from "../models/Events.js";

export const getEventsByCalendar = async (req, res) => {
  try {
    const events = await Event.findByCalendarId(req.params.calendarId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { calendarId, title, date } = req.body;
    const eventId = await Event.create({ calendarId, title, date });
    res.status(201).json({ message: "Event created", eventId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
