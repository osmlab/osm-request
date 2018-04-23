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
  const builder = new Builder();
  return builder.buildObject(json);
}
