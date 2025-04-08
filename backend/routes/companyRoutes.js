const express = require('express');
const { getAllCompanies, getCompanyById, addCompany, deleteCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', addCompany);
router.delete('/:id', deleteCompany);

module.exports = router;