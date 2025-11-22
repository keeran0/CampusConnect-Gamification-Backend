const { calculatePoints } = require('../../controllers/pointsController');

describe('Points Calculator', () => {
  describe('Base Points Calculation', () => {
    test('should award 10 base points for regular event', () => {
      const points = calculatePoints('social', ['academic'], false);
      expect(points).toBe(15); // 10 base + 5 new category
    });

    test('should award base points without bonus for same category', () => {
      const points = calculatePoints('academic', ['academic', 'social'], false);
      expect(points).toBe(12); // 10 base * 1.2 multiplier
    });
  });

  describe('New Category Bonus', () => {
    test('should add 5 points for new category', () => {
      const points = calculatePoints('sports', ['academic'], false);
      expect(points).toBe(15); // 10 base + 5 new category bonus
    });

    test('should not add bonus if category already attended', () => {
      const points = calculatePoints('sports', ['sports', 'academic'], false);
      expect(points).toBe(10); // 10 base only
    });

    test('should work with empty categories array', () => {
      const points = calculatePoints('social', [], false);
      expect(points).toBe(15); // 10 base + 5 new category
    });
  });

  describe('First Monthly Bonus', () => {
    test('should add 15 points for first event of month', () => {
      const points = calculatePoints('social', ['social'], true);
      expect(points).toBe(25); // 10 base + 15 monthly bonus
    });

    test('should combine monthly and new category bonuses', () => {
      const points = calculatePoints('academic', ['social'], true);
      expect(points).toBe(36); // (10 + 5 + 15) * 1.2 = 36
    });
  });

  describe('Category Multipliers', () => {
    test('should apply 1.2x multiplier for academic events', () => {
      const points = calculatePoints('academic', ['academic'], false);
      expect(points).toBe(12); // 10 * 1.2
    });

    test('should apply 1.5x multiplier for community service', () => {
      const points = calculatePoints('community', ['community'], false);
      expect(points).toBe(15); // 10 * 1.5
    });

    test('should apply 1.1x multiplier for cultural events', () => {
      const points = calculatePoints('cultural', ['cultural'], false);
      expect(points).toBe(11); // 10 * 1.1
    });

    test('should apply 1.0x multiplier for social events', () => {
      const points = calculatePoints('social', ['social'], false);
      expect(points).toBe(10); // 10 * 1.0
    });

    test('should apply 1.0x multiplier for sports events', () => {
      const points = calculatePoints('sports', ['sports'], false);
      expect(points).toBe(10); // 10 * 1.0
    });
  });

  describe('Complex Scenarios', () => {
    test('should handle maximum possible points correctly', () => {
      // New community service category + first monthly
      const points = calculatePoints('community', [], true);
      expect(points).toBe(45); // (10 + 5 + 15) * 1.5 = 45
    });

    test('should round decimal points correctly', () => {
      const points = calculatePoints('academic', [], true);
      expect(points).toBe(36); // (10 + 5 + 15) * 1.2 = 36
    });

    test('should handle unknown category gracefully', () => {
      const points = calculatePoints('unknown', ['academic'], false);
      expect(points).toBe(15); // Falls back to base + new category
    });
  });
});