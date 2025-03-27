import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {};

  const handleGoToHome = () => {
    if (resultData?.score >= 60) {
      // User passed the test, redirect to PlacementRounds with progress update
      navigate(`/placement-rounds/${location.state.companyId}`, {
        state: { roundStatus: { [location.state.round]: 'cleared', nextRound: 'coding' } },
      });
    } else {
      // User failed the test, redirect to home page
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Test Results</h1>
      <p>
        <strong>Correct Answers:</strong> {resultData.correct}
      </p>
      <p>
        <strong>Incorrect Answers:</strong> {resultData.incorrect}
      </p>
      <p>
        <strong>Score:</strong> {resultData.score}%
      </p>
      <button className="btn btn-primary mt-4" onClick={handleGoToHome}>
        Go to Home
      </button>
    </div>
  );
};

export default ResultsPage;