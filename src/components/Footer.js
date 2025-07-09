import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-2">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; 2025 Veer Car Rental. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
