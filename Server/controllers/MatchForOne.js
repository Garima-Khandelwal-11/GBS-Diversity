import Mentee from "../models/mentees.model.js";
import Mentor from "../models/mentors.model.js";
import User from "../models/users.model.js";
import Match from "../models/matches.model.js";
import axios from "axios";

export const MatchOneMentee = async(req,res)=>{
    const {user_id}=req.body;
    if(!user_id)
    {
        return res.status(400).json({ message: "User_id not provided" });
    }
    try {
            const existingUser = await User.findOne({ user_id });
            if (!existingUser) {
                return res.status(404).json({ message: "User does not exist" });
            }
            console.log(user_id);
            const mentee= await Mentee.findOne({user_id});
            if (!mentee) {
                return res.status(404).json({ message: "Mentee does not exist" });
            }
            const mentors = await Mentor.find();
            if (!mentors || mentors.length === 0) {
                return res.status(404).json({ message:"No mentors found in the database."});
            }
            console.log(mentors);
            await Match.deleteMany({ mentee_id: user_id });
            const response = await axios.post("http://localhost:5000/match", {
                    mentees: [mentee], // Only one mentee for matching
                    mentors: mentors
            });
            const matches = response.data.matches;
            console.log(matches);
            const formattedMatches = [];
            matches.forEach(match => {
                    formattedMatches.push({
                        mentee_id: match.mentee_id,
                        mentor_id: match.mentor_id,
                        match_score: match.match_score,
                        mentee_career_goal: match.mentee_career_goal,
                        mentor_career_goal: match.mentor_career_goal,
                        common_skills: match.common_skills,
                        common_interests: match.common_interests,
                    });
            });
    
            // Insert matches into the Match collection
            await Match.insertMany(formattedMatches);
            res.status(200).json({ message: "Matches saved to the Match collection." });
        }
        catch (error) {
            res.status(404).json({"message":error});        
        }
}


export const MatchOneMentor = async(req,res)=>{
    const {user_id}=req.body;
    if(!user_id)
    {
        return res.status(400).json({ message: "User_id not provided" });
    }
    try {
            const existingUser = await User.findOne({ user_id });
            if (!existingUser) {
                return res.status(404).json({ message: "User does not exist" });
            }
            console.log(user_id);
            const mentor= await Mentor.findOne({user_id});
            if (!mentor) {
                return res.status(404).json({ message: "Mentee does not exist" });
            }
            const mentees = await Mentee.find();
            if (!mentees || mentees.length === 0) {
                return res.status(404).json({ message:"No mentees found in the database."});
            }
            console.log(mentees);
            await Match.deleteMany({ mentor_id: user_id });
            const response = await axios.post("http://localhost:5000/match", {
                    mentees: mentees, 
                    mentors: [mentor]
            });
            const matches = response.data.matches;
            console.log(matches);
            const formattedMatches = [];
            matches.forEach(match => {
                    formattedMatches.push({
                        mentee_id: match.mentee_id,
                        mentor_id: match.mentor_id,
                        match_score: match.match_score,
                        mentee_career_goal: match.mentee_career_goal,
                        mentor_career_goal: match.mentor_career_goal,
                        common_skills: match.common_skills,
                        common_interests: match.common_interests,
                    });
            });
    
            // Insert matches into the Match collection
            await Match.insertMany(formattedMatches);
            res.status(200).json({ message: "Matches saved to the Match collection." });
        }
        catch (error) {
            res.status(404).json({"message":error});        
        }
}

export const matchOneMenteeLogic = async (user_id) => {
    if (!user_id) {
        throw new Error("User ID not provided");
    }

    try {
        const existingUser = await User.findOne({ user_id });
        if (!existingUser) {
            throw new Error("User does not exist");
        }

        const mentee = await Mentee.findOne({ user_id });
        if (!mentee) {
            throw new Error("Mentee does not exist");
        }

        const mentors = await Mentor.find();
        if (!mentors || mentors.length === 0) {
           return;
        }

        // Remove old matches for this mentee
        await Match.deleteMany({ mentee_id: user_id });

        const response = await axios.post("http://localhost:5000/match", {
            mentees: [mentee],
            mentors: mentors,
        });

        const matches = response.data.matches;

        const formattedMatches = matches.map((match) => ({
            mentee_id: match.mentee_id,
            mentor_id: match.mentor_id,
            match_score: match.match_score,
            mentee_career_goal: match.mentee_career_goal,
            mentor_career_goal: match.mentor_career_goal,
            common_skills: match.common_skills,
            common_interests: match.common_interests,
        }));

        // Insert new matches into the Match collection
        await Match.insertMany(formattedMatches);

        return { message: "Matches saved to the Match collection." };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const matchOneMentorLogic = async (user_id) => {
    if (!user_id) {
        throw new Error("User ID not provided");
    }

    try {
        const existingUser = await User.findOne({ user_id });
        if (!existingUser) {
            throw new Error("User does not exist");
        }

        const mentor = await Mentor.findOne({ user_id });
        if (!mentor) {
            throw new Error("Mentor does not exist");
        }

        const mentees = await Mentee.find();
        if (!mentees || mentees.length === 0) {
            return;
        }

        // Remove old matches for this mentor
        await Match.deleteMany({ mentor_id: user_id });

        const response = await axios.post("http://localhost:5000/match", {
            mentors: [mentor],
            mentees: mentees,
        });

        const matches = response.data.matches;

        const formattedMatches = matches.map((match) => ({
            mentee_id: match.mentee_id,
            mentor_id: match.mentor_id,
            match_score: match.match_score,
            mentee_career_goal: match.mentee_career_goal,
            mentor_career_goal: match.mentor_career_goal,
            common_skills: match.common_skills,
            common_interests: match.common_interests,
        }));

        // Insert new matches into the Match collection
        await Match.insertMany(formattedMatches);

        return { message: "Matches saved to the Match collection." };
    } catch (error) {
        throw new Error(error.message);
    }
};
