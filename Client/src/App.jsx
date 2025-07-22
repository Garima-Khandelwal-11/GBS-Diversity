import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { store } from './Redux/store';
import Home from './Pages/Home';
import Mentor from './Pages/Mentor';
import Mentee from './Pages/Mentee';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Notifications from './Pages/Notifications';
import Resource from './Pages/Resource';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import { ThemeProvider } from './Context/ThemeToggle.jsx';
import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="app">
      {!isAuthPage && <Header />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/mentee" element={<Mentee />} />
          <Route path="/resource" element={<Resource />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;