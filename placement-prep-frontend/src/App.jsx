import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CompanySelection from './pages/CompanySelection';
import PlacementRounds from './pages/PlacementRounds';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<CompanySelection />} />
        <Route path="/placement-rounds" element={<PlacementRounds />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;