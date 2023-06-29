import { Schema, model } from "mongoose";

export interface IItem extends Document {
  id: string;
  name: string;
  qty: string;
  price: string;
}

const ItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = model<IItem>("Item", ItemSchema);
