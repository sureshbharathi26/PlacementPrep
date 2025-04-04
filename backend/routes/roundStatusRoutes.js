const express = require('express');
const { getRoundStatus, updateRoundStatus } = require('../controllers/roundStatusController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getRoundStatus);
router.post('/', authMiddleware, updateRoundStatus);

module.exports = router;
