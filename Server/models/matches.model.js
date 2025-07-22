import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema(
  {
    mentee_id: {
      type: String,
      required: true,
    },
    mentor_id: {
      type: String,
      required: true,
    },
    match_score: {
      type: Number,
      required: true,
    },
    mentee_career_goal: {
      type: String,
    },
    mentor_career_goal: {
      type: String,
    },
    common_skills: {
      type: [String],
      default: [],
    },
    common_interests: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Match = mongoose.model("Match", matchSchema);
export default Match;
