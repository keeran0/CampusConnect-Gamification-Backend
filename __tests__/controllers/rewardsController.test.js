const request = require('supertest');
const express = require('express');
const pointsRoutes = require('../../routes/points');

// test app
const app = express();
app.use(express.json());
app.use('/api/points', pointsRoutes);

describe('Points Controller', () => {
  describe('GET /api/points/:userId', () => {
    test('should return user points for valid user', async () => {
      const response = await request(app)
        .get('/api/points/user_123')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('userId');
      expect(response.body.data).toHaveProperty('totalPoints');
      expect(response.body.data).toHaveProperty('availablePoints');
      expect(response.body.data).toHaveProperty('categoriesAttended');
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/points/invalid_user')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/points/:userId/history', () => {
    test('should return points history', async () => {
      const response = await request(app)
        .get('/api/points/user_123/history')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('history');
      expect(Array.isArray(response.body.data.history)).toBe(true);
      expect(response.body.data).toHaveProperty('total');
    });

    test('should respect pagination parameters', async () => {
      const response = await request(app)
        .get('/api/points/user_123/history?limit=2&offset=0')
        .expect(200);

      expect(response.body.data.history.length).toBeLessThanOrEqual(2);
    });

    test('should handle invalid pagination gracefully', async () => {
      const response = await request(app)
        .get('/api/points/user_123/history?limit=abc')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('POST /api/points/award', () => {
    test('should award points with valid data', async () => {
      const pointsData = {
        userId: 'user_123',
        eventId: 'event_999',
        eventTitle: 'Test Event',
        eventCategory: 'academic',
        isFirstMonthly: false
      };

      const response = await request(app)
        .post('/api/points/award')
        .send(pointsData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('pointsEarned');
      expect(response.body.data.pointsEarned).toBeGreaterThan(0);
    });

    test('should return 400 for missing userId', async () => {
      const pointsData = {
        eventId: 'event_999',
        eventCategory: 'academic'
      };

      const response = await request(app)
        .post('/api/points/award')
        .send(pointsData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toContain('userId');
    });

    test('should return 400 for missing eventId', async () => {
      const pointsData = {
        userId: 'user_123',
        eventCategory: 'academic'
      };

      const response = await request(app)
        .post('/api/points/award')
        .send(pointsData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    test('should return 400 for missing eventCategory', async () => {
      const pointsData = {
        userId: 'user_123',
        eventId: 'event_999'
      };

      const response = await request(app)
        .post('/api/points/award')
        .send(pointsData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    test('should calculate correct points with bonuses', async () => {
      const pointsData = {
        userId: 'user_123',
        eventId: 'event_999',
        eventTitle: 'Community Event',
        eventCategory: 'community',
        isFirstMonthly: true
      };

      const response = await request(app)
        .post('/api/points/award')
        .send(pointsData)
        .expect(201);

      // (10 base + 15 monthly) * 1.5 community multiplier = 37.5 → 38
      expect(response.body.data.pointsEarned).toBeGreaterThanOrEqual(37);
    });
  });
});