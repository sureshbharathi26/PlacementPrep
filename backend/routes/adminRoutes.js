const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Correct function name
router.get('/questions', adminController.getQuestions);
router.post('/questions', adminController.addQuestion);
router.put('/questions/:id', adminController.updateQuestion);
router.delete('/questions/:id', adminController.deleteQuestion);

module.exports = router;
