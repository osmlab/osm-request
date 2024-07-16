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
    it('Should return a default apiUrl', () => {
      const osm = new OsmRequest();
      expect(osm.apiUrl).toBe(defaultOptions.apiUrl);
    });

    it('Should return a custom apiUrl', () => {
      const customApiUrl = 'https://my-custom-apiUrl/api/0.6';
      const osm = new OsmRequest({ apiUrl: customApiUrl });
      expect(osm.apiUrl).toBe(customApiUrl);
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
  describe('getTags', () => {
    it('returns tags of node with tag property', () => {
      const osm = new OsmRequest();
      const tags = osm.getTags(sampleNode);
      expect(tags).toMatchSnapshot();
    });

    it('returns tags of node without tag property', () => {
      const osm = new OsmRequest();
      const tags = osm.getTags(sampleNodeNoTags);
      expect(tags).toMatchSnapshot();
    });

    it('returns tags of way with tag property', () => {
      const osm = new OsmRequest();
      const tags = osm.getTags(sampleWay);
      expect(tags).toMatchSnapshot();
    });
  });
  describe('setProperty', () => {
    it('has the same behavior as setTag', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setProperty(sampleNode, tagName, tagValue);
      const expected = osm.setTag(sampleNode, tagName, tagValue);

      expect(element).toEqual(expected);
    });
  });
  describe('setTag', () => {
    it('Should add a tag to an element', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setTag(sampleNode, tagName, tagValue);

      expect(element).toMatchSnapshot();
    });

    it('Should add a tag to an element having no tag', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setTag(sampleNodeNoTags, tagName, tagValue);

      expect(element).toMatchSnapshot();
    });

    it('Should modify an element tag', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const tagValue = 'stuff';
      const element = osm.setTag(sampleNode, tagName, tagValue);

      expect(element).toMatchSnapshot();
    });
  });

  describe('setProperties', () => {
    it('Should have the same behavior as setTags', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setProperties(sampleNode, {
        [tagName]: tagValue
      });
      const expected = osm.setTags(sampleNode, {
        [tagName]: tagValue
      });
      expect(element).toEqual(expected);
    });
  });
  describe('setTags', () => {
    it('Should add a tag to an element', () => {
      const osm = new OsmRequest();
      const tagName = 'weird_key';
      const tagValue = 'stuff';
      const element = osm.setTags(sampleNode, {
        [tagName]: tagValue
      });

      expect(element).toMatchSnapshot();
    });

    it('Should modify an element tag', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const tagValue = 'stuff';
      const element = osm.setTags(sampleNode, {
        [tagName]: tagValue
      });

      expect(element).toMatchSnapshot();
    });

    it('Should work with an element having no tags', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const tagValue = 'stuff';
      const element = osm.setTags(sampleNodeNoTags, {
        [tagName]: tagValue
      });

      expect(element).toMatchSnapshot();
    });
  });

  describe('replaceTags', () => {
    it('Should completely replace existing tags', () => {
      const osm = new OsmRequest();
      const element = osm.replaceTags(sampleWay, {
        amenity: 'restaurant',
        name: 'Best Sushi in Town'
      });

      expect(element).toMatchSnapshot();
    });
  });
  describe('removeProperty', () => {
    it('Should remove a tag from an element', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const expected = osm.removeTag(sampleNode, tagName);
      const element = osm.removeProperty(sampleNode, tagName);

      expect(element).toEqual(expected);
    });
  });

  describe('removeTag', () => {
    it('Should remove a tag from an element', () => {
      const osm = new OsmRequest();
      const tagName = 'amenity';
      const element = osm.removeTag(sampleNode, tagName);

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

  describe('getRelationMembers', () => {
    it('Should return the members of a relation', () => {
      const osm = new OsmRequest();
      const members = osm.getRelationMembers(sampleRelation);

      expect(members).toMatchSnapshot();
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

  describe('fetchMultipleElements', () => {
    it('Should fetch several elements and return their JSON representations', () => {
      const osm = new OsmRequest();
      const element = osm.fetchMultipleElements([
        'node/123',
        'node/456',
        'node/678'
      ]);

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

  describe('fetchNotesSearch', () => {
    it('Should fetch notes using text search', () => {
      const osm = new OsmRequest();
      const notes = osm.fetchNotesSearch('hydrant', 'json', 3);

      expect(notes).toMatchSnapshot();
    });
  });

  describe('fetchNote', () => {
    it('Should fetch a single note by id', () => {
      const osm = new OsmRequest();
      const notes = osm.fetchNote('1781930', 'json');

      expect(notes).toMatchSnapshot();
    });
  });

  describe('createNote', () => {
    it('Should return a new note XML', () => {
      const lat = 1.234;
      const lon = -0.456;
      const text = 'there is a problem here';

      const osm = new OsmRequest();
      const newnote = osm.createNote(lat, lon, text);

      expect(newnote).toMatchSnapshot();
    });
  });

  describe('fetchMapByBbox', () => {
    it('Should fetch map elements for a given bbox', () => {
      const osm = new OsmRequest();
      const osmElements = osm.fetchMapByBbox(
        -1.78859,
        48.22076,
        -1.78784,
        48.22122
      );

      expect(osmElements).toMatchSnapshot();
    });
  });

  describe('fetchUser', () => {
    it('Should fetch a single user by id', () => {
      const osm = new OsmRequest();
      const user = osm.fetchUser('214436');

      expect(user).toMatchSnapshot();
    });
  });

  describe('createChangeset', () => {
    it('Should return the changeset ID', () => {
      const osm = new OsmRequest();
      const changesetid = osm.createChangeset('my editor', 'some comment', {
        tag: true
      });

      expect(changesetid).toBeGreaterThan(0);
    });
  });

  describe('isChangesetStillOpen', () => {
    it('Should return true if open', () => {
      const osm = new OsmRequest();
      const changesetid = osm.isChangesetStillOpen(1234);

      expect(changesetid).toBeTruthy();
    });
  });

  describe('fetchChangeset', () => {
    it('Should return changeset details', () => {
      const osm = new OsmRequest();
      const changesetid = osm.fetchChangeset(1234);

      expect(changesetid).toMatchSnapshot();
    });
  });

  describe('fetchChangesets', () => {
    it('Should return several changesets details', () => {
      const osm = new OsmRequest();
      const changesets = osm.fetchChangesets({
        left: -1.7883789539337158,
        bottom: 48.22059295273195,
        right: -1.7867642641067505,
        top: 48.221488262276665
      });

      expect(changesets).toMatchSnapshot();
    });
  });
});
