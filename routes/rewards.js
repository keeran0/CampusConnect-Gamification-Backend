const express = require('express');
const router = express.Router();
const {
  getAllRewards,
  getRewardById,
  redeemReward,
  getUserRedemptions
} = require('../controllers/rewardsController');

/**
 * @route   GET /api/rewards
 * @desc    Get all available rewards (with filters)
 * @access  Public
 * @query   category, minPoints, maxPoints
 */
router.get('/', getAllRewards);

/**
 * @route   GET /api/rewards/:rewardId
 * @desc    Get specific reward details
 * @access  Public
 */
router.get('/:rewardId', getRewardById);

/**
 * @route   POST /api/rewards/redeem
 * @desc    Redeem a reward
 * @access  Protected (authenticated users)
 */
router.post('/redeem', redeemReward);

/**
 * @route   GET /api/rewards/user/:userId/redemptions
 * @desc    Get user's redemption history
 * @access  Protected (user's own data)
 */
router.get('/user/:userId/redemptions', getUserRedemptions);

module.exports = router;