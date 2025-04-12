const express = require('express');
const router = express.Router();
const { getRoundStatus, updateRoundStatus } = require('../controllers/roundStatusController');

// GET route to fetch round statuses
router.get('/round-status', getRoundStatus);

// POST route to insert/update round status
router.post('/round-status', updateRoundStatus);

module.exports = router;
