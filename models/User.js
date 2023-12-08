import { mongoose } from "mongoose";

export const User = mongoose.model("User", {
  id: String,
  created_at: Date,
  updated_at: Date,
  last_login: Date,
  token: Object,
  name: String,
  email: String,
  password: String,
  phone: Object,
});
