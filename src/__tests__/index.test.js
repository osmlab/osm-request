jest.mock('../requests');
jest.mock('../helpers/time');

import defaultOptions from '../defaultOptions.json';
import OsmRequest from '../index';

const sampleNode = {
  osm: {
    $: {},
    node: [
      {
        $: {
          id: '3683625932',
          visible: 'true',
          version: '1',
          timestamp: '2015-08-06T09:49:47Z',
          changeset: '33150668',
          user: 'Vinber-Num&Lib',
          uid: '2568974',
          lat: '-0.5936602',
          lon: '44.8331455'
        },
        tag: []
      }
    ]
  },
  _id: '3683625932',
  _type: 'node'
};

const sampleNodeNoTags = {
  osm: {
    $: {},
    node: [
      {
        $: {
          id: '3683625932',
          visible: 'true',
          version: '1',
          timestamp: '2015-08-06T09:49:47Z',
          changeset: '33150668',
          user: 'Vinber-Num&Lib',
          uid: '2568974',
          lat: '-0.5936602',
          lon: '44.8331455'
        }
      }
    ]
  },
  _id: '3683625932',
  _type: 'node'
};

describe('OsmRequest', () => {
  describe('Getters', () => {
    it('Should return a default endpoint', () => {
      const osm = new OsmRequest();
      expect(osm.endpoint).toBe(defaultOptions.endpoint);
    });

    it('Should return a custom endpoint', () => {
      const customEndpoint = 'https://my-custom-endpoint/api/0.6';
      const osm = new OsmRequest({ endpoint: customEndpoint });
      expect(osm.endpoint).toBe(customEndpoint);
    });
  });

  describe('createNodeElement', () => {
    it('Should return a new element', () => {
      const lat = 1.234;
      const lon = -0.456;
      const properties = {
        aze: 'rty',
        uio: 'pqs'
      };
      const osm = new OsmRequest();
      const elementWithProperties = osm.createNodeElement(lat, lon, properties);
      const elementWithoutProperties = osm.createNodeElement(lat, lon);

      expect(elementWithProperties).toMatchSnapshot();
      expect(elementWithoutProperties).toMatchSnapshot();
    });
  });

  describe('setProperty', () => {
    it('Should add a property to an element', () => {
      const osm = new OsmRequest();
      const propertyName = 'weird_key';
      const propertyValue = 'stuff';
      const element = osm.setProperty(sampleNode, propertyName, propertyValue);

      expect(element).toMatchSnapshot();
    });

    it('Should add a property to an element having no tag', () => {
      const osm = new OsmRequest();
      const propertyName = 'weird_key';
      const propertyValue = 'stuff';
      const element = osm.setProperty(
        sampleNodeNoTags,
        propertyName,
        propertyValue
      );

      expect(element).toMatchSnapshot();
    });

    it('Should modify an element property', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const propertyValue = 'stuff';
      const element = osm.setProperty(sampleNode, propertyName, propertyValue);

      expect(element).toMatchSnapshot();
    });
  });

  describe('setProperties', () => {
    it('Should add a property to an element', () => {
      const osm = new OsmRequest();
      const propertyName = 'weird_key';
      const propertyValue = 'stuff';
      const element = osm.setProperties(sampleNode, {
        [propertyName]: propertyValue
      });

      expect(element).toMatchSnapshot();
    });

    it('Should modify an element property', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const propertyValue = 'stuff';
      const element = osm.setProperties(sampleNode, {
        [propertyName]: propertyValue
      });

      expect(element).toMatchSnapshot();
    });

    it('Should work with an element having no tags', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const propertyValue = 'stuff';
      const element = osm.setProperties(sampleNodeNoTags, {
        [propertyName]: propertyValue
      });

      expect(element).toMatchSnapshot();
    });
  });

  describe('removeProperty', () => {
    it('Should remove a property from an element', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const element = osm.removeProperty(sampleNode, propertyName);

      expect(element).toMatchSnapshot();
    });
  });

  describe('setCoordinates', () => {
    it('Should update the coordinates of an element', () => {
      const lat = 1.234;
      const lon = -0.456;
      const osm = new OsmRequest();
      const element = osm.setCoordinates(sampleNode, lat, lon);

      expect(element).toMatchSnapshot();
    });
  });

  describe('setTimestampToNow', () => {
    it('Should update the timestamp of an element', () => {
      const osm = new OsmRequest();
      const element = osm.setTimestampToNow(sampleNode);

      expect(element).toMatchSnapshot();
    });
  });

  describe('setVersion', () => {
    it('Should change the version number of an element', () => {
      const osm = new OsmRequest();
      const element = osm.setVersion(sampleNode, 3);

      expect(element).toMatchSnapshot();
    });
  });

  describe('fetchElement', () => {
    it('Should fetch an elmeent and returned its JSON representation', () => {
      const osm = new OsmRequest();
      const element = osm.fetchElement(1234);

      expect(element).toMatchSnapshot();
    });
  });

  describe('fetchWaysForNode', () => {
    it('Should fetch ways using this node and return their JSON representation', () => {
      const osm = new OsmRequest();
      const ways = osm.fetchWaysForNode('node/5336441517');

      expect(ways).toMatchSnapshot();
    });
  });

  describe('fetchNotes', () => {
    it('Should fetch notes from a given bbox', () => {
      const osm = new OsmRequest();
      const notes = osm.fetchNotes(0, 0, 1, 1);

      expect(notes).toMatchSnapshot();
    });
  });

  describe('fetchMapForBbox', () => {
    it('Should fetch map elements for a given bbox', () => {
      const osm = new OsmRequest();
      const osmElements = osm.fetchMapByBbox(
        -1.55511,
        47.21283,
        -1.55261,
        47.21377
      );

      expect(osmElements).toMatchSnapshot();
    });
  });
});
