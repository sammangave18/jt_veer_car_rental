import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div style={{ width: '250px',
         backgroundColor: '#2c3e50',
          color: 'white',
           height: '100vh',
           position: 'fixed',
           width:'200px' , 
            padding: '20px' }}>
            <h2>Dashboard</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/employee-master" style={{ color: 'white', textDecoration: 'none' }}>Employee Master</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/service-master" style={{ color: 'white', textDecoration: 'none' }}>Service Master</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/vehicle-master" style={{ color: 'white', textDecoration: 'none' }}>Vehicle Master</Link></li>
                <li style={{ marginBottom: '10px' }}><Link to="/trips-management" style={{ color: 'white', textDecoration: 'none' }}>Trips Management</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;