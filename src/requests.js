import fetch from 'cross-fetch';
import {
  buildQueryString,
  findElementType,
  findElementId,
  simpleObjectDeepClone
} from 'helpers/utils';
import {
  buildChangesetXml,
  convertNotesXmlToJson,
  convertElementXmlToJson,
  jsonToXml
} from 'helpers/xml';
import { RequestException } from 'exceptions/request';

/**
 * Request to fetch an OSM element
 * @param  {string} endpoint The API endpoint
 * @param  {string} osmId
 * @return {Object}
 */
export function fetchElementRequest(endpoint, osmId) {
  const elementType = findElementType(osmId);
  const elementId = findElementId(osmId);

  return fetch(`${endpoint}/${osmId}`)
    .then(response => response.text())
    .then(response =>
      convertElementXmlToJson(response, elementType, elementId)
    );
}

/**
 * Send an element to OSM
 * @param {osmAuth} auth An instance of osm-auth
 * @param {Object} element
 * @param {number} changesetId
 * @return {Promise}
 */
export function sendElementRequest(auth, element, changesetId) {
  const copiedElement = simpleObjectDeepClone(element);
  const { _id: elementId, _type: elementType } = copiedElement;
  delete copiedElement._id;
  delete copiedElement._type;

  copiedElement.osm[elementType][0].$.changeset = changesetId;

  const elementXml = jsonToXml(copiedElement);
  const path = elementId
    ? `/${elementType}/create`
    : `/${elementType}/${elementId}`;

  return new Promise(resolve => {
    auth.xhr(
      {
        path,
        method: 'PUT',
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        },
        content: elementXml
      },
      (err, version) => {
        if (err) {
          throw new RequestException('Element sending request failed');
        }

        return resolve(parseInt(version, 10));
      }
    );
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
 * @return {Object}
 */
export function fetchNotesRequest(
  endpoint,
  left,
  bottom,
  right,
  top,
  limit = null,
  closedDays = null
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
    .then(response => convertNotesXmlToJson(response));
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
