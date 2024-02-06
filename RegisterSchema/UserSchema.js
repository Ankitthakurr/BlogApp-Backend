import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["Please fill the username", true],
    },
    email: {
      type: String,
      required: ["Please fill the email", true],
      unique: true,
    },
    password: {
      type: String,
      required: ["Please fill the password", true],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", User);
