const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to fetch sample input/output for a question
router.get('/:id/sample', (req, res) => {
  const questionId = req.params.id;

  db.query(
    'SELECT sample_input, sample_output FROM questions WHERE id = ?',
    [questionId],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch sample data' });
      }

      if (result.length === 0) {
        console.log(`No sample data found for question ID: ${questionId}`);
        return res.status(404).json({ error: 'Sample data not found' });
      }

      console.log(`Sample data for question ID ${questionId}:`, result[0]);
      res.json(result[0]);
    }
  );
});

module.exports = router;
