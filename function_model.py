import os
from flask import Flask, request, jsonify
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

@app.route("/match", methods=["POST"])
def match_mentees_and_mentors():
    data = request.get_json()  # Expect mentees and mentors in the request body
    mentees = data.get("mentees", [])
    mentors = data.get("mentors", [])
    
    # Ensure both mentees and mentors are provided
    if not mentees or not mentors:
        return jsonify({"error": "Mentees and mentors data must be provided"}), 400

    # Extract features
    career_goals_set = list(set([m["career_goal"] for m in mentees + mentors]))
    skills_set = list(set(sum([m["skills"] for m in mentees + mentors], [])))
    interests_set = list(set(sum([m["interests"] for m in mentees + mentors], [])))

    common_skills = [skill for skill in skills_set if sum([skill in m["skills"] for m in mentees + mentors]) > 2]
    common_interests = [interest for interest in interests_set if sum([interest in m["interests"] for m in mentees + mentors]) > 2]
    unique_features = career_goals_set + common_skills + common_interests

    def encode_profile(profile):
        vector = [
            5 if feature in [profile["career_goal"]] else  
            3 if feature in profile["skills"] else  
            2 if feature in profile["interests"] else  
            0 for feature in unique_features
        ]
        return np.array(vector)

    # Encode mentees and mentors
    mentee_vectors = [encode_profile(m) for m in mentees]
    mentor_vectors = [encode_profile(m) for m in mentors]

    # Compute similarity matrix
    similarity_matrix = cosine_similarity(np.vstack(mentee_vectors), np.vstack(mentor_vectors))

    # Find top 5 matches for each mentee
    matches = []
    for mentee_idx, mentee in enumerate(mentees):
        top_5_indices = np.argsort(similarity_matrix[mentee_idx])[::-1][:5]  # Get indices of top 5 mentors
        for mentor_idx in top_5_indices:  # Only loop once over the top 5 mentors
            match_score = similarity_matrix[mentee_idx][mentor_idx]
            mentor = mentors[mentor_idx]
            matches.append({
            "mentee_id": mentee["user_id"],
            "mentor_id": mentor["user_id"],
            "match_score": round(match_score, 2),
            "mentee_career_goal": mentee["career_goal"],
            "mentor_career_goal": mentor["career_goal"],
            "common_skills": list(set(mentee["skills"]) & set(mentor["skills"])),
            "common_interests": list(set(mentee["interests"]) & set(mentor["interests"]))
        })

    # Return matches to the client
    return jsonify({"matches": matches, "message": "Top 5 matches computed successfully!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
