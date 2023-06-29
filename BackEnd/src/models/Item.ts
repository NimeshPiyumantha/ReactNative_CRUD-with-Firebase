import { Schema, model } from "mongoose";

export interface IItem extends Document {
  id: string;
  name: string;
  qty: number;
  price:number
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
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = model<IItem>("Item", ItemSchema);
