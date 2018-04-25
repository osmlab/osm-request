import { parseString, Builder } from 'xml2js';
import packageJson from '../../package.json';

const osmRequestVersion = packageJson.version;

/**
 * Build a stringified OSM changeset
 * @param {string} [createdBy]
 * @param {string} [comment]
 * @return {string}
 */
export function buildChangesetXml(createdBy = '', comment = '') {
  return `
    <osm>
      <changeset>
        <tag k="created_by" v="${createdBy}"/>
        <tag k="created_by:library" v="OSM Request ${osmRequestVersion}"/>
        <tag k="comment" v="${comment}"/>
      </changeset>
    </osm>
  `;
}

/**
 * Convert a raw Notes API response into a well formatted JSON object
 * @param  {string} xml - The raw API response
 * @return {Promise}
 */
export function convertNotesXmlToJson(xml) {
  return xmlToJson(xml)
    .then(result => result.osm.note)
    .then(notes =>
      notes.map(note => {
        const returnedNote = flattenAttributes(note);

        returnedNote.comments = [
          ...returnedNote.comments.comment.map(comment =>
            flattenAttributes(comment)
          )
        ];

        return returnedNote;
      })
    );
}

/**
 * XML converted with the xmlToJson function contain some weird objects
 * Eg:
 * {
 *   $: {
 *     attribute1: 'value1',
 *     attribute2: 'value2'
 *   },
 *   attribute3: ['value3'],
 *   attribute4: ['value4'],
 * }
 *
 * That function flatten them
 * Eg:
 * {
 *   attribute1: 'value1',
 *   attribute2: 'value2',
 *   attribute3: 'value3',
 *   attribute4: 'value4',
 * }
 *
 * @param  {Object} object
 * @return {Object}
 */
export function flattenAttributes(object) {
  const flatObject = {
    ...object.$
  };

  Object.keys(object).forEach(key => {
    if (key === '$') return;
    if (!object[key]) return;
    if (object[key].length === 0) return;

    flatObject[key] = object[key][0];
  });

  return flatObject;
}

/**
 * Convert a stringified XML into a JSON object
 * @param  {string} xml
 * @return {Promise}
 */
export function xmlToJson(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
}

/**
 * Convert a JSON object into a stringified XML
 * @param  {Object} json
 * @return {string}
 */
export function jsonToXml(json) {
  const builder = new Builder({
    xmldec: {
      version: '1.0',
      encoding: 'UTF-8',
      standalone: null
    }
  });
  return builder.buildObject(json);
}
