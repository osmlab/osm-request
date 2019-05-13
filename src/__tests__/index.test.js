jest.mock('../requests');
jest.mock('../helpers/time');

import defaultOptions from '../defaultOptions.json';
import OsmRequest from '../index';

const sampleNode = {
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
  tag: [],
  _id: '3683625932',
  _type: 'node'
};

const sampleNodeNoTags = JSON.parse(JSON.stringify(sampleNode));
delete sampleNodeNoTags.tag;

const sampleWay = {
  $: {
    id: '211323881',
    visible: 'true',
    version: '9',
    changeset: '65048894',
    timestamp: '2018-11-30T15:49:04Z',
    user: 'noyeux',
    uid: '4154080'
  },
  nd: [
    {
      $: {
        ref: '2213384362'
      }
    },
    {
      $: {
        ref: '2179769628'
      }
    },
    {
      $: {
        ref: '2179769632'
      }
    },
    {
      $: {
        ref: '511563694'
      }
    },
    {
      $: {
        ref: '511563688'
      }
    },
    {
      $: {
        ref: '511563666'
      }
    },
    {
      $: {
        ref: '511563658'
      }
    },
    {
      $: {
        ref: '511563655'
      }
    },
    {
      $: {
        ref: '511563646'
      }
    },
    {
      $: {
        ref: '1425983435'
      }
    },
    {
      $: {
        ref: '5370456212'
      }
    },
    {
      $: {
        ref: '2032716031'
      }
    },
    {
      $: {
        ref: '2032716064'
      }
    },
    {
      $: {
        ref: '2032716087'
      }
    },
    {
      $: {
        ref: '2894299077'
      }
    },
    {
      $: {
        ref: '2357342688'
      }
    },
    {
      $: {
        ref: '2173133206'
      }
    },
    {
      $: {
        ref: '2173133198'
      }
    },
    {
      $: {
        ref: '1979037083'
      }
    },
    {
      $: {
        ref: '1979037078'
      }
    },
    {
      $: {
        ref: '6106498823'
      }
    },
    {
      $: {
        ref: '1979037077'
      }
    },
    {
      $: {
        ref: '2179769629'
      }
    },
    {
      $: {
        ref: '2213384362'
      }
    }
  ],
  tag: [
    {
      $: {
        k: 'alt_name',
        v: "L'Estréniol"
      }
    },
    {
      $: {
        k: 'landuse',
        v: 'retail'
      }
    },
    {
      $: {
        k: 'name',
        v: 'Pôle commercial du Comtal Ouest'
      }
    },
    {
      $: {
        k: 'old_name',
        v: "Zone Commercial l'Astragale"
      }
    },
    {
      $: {
        k: 'wikipedia',
        v: 'fr:Le Comtal (Sébazac-Concourès)'
      }
    }
  ],
  _id: '211323881',
  _type: 'way'
};

const sampleWayNoTags = JSON.parse(JSON.stringify(sampleWay));
delete sampleWayNoTags.tag;

const sampleRelation = {
  $: {
    id: '2068206',
    visible: 'true',
    version: '2',
    changeset: '14958524',
    timestamp: '2013-02-08T18:11:06Z',
    user: 'isnogoud_bot',
    uid: '1220754'
  },
  member: [
    {
      $: {
        type: 'way',
        ref: '27847742',
        role: 'street'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643084',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643085',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643086',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643099',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643103',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643107',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643114',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643117',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643121',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643124',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643129',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643132',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643138',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643143',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643152',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643156',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643160',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643162',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643165',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643169',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643172',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643176',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643180',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643183',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643187',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643191',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643192',
        role: 'house'
      }
    },
    {
      $: {
        type: 'node',
        ref: '1659643196',
        role: 'house'
      }
    }
  ],
  tag: [
    {
      $: {
        k: 'name',
        v: 'Rue de Belleville'
      }
    },
    {
      $: {
        k: 'ref:FR:FANTOIR',
        v: '728'
      }
    },
    {
      $: {
        k: 'type',
        v: 'associatedStreet'
      }
    }
  ],
  _id: '2068206',
  _type: 'relation'
};

