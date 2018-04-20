import { buildChangesetXml } from '../xml';

jest.mock('../../../package.json', () => ({
  version: '1.2.3'
}));

describe('XML helpers', () => {
  describe('buildChangesetXml', () => {
    it('Should build a stringified OSM changeset', () => {
      expect(buildChangesetXml('me', 'my comment')).toMatchSnapshot();
      expect(buildChangesetXml()).toMatchSnapshot();
    });
  });
});
