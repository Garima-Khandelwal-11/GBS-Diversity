import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  user_id: {
    type: String,
    default: uuidv4, // Automatically generate a unique userId
    unique: true, // Ensure it remains unique
  },
  email:{
    type:String,
    unique: true,
    required:true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
    trim: true,
  },
  role: {
    type: Number,
    required: true,
  },
  refresh_token: {
    type: [String],
  },
  reset_expires: {
    type: Date,
  },
});


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
