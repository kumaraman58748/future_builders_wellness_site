// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorAppointmentRoutes from "./routes/doctorAppointmentRoutes.js";
import patientAppointmentRoutes from "./routes/patientAppointmentRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import WellnessRoutes from "./routes/WellnessRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctor/appointments", doctorAppointmentRoutes);
app.use("/api/patient/appointments", patientAppointmentRoutes);
app.use("/api/doctor/availability", availabilityRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patient/wellness", WellnessRoutes);

// ======= SERVE FRONTEND =======

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend build
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all route for SPA (React)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

// ======= START SERVER =======

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
