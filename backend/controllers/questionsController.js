const getQuestions = async (req, res) => {
  const { companyId, round } = req.query;

  try {
    const [rows] = await db.execute(
      `SELECT id, question, options, correct_answer 
       FROM questions 
       WHERE company_id = ? AND round = ?`,
      [companyId, round]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

module.exports = { getQuestions };
