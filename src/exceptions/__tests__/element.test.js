import { WrongElementTypeException } from '../element';

describe('Element exceptions', () => {
  describe('WrongElementTypeException', () => {
    it('Should be well formatted', () => {
      const message = 'This is a test';
      const myFunction = () => {
        throw new WrongElementTypeException(message);
      };

      expect(myFunction).toThrow(WrongElementTypeException);
      expect(myFunction).toThrow(message);
      expect(myFunction).toThrowErrorMatchingSnapshot();
    });
  });
});
