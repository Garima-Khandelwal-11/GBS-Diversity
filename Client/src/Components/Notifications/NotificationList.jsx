import React from 'react';
import '../../Styles/Notifications.css';

const NotificationList = ({ filter }) => {
  // Sample data for notifications
  const notifications = [
    {
      id: 1,
      message: 'Your mentorship request has been accepted by John Doe.',
      time: '2 hours ago',
      type: 'mentor',
      read: false
    },
    {
      id: 2,
      message: 'New learning resource available: Introduction to AI.',
      time: '1 day ago',
      type: 'learning',
      read: true
    },
    {
      id: 3,
      message: 'Your profile has been viewed by 5 mentors.',
      time: '3 days ago',
      type: 'mentor',
      read: false
    },
    {
      id: 4,
      message: 'New matching suggestion available.',
      time: '5 days ago',
      type: 'matching',
      read: true
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  return (
    <div className="notification-list">
      <ul>
        {filteredNotifications.map(notification => (
          <li key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
            <p>{notification.message}</p>
            <span>{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
