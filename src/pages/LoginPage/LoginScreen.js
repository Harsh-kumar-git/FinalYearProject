import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginScreen.css';
import scgbs from '../../Data/Images/download.png';

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

    if (email === credentials.user.email && password === credentials.user.password) {
      login(email, 'user');
      navigate('/User/Dashboard');
    } else if (email === credentials.admin.email && password === credentials.admin.password) {
      login(email, 'admin');
      navigate('/Admin/Dashboard');
    } else if (email === credentials.operations.email && password === credentials.operations.password) {
      login(email, 'operations');
      navigate('/OpsPage/OpsPage');
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
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <div className="email-input-wrapper">
              <input
                type="email"
                className="form-control email-input"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="email-spacer"></div>
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <div className="password-field-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn-outside"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-end mb-4">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

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
