import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Services_master from './components/Services_master';
import Employee_master from './components/Employee_master';
import Trips_management from './components/Trips_management';
import FAQ from './components/FAQ';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Services_master" element={<Services_master />} />
              <Route path="/Employee_master" element={<Employee_master />} />
              <Route path="/Trips_management" element={<Trips_management />} />
              <Route path="/FAQ" element={<FAQ />} />
            </Routes>
          </div>
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
