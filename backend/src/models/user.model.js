import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: { type: String },
  street: { type: String },
  city: { type: String },
  zip: { type: String },
  country: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
