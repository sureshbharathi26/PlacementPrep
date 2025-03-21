const db = require('../config/db');

const getAllCompanies = (req, res) => {
  db.query('SELECT * FROM companies', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const getCompanyById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM companies WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Company not found' });
    res.json(result[0]);
  });
};

module.exports = { getAllCompanies, getCompanyById };