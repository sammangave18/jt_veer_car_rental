// import React, { useState } from 'react';
// import "./Login.css";

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (username && password) {
//       alert(`Logged in as: ${username}`);
//       // Implement login logic here (e.g., API call)
//     } else {
//       alert('Please enter both username and password.');
//     }
//   };

//   const handleReset = () => {
//     setUsername('');
//     setPassword('');
//   };

//   return (
//     <div className="sec1">
//       <div className="text">
//         <h1 className="h1Text">This is a Demo page</h1>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit esse ex cupiditate quidem facere
//           labore. Id repudiandae laboriosam odio! Temporibus vero minima illo excepturi minus dicta dolorum facilis
//           est modi.
//         </p>
//       </div>
//       <div className="card">
//         <div className="loginHead">
//           <h1 className="loginHere">Login Here</h1>
//         </div>
//         <div className="loginInput">
//           <label htmlFor="username" className="inputLabel">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="inputField"
//             placeholder="Enter Your Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <label htmlFor="pass" className="inputLabel">
//             Password
//           </label>
//           <input
//             type="password"
//             id="pass"
//             className="inputField"
//             placeholder="Enter Your Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="loginDiv">
//           <div className="btnDiv">
//             <button className="loginBtn" id="loginBtn" onClick={handleLogin}>
//               Login
//             </button>
//             <button className="resetBtn" id="resetBtn" onClick={handleReset}>
//               Reset
//             </button>
//           </div>
//           <div className="btnDiv2">
//             Do not have an Account? <a href="#">Register Here</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Login.css"; // Add your custom CSS here

export default function Login({ onLogin }) {
  const [employees, setEmployees] = useState([]);
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => {
        // console.log("Employee data fetched:", res.data);
        // res.data.forEach((emp) => {
        // console.log("Employee id:", emp.employeeNumber);
        //   // console.log("Employee Role:", emp.role);
        // });
        setEmployees(res.data);
      })
      .catch((err) => console.error("Error fetching employees: ", err));
  }, []);

  const handleLogin = () => {
    const employee = employees.find(
      (emp) => emp.employeeNumber === employeeNumber
      // employeeNumber === 123
    );

    // Check if employee is found and then check the role....
    // if (employee) {
    //   // Checking role....
    //   if (employee.role.toLowerCase() === "admin") {
    //     onLogin("Admin");
    //   } else {
    //     onLogin("Driver");
    //   }
    // } else {
    //   console.error("Employee not found with the provided employee number.");
    //   alert("Employee not found. Please check the employee number.");
    // }

    const role = employee.role.toLowerCase() === "admin" ? "Admin" : "Driver";

    // Store login data in localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("employeeNumber", employee.employeeNumber);

    // Call onLogin to update global state
    onLogin(role);

    // Validate password
    if (password !== "veer") {
      alert("Invalid password. Please try again.");
      return;
    }


  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  // reset form
  const handleReset = () => {
    setEmployeeNumber("");
    setPassword("");
  };

  return (
    <div className="sec1 container-fluid">
      <div className="text text-center mb-4">
        <h1 className="h1Text mb-3">Veer Car Rental</h1>
        <p>
          Welcome to <b>Veer Car Rental</b>, where every mile is driven with a
          smile. Our platform is dedicated to providing our team with the best
          resources, ensuring smooth operations and seamless service for all.
          Whether you’re on the road or behind the scenes, we’re committed to
          excellence in every journey. Stay updated, stay connected, and let’s
          drive success together, one mile at a time.{" "}
        </p>
      </div>
      <div className="card shadow-lg p-4 login-card">
        <div className="loginHead mb-4">
          <h2 className="loginHere text-center">Login Here</h2>
        </div>
        <div className="loginInput">
          <label htmlFor="username" className="inputLabel form-label">
            Employee Number
          </label>
          <input
            type="text"
            id="username"
            className="form-control inputField mb-3"
            placeholder="Enter Your Employee Number"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value.toUpperCase())}
          />
          <label htmlFor="pass" className="inputLabel form-label">
            Password
          </label>
          <input
            type="password"
            id="pass"
            className="form-control inputField mb-4"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="loginDiv">
          <div className="btnDiv d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary loginBtn"
              id="loginBtn"
              onClick={handleLogin}
              onKeyDown={handleKeyPress}
            >
              Login
            </button>
            <button
              className="btn btn-secondary resetBtn"
              id="resetBtn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          {/* <div className="btnDiv2 text-center">
            Do not have an Account?{" "}
            <a href="#" className="register-link">
              Register Here
            </a>
          </div>  */}
        </div>
      </div>
    </div>
  );
}
