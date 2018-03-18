import fetch from 'cross-fetch';
import osmtogeojson from 'osmtogeojson';
// import geojsontoosm from 'geojsontoosm';
import { parse as xmlParse } from 'simple-xml-dom';
import { isNodeId } from 'helpers/utils';
import { buildChangesetXml } from 'helpers/xml';
import { RequestException } from 'exceptions/request';

/**
 * Request to fetch an OSM element
 * @param  {String} endpoint The API endpoint
 * @param  {Object} osmId
 * @return {Object}
 */
export function fetchElementRequest(endpoint, osmId) {
  return fetch(`${endpoint}/${osmId}`)
    .then(response => response.text())
    .then(response => xmlParse(response))
    .then(response => osmtogeojson(response))
    .then(response => {
      if (isNodeId(osmId)) {
        return response.features[0];
      }

      return response;
    });
}

/**
 * Request to create OSM changesets
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} [author]
 * @param {string} [comment]
 * @return {Promise}
 */
export function createChangesetRequest(auth, author = '', comment = '') {
  const changesetXml = buildChangesetXml(author, comment);

  return new Promise(resolve => {
    auth.xhr(
      {
        method: 'PUT',
        path: '/changeset/create',
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        },
        content: changesetXml
      },
      (err, changesetId) => {
        if (err) {
          throw new RequestException('Changeset creation request failed');
        }

        return resolve(parseInt(changesetId, 10));
      }
    );
  });
}

/**
 * Checks if a given changeset is still opened at OSM.
 * @param {osmAuth} auth An instance of osm-auth
 * @param {number} changesetId
 * @return {Promise}
 */
export function changesetCheckRequest(auth, changesetId) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'GET',
        path: `/changeset/${changesetId.toString()}`,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        }
      },
      (err, xml) => {
        if (err) {
          throw new RequestException('Changeset check request failed');
        }

        const isOpened = xml
          .getElementsByTagName('changeset')[0]
          .getAttribute('open');

        if (isOpened === 'false') {
          return reject(err);
        }

        return resolve(changesetId);
      }
    );
  });
}
