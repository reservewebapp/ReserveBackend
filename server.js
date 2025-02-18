import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/api/userRoutes.js";
import eventRoutes from "./routes/api/eventRoutes.js";
import calendarRoutes from "./routes/api/calendarRoutes.js";

dotenv.config(); // Load .env variables

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/calendars", calendarRoutes);

// Specifying the port and starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
