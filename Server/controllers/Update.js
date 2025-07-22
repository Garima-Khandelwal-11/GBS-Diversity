import Mentor from "../models/mentors.model.js";
import Mentee from "../models/mentees.model.js";
import User from "../models/users.model.js";
import { matchOneMenteeLogic, matchOneMentorLogic } from "./MatchForOne.js";


const Update = async (req, res) => {

    const {
        email,
        description,
        name,
        skills,
        career_goal,
        interests,
    } = req.body;

    if ( !email ) {
        return res.status(400).json({ message: "Email not provided" });
    }
    try {
        const currUser = await User.findOne({email});
        if (!currUser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        let updated;
        if (currUser.role === 1) {
            const existingMentor = await Mentor.findOne({ user_id: currUser.user_id });

            if (!existingMentor) {
                return res.status(404).json({ message: "Mentor does not exist" });
            }

            // Update existing mentor
            updated=await Mentor.findOneAndUpdate(
                { user_id: currUser.user_id }, // Filter by user_id
                {
                    description,
                    mentor_name: name,
                    skills,
                    career_goal,
                    interests,
                },
                { new: true } // Return updated document
            );

            await matchOneMentorLogic(currUser.user_id);
        } 
        else {
            const existingMentee = await Mentee.findOne({ user_id: currUser.user_id });

            if (!existingMentee) {
                return res.status(404).json({ message: "Mentee does not exist" });
            }

            // Update existing mentee
            updated=await Mentee.findOneAndUpdate(
                { user_id: currUser.user_id }, // Filter by user_id
                {
                    description,
                    mentee_name: name,
                    skills,
                    career_goal,
                    interests,
                },
                { new: true } // Return updated document
            );

            await matchOneMenteeLogic(currUser.user_id);
        }
        res.status(200).json({
            message: "User Updated successfully",
            user: {
                user_id: updated.user_id,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
};

export default Update;