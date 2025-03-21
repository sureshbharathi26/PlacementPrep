const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getQuestionsByCompanyAndRound, submitTest } = require('../controllers/testController');

const router = express.Router();

router.get('/:companyId/:round', authMiddleware, getQuestionsByCompanyAndRound);
router.post('/submit', authMiddleware, submitTest);

module.exports = router;