import { RequestException } from '../request';

describe('GeoJSON exceptions', () => {
  describe('RequestException', () => {
    it('Should be well formatted', () => {
      const message = 'This is a test';
      const myFunction = () => {
        throw new RequestException(message);
      };

      expect(myFunction).toThrow(RequestException);
      expect(myFunction).toThrow(message);
      expect(myFunction).toThrowErrorMatchingSnapshot();
    });
  });
});
