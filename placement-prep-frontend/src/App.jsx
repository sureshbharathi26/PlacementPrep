import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Home from './pages/Home';
import CompanySelection from './pages/CompanySelection';
import PlacementRounds from './pages/PlacementRounds';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import CodeCompiler from './pages/CodeCompiler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<CompanySelection />} />
        <Route path="/placement-rounds/:id" element={<PlacementRounds />} />  {/* ✅ Dynamic ID */}
        <Route path="/test/:companyId/:round" element={<TestPage />} />  {/* ✅ Dynamic Test */}
        <Route path="/results" element={<ResultPage />} /> {/* New ResultPage route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/code-compiler/:companyId" element={<CodeCompiler />} />
      </Routes>
    </Router>
  );
}

export default App;
