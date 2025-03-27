const express = require('express');
const router = express.Router();
const { getQuestionsByCompanyAndRound } = require('../controllers/testController');

// Ensure the route matches the frontend request
router.get('/:companyId/:round', getQuestionsByCompanyAndRound);

module.exports = router;