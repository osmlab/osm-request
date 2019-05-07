import { RequestException } from '../request';

const message = 'My message';

function failer() {
  throw new RequestException(message);
}

describe('RequestException', () => {
  it('Should correctly throw', () => {
    expect(failer).toThrow();
    expect(failer).toThrow(message);
  });
});
