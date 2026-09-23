import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: "cafe" | "restaurant" | "ambiance" | "food" | "rooms" | "general";
  imageUrl: string;
  r2Key?: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  title: { type: String, default: "" },
  category: {
    type: String,
    enum: ["cafe", "restaurant", "ambiance", "food", "rooms", "general"],
    default: "restaurant"
  },
  imageUrl: { type: String, required: true },
  r2Key: { type: String },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model<IGalleryItem>("Gallery", GallerySchema);
