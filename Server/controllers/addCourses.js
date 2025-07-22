import Course from "../models/courses.model.js";
import fs from "fs";

export const insertCourses = async (req, res) => {
    try {
        // Read and parse JSON data from the file
        const coursesData = JSON.parse(fs.readFileSync("./controllers/updated_coursera_courses.json", "utf8"));

        // Insert Courses into the database
        const result = await Course.insertMany(coursesData);

        // Return success response
        return res.status(200).json({
            message: `${result.length} courses inserted successfully!`,
            insertedCourses: result,
        });
    } catch (error) {
        // Return error response with details
        return res.status(400).json({ message: "Error inserting courses", error: error.message });
    }
};
