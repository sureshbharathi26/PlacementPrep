import React, { useState } from 'react';

const ManageCodingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion('');
  };

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    setEditingQuestion(questions[index]);
  };

  const handleSaveEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = editingQuestion;
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setEditingQuestion('');
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h2>Manage Coding Questions</h2>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Enter new coding question"
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editingQuestion}
                  onChange={(e) => setEditingQuestion(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div>
                {question}
                <button onClick={() => handleEditQuestion(index)}>Edit</button>
                <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCodingQuestions;
