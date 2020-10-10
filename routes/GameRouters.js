const express = require('express');
const GameController = require('../controllers/GameController');
const router = express.Router();


router.post('/summary', GameController.summaryPage)

router.post('/leaderboard', GameController.leaderboard)

module.exports = router;
