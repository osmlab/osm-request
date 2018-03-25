import { parse as xmlParse, serialize as xmlSerialize } from 'simple-xml-dom';
import packageJson from '../../package.json';

const osmRequestVersion = packageJson.version;

/**
 * Build a stringified OSM changeset
 * @param {string} [createdBy]
 * @param {string} [comment]
 * @return {string}
 */
export function buildChangesetXml(createdBy = '', comment = '') {
  const xmlString = `
    <osm>
      <changeset>
        <tag k="created_by" v="${createdBy}"/>
        <tag k="created_by:library" v="OSM Request ${osmRequestVersion}"/>
        <tag k="comment" v="${comment}"/>
      </changeset>
    </osm>
  `;

  return xmlSerialize(xmlParse(xmlString));
}
