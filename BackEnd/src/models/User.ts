import { Schema, model } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
}

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
