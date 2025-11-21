// backend/config/firebase.js - Update to handle environment variable credentials
const admin = require('firebase-admin');

// Check if running in production with environment variables
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Parse service account from environment variable
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
} else {
  // Development: use service account file
  const path = require('path');
  const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
}

const db = admin.firestore();

const collections = {
  users: db.collection('users'),
  points: db.collection('points'),
  rewards: db.collection('rewards'),
  redemptions: db.collection('redemptions'),
  pointsHistory: db.collection('pointsHistory'),
  leaderboard: db.collection('leaderboard')
};

module.exports = {
  admin,
  db,
  collections
};