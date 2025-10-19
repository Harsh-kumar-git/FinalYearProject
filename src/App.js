import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import './LayoutFix.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import AdminPathConfig from './pages/admin/AdminPathConfig';
import LoginScreen from './pages/LoginPage/LoginScreen';
import UserDashboard from './pages/user/Dashboard';
import SubscriptionStatus from './pages/user/Subscription_Status';
import UserSubscribe from './pages/user/User_Subscribe';
import OpsPage from './pages/operations/OpsPage';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <Sidebar />}
      
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        
        {/* User Routes */}
        <Route path="/User/Dashboard" element={<div className="main-content"><UserDashboard /></div>} />
        <Route path="/subscription_status" element={<div className="main-content"><SubscriptionStatus /></div>} />
        <Route path="/user_subscribe" element={<div className="main-content"><UserSubscribe /></div>} />
        
        {/* Admin Routes */}
        <Route path="/Admin/Dashboard" element={<div className="main-content"><Dashboard /></div>} />
        <Route path="/users" element={<div className="main-content"><Users /></div>} />
        <Route path="/path_configuration" element={<div className="main-content"><AdminPathConfig /></div>} />
        
        {/* Operations Routes */}
        <Route path="/OpsPage/OpsPage" element={<div className="main-content"><OpsPage /></div>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
