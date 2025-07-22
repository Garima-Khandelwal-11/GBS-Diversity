import React from 'react';
import '../../Styles/Settings.css';

const AccountSettings = () => {
  return (
    <div className="account-settings">
      <h3>Account Settings</h3>
      <div className="settings-item">
        <label>Username</label>
        <input type="text" value="john_doe" readOnly />
      </div>
      <div className="settings-item">
        <label>Email</label>
        <input type="email" value="john.doe@example.com" readOnly />
      </div>
      <div className="settings-item">
        <label>Update Password</label>
        <input type="password" placeholder="New Password" />
      </div>
    </div>
  );
};

export default AccountSettings;
