import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Trips_management_DR from "./Trips_management_DR";
import FAQ from "./FAQ";
import "../App.css";
// import Home from "./Home";

import "../App.css";
export default function Driver_home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex">
        <Sidebar role="Driver" />
        
      

        <div className={`main-content p-3`}>
          <Routes>
            <Route path="/" element={<h1>Home Driver</h1>} />
            <Route path="/Trips_management_DR" element={<Trips_management_DR />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}
