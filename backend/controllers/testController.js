const db = require('../config/db');

const getQuestionsByCompanyAndRound = (req, res) => {
  const { companyId, round } = req.params;

  console.log('Received params:', { companyId, round });

  if (!companyId || !round) {
    return res.status(400).json({
      error: 'Missing company ID or round parameter',
    });
  }

  db.query(
    `SELECT id, question, options, answer AS correct_answer, sample_input AS sampleInput, sample_output AS sampleOutput 
     FROM questions 
     WHERE company_id = ? AND round = ?`,
    [companyId, round.toLowerCase()],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          error: 'Database query failed',
          details: err.message,
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: 'No questions found for this round',
          params: { companyId, round },
        });
      }

      try {
        const formattedResult = result.map((q) => ({
          id: q.id,
          question: q.question,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
          correctAnswer: q.correct_answer,
          sampleInput: q.sampleInput, // Correctly mapped
          sampleOutput: q.sampleOutput, // Correctly mapped
        }));

        console.log('Formatted Questions:', formattedResult);
        res.json(formattedResult);
      } catch (parseError) {
        console.error('Options parsing error:', parseError);
        res.status(500).json({
          error: 'Failed to parse question options',
          details: parseError.message,
        });
      }
    }
  );
};

module.exports = { getQuestionsByCompanyAndRound };