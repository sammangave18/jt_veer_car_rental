// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { AuthProvider } from './context/AuthContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// // src/index.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { AuthProvider } from './context/AuthContext';

// ReactDOM.render(
//   <AuthProvider>
//     <App />
//   </AuthProvider>,
//   document.getElementById('root')
// );

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';  // Wrap the app with BrowserRouter

// Create the root element for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the entire app with BrowserRouter and AuthProvider for routing and global state
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

// Optional: You can measure app performance with reportWebVitals if needed
reportWebVitals();


