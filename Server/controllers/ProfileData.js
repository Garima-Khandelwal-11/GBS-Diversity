import Mentor from "../models/mentors.model.js";
import Mentee from "../models/mentees.model.js";
import User from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const ProfileDataWithID = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ message: "Provide user_id" });
    }
    const user = await User.findOne({ user_id });
    if (!user) {
        return res.status(400).json({ message: "User_id does not exist" });
    }
    if (user.role == 1) {
        const mentor = await Mentor.findOne({user_id}).lean();
        if (!mentor) {
            return res.status(400).json({ message: "Mentor does not exist" });
        }
        mentor.role="Mentor";
        return res
            .status(200)
            .json(new ApiResponse(200, mentor, "Mentor fetched successfully"));
    }
    else {
        const mentee = await Mentee.findOne({user_id}).lean();
        if (!mentee) {
            return res.status(400).json({ message: "Mentee does not exist" });
        }
        mentee.role="Mentee";
        return res
            .status(200)
            .json(new ApiResponse(200, mentee, "Mentee fetched successfully"));
    }
}

export const ProfileDataWithEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Provide email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }
    if (user.role == 1) {
        const mentor = await Mentor.findOne({email}).lean();
        if (!mentor) {
            return res.status(400).json({ message: "Mentor does not exist" });
        }
        mentor.role="Mentor";
        return res
            .status(200)
            .json(new ApiResponse(200, mentor, "Mentor fetched successfully"));
    }
    else {
        const mentee = await Mentee.findOne({email}).lean();
        if (!mentee) {
            return res.status(400).json({ message: "Mentee does not exist" });
        }
        mentee.role="Mentee";
        return res
            .status(200)
            .json(new ApiResponse(200, mentee, "Mentee fetched successfully"));
    }
}