import Mentor from "../models/mentors.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllMentors = async (req, res) => {
    const mentors = await Mentor.find();
    if (!mentors || mentors.length === 0) 
        return res.status(400).json({ message: "No Mentors have been added yet"});
    return res.status(200).json(new ApiResponse(true, mentors, 'Mentors fetched successfully'));
};