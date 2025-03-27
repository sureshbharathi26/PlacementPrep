import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, answers, resultData, companyId, round } = location.state || {};

  const handleGoToHome = () => {
    navigate(`/placement-rounds/${companyId}`, {
      state: { roundStatus: { [round]: 'cleared' } },
    });
  };

  if (!questions || !answers || !resultData) {
    return <p className="text-center mt-5">No result data available.</p>;
  }

  const isEligible = resultData.score >= 60;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Test Result</h2>
            {questions.map((question) => (
              <div key={question.id} className="mb-3">
                <p className="fw-bold" style={{ fontSize: '1rem' }}>{question.question}</p>
                <div className="d-flex flex-wrap">
                  {question.options.map((option, index) => {
                    const isCorrect = option === question.correctAnswer;
                    const isSelected = option === answers[question.id];
                    return (
                      <div
                        key={index}
                        className={`card m-2 p-2 ${
                          isCorrect
                            ? 'bg-success text-white'
                            : isSelected
                            ? 'bg-danger text-white'
                            : 'bg-light'
                        }`}
                        style={{
                          width: '120px',
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          position: 'relative',
                        }}
                      >
                        {option}
                        {isCorrect && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            ✓
                          </span>
                        )}
                        {isSelected && !isCorrect && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '5px',
                              right: '5px',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            ✗
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Pie
              data={{
                labels: ['Correct', 'Incorrect'],
                datasets: [
                  {
                    data: [resultData.correct, resultData.incorrect],
                    backgroundColor: ['#4caf50', '#f44336'],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
              }}
              style={{ width: '250px', height: '250px' }}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          {isEligible ? (
            <p className="text-success fw-bold">
              Congratulations! You are eligible to attend the next round.
            </p>
          ) : (
            <p className="text-danger fw-bold">
              You are not eligible to attend the next round.
            </p>
          )}
          <button className="btn btn-secondary" onClick={handleGoToHome}>
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultPage;