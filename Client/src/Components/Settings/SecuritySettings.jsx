import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import '../../Styles/Settings.css';
import {
  getTwoFactorStatus,
  setupTwoFactor,
  confirmTwoFactorSetup,
  disableTwoFactor,
} from '../../operations/services/twoFactorApi';

function getStoredUserId() {
  try {
    const stored = JSON.parse(localStorage.getItem('user'));
    return stored?.data?.data?.user_id || null;
  } catch {
    return null;
  }
}

const SecuritySettings = () => {
  const userId = getStoredUserId();
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [setupInfo, setSetupInfo] = useState(null);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    getTwoFactorStatus(userId)
      .then(setEnabled)
      .catch(() => toast.error('Could not load 2FA status'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleStartSetup = async () => {
    setBusy(true);
    try {
      const info = await setupTwoFactor(userId);
      setSetupInfo(info);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not start 2FA setup');
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmSetup = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await confirmTwoFactorSetup(userId, code);
      toast.success('2FA enabled successfully');
      setEnabled(true);
      setSetupInfo(null);
      setCode('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid 2FA code');
    } finally {
      setBusy(false);
    }
  };

  const handleDisable = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await disableTwoFactor(userId, code);
      toast.success('2FA disabled');
      setEnabled(false);
      setCode('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid 2FA code');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="security-settings">
      <h3>Security Settings</h3>
      <div className="settings-item">
        <label>Update Password</label>
        <input type="password" placeholder="New Password" />
      </div>

      <div className="settings-item">
        <label>Two-Factor Authentication</label>
        {!userId && <p>Log in to manage two-factor authentication.</p>}
        {userId && loading && <p>Loading...</p>}

        {userId && !loading && !enabled && !setupInfo && (
          <button type="button" onClick={handleStartSetup} disabled={busy}>
            Enable 2FA
          </button>
        )}

        {setupInfo && (
          <form onSubmit={handleConfirmSetup} className="twofa-setup">
            <p>Scan this QR code with Google Authenticator (or similar), then enter the 6-digit code:</p>
            <img src={setupInfo.qrCode} alt="2FA QR code" width="160" height="160" />
            <p className="twofa-secret">Manual entry key: {setupInfo.secret}</p>
            <input
              type="text"
              inputMode="numeric"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit" disabled={busy}>Confirm</button>
          </form>
        )}

        {userId && !loading && enabled && (
          <form onSubmit={handleDisable} className="twofa-disable">
            <p>2FA is enabled on your account.</p>
            <input
              type="text"
              inputMode="numeric"
              placeholder="6-digit code to disable"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit" disabled={busy}>Disable 2FA</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
