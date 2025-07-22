import Mentee from "../models/mentees.model.js";
import Mentor from "../models/mentors.model.js";
import Match from "../models/matches.model.js";


export const getMatchedMentors = async (req, res) => {
    try {
        const { user_id } = req.body;
        const mentee = await Mentee.findOne({ user_id });
        if (!mentee) {
            return res.status(400).json({ message: "User is not a mentee" });
        }
        const matches = await Match.find({ mentee_id: user_id });
        const mentorIds = matches.map(match => match.mentor_id);
        const mentors = await Mentor.find({ user_id: { $in: mentorIds } });

        // Return the matched mentors with mentor_id, name, and match_score
        const matchedMentors = mentors.map(mentor => {
            const match = matches.find(m => m.mentor_id === mentor.user_id);
            return {
                mentor_id: mentor.user_id,
                mentor_name: mentor.name,
                match_score: match.match_score,
            };
        });
        const sortedMatchedMentors = matchedMentors.sort((a, b) => b.match_score - a.match_score);
        return res.status(200).json(sortedMatchedMentors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }

}
export const getMatchedMentees = async (req, res) => {
    try {
        const { user_id } = req.body;
        const mentor = await Mentor.findOne({ user_id });
        if (!mentor) {
            return res.status(400).json({ message: "User is not a mentor" });
        }
        const matches = await Match.find({ mentor_id: user_id });
        const menteeIds = matches.map(match => match.mentee_id);
        const mentees = await Mentee.find({ user_id: { $in: menteeIds } });

        // Return the matched mentors with mentor_id, name, and match_score
        const matchedMentees = mentees.map(mentee => {
            const match = matches.find(m => m.mentee_id === mentee.user_id);
            return {
                mentee_id: mentee.user_id,
                mentee_name: mentee.name,
                match_score: match.match_score,
            };
        });
        const sortedMatchedMentees = matchedMentees.sort((a, b) => b.match_score - a.match_score);
        return res.status(200).json(sortedMatchedMentees);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}