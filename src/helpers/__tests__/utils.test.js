import { removeTrailingSlash, realObjectCopy, isNodeId } from '../utils';

describe('Utils helpers', () => {
  describe('removeTrailingSlash', () => {
    it('Should remove the trailing slash when it is present', () => {
      expect(removeTrailingSlash('azertyuiop/')).toBe('azertyuiop');
      expect(removeTrailingSlash('http://azertyuiop/')).toBe(
        'http://azertyuiop'
      );
    });

    it('Should not remove anything when the trainling slash is not present', () => {
      expect(removeTrailingSlash('azertyuiop')).toBe('azertyuiop');
      expect(removeTrailingSlash('http://azertyuiop')).toBe(
        'http://azertyuiop'
      );
      expect(removeTrailingSlash('http://azertyuiop/azertyuiop')).toBe(
        'http://azertyuiop/azertyuiop'
      );
    });
  });

  describe('realObjectCopy', () => {
    it('Should properly copy an object', () => {
      const sample = {
        item1: true,
        item2: false,
        item3: ['aze', 'rty', 'uio'],
        item4: [{ aze: 1, rty: 2, uio: 3 }]
      };
      const result = realObjectCopy(sample);
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

  describe('isNodeId', () => {
    it('Should tell if an OSM ID is a node one', () => {
      expect(isNodeId('node/12345')).toBe(true);
      expect(isNodeId('way/12345')).toBe(false);
    });
  });
});
