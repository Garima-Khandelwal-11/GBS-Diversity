import React from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Home/MatchStatus.css'

const MatchStatus = () => {
  return (
    <div className="match-status full-width">
      <h2>Recent Matches</h2>
      <div className="cards-container">
        <div className="card">
          <div className="profile-info">
            <img src="/user.png" alt="Profile" className="profile-picture" />
            <div className="profile-details">
              <h3>John Doe</h3>
              <p>Mentor</p>
            </div>
          </div>
          <div className="match-score">
            <h4>85% Match</h4>
          </div>
          <div className="common-skills">
            <h4>Common Skills & Interests</h4>
            <p>JavaScript, React, Node.js, Hiking, Reading</p>
          </div>
        </div>
        <div className="card">
          <div className="profile-info">
            <img src="/user.png" alt="Profile" className="profile-picture" />
            <div className="profile-details">
              <h3>Jane Smith</h3>
              <p>Mentor</p>
            </div>
          </div>
          <div className="match-score">
            <h4>90% Match</h4>
          </div>
          <div className="common-skills">
            <h4>Common Skills & Interests</h4>
            <p>Python, Django, Data Science, Traveling</p>
          </div>
        </div>
        <div className="card">
          <div className="profile-info">
            <img src="/user.png" alt="Profile" className="profile-picture" />
            <div className="profile-details">
              <h3>Michael Brown</h3>
              <p>Mentor</p>
            </div>
          </div>
          <div className="match-score">
            <h4>80% Match</h4>
          </div>
          <div className="common-skills">
            <h4>Common Skills & Interests</h4>
            <p>Java, Spring, Microservices, Gaming, Music</p>
          </div>
        </div>
      </div>
      <Link to="/mentor" className="more-text">More</Link>
    </div>
  )
}

export default MatchStatus