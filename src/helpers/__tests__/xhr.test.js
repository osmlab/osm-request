import { fetch, authxhr } from '../xhr';

describe('XHR helpers', () => {
  describe('fetch', () => {
    it('works with cross-fetch (no auth)', async () => {
      const res = await fetch('https://whatev.er/file.json');
      expect(res).toBeTruthy();
      expect(typeof res).toBe('string');
      expect(res.length).toBeGreaterThan(0);
    });

    it('works with OAuth', async () => {
      const res = await authxhr(
        { method: 'GET', path: 'https://whatev.er/file.json' },
        { xhr: (opts, callback) => callback(null, 'OK') }
      );
      expect(res).toBeTruthy();
    });
  });

  describe('authxhr', () => {
    it('works with basic auth', async () => {
      const res = await authxhr(
        { method: 'GET', path: 'https://whatev.er/file.json' },
        { basic: { user: 'User', pass: 'Pass' } }
      );
      expect(res).toBeTruthy();
    });

    it('works with OAuth', async () => {
      const res = await authxhr(
        { method: 'GET', path: 'https://whatev.er/file.json' },
        { xhr: (opts, callback) => callback(null, 'OK') }
      );
      expect(res).toBeTruthy();
    });
  });
});
