const express = require('express');
const { getAllCompanies, getCompanyById } = require('../controllers/companyController');

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);

module.exports = router;