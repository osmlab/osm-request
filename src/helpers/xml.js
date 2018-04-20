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

/**
 * Convert an XML into a JSON object
 * @param  {Object} xml
 * @return {Object}
 */
export function xmlToJson(xml) {
  let obj = {};

  if (xml.nodeType === 1) {
    for (let j = 0; j < xml.attributes.length; j++) {
      const attribute = xml.attributes.item(j);
      obj[attribute.nodeName] = attribute.nodeValue;
    }
  } else if (xml.nodeType === 3) {
    // text
    obj = xml.nodeValue.trim();
  }

  // do children
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;

      if (typeof obj[nodeName] === 'undefined') {
        const tmp = xmlToJson(item);

        if (tmp !== '') {
          if (tmp['#text']) {
            obj[nodeName] = tmp['#text'];
          } else {
            obj[nodeName] = tmp;
          }
        }
      } else {
        if (typeof obj[nodeName].push === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [old];
        }

        const tmp = xmlToJson(item);

        if (tmp !== '') {
          obj[nodeName].push(tmp);
        }
      }
    }
  }

  return obj;
}
