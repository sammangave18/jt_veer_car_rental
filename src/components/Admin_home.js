// // src/components/AdminHome.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ServicesMaster from "./Services_master";
import EmployeeMaster from "./Employee_master";
import TripsManagement from "./Trips_management";
import FAQ from "./FAQ";
import "../App.css";
// import Home from "./Home";

export default function Admin_home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex">
        <Sidebar role="Admin" />
        <div className="main-content p-3">
          <Routes>
            <Route path="/" element={<h1>Home admin</h1>} />
            <Route path="/Services_master" element={<ServicesMaster />} />
            <Route path="/Employee_master" element={<EmployeeMaster />} />
            <Route path="/Trips_management" element={<TripsManagement />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import ServicesMaster from "./Services_master";
// import EmployeeMaster from "./Employee_master";
// import TripsManagement from "./Trips_management";
// import FAQ from "./FAQ";
// import "../App.css";

// const Admin_home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Navbar />
//       <div className="d-flex">
//         <Sidebar role="Admin" isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//         {/* Main Content - Shift when sidebar opens */}
//         <div className={`main-content p-3 ${isSidebarOpen ? "shifted" : ""}`}>
//           <Routes>
//             <Route path="/" element={<h1>Home admin</h1>} />
//             <Route path="/Services_master" element={<ServicesMaster />} />
//             <Route path="/Employee_master" element={<EmployeeMaster />} />
//             <Route path="/Trips_management" element={<TripsManagement />} />
//             <Route path="/FAQ" element={<FAQ />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Admin_home;

