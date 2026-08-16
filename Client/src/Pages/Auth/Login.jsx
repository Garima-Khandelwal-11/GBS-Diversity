import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import "../../Styles/Auth.css";
import { login, googleLogin } from "../../operations/services/authApi";
import { verifyTwoFactorLogin } from "../../operations/services/twoFactorApi";
import {useDispatch} from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingUserId, setPendingUserId] = useState(null);
  const [twoFACode, setTwoFACode] = useState("");
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(email,password,navigate));
    if (result?.requires2FA) {
      setPendingUserId(result.user_id);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await dispatch(googleLogin(credentialResponse.credential, navigate));
    if (result?.requires2FA) {
      setPendingUserId(result.user_id);
    }
  };

  const handleTwoFASubmit = (e) => {
    e.preventDefault();
    dispatch(verifyTwoFactorLogin(pendingUserId, twoFACode, email, navigate));
  };

  if (pendingUserId) {
    return (
      <div className="auth-container">
        <h2>Enter your 2FA code</h2>
        <form onSubmit={handleTwoFASubmit}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="6-digit code"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    );
  }

  return (
    <div className="auth-container">

        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
        <div className="google-login-divider">or</div>
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed")}
        />
    </div>
);
};

export default Login;