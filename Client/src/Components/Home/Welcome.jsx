import React from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Home/Welcome.css'

const Welcome = () => {
  return (
    <div className="welcome-section">
      <div className="welcome-content">
        <h1 className="welcome-title" style={{ color: 'white' }}>Welcome to MentHer</h1>
        <p className="welcome-text" style={{ color: 'white' }}>Your career mentorship platform</p>
        <p className="welcome-text" style={{ color: 'white' }}>Your dashboard provides a quick snapshot of your mentorship journey.</p>
        <p className="welcome-text" style={{ color: 'white' }}>Connect with experienced mentors, access valuable resources, and track your progress.</p>
        <Link to="/mentor" className="mentor-dashboard-btn" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', backgroundColor: '#007bff', borderRadius: '5px', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}>Go to Mentor Dashboard</Link>
      </div>
    </div>
  )
}

export default Welcome