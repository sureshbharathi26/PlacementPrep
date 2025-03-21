const db = require('../config/db');

const getQuestionsByCompanyAndRound = (req, res) => {
  const { companyId, round } = req.params;
  db.query(
    'SELECT * FROM questions WHERE company_id = ? AND round = ?',
    [companyId, round],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

const submitTest = (req, res) => {
  const { userId, companyId, round, answers } = req.body;
  // Validate answers and calculate score
  // Save results to the database
  res.json({ message: 'Test submitted successfully' });
};

module.exports = { getQuestionsByCompanyAndRound, submitTest };