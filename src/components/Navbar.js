// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-item">Home</Link>
      <Link to="/Services_master" className="navbar-item">Service Master</Link>
    </div>
  );
};

export default Navbar;
