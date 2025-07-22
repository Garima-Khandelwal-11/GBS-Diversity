import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    organization: {
        type: String, // University or company offering the course
        required: true,
    },
    skills: {
        type: [String], // Array of skills related to the course
    },
    career_goal: {
        type: String, // Career goal the course aligns with
    },
    interests: {
        type: [String], // Array of interests the course targets
    }
});


const Course = mongoose.model("Course", courseSchema);
export default Course;

