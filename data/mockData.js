// Mock user for testing
const mockUser = {
  userId: 'user_123',
  name: 'Alex Johnson',
  email: 'alex.johnson@torontomu.ca',
  totalPoints: 450,
  availablePoints: 280,
  categoriesAttended: ['academic', 'social', 'sports'],
  rank: 12,
  joinedAt: new Date('2024-09-01')
};

// Mock rewards catalog
const mockRewards = [
  {
    id: 'reward_1',
    title: 'TMU Hoodie',
    description: 'Official TMU branded hoodie in your choice of color',
    pointsCost: 500,
    category: 'merchandise',
    imageUrl: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=TMU+Hoodie',
    stock: 25,
    isActive: true
  },
  {
    id: 'reward_2',
    title: 'Starbucks $10 Gift Card',
    description: 'Enjoy your favorite coffee on us',
    pointsCost: 200,
    category: 'food',
    imageUrl: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Starbucks',
    stock: 50,
    isActive: true
  },
  {
    id: 'reward_3',
    title: 'Campus Gym 1-Month Pass',
    description: 'Free access to all gym facilities for one month',
    pointsCost: 300,
    category: 'services',
    imageUrl: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Gym+Pass',
    stock: 15,
    isActive: true
  },
  {
    id: 'reward_4',
    title: 'Tim Hortons $5 Gift Card',
    description: 'Perfect for your morning coffee run',
    pointsCost: 100,
    category: 'food',
    imageUrl: 'https://via.placeholder.com/300x300/dc2626/ffffff?text=Tim+Hortons',
    stock: 100,
    isActive: true
  },
  {
    id: 'reward_5',
    title: 'TMU Water Bottle',
    description: 'Eco-friendly stainless steel water bottle',
    pointsCost: 150,
    category: 'merchandise',
    imageUrl: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Water+Bottle',
    stock: 40,
    isActive: true
  }
];

// Mock points history
const mockPointsHistory = [
  {
    id: 'trans_1',
    userId: 'user_123',
    eventId: 'event_101',
    eventTitle: 'Career Fair 2024',
    eventCategory: 'academic',
    pointsEarned: 15,
    timestamp: new Date('2024-11-10T14:30:00'),
    bonusType: 'first_monthly'
  },
  {
    id: 'trans_2',
    userId: 'user_123',
    eventId: 'event_102',
    eventTitle: 'Basketball Game vs UofT',
    eventCategory: 'sports',
    pointsEarned: 15,
    timestamp: new Date('2024-11-08T19:00:00'),
    bonusType: 'new_category'
  },
  {
    id: 'trans_3',
    userId: 'user_123',
    eventId: 'event_103',
    eventTitle: 'Python Workshop',
    eventCategory: 'academic',
    pointsEarned: 12,
    timestamp: new Date('2024-11-05T16:00:00'),
    bonusType: null
  }
];

// Mock leaderboard
const mockLeaderboard = [
  { rank: 1, userId: 'user_001', name: 'Sarah Chen', totalPoints: 1250, eventsAttended: 42 },
  { rank: 2, userId: 'user_002', name: 'Marcus Williams', totalPoints: 1180, eventsAttended: 38 },
  { rank: 3, userId: 'user_003', name: 'Emma Rodriguez', totalPoints: 1050, eventsAttended: 35 },
  { rank: 4, userId: 'user_004', name: 'Jamal Thompson', totalPoints: 920, eventsAttended: 31 },
  { rank: 5, userId: 'user_005', name: 'Priya Patel', totalPoints: 875, eventsAttended: 29 },
  { rank: 6, userId: 'user_006', name: 'Chen Wei', totalPoints: 820, eventsAttended: 27 },
  { rank: 7, userId: 'user_007', name: 'Isabella Martinez', totalPoints: 780, eventsAttended: 26 },
  { rank: 8, userId: 'user_008', name: 'David Kim', totalPoints: 745, eventsAttended: 25 },
  { rank: 9, userId: 'user_009', name: 'Aisha Mohammed', totalPoints: 690, eventsAttended: 23 },
  { rank: 10, userId: 'user_010', name: 'Lucas Silva', totalPoints: 650, eventsAttended: 22 },
  { rank: 11, userId: 'user_011', name: 'Fatima Abbas', totalPoints: 580, eventsAttended: 19 },
  { rank: 12, userId: 'user_123', name: 'Alex Johnson', totalPoints: 450, eventsAttended: 15 }
];

// Event categories for points calculation
const eventCategories = [
  { id: 'academic', name: 'Academic', multiplier: 1.2 },
  { id: 'social', name: 'Social', multiplier: 1.0 },
  { id: 'sports', name: 'Sports', multiplier: 1.0 },
  { id: 'community', name: 'Community Service', multiplier: 1.5 },
  { id: 'cultural', name: 'Cultural', multiplier: 1.1 }
];

module.exports = {
  mockUser,
  mockRewards,
  mockPointsHistory,
  mockLeaderboard,
  eventCategories
};