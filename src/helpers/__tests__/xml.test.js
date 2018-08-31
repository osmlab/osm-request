import fs from 'fs';
import path from 'path';
import {
  buildChangesetXml,
  convertElementXmlToJson,
  convertNotesXmlToJson,
  flattenAttributes,
  xmlToJson,
  jsonToXml
} from '../xml';

const nodeSample = fs.readFileSync(
  path.join(__dirname, '../../__mocks__/node.xml')
);
const notesSample = fs.readFileSync(
  path.join(__dirname, '../../__mocks__/notes.xml')
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
  });

  describe('convertElementXmlToJson', () => {
    it('Should convert an Element XML string into a proper JSON object', async done => {
      const result = await convertElementXmlToJson(
        nodeSample,
        'node',
        '3683625932'
      );
      expect(result).toMatchSnapshot();
      done();
    });
  });

  describe('convertNotesXmlToJson', () => {
    it('Should convert a Notes XML string into a proper JSON object', async done => {
      const result = await convertNotesXmlToJson(notesSample);
      expect(result).toMatchSnapshot();
      done();
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
    it('Should convert an XML string into a JSON object', async done => {
      const result = await xmlToJson(notesSample);
      expect(result).toMatchSnapshot();
      done();
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
});
