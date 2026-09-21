import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  bookingType: 'table' | 'room';
  fullName: string;
  email: string;
  phone: string;
  guests: string; // e.g., "2 Persons", "1 Guest"
  // Table specific
  date?: Date;
  time?: string;
  occasion?: string;
  // Room specific
  checkIn?: Date;
  checkOut?: Date;
  roomType?: string;
  // Status
  status: 'pending' | 'confirmed' | 'cancelled';
}

const BookingSchema: Schema = new Schema({
  bookingType: { type: String, enum: ['table', 'room'], required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: String, required: true },
  date: { type: Date },
  time: { type: String },
  occasion: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date },
  roomType: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