const sampleRelationNoTags = JSON.parse(JSON.stringify(sampleRelation));
delete sampleRelationNoTags.tag;

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
      const tags = {
        aze: 'rty',
        uio: 'pqs'
      };
      const osm = new OsmRequest();
      const elementWithTags = osm.createNodeElement(lat, lon, tags);
      const elementWithoutTags = osm.createNodeElement(lat, lon);

      expect(elementWithTags).toMatchSnapshot();
      expect(elementWithoutTags).toMatchSnapshot();
    });
  });

  describe('createWayElement', () => {
    it('Should return a new way element', () => {
      const nodeIds = [
        'node/2213384362',
        'node/2179769628',
        'node/2179769632',
        'node/511563694',
        'node/511563688',
        'node/511563666',
        'node/511563658',
        'node/511563655',
        'node/511563646',
        'node/1425983435',
        'node/5370456212',
        'node/2032716031',
        'node/2032716064',
        'node/2032716087',
        'node/2894299077',
        'node/2357342688',
        'node/2173133206',
        'node/2173133198',
        'node/1979037083',
        'node/1979037078',
        'node/6106498823',
        'node/1979037077',
        'node/2179769629',
        'node/2213384362'
      ];
      const tags = {
        aze: 'rty',
        uio: 'pqs'
      };
      const osm = new OsmRequest();
      const elementWithTags = osm.createWayElement(nodeIds, tags);
      const elementWithoutTags = osm.createWayElement(nodeIds);

      expect(elementWithTags).toMatchSnapshot();
      expect(elementWithoutTags).toMatchSnapshot();
    });
  });

  describe('createRelationElement', () => {
    it('Should return a new relation element', () => {
      const osmElementObjects = [
        {
          role: 'street',
          id: 'way/27847742'
        },
        {
          role: 'house',
          id: 'node/1659643084'
        },
        {
          role: 'house',
          id: 'node/1659643085'
        },
        {
          role: 'house',
          id: 'node/1659643086'
        },
        {
          role: 'house',
          id: 'node/1659643099'
        },
        {
          role: 'house',
          id: 'node/1659643103'
        },
        {
          role: 'house',
          id: 'node/1659643107'
        },
        {
          role: 'house',
          id: 'node/1659643114'
        },
        {
          role: 'house',
          id: 'node/1659643117'
        },
        {
          role: 'house',
          id: 'node/1659643121'
        },
        {
          role: 'house',
          id: 'node/1659643124'
        },
        {
          role: 'house',
          id: 'node/1659643129'
        },
        {
          role: 'house',
          id: 'node/1659643132'
        },
        {
          role: 'house',
          id: 'node/1659643138'
        },
        {
          role: 'house',
          id: 'node/1659643143'
        },
        {
          role: 'house',
          id: 'node/1659643152'
        },
        {
          role: 'house',
          id: 'node/1659643156'
        },
        {
          role: 'house',
          id: 'node/1659643160'
        },
        {
          role: 'house',
          id: 'node/1659643162'
        },
        {
          role: 'house',
          id: 'node/1659643165'
        },
        {
          role: 'house',
          id: 'node/1659643169'
        },
        {
          role: 'house',
          id: 'node/1659643172'
        },
        {
          role: 'house',
          id: 'node/1659643176'
        },
        {
          role: 'house',
          id: 'node/1659643180'
        },
        {
          role: 'house',
          id: 'node/1659643183'
        },
        {
          role: 'house',
          id: 'node/1659643187'
        },
        {
          role: 'house',
          id: 'node/1659643191'
        },
        {
          role: 'house',
          id: 'node/1659643192'
        },
        {
          role: 'house',
          id: 'node/1659643196'
        }
      ];
      const tags = {
        aze: 'rty',
        uio: 'pqs'
      };
      const osm = new OsmRequest();
      const elementWithTags = osm.createRelationElement(
        osmElementObjects,
        tags
      );
      const elementWithoutTags = osm.createRelationElement(osmElementObjects);

      expect(elementWithTags).toMatchSnapshot();
      expect(elementWithoutTags).toMatchSnapshot();
    });
  });
  describe('setProperty', () => {
    it('Should add a tag to an element', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setProperty(sampleNode, tagName, tagValue);

      expect(element).toMatchSnapshot();
    });

    it('Should add a tag to an element having no tag', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setProperty(sampleNodeNoTags, tagName, tagValue);

      expect(element).toMatchSnapshot();
    });

    it('Should modify an element tag', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const tagValue = 'stuff';
      const element = osm.setProperty(sampleNode, tagName, tagValue);

      expect(element).toMatchSnapshot();
    });
  });

  describe('setProperties', () => {
    it('Should add a tag to an element', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setProperties(sampleNode, {
        [tagName]: tagValue
      });

      expect(element).toMatchSnapshot();
    });

    it('Should modify an element tag', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const tagValue = 'stuff';
      const element = osm.setProperties(sampleNode, {
        [tagName]: tagValue
      });

      expect(element).toMatchSnapshot();
    });

    it('Should work with an element having no tags', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const tagValue = 'stuff';
      const element = osm.setProperties(sampleNodeNoTags, {
        [tagName]: tagValue
      });

      expect(element).toMatchSnapshot();
    });
  });

  describe('removeProperty', () => {
    it('Should remove a tag from an element', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const element = osm.removeProperty(sampleNode, tagName);

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
    it('Should fetch an element and returned its JSON representation', () => {
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

  describe('fetchMapByBbox', () => {
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
