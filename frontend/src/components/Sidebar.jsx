import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 

const Sidebar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="sidebar">
            <Link to="/"><i className="fa fa-home"></i> Home</Link>
            <Link to="/dashboard"><i className="fa fa-dashboard"></i> Dashboard</Link>

            {/* Groups Dropdown */}
            <button className="dropdown-btn" onClick={toggleDropdown}>
                <i className="fa fa-th-list"></i> Master
                <i className={`fa fa-angle-left ${isDropdownOpen ? 'rotate' : ''}`}></i>
            </button>
            {isDropdownOpen && (
                <div className="dropdown-container">
                    <Link to="/groups"><i className="fa fa-th-list"></i> Groups</Link>
                </div>
            )}

            <Link to="/leaderboard"><i className="fa fa-th-list"></i> Leaderboard</Link>
            <Link to="/reports"><i className="fa fa-th-list"></i> Reports</Link>
            <Link to="/profile"><i className="fa fa-user"></i> Profile</Link>
        </div>
    );
};

export default Sidebar;
