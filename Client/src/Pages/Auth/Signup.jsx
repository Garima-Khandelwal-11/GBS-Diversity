import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../Styles/Auth.css';
import { signup } from '../../operations/services/authApi';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('mentee');
  const [skills, setSkills] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [interests, setInterests] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!username || !email || !password || !confirmPassword || !skills || !careerGoals || !interests || !description) {
      alert('Please fill in all fields!');
      return;
    }
    const signupData = { username, email, password, role, skills, careerGoals, interests, description };
    dispatch(signup(signupData, navigate)); // Remove this line if not implementing server-side
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>
        <input
          type="text"
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your career goals"
          value={careerGoals}
          onChange={(e) => setCareerGoals(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <textarea
          className="description"
          placeholder="Enter a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>or</p>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;