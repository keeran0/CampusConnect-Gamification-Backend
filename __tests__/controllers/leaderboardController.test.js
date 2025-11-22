const request = require('supertest');
const express = require('express');
const leaderboardRoutes = require('../../routes/leaderboard');

const app = express();
app.use(express.json());
app.use('/api/leaderboard', leaderboardRoutes);

describe('Leaderboard Controller', () => {
  describe('GET /api/leaderboard', () => {
    test('should return leaderboard data', async () => {
      const response = await request(app)
        .get('/api/leaderboard')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('leaderboard');
      expect(Array.isArray(response.body.data.leaderboard)).toBe(true);
    });

    test('should respect limit parameter', async () => {
      const limit = 5;
      const response = await request(app)
        .get(`/api/leaderboard?limit=${limit}`)
        .expect(200);

      expect(response.body.data.leaderboard.length).toBeLessThanOrEqual(limit);
    });

    test('should handle pagination', async () => {
      const response = await request(app)
        .get('/api/leaderboard?limit=5&offset=5')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('hasMore');
    });

    test('should be sorted by points descending', async () => {
      const response = await request(app)
        .get('/api/leaderboard')
        .expect(200);

      const leaderboard = response.body.data.leaderboard;
      for (let i = 0; i < leaderboard.length - 1; i++) {
        expect(leaderboard[i].totalPoints).toBeGreaterThanOrEqual(
          leaderboard[i + 1].totalPoints
        );
      }
    });
  });

  describe('GET /api/leaderboard/top', () => {
    test('should return top users', async () => {
      const response = await request(app)
        .get('/api/leaderboard/top?limit=3')
        .expect(200);

      expect(response.body.data.topUsers.length).toBeLessThanOrEqual(3);
      expect(response.body.data.topUsers[0].rank).toBe(1);
    });
  });

  describe('GET /api/leaderboard/user/:userId', () => {
    test('should return user rank and context', async () => {
      const response = await request(app)
        .get('/api/leaderboard/user/user_123')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('rank');
      expect(response.body.data).toHaveProperty('surrounding');
      expect(Array.isArray(response.body.data.surrounding)).toBe(true);
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/leaderboard/user/invalid_user')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });

    test('should respect context parameter', async () => {
      const context = 2;
      const response = await request(app)
        .get(`/api/leaderboard/user/user_123?context=${context}`)
        .expect(200);

      // Should return at most context users above and below
      expect(response.body.data.surrounding.length).toBeLessThanOrEqual(context * 2 + 1);
    });
  });

  describe('POST /api/leaderboard/refresh', () => {
    test('should trigger leaderboard refresh', async () => {
      const response = await request(app)
        .post('/api/leaderboard/refresh')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
    });
  });
});