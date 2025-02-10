// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar-container">
//       <div className="sidebar bg-dark text-white">
//         <nav className="nav flex-column">
//           <Link to="/" className="nav-link text-white">Home</Link>
//           <Link to="/Services_master" className="nav-link text-white">Services</Link>
//           <Link to="/Trips_management" className="nav-link text-white">Trips Management</Link>
//           <Link to="/Employee_master" className="nav-link text-white">Employee Master</Link>
//           <Link to="/FAQ" className="nav-link text-white">FAQ</Link>
//         </nav>
//       </div>
//       <div className="content">
//         {/* Your main content here */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar-container">
//       <div className="sidebar bg-dark text-white">
//         <nav className="nav flex-column">
//           <Link to="/" className="nav-link text-white">Home</Link>
//           <Link to="/Services_master" className="nav-link text-white">Services</Link>
//           <Link to="/Trips_management" className="nav-link text-white">Trips Management</Link>
//           <Link to="/Employee_master" className="nav-link text-white">Employee Master</Link>
//           <Link to="/FAQ" className="nav-link text-white">FAQ</Link>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar bg-dark text-white">
        <nav className="nav flex-column">
          {role === "Admin" && (
            <>
              {/* <NavLink to="/admin" className="nav-link text-white">
                Home
              </NavLink> */}
              <NavLink
                to="/admin/Services_master"
                className="nav-link text-white"
              >
                Services
              </NavLink>
              <NavLink
                to="/admin/Employee_master"
                className="nav-link text-white"
              >
                Employee Master
              </NavLink>
            </>
          )}
          {/* Common links for both Admin and Driver */}
          <NavLink
            to={`/${role.toLowerCase()}/Trips_management`}
            className="nav-link text-white"
          >
            Trips Management
          </NavLink>
          <NavLink
            to={`/${role.toLowerCase()}/FAQ`}
            className="nav-link text-white"
          >
            FAQ
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
