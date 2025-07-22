import React, { useState } from 'react';
import NotificationList from '../Components/Notifications/NotificationList';
import '../Styles/Notifications.css';

const Notifications = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const renderNotifications = () => {
    switch (selectedTab) {
      case 'all':
        return <NotificationList filter="all" />;
      case 'unread':
        return <NotificationList filter="unread" />;
      case 'mentor':
        return <NotificationList filter="mentor" />;
      case 'matching':
        return <NotificationList filter="matching" />;
      default:
        return <NotificationList filter="all" />;
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <div className="tabs">
          <button onClick={() => setSelectedTab('all')} className={selectedTab === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setSelectedTab('unread')} className={selectedTab === 'unread' ? 'active' : ''}>Unread</button>
          <button onClick={() => setSelectedTab('mentor')} className={selectedTab === 'mentor' ? 'active' : ''}>Mentor</button>
          <button onClick={() => setSelectedTab('matching')} className={selectedTab === 'matching' ? 'active' : ''}>Matching</button>
        </div>
      </div>
      {renderNotifications()}
    </div>
  );
};

export default Notifications;