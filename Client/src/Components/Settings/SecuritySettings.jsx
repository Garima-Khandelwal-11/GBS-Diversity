import React from 'react';
import '../../Styles/Settings.css';

const SecuritySettings = () => {
  return (
    <div className="security-settings">
      <h3>Security Settings</h3>
      <div className="settings-item">
        <label>Update Password</label>
        <input type="password" placeholder="New Password" />
      </div>
      <div className="settings-item">
        <label>Two-Factor Authentication</label>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default SecuritySettings;
