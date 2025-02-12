import React from 'react';

function Navbar() {
    return (
        <nav style={{
            backgroundColor: '#34495e',
            color: 'white',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'fixed',
            top: '0',
            width: '100%',
            zIndex: '1000',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{ margin: '0', fontSize: '24px' }}>Veer Car Rental</h1>
        </nav>
    );
}

export default Navbar;
