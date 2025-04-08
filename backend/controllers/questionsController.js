const db = require('../config/db'); // Database connection

// Controller to fetch questions for a given company and round
const getQuestions = async (req, res) => {
  const { companyId, round } = req.query;

  if (!companyId || !round) {
    return res.status(400).json({ error: 'Company ID and round are required.' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT id, question, options, correct_answer AS correctAnswer 
       FROM questions 
       WHERE company_id = ? AND round = ?`,
      [companyId, round]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'No questions found for the specified company and round.' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions.' });
  }
};

module.exports = { getQuestions };
