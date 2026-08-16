import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import "../../Styles/Auth.css";
import { login, googleLogin } from "../../operations/services/authApi";
import {useDispatch} from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(email,password,navigate))
  };

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
            onSuccess={(credentialResponse) =>
              dispatch(googleLogin(credentialResponse.credential, navigate))
            }
            onError={() => toast.error("Google login failed")}
        />
    </div>
);
};

export default Login;