import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import healthRoutes from "./routes/health.routes";
import menuRoutes from "./routes/menu.routes";
import bookingRoutes from "./routes/booking.routes";
import { waService } from "./services/whatsapp.service";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoUri = process.env.MONOG_URI || process.env.MONGODB_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
} else {
  console.warn("MongoDB URI not provided in environment variables");
}

// Initialize WhatsApp Service
// This might log a QR code to the console for the first time
waService.initialize();

// Routes
app.use("/api", healthRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
