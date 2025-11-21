const express = require('express');
const router = express.Router();
const {
  getGlobalLeaderboard,
  getUserRank,
  getTopUsers,
  refreshLeaderboard
} = require('../controllers/leaderboardController');

/**
 * @route   GET /api/leaderboard
 * @desc    Get global leaderboard
 * @access  Public
 * @query   limit, offset, period
 */
router.get('/', getGlobalLeaderboard);

/**
 * @route   GET /api/leaderboard/top
 * @desc    Get top N users
 * @access  Public
 * @query   limit
 */
router.get('/top', getTopUsers);

/**
 * @route   GET /api/leaderboard/user/:userId
 * @desc    Get user's rank and surrounding users
 * @access  Public
 * @query   context (number of users above/below)
 */
router.get('/user/:userId', getUserRank);

/**
 * @route   POST /api/leaderboard/refresh
 * @desc    Trigger leaderboard recalculation
 * @access  Protected (admin only - will add later)
 */
router.post('/refresh', refreshLeaderboard);

module.exports = router;