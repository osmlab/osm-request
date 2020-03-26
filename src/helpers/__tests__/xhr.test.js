import { fetch, authxhr } from '../xhr';

describe('XHR helpers', () => {
  describe('fetch', () => {
    it('Gets data from given URL', async () => {
      const res = await fetch(
        'https://files.pavie.info/depot/remote/example.json'
      );
      expect(res).toBeTruthy();
      expect(typeof res).toBe('string');
      expect(res.length).toBeGreaterThan(0);
    });

    it('Fails at 404', async () => {
      await expect(
        fetch('https://files.pavie.info/nowhere.json')
      ).rejects.toBeInstanceOf(Error);
    });
  });

  describe('authxhr', () => {
    it('works with basic auth', async () => {
      const res = await authxhr(
        { method: 'GET', path: 'https://authenticationtest.com/HTTPAuth/' },
        { basic: { user: 'User', pass: 'Pass' } }
      );
      expect(res).toBeTruthy();
    });
  });
});
