const { collections } = require('../config/firebase');
const { mockLeaderboard, mockUser } = require('../data/mockData');

/**
 * GET /api/leaderboard
 * Get global leaderboard
 * Query params: limit, offset, period (all-time, monthly, weekly)
 */
const getGlobalLeaderboard = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0, period = 'all-time' } = req.query;
    
    // For now, returning mock all-time leaderboard
    // TODO: Implement period filtering (monthly, weekly)
    
    const start = parseInt(offset);
    const end = start + parseInt(limit);
    const leaderboard = mockLeaderboard.slice(start, end);
    
    res.json({
      success: true,
      data: {
        leaderboard,
        total: mockLeaderboard.length,
        period,
        hasMore: end < mockLeaderboard.length
      }
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/leaderboard/user/:userId
 * Get user's rank and nearby competitors
 */
const getUserRank = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { context = 5 } = req.query; // Show 5 users above and below
    
    // Find user in leaderboard
    const userIndex = mockLeaderboard.findIndex(u => u.userId === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found in leaderboard'
      });
    }
    
    const user = mockLeaderboard[userIndex];
    
    // Get surrounding users for context
    const contextNum = parseInt(context);
    const start = Math.max(0, userIndex - contextNum);
    const end = Math.min(mockLeaderboard.length, userIndex + contextNum + 1);
    const surrounding = mockLeaderboard.slice(start, end);
    
    res.json({
      success: true,
      data: {
        rank: user.rank,
        totalPoints: user.totalPoints,
        eventsAttended: user.eventsAttended,
        surrounding,
        totalUsers: mockLeaderboard.length
      }
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/leaderboard/top
 * Get top N users (for highlighting top performers)
 */
const getTopUsers = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    
    const topUsers = mockLeaderboard.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      data: {
        topUsers,
        count: topUsers.length
      }
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/leaderboard/refresh
 * Manually trigger leaderboard recalculation
 * (In production, this would run on a schedule)
 */
const refreshLeaderboard = async (req, res, next) => {
  try {
    // TODO: When integrated with Firebase:
    // 1. Query all users from points collection
    // 2. Sort by totalPoints descending
    // 3. Assign ranks
    // 4. Update leaderboard collection
    
    res.json({
      success: true,
      message: 'Leaderboard refresh initiated',
      timestamp: new Date()
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGlobalLeaderboard,
  getUserRank,
  getTopUsers,
  refreshLeaderboard
};