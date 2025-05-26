import React, { useState, useRef, useEffect } from "react";
import "./UserDropdown.css"; // Add basic styles for dropdown
import { useNavigate } from "react-router-dom";

function UserDropdown({ name, email }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <span className="user-name" onClick={toggleDropdown}>
        <i className="fa fa-user"></i> {name} <i className="fa fa-caret-down"></i>
      </span>

      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item">{email}</div>
          <div className="dropdown-item logout" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
