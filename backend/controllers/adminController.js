const db = require('../config/db');

// Fetch questions by company ID and round
const getQuestions = (req, res) => {
  const { companyId, round } = req.query;

  if (!companyId || !round) {
    return res.status(400).json({ error: 'Company ID and round are required.' });
  }

  db.query(
    `SELECT id, question, options, answer AS correctAnswer, sample_input AS sampleInput, sample_output AS sampleOutput 
     FROM questions 
     WHERE company_id = ? AND round = ?`,
    [companyId, round],
    (err, result) => {
      if (err) {
        console.error('Database error (getQuestions):', err);
        return res.status(500).json({ error: 'Failed to fetch questions.' });
      }
      if (!result.length) {
        return res.status(404).json({ error: 'No questions found for the specified company and round.' });
      }
      res.json(result);
    }
  );
};

// Add a new question
const addQuestion = (req, res) => {
  const { companyId, round, question, options, correctAnswer, sampleInput, sampleOutput } = req.body;

  if (!companyId || !round || !question) {
    return res.status(400).json({ error: 'Company ID, round, and question are required.' });
  }

  db.query(
    `INSERT INTO questions (company_id, round, question, options, answer, sample_input, sample_output) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,

    [companyId, round, question, JSON.stringify(options), correctAnswer, sampleInput, sampleOutput],
    (err) => {
      if (err) {
        console.error('Database error (addQuestion):', err);
        return res.status(500).json({ error: 'Failed to add question.' });
      }
      res.json({ message: 'Question added successfully.' });
    }
  );
};

// Update an existing question
const updateQuestion = (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer, sampleInput, sampleOutput, round } = req.body;

  if (!id || !question || !Array.isArray(options) || options.length === 0 || !correctAnswer) {
    console.error('Validation error:', { id, question, options, correctAnswer });
    return res.status(400).json({ error: 'Question ID, question text, valid options array, and correct answer are required.' });
  }

  // Validate sample input/output for coding questions
  if (round === 'coding' && (!sampleInput || !sampleOutput)) {
    console.error('Validation error for coding question:', { sampleInput, sampleOutput });
    return res.status(400).json({ error: 'Sample input and output are required for coding questions.' });
  }

  db.query(
    `UPDATE questions 
     SET question = ?, options = ?, answer = ?, sample_input = ?, sample_output = ? 
     WHERE id = ?`,
    [question, JSON.stringify(options), correctAnswer, sampleInput, sampleOutput, id],
    (err) => {
      if (err) {
        console.error('Database error (updateQuestion):', err);
        return res.status(500).json({ error: 'Failed to update question.' });
      }
      res.json({ message: 'Question updated successfully.' });
    }
  );
};

// Delete a question
const deleteQuestion = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Question ID is required.' });
  }

  db.query('DELETE FROM questions WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Database error (deleteQuestion):', err);
      return res.status(500).json({ error: 'Failed to delete question.' });
    }
    res.json({ message: 'Question deleted successfully.' });
  });
};

module.exports = {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion
};
