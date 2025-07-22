import React from 'react';
import '../../Styles/Settings.css';

const PrivacyControls = () => {
  return (
    <div className="privacy-controls">
      <h3>Privacy Controls</h3>
      <div className="settings-item">
        <label>Profile Visibility</label>
        <select>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className="settings-item">
        <label>Mentorship Activity Visibility</label>
        <select>
          <option value="everyone">Everyone</option>
          <option value="friends">Friends</option>
          <option value="noone">No one</option>
        </select>
      </div>
    </div>
  );
};

export default PrivacyControls;
