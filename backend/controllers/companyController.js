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

const addCompany = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  db.query('INSERT INTO companies (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Database error (addCompany):', err);
      return res.status(500).json({ error: 'Failed to add company' });
    }
    res.status(201).json({ message: 'Company added successfully', companyId: result.insertId });
  });
};

const deleteCompany = (req, res) => {
  const { id } = req.params;
 
  db.query('DELETE FROM companies WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Database error (deleteCompany):', err);
      return res.status(500).json({ error: 'Failed to delete company' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  });
};

module.exports = { getAllCompanies, getCompanyById, addCompany, deleteCompany };