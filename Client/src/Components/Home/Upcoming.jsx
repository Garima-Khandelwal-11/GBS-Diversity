import React, { useState } from 'react';
import '../../Styles/Home/Upcoming.css';

const Upcoming = () => {
  const [sessions, setSessions] = useState([
    { id: 1, date: '25th Dec 2023', time: '10:00 AM' },
    { id: 2, date: '30th Dec 2023', time: '2:00 PM' },
    { id: 3, date: '5th Jan 2024', time: '11:00 AM' }
  ]);

  const handleCancel = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  const handleReschedule = (id) => {
    const newDate = prompt('Enter new date (e.g., 15th Jan 2024):');
    const newTime = prompt('Enter new time (e.g., 3:00 PM):');
    setSessions(sessions.map(session => session.id === id ? { ...session, date: newDate, time: newTime } : session));
  };

  return (
    <div className="upcoming-sessions" style={{  }}>
      <h2>Upcoming Sessions</h2>
      <div className="sessions-container">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="session-details">
              <h3>Mentorship Meeting</h3>
              <p>Date: {session.date}</p>
              <p>Time: {session.time}</p>
            </div>
            <div className="session-actions">
              <button className="btn" onClick={() => handleReschedule(session.id)}>Reschedule</button>
              <button className="btn" onClick={() => handleCancel(session.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;