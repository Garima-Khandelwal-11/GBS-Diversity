import React, { useState } from 'react';
import Sidebar from '../Components/Mentor/Sidebar';
import AllMentor from '../Components/Mentor/AllMentor';
import Matching from '../Components/Mentor/Matching';
import Learning from '../Components/Mentor/Learning';
import '../Styles/Mentor.css';

const Mentor = () => {
  const [selectedComponent, setSelectedComponent] = useState('all');
  const [sentRequests, setSentRequests] = useState([
    { id: 1, name: 'Alice Johnson', message: 'Can you be my mentor?', date: '2023-10-03', status: 'pending' },
    { id: 2, name: 'Bob Brown', message: 'I need guidance on my project.', date: '2023-10-04', status: 'pending' },
  ]);

  const handleWithdraw = (id) => {
    setSentRequests(sentRequests.filter(req => req.id !== id));
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'all':
        return <AllMentor />;
      case 'matching':
        return <Matching />;
      case 'learning':
        return <Learning />;
      case 'sent':
        return (
          <div className="sent-requests">
            <h2>Sent Requests</h2>
            <div className="request-list">
              {sentRequests.map(request => (
                <div key={request.id} className="request-card">
                  <div className="details">
                    <span><strong>{request.name}</strong></span>
                    <p>{request.message}</p>
                    <span>Requested on: {request.date}</span>
                  </div>
                  <div className="actions">
                    <span>{request.status}</span>
                    {request.status === 'pending' && (
                      <button className="reject-btn" onClick={() => handleWithdraw(request.id)}>Withdraw</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <AllMentor />;
    }
  };

  return (
    <div className="mentor-container">
      <div className="mentor-page">
        <Sidebar setSelectedComponent={setSelectedComponent} />
        <div className="mentor-content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Mentor;