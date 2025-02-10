// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import './App.css';
// // import Home from './components/Home';
// // import Services_master from './components/Services_master';
// // import Employee_master from './components/Employee_master';
// // import Trips_management from './components/Trips_management';
// // import FAQ from './components/FAQ';
// // import Navbar from './components/Navbar';
// // import Sidebar from './components/Sidebar';
// // import Footer from './components/Footer';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="d-flex flex-column min-vh-100">
// //         <Navbar />
// //         <div className="d-flex flex-grow-1">
// //           <Sidebar />
// //           <div className="flex-grow-1 p-3">
// //             <Routes>
// //             <Route path="/" element={<Home />} />
// //               <Route path="/Services_master" element={<Services_master />} />
// //               <Route path="/Employee_master" element={<Employee_master />} />
// //               <Route path="/Trips_management" element={<Trips_management />} />
// //               <Route path="/FAQ" element={<FAQ />} />
// //             </Routes>
// //           </div>
// //         </div>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Home from './components/Home';
// import Services_master from './components/Services_master';
// import Employee_master from './components/Employee_master';
// import Trips_management from './components/Trips_management';
// import FAQ from './components/FAQ';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <Router>
//       <div className="d-flex flex-column min-vh-100">
//         <Navbar />
//         <div className="d-flex">
//           <Sidebar />
//           <div className="main-content p-3">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/Services_master" element={<Services_master />} />
//               <Route path="/Employee_master" element={<Employee_master />} />
//               <Route path="/Trips_management" element={<Trips_management />} />
//               <Route path="/FAQ" element={<FAQ />} />
//             </Routes>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { useState } from "react";
// import "./App.css";
// import Home from "./components/Home";
// import AdminPage from "./components/Admin_home";
// import DriverPage from "./components/Driver_home";
// import Login from "./components/Login";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState("");

//   const loginHandler = (userRole) => {
//     setIsAuthenticated(true);
//     setRole(userRole);
//   };

//   const logoutHandler = () => {
//     setIsAuthenticated(false);
//     setRole("");
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               <Navigate to={`/${role.toLowerCase()}`} replace />
//             ) : (
//               <Login onLogin={loginHandler} />
//             )
//           }
//         />

//         {/* Protected Admin Route */}
//         <Route
//           path="/admin"
//           element={
//             isAuthenticated && role === "Admin" ? (
//               <AdminPage />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Protected Driver Route */}
//         <Route
//           path="/driver"
//           element={
//             isAuthenticated && role === "Driver" ? (
//               <DriverPage />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Redirect to login by default */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import AdminHome from "./components/Admin_home";
// import DriverHome from "./components/Driver_home";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState("");

//   const loginHandler = (userRole) => {
//     setIsAuthenticated(true);
//     setRole(userRole);
//   };

//   const logoutHandler = () => {
//     setIsAuthenticated(false);
//     setRole("");
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               <Navigate to={`/${role.toLowerCase()}`} replace />
//             ) : (
//               <Login onLogin={loginHandler} />
//             )
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             isAuthenticated && role === "Admin" ? (
//               <AdminHome />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Driver Routes */}
//         <Route
//           path="/driver/*"
//           element={
//             isAuthenticated && role === "Driver" ? (
//               <DriverHome />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Redirect to Login */}
//         {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Admin_home from "./components/Admin_home";
import Driver_home from "./components/Driver_home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const loginHandler = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
    setRole("");
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={`/${role.toLowerCase()}`} replace />
          ) : (
            <Login onLogin={loginHandler} />
          )
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated && role === "Admin" ? (
            <Admin_home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Driver Routes */}
      <Route
        path="/driver/*"
        element={
          isAuthenticated && role === "Driver" ? (
            <Driver_home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Redirect all others to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;



// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Admin_home from "./components/Admin_home";
// import Driver_home from "./components/Driver_home";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     () => localStorage.getItem("isAuthenticated") === "true"
//   );
//   const [role, setRole] = useState(
//     () => localStorage.getItem("role") || ""
//   );

//   useEffect(() => {
//     console.log("🚀 Loaded Auth from Storage:", isAuthenticated);
//     console.log("🚀 Loaded Role from Storage:", role);
//   }, []);

//   const loginHandler = (userRole) => {
//     console.log("🔹 Login Successful, Role:", userRole);

//     localStorage.setItem("isAuthenticated", "true");
//     localStorage.setItem("role", userRole);

//     setIsAuthenticated(true);
//     setRole(userRole);
//   };

//   const logoutHandler = () => {
//     console.log("🔴 Logging out...");
    
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("role");

//     setIsAuthenticated(false);
//     setRole("");
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               <Navigate to={`/${role.toLowerCase()}`} replace />
//             ) : (
//               <Login onLogin={loginHandler} />
//             )
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             isAuthenticated && role === "Admin" ? (
//               <Admin_home />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Driver Routes */}
//         <Route
//           path="/driver/*"
//           element={
//             isAuthenticated && role === "Driver" ? (
//               <Driver_home />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Redirect all others to login */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
