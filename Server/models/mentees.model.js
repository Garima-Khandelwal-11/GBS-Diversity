import mongoose, { Schema } from "mongoose";

const menteeSchema = new Schema(
  {
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
    },
    email: {
      type: String,
      unique:true,
      required: true,
    },
    mentee_name: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
      required:true,
    },
    skills:{
        type: [String],
    },
    interests:{
        type: [String],
    },
    career_goal:{
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Mentee= mongoose.model("Mentee", menteeSchema);
export default Mentee;
