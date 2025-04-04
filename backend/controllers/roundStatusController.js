const db = require('../config/db');

const getRoundStatus = (req, res) => {
  const { userId, companyId } = req.query;

  db.query(
    'SELECT round_name, status FROM round_status WHERE user_id = ? AND company_id = ?',
    [userId, companyId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    }
  );
};

const updateRoundStatus = (req, res) => {
  const { userId, companyId, roundName, status } = req.body;

  db.query(
    'INSERT INTO round_status (user_id, company_id, round_name, status) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = ?',
    [userId, companyId, roundName, status, status],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Round status updated successfully' });
    }
  );
};

module.exports = { getRoundStatus, updateRoundStatus };
