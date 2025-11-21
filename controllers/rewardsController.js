const { collections } = require('../config/firebase');
const { mockRewards, mockUser } = require('../data/mockData');

/**
 * GET /api/rewards
 * Get all available rewards
 * Query params: category, minPoints, maxPoints
 */
const getAllRewards = async (req, res, next) => {
  try {
    const { category, minPoints, maxPoints } = req.query;
    
    let rewards = mockRewards.filter(r => r.isActive);
    
    // Filter by category
    if (category) {
      rewards = rewards.filter(r => r.category === category);
    }
    
    // Filter by points range
    if (minPoints) {
      rewards = rewards.filter(r => r.pointsCost >= parseInt(minPoints));
    }
    if (maxPoints) {
      rewards = rewards.filter(r => r.pointsCost <= parseInt(maxPoints));
    }
    
    // Sort by points cost (ascending)
    rewards.sort((a, b) => a.pointsCost - b.pointsCost);
    
    res.json({
      success: true,
      data: {
        rewards,
        total: rewards.length
      }
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rewards/:rewardId
 * Get specific reward details
 */
const getRewardById = async (req, res, next) => {
  try {
    const { rewardId } = req.params;
    
    const reward = mockRewards.find(r => r.id === rewardId);
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        error: 'Reward not found'
      });
    }
    
    res.json({
      success: true,
      data: reward
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/rewards/redeem
 * Redeem a reward using points
 * Body: { userId, rewardId }
 */
const redeemReward = async (req, res, next) => {
  try {
    const { userId, rewardId } = req.body;
    
    // Validation
    if (!userId || !rewardId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, rewardId'
      });
    }
    
    // Get reward
    const reward = mockRewards.find(r => r.id === rewardId);
    if (!reward || !reward.isActive) {
      return res.status(404).json({
        success: false,
        error: 'Reward not found or unavailable'
      });
    }
    
    // Check stock
    if (reward.stock <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Reward is out of stock'
      });
    }
    
    // Check user has enough points (mock)
    if (userId === mockUser.userId) {
      if (mockUser.availablePoints < reward.pointsCost) {
        return res.status(400).json({
          success: false,
          error: `Insufficient points. Need ${reward.pointsCost}, have ${mockUser.availablePoints}`
        });
      }
    }
    
    // Generate redemption code
    const redemptionCode = `RC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create redemption record
    const redemption = {
      id: `redemption_${Date.now()}`,
      userId,
      rewardId,
      rewardTitle: reward.title,
      pointsSpent: reward.pointsCost,
      status: 'pending',
      redemptionCode,
      redeemedAt: new Date()
    };
    
    // TODO: When integrating with Firebase:
    // 1. Create redemption document
    // 2. Decrease reward stock by 1
    // 3. Decrease user's availablePoints
    // 4. Create notification for user
    
    res.status(201).json({
      success: true,
      data: redemption,
      message: `Reward redeemed successfully! Your code: ${redemptionCode}`
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rewards/user/:userId/redemptions
 * Get user's redemption history
 */
const getUserRedemptions = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    // Mock redemptions data
    const mockRedemptions = [
      {
        id: 'redemption_1',
        userId,
        rewardId: 'reward_2',
        rewardTitle: 'Starbucks $10 Gift Card',
        pointsSpent: 200,
        status: 'fulfilled',
        redemptionCode: 'RC-1699123456-XYZ123',
        redeemedAt: new Date('2024-11-01T10:30:00')
      }
    ];
    
    res.json({
      success: true,
      data: {
        redemptions: mockRedemptions,
        total: mockRedemptions.length
      }
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRewards,
  getRewardById,
  redeemReward,
  getUserRedemptions
};