import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* <img src="../img/VCR.png" alt="Logo" className="navbar-logo" /> */}
      {/* logo is not working */}
      <img src="../img/VTT_old.png" alt="" />
      <Link className="LogoName">VEER CAR RENTAL</Link> 
    </div>
  );
};

export default Navbar;
