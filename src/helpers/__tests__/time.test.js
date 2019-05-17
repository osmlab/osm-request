import { getCurrentIsoTimestamp } from '../time';

describe('Time helpers', () => {
  describe('getCurrentIsoTimestamp', () => {
    it('works', () => {
      const result = getCurrentIsoTimestamp();
      expect(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(result)
      ).toBeTruthy();
    });
  });
});
