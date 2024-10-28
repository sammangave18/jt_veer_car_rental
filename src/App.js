import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={< />} />
          <Route path="/" element={< />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
