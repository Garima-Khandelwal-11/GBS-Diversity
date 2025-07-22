import React from 'react';
import '../../Styles/Settings.css';

const NotificationSettings = () => {
  return (
    <div className="notification-settings">
      <h3>Notification Settings</h3>
      <div className="settings-item">
        <label>Email Notifications</label>
        <input type="checkbox" checked />
      </div>
      <div className="settings-item">
        <label>SMS Notifications</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default NotificationSettings;
