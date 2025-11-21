const { collections } = require('../config/firebase');
const { mockUser, mockPointsHistory, eventCategories } = require('../data/mockData');

/**
 * Calculate points for attending an event
 * Implements business logic: base points + bonuses + multipliers
 */
const calculatePoints = (eventCategory, categoriesAttended, isFirstMonthly) => {
  const basePoints = 10;
  let totalPoints = basePoints;
  
  // New category bonus (+5 points)
  if (!categoriesAttended.includes(eventCategory)) {
    totalPoints += 5;
  }
  
  // First event of the month bonus (+15 points)
  if (isFirstMonthly) {
    totalPoints += 15;
  }
  
  // Apply category multiplier
  const category = eventCategories.find(c => c.id === eventCategory);
  if (category) {
    totalPoints = Math.round(totalPoints * category.multiplier);
  }
  
  return totalPoints;
};

/**
 * GET /api/points/:userId
 * Get user's total points and available points
 */
const getUserPoints = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    // Using mock data for now
    if (userId === mockUser.userId) {
      return res.json({
        success: true,
        data: {
          userId: mockUser.userId,
          totalPoints: mockUser.totalPoints,
          availablePoints: mockUser.availablePoints,
          categoriesAttended: mockUser.categoriesAttended
        }
      });
    }
    
    // TODO: When integrating, query Firestore
    // const userDoc = await collections.points.doc(userId).get();
    
    res.status(404).json({
      success: false,
      error: 'User not found'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/points/:userId/history
 * Get user's points transaction history
 */
const getPointsHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    
    if (userId === mockUser.userId) {
      // Simulate pagination
      const start = parseInt(offset);
      const end = start + parseInt(limit);
      const paginatedHistory = mockPointsHistory.slice(start, end);
      
      return res.json({
        success: true,
        data: {
          history: paginatedHistory,
          total: mockPointsHistory.length,
          hasMore: end < mockPointsHistory.length
        }
      });
    }
    
    res.status(404).json({
      success: false,
      error: 'User not found'
    });
    
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/points/award
 * Award points to user for attending an event
 * Body: { userId, eventId, eventTitle, eventCategory, isFirstMonthly }
 */
const awardPoints = async (req, res, next) => {
  try {
    const { userId, eventId, eventTitle, eventCategory, isFirstMonthly } = req.body;
    
    // Validation
    if (!userId || !eventId || !eventCategory) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, eventId, eventCategory'
      });
    }
    
    // Get user's current categories (mock)
    const categoriesAttended = mockUser.categoriesAttended;
    
    // Calculate points
    const pointsEarned = calculatePoints(
      eventCategory, 
      categoriesAttended, 
      isFirstMonthly || false
    );
    
    // Determine bonus type
    let bonusType = null;
    if (isFirstMonthly) bonusType = 'first_monthly';
    else if (!categoriesAttended.includes(eventCategory)) bonusType = 'new_category';
    
    // Create transaction record
    const transaction = {
      id: `trans_${Date.now()}`,
      userId,
      eventId,
      eventTitle: eventTitle || 'Unnamed Event',
      eventCategory,
      pointsEarned,
      timestamp: new Date(),
      bonusType
    };
    
    // TODO: When integrating with Firebase:
    // 1. Add transaction to pointsHistory collection
    // 2. Update user's totalPoints in points collection
    // 3. Update categoriesAttended if new category
    
    res.status(201).json({
      success: true,
      data: {
        pointsEarned,
        bonusType,
        transaction
      },
      message: `Successfully awarded ${pointsEarned} points!`
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserPoints,
  getPointsHistory,
  awardPoints,
  calculatePoints
};