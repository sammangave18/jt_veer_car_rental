import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Home from './Home';
import EmployeeMaster from './EmployeeMaster';
import ServiceMaster from './ServiceMaster';
import VehicleMaster from './VehicleMaster';
import TripsManagement from './TripsManagement';

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ display: 'flex', marginTop: '60px' }}>
                <Sidebar />
                <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/employee-master" element={<EmployeeMaster />} />
                        <Route path="/service-master" element={<ServiceMaster />} />
                        <Route path="/vehicle-master" element={<VehicleMaster />} />
                        <Route path="/trips-management" element={<TripsManagement />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
