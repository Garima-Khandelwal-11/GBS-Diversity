import React from 'react';
import '../../Styles/Settings.css';

const PrivacySettings = () => {
  return (
    <div className="privacy-settings">
      <h3>Privacy Settings</h3>
      <div className="settings-item">
        <label>Profile Visibility</label>
        <select>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className="settings-item">
        <label>Search Visibility</label>
        <select>
          <option value="everyone">Everyone</option>
          <option value="friends">Friends</option>
          <option value="noone">No one</option>
        </select>
      </div>
    </div>
  );
};

export default PrivacySettings;
