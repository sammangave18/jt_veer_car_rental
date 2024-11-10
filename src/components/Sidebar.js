import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item">Home</Link>
      <Link to="/Services_master" className="sidebar-item">Services</Link>
      <Link to="/Trips_management" className="sidebar-item">Trips Management</Link>
      <Link to="/Employee_master" className="sidebar-item">Employee Master</Link>
      <Link to="/faq" className="sidebar-item">FAQ</Link>
    </div>
  );
};

export default Sidebar;