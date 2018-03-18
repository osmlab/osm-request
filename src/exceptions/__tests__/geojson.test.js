import { GeoJSONException } from '../geojson';

describe('GeoJSON exceptions', () => {
  describe('GeoJSONException', () => {
    it('Should be well formatted', () => {
      const message = 'This is a test';
      const myFunction = () => {
        throw new GeoJSONException(message);
      };

      expect(myFunction).toThrow(GeoJSONException);
      expect(myFunction).toThrow(message);
      expect(myFunction).toThrowErrorMatchingSnapshot();
    });
  });
});
