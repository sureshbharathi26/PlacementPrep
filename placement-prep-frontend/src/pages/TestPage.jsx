import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchQuestions } from '../redux/testSlice';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestPage = () => {
  const { companyId, round } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResult, setTestResult] = useState(null); // New state to store test result

  useEffect(() => {
    const fetchTestQuestions = async () => {
      const result = await dispatch(fetchQuestions({ companyId, round })).unwrap();
      setQuestions(result);
    };
    fetchTestQuestions();
  }, [dispatch, companyId, round]);

  useEffect(() => {
    let interval;
    if (testStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [testStarted, timer]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    const answeredQuestions = Object.keys(answers).length;
    if (answeredQuestions === 0) {
      alert("You have ended the test without selecting any options.");
      navigate(`/placement-rounds/${companyId}`);
      return;
    }

    const correctAnswers = questions.filter(
      (q) => q.correctAnswer === answers[q.id]
    ).length;
    const totalQuestions = questions.length;
    const score = (correctAnswers / totalQuestions) * 100;

    setTestResult({
      correct: correctAnswers,
      incorrect: totalQuestions - correctAnswers,
      score,
    });

    // Navigate to results page
    navigate('/results', {
      state: {
        questions,
        answers,
        resultData: {
          correct: correctAnswers,
          incorrect: totalQuestions - correctAnswers,
          score,
        },
        companyId,
        round,
      },
    });
  };

  const handleGoToHome = () => {
    if (testResult?.score >= 60) {
      // User passed the test, redirect to PlacementRounds with progress update
      navigate(`/placement-rounds/${companyId}`, {
        state: { roundStatus: { [round]: 'cleared', nextRound: 'coding' } },
      });
    } else {
      // User failed the test, redirect to home page
      navigate('/');
    }
  };

  const handleEndTest = () => {
    if (window.confirm("Are you sure you want to end the test?")) {
      handleSubmitTest();
    }
  };

  const handleBackToRounds = () => {
    navigate(`/placement-rounds/${companyId}`);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">{round.charAt(0).toUpperCase() + round.slice(1)} Test</h1>
        {testStarted ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="mb-0">
                <strong>Time Remaining:</strong> {formatTime(timer)}
              </p>
              <p className="mb-0">
                <strong>Question:</strong> {currentQuestionIndex + 1} of {questions.length}
              </p> {/* Added display for the number of questions */}
              <div>
                <button className="btn btn-secondary me-2" onClick={handleBackToRounds}>
                  Back
                </button>
                <button className="btn btn-danger" onClick={handleEndTest}>
                  End Test
                </button>
              </div>
            </div>
            <div className="progress mb-4" style={{ height: '10px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            {questions.length > 0 && (
              <div className="card shadow p-4 mb-4">
                <h4 className="mb-3">{questions[currentQuestionIndex].question}</h4>
                <div className="d-flex flex-column">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`btn mb-2 ${
                        answers[questions[currentQuestionIndex].id] === option
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                      onClick={() =>
                        handleAnswerChange(questions[currentQuestionIndex].id, option)
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button className="btn btn-success" onClick={handleSubmitTest}>
                  Submit Test
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleNextQuestion}>
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-3">
              <strong>Round:</strong> {round.charAt(0).toUpperCase() + round.slice(1)}
            </p>
            <p className="mb-4">
              <strong>Total Questions:</strong> {questions.length} {/* Added display for total questions */}
            </p>
            <p className="mb-4">
              <strong>Duration:</strong> 15 minutes
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setTestStarted(true)}>
              Start Test
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TestPage;