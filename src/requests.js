import fetch from 'cross-fetch';
import osmtogeojson from 'osmtogeojson';
// import geojsontoosm from 'geojsontoosm';
import { parse as xmlParse } from 'simple-xml-dom';
import { isNodeId, buildQueryString } from 'helpers/utils';
import { buildChangesetXml, xmlToJson } from 'helpers/xml';
import { RequestException } from 'exceptions/request';

/**
 * Request to fetch an OSM element
 * @param  {string} endpoint The API endpoint
 * @param  {string} osmId
 * @return {object}
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
 * Request to fetch OSM notes
 * @param {string} endpoint The API endpoint
 * @param {number} left The minimal longitude (X)
 * @param {number} bottom The minimal latitude (Y)
 * @param {number} right The maximal longitude (X)
 * @param {number} top The maximal latitude (Y)
 * @param {number} [limit] The maximal amount of notes to retrieve (between 1 and 10000, defaults to 100)
 * @param {number} [closedDays] The amount of days a note needs to be closed to no longer be returned (defaults to 7, 0 means only opened notes are returned, and -1 means all notes are returned)
 * @return {object}
 */
export function fetchNotesRequest(
  endpoint,
  left,
  bottom,
  right,
  top,
  limit,
  closedDays
) {
  const params = {
    bbox: `${left.toString()},${bottom.toString()},${right.toString()},${top.toString()}`
  };

  if (limit) {
    params.limit = limit;
  }

  if (closedDays !== null && closedDays !== undefined) {
    params.closed = closedDays;
  }

  return fetch(`${endpoint}/notes${buildQueryString(params)}`)
    .then(response => {
      if (response.status !== 200) {
        return response.text().then(message => Promise.reject(message));
      }

      return response;
    })
    .catch(message => {
      throw new RequestException(message);
    })
    .then(response => response.text())
    .then(response => xmlParse(response))
    .then(response => xmlToJson(response))
    .then(response =>
      response.osm.note.map(note => ({
        ...note,
        comments: note.comments.comment
      }))
    );
}

/**
 * Request to create OSM changesets
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} [createdBy]
 * @param {string} [comment]
 * @return {Promise}
 */
export function createChangesetRequest(auth, createdBy = '', comment = '') {
  const changesetXml = buildChangesetXml(createdBy, comment);

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
