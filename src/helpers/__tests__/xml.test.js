import fs from 'fs';
import path from 'path';
import {
  buildChangesetXml,
  convertElementXmlToJson,
  convertNotesXmlToJson,
  flattenAttributes,
  xmlToJson,
  jsonToXml,
  encodeXML,
  buildChangesetFromObjectXml,
  buildPreferencesFromObjectXml,
  cleanMapJson,
  convertElementsListXmlToJson,
  convertUserXmlToJson
} from '../xml';

const nodeSample = fs.readFileSync(
  path.join(__dirname, '../../__mocks__/node.xml')
);
const notesSample = fs.readFileSync(
  path.join(__dirname, '../../__mocks__/notes.xml')
);
const wayFullSample = fs.readFileSync(
  path.join(__dirname, '../../__mocks__/way_full.xml')
);
const userSample = fs.readFileSync(
  path.join(__dirname, '../../__mocks__/user.xml')
);

jest.mock('../../../package.json', () => ({
  version: '1.2.3'
}));

describe('XML helpers', () => {
  describe('buildChangesetXml', () => {
    it('Should build a stringified OSM changeset', () => {
      expect(buildChangesetXml('me', 'my comment')).toMatchSnapshot();
      expect(buildChangesetXml()).toMatchSnapshot();
    });

    it('Should handle strings having double quotes', () => {
      expect(
        buildChangesetXml('My "app"', 'Doing some "weird" stuff')
      ).toMatchSnapshot();
    });

    it('Should handle optional tags', () => {
      expect(
        buildChangesetXml('My app', 'Doing some stuff', {
          key_example: 'value example'
        })
      ).toMatchSnapshot();
    });
  });

  describe('buildChangesetFromObjectXml', () => {
    it('Should build a stringified OSM changeset', () => {
      expect(
        buildChangesetFromObjectXml(
          { host: 'server.net', locale: 'fr' },
          'me',
          'my comment'
        )
      ).toMatchSnapshot();
      expect(buildChangesetFromObjectXml()).toMatchSnapshot();
    });

    it('Should handle strings having double quotes', () => {
      expect(
        buildChangesetFromObjectXml(
          { host: 'server.net', locale: 'fr' },
          'My "app"',
          'Doing some "weird" stuff'
        )
      ).toMatchSnapshot();
    });
  });

  describe('buildPreferencesFromObjectXml', () => {
    it('Should build stringified OSM preferences', () => {
      expect(
        buildPreferencesFromObjectXml({ locale: 'fr', color: 'red' })
      ).toMatchSnapshot();
    });
  });

  describe('convertElementXmlToJson', () => {
    it('Should convert an Element XML string into a proper JSON object', async () => {
      const result = await convertElementXmlToJson(
        nodeSample,
        'node',
        '3683625932'
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('convertElementsListXmlToJson', () => {
    it('Should convert a list of Elements XML string into a proper JSON object', async () => {
      const result = await convertElementsListXmlToJson(wayFullSample, 'node');
      expect(result).toMatchSnapshot();
    });
  });

  describe('convertNotesXmlToJson', () => {
    it('Should convert a Notes XML string into a proper JSON object', async () => {
      const result = await convertNotesXmlToJson(notesSample);
      expect(result).toMatchSnapshot();
    });
  });

  describe('convertUserXmlToJson', () => {
    it('Should convert an User XML string into a proper JSON object', async () => {
      const result = await convertUserXmlToJson(userSample);
      expect(result).toMatchSnapshot();
    });
  });

  describe('flattenAttributes', () => {
    it('Should flatten the weird objects returned by xmlToJson', () => {
      const result = flattenAttributes({
        $: {
          attribute1: 'value1',
          attribute2: 'value2'
        },
        attribute3: ['value3'],
        attribute4: ['value4'],
        undefinedAttribute: undefined,
        emptylist: []
      });

      const expected = {
        attribute1: 'value1',
        attribute2: 'value2',
        attribute3: 'value3',
        attribute4: 'value4'
      };
      expect(result).toEqual(expected);
    });
  });

  describe('xmlToJson', () => {
    it('Should convert an XML string into a JSON object', async () => {
      const result = await xmlToJson(notesSample);
      expect(result).toMatchSnapshot();
    });
  });

  describe('jsonToXml', () => {
    it('Should convert a JSON object into an XML string', () => {
      const result = jsonToXml({
        osm: {
          node: {
            $: {
              attribute1: 'value1',
              attribute2: 'value2'
            },
            attribute3: ['value3'],
            attribute4: ['value4']
          }
        }
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('encodeXML', () => {
    it('works', () => {
      const result = encodeXML("This is a <weird level='42'>parameter</weird>");
      const expected =
        'This is a &lt;weird level=&apos;42&apos;&gt;parameter&lt;/weird&gt;';
      expect(result).toBe(expected);
    });
  });

  describe('cleanMapJson', () => {
    it('works', () => {
      const mapjson = {
        osm: {
          node: [
            {
              $: { id: '1234', lat: '42.3', lon: '-1.3' },
              tag: [
                {
                  $: {
                    key: 'amenity',
                    val: 'bicycle_parking'
                  }
                }
              ]
            },
            {
              $: { id: '1235', lat: '41.3', lon: '-1.2' }
            }
          ],
          way: [
            {
              $: { id: '456' },
              tag: [{ $: { highway: 'unclassified' } }],
              nd: [{ $: { ref: '1234' } }, { $: { ref: '1235' } }]
            }
          ],
          relation: []
        }
      };
      const result = cleanMapJson(mapjson);
      expect(result).toMatchSnapshot();
    });
  });
});
