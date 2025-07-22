
import { Link } from 'react-router-dom'
import { FaUserCircle, FaCog, FaBell } from 'react-icons/fa'
import '../../Styles/Header.css'
import { logout } from '../../operations/services/authApi';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);
  const [user_role, setUserRole] = useState(null);

  // On component mount, check for the user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (storedUser) {
      setUser(storedUser);
      setUserRole(storedUser.data.role);
    }
  }, []);
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.jpeg" alt="MentHer Logo" className="header-logo" />
        <Link to="/" className="text-gray-800 font-bold text-xl hover:text-orange-500 transition duration-300">
          <break></break>
          <span id="Name" className="text-gradient">MentHer</span>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        {user!==null && user_role !== 'Mentor' &&
        <Link to="/mentor" className="nav-link">Mentor</Link>
        }
        {user!== null && user_role!== 'Mentee' && 
        <Link to="/mentee" className="nav-link">Mentee</Link>}
        {/* <Link to="/resource" className="nav-link">Resource</Link> */}
        <Link to="/about" className="nav-link">About</Link>
        { user!==null && 
        <Link to="/profile" className="nav-link">Profile</Link>
        }
      </nav>
      <div className="header-right">
        {user !== null && 
        <div>
        <Link to="/notifications" className="nav-link"><FaBell /></Link>
        <Link to="/settings" className="nav-link"><FaCog /></Link>
        </div>
        }
        {user ==null && <div>
        <Link to="/login" className="nav-link login-btn">Login</Link>
        <Link to="/signup" className="nav-link signup-btn">Signup</Link>
        </div>}
        {user!== null &&
        <button onClick={logout}>Logout</button>
        }
      </div>
    </header>
  );
};

export default Header;