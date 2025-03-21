import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/testSlice';

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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{round} Round</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={() => setAnswers({ ...answers, [question.id]: option })}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
};

export default TestPage;