import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Trips_management from "./Trips_management";
import FAQ from "./FAQ";
import "../App.css";
// import Home from "./Home";

import "../App.css";
export default function Driver_home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex">
        <Sidebar role="Driver" />
        <div className="main-content p-3">
          <Routes>
            <Route path="/" element={<h1>Home Driver</h1>} />
            <Route path="/Trips_management" element={<Trips_management />} />
            <Route path="/FAQ" element={<FAQ />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}
