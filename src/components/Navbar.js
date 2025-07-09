import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* logo is not working */}
        {/* <img src="../img/vcr_logo.png" alt="Logo" className="navbar-logo" /> */}
        <Link to="/" className="navbar-brand">
          VEER CAR RENTAL
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
