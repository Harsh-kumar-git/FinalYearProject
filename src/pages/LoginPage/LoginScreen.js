import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginScreen.css';
// Using existing images as placeholders until actual images are added
import scgbs from '../../Data/Images/download.png'; // Placeholder for Scgbs.png
// import eyeOpenIcon from '../../Data/Images/eye-open.png';
// import eyeClosedIcon from '../../Data/Images/eye-closed.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  
  const credentials = {
    user: {
      email: 'user@sc.com',
      password: '123'
    },
    admin: {
      email: 'admin@sc.com',
      password: '123'
    },
    operations: {
      email: 'operations@sc.com',
      password: '123'
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Check each role
    if (email === credentials.user.email) {
      if (password === credentials.user.password) {
        login(email, 'user');
        navigate('/User/Dashboard');
      } else {
        alert('Invalid password for user.');
      }
    } else if (email === credentials.admin.email) {
      if (password === credentials.admin.password) {
        login(email, 'admin');
        navigate('/Admin/Dashboard');
      } else {
        alert('Invalid password for admin.');
      }
    } else if (email === credentials.operations.email) {
      if (password === credentials.operations.password) {
        login(email, 'operations');
        navigate('/OpsPage/OpsPage');
      } else {
        alert('Invalid password for operations.');
      }
    } else {
      alert('Login Failed: Invalid email or password.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-container">
      <div className="card login-card shadow-lg p-4 p-md-5">
        <div className="text-center mb-4">
          <img src={scgbs} alt="Standard Chartered Logo" className="logo-img" />
          <h2 className="company-title">User Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          {/* EMAIL FIELD */}
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD FIELD WITH SHOW TOGGLE */}
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* EYE ICON BUTTON */}
              <span
                className="password-toggle-icon-text"
                onClick={togglePasswordVisibility}
                title="Toggle Password Visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="d-flex justify-content-end mb-4">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg login-button">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
