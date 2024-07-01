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

    it('throws RequestException when auth.xhr callback returns an error', async () => {
      const url = 'https://whatev.er/file.json';
      const err = { status: 404, statusText: 'Not Found' };
      const opts = { auth: { xhr: (opts, callback) => callback(err, null) } };
      try {
        await fetch(url, opts);
      } catch (error) {
        expect(error.name).toEqual('RequestException');
        expect(error.message).toEqual(
          JSON.stringify({
            message: 'Request failed',
            status: err.status,
            statusText: err.statusText
          })
        );
      }
    });

    it('should return the correct XML string when auth.xhr callback returns an XMLDocument', async () => {
      const url = 'https://whatev.er/file.json';
      const xml = '<root>test</root>';
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'application/xml');
      const opts = { auth: { xhr: (opts, callback) => callback(null, doc) } };

      const res = await fetch(url, opts);
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(res);

      expect(xmlString).toEqual(xml);
    });
  });

  describe('authxhr', () => {
    it('throws an error when basic auth is used', async () => {
      const opts = { method: 'GET', path: 'https://whatev.er/file.json' };
      const auth = { basic: { user: 'User', pass: 'Pass' } };

      expect(() => authxhr(opts, auth)).toThrow(
        'Authenticated XHR needs OAuth information'
      );
    });

    it('works with skipped auth', async () => {
      const res = await authxhr(
        { method: 'GET', path: 'https://whatev.er/file.json' },
        { skip: true }
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
