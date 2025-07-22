import React from 'react';
import ProfilePreferences from '../Components/Settings/ProfilePreferences';
import SecuritySettings from '../Components/Settings/SecuritySettings';
import PrivacyControls from '../Components/Settings/PrivacyControls';
import AccountSettings from '../Components/Settings/AccountSettings';
import NotificationSettings from '../Components/Settings/NotificationSettings';
import PrivacySettings from '../Components/Settings/PrivacySettings';
import '../Styles/Settings.css';

const Settings = () => {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p>A place to personalize your experience and secure your account.</p>
      <div className="settings-section">
        <AccountSettings />
      </div>
      <div className="settings-section">
        <NotificationSettings />
      </div>
      <div className="settings-section">
        <PrivacySettings />
      </div>
    </div>
  );
};

export default Settings;