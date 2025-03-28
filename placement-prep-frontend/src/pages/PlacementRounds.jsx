import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlacementRounds.css'; // Import custom CSS for the progress bar
import { FaCheckCircle } from 'react-icons/fa'; // Import a professional checkmark icon

const PlacementRounds = () => {
  const { id: companyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const roundStatus = location.state?.roundStatus || {};

  const handleRoundClick = (round) => {
    if (round === 'coding') {
      navigate(`/code-compiler/${companyId}`);
    } else {
      navigate(`/test/${companyId}/${round}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '7rem' }}>
        <h1 className="text-center mb-4">Placement Rounds</h1>
        <div className="placement-rounds-container">
          <div className="progress-bar-vertical">
            <div className="progress-step" onClick={() => handleRoundClick('aptitude')}>
              <div
                className={`progress-dot ${
                  roundStatus['aptitude'] === 'cleared' ? 'cleared-dot' : ''
                }`}
              >
                1
              </div>
              {roundStatus['aptitude'] === 'cleared' && (
                <div className="status-cleared">
                  <FaCheckCircle className="status-icon" />
                  <span>Cleared</span>
                </div>
              )}
            </div>
            <div className="progress-step" onClick={() => handleRoundClick('coding')}>
              <div
                className={`progress-dot ${
                  roundStatus['coding'] === 'cleared' ? 'cleared-dot' : ''
                }`}
              >
                2
              </div>
              {roundStatus['coding'] === 'cleared' && (
                <div className="status-cleared">
                  <FaCheckCircle className="status-icon" />
                  <span>Cleared</span>
                </div>
              )}
            </div>
            <div className="progress-step" onClick={() => handleRoundClick('interview')}>
              <div
                className={`progress-dot ${
                  roundStatus['interview'] === 'cleared' ? 'cleared-dot' : ''
                }`}
              >
                3
              </div>
              {roundStatus['interview'] === 'cleared' && (
                <div className="status-cleared">
                  <FaCheckCircle className="status-icon" />
                  <span>Cleared</span>
                </div>
              )}
            </div>
          </div>
          <div className="rounds-text-container">
            <div className="round-text" onClick={() => handleRoundClick('aptitude')} style={{ marginTop: '40px' }}>
              <strong>Aptitude Round</strong>
              <p className="round-description">
                Test your logical reasoning, quantitative aptitude, and verbal ability.
              </p>
            </div>
            <div className="round-text" onClick={() => handleRoundClick('coding')}>
              <strong>Coding Round</strong>
              <p className="round-description">
                Solve programming problems to demonstrate your coding skills.
              </p>
            </div>
            <div className="round-text" onClick={() => handleRoundClick('interview')}>
              <strong>Interview Round</strong>
              <p className="round-description">
                Face technical and HR questions to assess your overall suitability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacementRounds;
