import React, { useState } from 'react';
import '../Styles/Mentee.css';

const Mentee = () => {
  const [receivedRequests, setReceivedRequests] = useState([
    { id: 1, name: 'John Doe', message: 'I would like to connect with you.', date: '2023-10-01', status: 'pending' },
    { id: 2, name: 'Jane Smith', message: 'Looking forward to mentoring you.', date: '2023-10-02', status: 'pending' },
    { id: 3, name: 'Michael Brown', message: 'Can we discuss your project?', date: '2023-10-03', status: 'pending' },
    { id: 4, name: 'Emily Davis', message: 'I have some questions about your work.', date: '2023-10-04', status: 'pending' },
  ]);

  const handleAccept = (id) => {
    setReceivedRequests(receivedRequests.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
  };

  const handleReject = (id) => {
    setReceivedRequests(receivedRequests.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
  };

  return (
    <div className="mentee-container">
      <h2>Received Requests</h2>
      <div className="request-list">
        {receivedRequests.map(request => (
          <div key={request.id} className="request-card">
            <div className="details">
              <span><strong>{request.name}</strong></span>
              <p>{request.message}</p>
              <span>Requested on: {request.date}</span>
            </div>
            <div className="actions">
              {request.status === 'pending' ? (
                <>
                  <button className="accept-btn" onClick={() => handleAccept(request.id)}>Accept</button>
                  <button className="reject-btn" onClick={() => handleReject(request.id)}>Reject</button>
                </>
              ) : (
                <span>{request.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentee;