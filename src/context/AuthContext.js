// // src/context/AuthContext.js

// import React, { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Create Context for Authentication
// const AuthContext = createContext();

// // Auth Provider to wrap around the app and provide auth data
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [role, setRole] = useState("");
//   const navigate = useNavigate();

//   const login = (userRole) => {
//     setIsAuthenticated(true);
//     setRole(userRole);
//     navigate(`/${userRole.toLowerCase()}`);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setRole("");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Load authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";  // Convert "true" string to boolean
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "";
  });

  useEffect(() => {
    console.log("🚀 Loaded Auth from Storage:", isAuthenticated);
    console.log("🚀 Loaded Role from Storage:", role);
  }, [isAuthenticated, role]);

  const login = (userRole) => {
    console.log("🔹 Login Called with Role:", userRole);

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", userRole);

    setIsAuthenticated(true);
    setRole(userRole);

    navigate(`/${userRole.toLowerCase()}`);
  };

  const logout = () => {
    console.log("🔴 Logging out...");
    localStorage.clear(); // Fix: Clear storage on logout
    setIsAuthenticated(false);
    setRole("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
