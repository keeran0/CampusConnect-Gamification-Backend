const express = require('express');
const router = express.Router();
const {
  getUserPoints,
  getPointsHistory,
  awardPoints
} = require('../controllers/pointsController');

/**
 * @route   GET /api/points/:userId
 * @desc    Get user's points summary
 * @access  Public (will be protected later)
 */
router.get('/:userId', getUserPoints);

/**
 * @route   GET /api/points/:userId/history
 * @desc    Get user's points transaction history
 * @access  Public (will be protected later)
 * @query   limit, offset for pagination
 */
router.get('/:userId/history', getPointsHistory);

/**
 * @route   POST /api/points/award
 * @desc    Award points to a user
 * @access  Protected (organizer/admin only - will add later)
 */
router.post('/award', awardPoints);

module.exports = router;