import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem {
  name: string;
  type: string;
  price: any; // Can be a number or an object like { regular: 100, large: 150 }
}

export interface IMenuSection extends Document {
  category: string;
  subCategory?: string;
  items: IMenuItem[];
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'veg', 'non-veg', 'both', 'egg'
  price: { type: Schema.Types.Mixed, required: true } // Mixed type to support number or object
});

const MenuSectionSchema: Schema = new Schema({
  category: { type: String, required: true },
  subCategory: { type: String },
  items: [MenuItemSchema]
}, { timestamps: true });

export default mongoose.models.MenuSection || mongoose.model<IMenuSection>("MenuSection", MenuSectionSchema);
