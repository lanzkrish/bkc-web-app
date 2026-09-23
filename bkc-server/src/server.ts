import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import healthRoutes from "./routes/health.routes";
import menuRoutes from "./routes/menu.routes";
import bookingRoutes from "./routes/booking.routes";
import roomRoutes from "./routes/room.routes";
import adminRoutes from "./routes/admin.routes";
import galleryRoutes from "./routes/gallery.routes";
import { waService } from "./services/whatsapp.service";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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
app.use("/api/rooms", roomRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  try {
    await waService.destroy();
    await mongoose.disconnect();
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
