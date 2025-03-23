import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/testSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const TestPage = () => {
  const { companyId, round } = useParams();
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => state.test);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    dispatch(fetchQuestions({ companyId, round }));
  }, [dispatch, companyId, round]);

  const handleSubmit = () => {
    // Submit answers to the backend
    console.log('Answers:', answers);
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{round} Round</h1>
      {questions.map((question) => (
        <div key={question.id} className="mb-4">
          <p className="fw-bold">{question.question}</p>
          {question.options.map((option, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => setAnswers({ ...answers, [question.id]: option })}
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default TestPage;