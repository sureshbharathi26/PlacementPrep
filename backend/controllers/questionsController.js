const db = require('../config/db'); // Import the database connection

const getQuestions = async (req, res) => {
  const { companyId, round } = req.query;

  if (!companyId || !round) {
    console.error('Missing companyId or round parameter'); // Log missing parameters
    return res.status(400).json({ error: 'Missing companyId or round parameter' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT id, question, options, correct_answer 
       FROM questions 
       WHERE company_id = ? AND round = ?`,
      [companyId, round]
    );
    console.log('Fetched questions:', rows); // Log fetched questions
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error); // Log database errors
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

module.exports = { getQuestions };
