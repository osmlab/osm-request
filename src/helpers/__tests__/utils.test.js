import {
  removeTrailingSlashes,
  simpleObjectDeepClone,
  buildQueryString,
  findElementType,
  findElementId
} from '../utils';

describe('Utils helpers', () => {
  describe('removeTrailingSlashes', () => {
    it('Should remove the trailing slash when it is present', () => {
      expect(removeTrailingSlashes('azertyuiop/')).toBe('azertyuiop');
      expect(removeTrailingSlashes('http://azertyuiop/')).toBe(
        'http://azertyuiop'
      );
    });

    it('Should not remove anything when the trainling slash is not present', () => {
      expect(removeTrailingSlashes('azertyuiop')).toBe('azertyuiop');
      expect(removeTrailingSlashes('http://azertyuiop')).toBe(
        'http://azertyuiop'
      );
      expect(removeTrailingSlashes('http://azertyuiop/azertyuiop')).toBe(
        'http://azertyuiop/azertyuiop'
      );
    });
  });

  describe('findElementType', () => {
    it('Should find and return an OSM element type from a full OSM ID', () => {
      expect(findElementType('node/1234')).toBe('node');
      expect(findElementType('way/4567')).toBe('way');
      expect(findElementType('relation/890')).toBe('relation');
    });
  });

  describe('findElementId', () => {
    it('Should find and return an OSM element ID from a full OSM ID', () => {
      expect(findElementId('node/1234')).toBe('1234');
      expect(findElementId('way/4567')).toBe('4567');
      expect(findElementId('relation/890')).toBe('890');
    });
  });

  describe('simpleObjectDeepClone', () => {
    it('Should properly copy an object', () => {
      const sample = {
        item1: true,
        item2: false,
        item3: ['aze', 'rty', 'uio'],
        item4: [{ aze: 1, rty: 2, uio: 3 }]
      };
      const result = simpleObjectDeepClone(sample);
      result.item1 = false;
      result.item2 = true;
      result.item3[0] = 'test';
      result.item4[0].aze = 11;
      result.item4[0].rty = 22;
      result.item4[0].uio = 33;

      expect(sample).not.toEqual(result);
      expect(sample.item1).not.toBe(result.item1);
      expect(sample.item2).not.toBe(result.item2);
      expect(sample.item3).not.toBe(result.item3);
      expect(sample.item3[0]).not.toBe(result.item3[0]);
      expect(sample.item4).not.toBe(result.item4);
      expect(sample.item4).not.toEqual(result.item4);
      expect(sample.item4[0]).not.toBe(result.item4[0]);
      expect(sample.item4[0]).not.toEqual(result.item4[0]);
    });
  });

  describe('buildQueryString', () => {
    it('Should return a valid query string', () => {
      const params = {
        param1: 'stuff',
        'param-2': 'stuff 2',
        param_3: 'stuff 3'
      };
      const result = buildQueryString(params);
      const expected = '?param1=stuff&param-2=stuff%202&param_3=stuff%203';

      expect(result).toBe(expected);
    });
  });
});
