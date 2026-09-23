import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  capacity: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

const RoomSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String, default: "" },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  capacity: { type: String, default: "2 Guests" },
  amenities: [{ type: String }],
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);
