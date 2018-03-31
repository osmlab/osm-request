import { buildChangesetXml } from '../xml';

describe('XML helpers', () => {
  describe('buildChangesetXml', () => {
    it('Should build a stringified OSM changeset', () => {
      expect(buildChangesetXml('me', 'my comment')).toMatchSnapshot();
      expect(buildChangesetXml()).toMatchSnapshot();
    });
  });
});
