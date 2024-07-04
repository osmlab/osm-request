import { fetch, authxhr } from '../xhr';

describe('XHR helpers', () => {
  describe('fetch', () => {
    it('works with cross-fetch (no auth)', async () => {
      const res = await fetch('https://whatev.er/file.json');
      expect(res).toBeTruthy();
      expect(typeof res).toBe('string');
      expect(res.length).toBeGreaterThan(0);
      expect(res).toEqual('Mock cross-fetch success');
    });

    it('fetch handles non-200 status codes', async () => {
      try {
        await fetch('https://whatev.er/notfound.json');
        throw new Error('Test failed because fetch did not throw an error');
      } catch (error) {
        expect(error.name).toEqual('RequestException');
        expect(error.message).toEqual(
          JSON.stringify({
            message: 'Mock cross-fetch error',
            status: 404,
            statusText: 'Not Found'
          })
        );
      }
    });

    it('works with OAuth', async () => {
      const expected = 'OK';
      const res = await authxhr(
        { method: 'GET', path: 'https://whatev.er/file.json' },
        { xhr: (opts, callback) => callback(null, expected) }
      );
      expect(res).toBeTruthy();
      expect(res).toEqual(expected);
    });

    it('authxhr handles authentication error with non-200 status code', async () => {
      const opts = {};
      const err = { status: 404, statusText: 'Not Found' };
      const auth = { xhr: (opts, callback) => callback(err, null) };

      try {
        await authxhr(opts, auth);
        throw new Error('Test failed because authxhr did not throw an error');
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

    it('throws RequestException when auth.xhr callback returns an error', async () => {
      const url = 'https://whatev.er/file.json';
      const err = { status: 404, statusText: 'Not Found' };
      const opts = { auth: { xhr: (opts, callback) => callback(err, null) } };
      try {
        await fetch(url, opts);
        throw new Error('Test failed because fetch did not throw an error');
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
      expect(res).toBeTruthy();

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
      expect(res).toEqual('Mock cross-fetch success');
    });

    it('authxhr handles response with non-200 status code ', async () => {
      const content = 'default content';
      const header = { 'Content-Type': 'application/json' };
      const opts = {
        method: 'GET',
        path: 'https://whatev.er/notfound.json',
        content: content,
        options: {
          header: header
        }
      };
      const auth = { skip: true };
      try {
        await authxhr(opts, auth);
        throw new Error('Test failed because authxhr did not throw an error');
      } catch (error) {
        expect(error.name).toEqual('RequestException');
        expect(error.message).toEqual(
          JSON.stringify({
            message: 'Mock cross-fetch error',
            status: 404,
            statusText: 'Not Found'
          })
        );
        expect(opts.body).toEqual(content);
        expect(opts.headers).toEqual(header);
      }
    });

    it('works with OAuth', async () => {
      const expected = 'OK';
      const res = await authxhr(
        { method: 'GET', path: 'https://whatev.er/file.json' },
        { xhr: (opts, callback) => callback(null, expected) }
      );
      expect(res).toBeTruthy();
      expect(res).toEqual(expected);
    });
  });
});
