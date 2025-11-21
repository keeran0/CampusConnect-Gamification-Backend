# CampusConnect Gamification Module - Backend API

RESTful API for the student engagement and rewards system.

## 🚀 Features

- **Points Management**: Award, track, and calculate points
- **Rewards System**: Catalog management and redemption
- **Leaderboard**: Rankings and user statistics
- **Firebase Integration**: Firestore database

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase Admin SDK** - Database and authentication
- **Axios** - HTTP client (for testing)

## 📋 Prerequisites

- Node.js 18+
- Firebase project with Firestore enabled
- Service account key JSON file

## 🏃 Getting Started

### Installation
```bash
# Install dependencies
npm install
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save as `serviceAccountKey.json` in backend root
6. **NEVER commit this file to Git!**

### Environment Setup

Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Database Setup

1. In Firebase Console, go to Build > Firestore Database
2. Click "Create Database"
3. Choose "Start in test mode" (for development)
4. Select your region

### Development
```bash
# Start development server with auto-reload
npm run dev

# API will be available at http://localhost:5000
```

### Testing
```bash
# Run API tests
node test-api.js

# Test health endpoint
curl http://localhost:5000/api/health
```

## 📁 Project Structure
```
backend/
├── config/
│   └── firebase.js          # Firebase initialization
├── controllers/
│   ├── pointsController.js   # Points business logic
│   ├── rewardsController.js  # Rewards business logic
│   └── leaderboardController.js
├── routes/
│   ├── points.js            # Points endpoints
│   ├── rewards.js           # Rewards endpoints
│   └── leaderboard.js       # Leaderboard endpoints
├── middleware/
│   ├── auth.js              # Authentication (future)
│   └── errorHandler.js      # Error handling
├── utils/
│   ├── pointsCalculator.js  # Points calculation logic
│   └── validators.js        # Input validation
├── data/
│   └── mockData.js          # Development data
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── server.js               # Entry point
└── package.json
```

## 🔌 API Endpoints

### Points
```
GET    /api/points/:userId              # Get user points
GET    /api/points/:userId/history      # Get points history
POST   /api/points/award                # Award points
```

### Rewards
```
GET    /api/rewards                     # Get all rewards
GET    /api/rewards/:rewardId           # Get specific reward
POST   /api/rewards/redeem              # Redeem reward
GET    /api/rewards/user/:userId/redemptions  # Get user redemptions
```

### Leaderboard
```
GET    /api/leaderboard                 # Get global leaderboard
GET    /api/leaderboard/top             # Get top N users
GET    /api/leaderboard/user/:userId    # Get user rank
POST   /api/leaderboard/refresh         # Refresh rankings
```

### Health Check
```
GET    /api/health                      # Server status
```

## 📊 Data Models

### User Points
```javascript
{
  userId: string,
  totalPoints: number,
  availablePoints: number,
  categoriesAttended: string[],
  lastUpdated: timestamp
}
```

### Reward
```javascript
{
  id: string,
  title: string,
  description: string,
  pointsCost: number,
  category: string,
  imageUrl: string,
  stock: number,
  isActive: boolean
}
```

### Point Transaction
```javascript
{
  id: string,
  userId: string,
  eventId: string,
  eventTitle: string,
  eventCategory: string,
  pointsEarned: number,
  timestamp: timestamp,
  bonusType: string | null
}
```

## 🎯 Points Calculation

**Base System:**
- Base points per event: 10
- New category bonus: +5
- First event of month: +15
- Category multipliers:
  - Academic: 1.2x
  - Community Service: 1.5x
  - Cultural: 1.1x

**Example:**
```
User attends Community Service event (new category)
= (10 base + 5 bonus) × 1.5 multiplier
= 22.5 → 23 points (rounded)
```

## 🔒 Security Best Practices

1. **Never commit credentials**
   - serviceAccountKey.json must be in .gitignore
   - Use environment variables for secrets

2. **Input validation**
   - Validate all request data
   - Sanitize user inputs

3. **Error handling**
   - Don't expose internal errors to clients
   - Log errors securely

4. **CORS configuration**
   - Restrict to known origins
   - Don't use wildcard in production

## 🧪 Testing

### Manual Testing with cURL
```bash
# Get user points
curl http://localhost:5000/api/points/user_123

# Award points
curl -X POST http://localhost:5000/api/points/award \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_123","eventId":"event_1","eventCategory":"academic"}'

# Get rewards
curl http://localhost:5000/api/rewards

# Redeem reward
curl -X POST http://localhost:5000/api/rewards/redeem \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_123","rewardId":"reward_1"}'
```

### Automated Testing

Run the test script:
```bash
node test-api.js
```

## 🐛 Common Issues

### Port already in use
```bash
# Kill process on port 5000
npx kill-port 5000
```

### Firebase connection errors
- Check serviceAccountKey.json exists
- Verify Firebase project settings
- Check internet connection

### CORS errors
- Verify CORS_ORIGIN in .env matches frontend URL
- Check frontend is running on correct port

## 📝 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start with auto-reload (nodemon)
- `node test-api.js` - Run API tests

## 🚀 Deployment Checklist

- [ ] Set NODE_ENV=production
- [ ] Use production Firebase credentials
- [ ] Configure proper CORS origins
- [ ] Set up environment variables on hosting platform
- [ ] Enable Firebase security rules
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Enable HTTPS

## 🤝 Contributing

1. Create a feature branch
2. Write tests for new features
3. Update documentation
4. Submit pull request

## 📄 License

MIT License

## 👥 Team

Gamification Team - Team 6