import React from 'react';
import '../../Styles/Settings.css';

const ProfilePreferences = () => {
  return (
    <div className="profile-preferences">
      <h3>Profile Preferences</h3>
      <div className="settings-item">
        <label>Notifications</label>
        <input type="checkbox" checked />
      </div>
      <div className="settings-item">
        <label>Display Settings</label>
        <select>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>
    </div>
  );
};

export default ProfilePreferences;
