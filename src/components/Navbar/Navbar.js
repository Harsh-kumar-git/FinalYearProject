import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import images from "../../Data/Images/images.png";
import download from "../../Data/Images/download.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logout();
    setOpen(false);
    navigate("/login");
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={download} alt="Standard Chartered GBS" className="img" />
          <a href="/" className="brand-link">
            {/* Brand name can go here */}
          </a>
        </div>

        <nav className="navbar-nav">
          <ul className="nav-items">
            {/* Navigation items can be added here */}
          </ul>
        </nav>

        <div className="navbar-actions">
          <div 
            className="admin-profile" 
            onClick={toggleDropdown}
            ref={profileRef}
          >
            <img src={images} alt="User" className="admin-avatar" />
            <span className="admin-name">{user || "User"}</span>
            <i className={`arrow ${open ? "up" : "down"}`}></i>
          </div>
          {open && (
            <div className="dropdown-menu" ref={dropdownRef}>
              <button 
                onClick={handleLogout} 
                className="dropdown-item logout"
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
