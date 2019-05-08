import fetch from 'cross-fetch';
import {
  buildQueryString,
  findElementType,
  findElementId,
  simpleObjectDeepClone
} from 'helpers/utils';
import {
  buildChangesetXml,
  buildChangesetFromObjectXml,
  convertNotesXmlToJson,
  convertElementXmlToJson,
  convertWaysXmlToJson,
  jsonToXml,
  xmlToJson,
  cleanMapJson,
  convertRelationsXmlToJson,
  buildPreferencesFromObjectXml
} from 'helpers/xml';
import { RequestException } from 'exceptions/request';

/**
 * Request to fetch an OSM element
 * @param {string} endpoint The API endpoint
 * @param {string} osmId
 * @return {Object}
 */
export function fetchElementRequest(endpoint, osmId) {
  const elementType = findElementType(osmId);
  const elementId = findElementId(osmId);

  return fetch(`${endpoint}/api/0.6/${osmId}`)
    .then(response => response.text())
    .then(response =>
      convertElementXmlToJson(response, elementType, elementId)
    );
}

/**
 * Request to fetch way or relation and all other elements referenced by it
 * @param {string} endpoint The API endpoint
 * @param {string} osmId Can only contain either a way or a relation
 * @return {Promise} Promise with well formatted JSON content
 */
export function fetchElementRequestFull(endpoint, osmId) {
  return fetch(`${endpoint}/api/0.6/${osmId}/full`)
    .then(response => response.text())
    .then(response => {
      return xmlToJson(response)
        .then(json => {
          return Promise.resolve(cleanMapJson(json));
        })
        .catch(error => {
          throw new RequestException(error);
        });
    });
}

/**
 * Request to fetch ways using the given OSM node
 * @param {string} endpoint The API endpoint
 * @param {string} osmId
 * @return {Object}
 */
export function fetchWaysForNodeRequest(endpoint, osmId) {
  return fetch(`${endpoint}/api/0.6/${osmId}/ways`)
    .then(response => response.text())
    .then(response => convertWaysXmlToJson(response));
}

/**
 * Send an element to OSM
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {Object} element
 * @param {number} changesetId
 * @return {Promise}
 */
export function sendElementRequest(auth, endpoint, element, changesetId) {
  const copiedElement = simpleObjectDeepClone(element);
  const { _id: elementId, _type: elementType } = copiedElement;
  delete copiedElement._id;
  delete copiedElement._type;

  copiedElement.osm[elementType][0].$.changeset = changesetId;

  const elementXml = jsonToXml(copiedElement);
  const path = elementId
    ? `${elementType}/${elementId}`
    : `${elementType}/create`;

  return new Promise(resolve => {
    auth.xhr(
      {
        method: 'PUT',
        prefix: false,
        path: `${endpoint}/api/0.6/${path}`,
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

  return fetch(`${endpoint}/api/0.6/notes${buildQueryString(params)}`)
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
 * @param {string} endpoint The API endpoint
 * @param {string} [createdBy]
 * @param {string} [comment]
 * @return {Promise}
 */
export function createChangesetRequest(
  auth,
  endpoint,
  createdBy = '',
  comment = ''
) {
  const changesetXml = buildChangesetXml(createdBy, comment);

  return new Promise(resolve => {
    auth.xhr(
      {
        method: 'PUT',
        prefix: false,
        path: `${endpoint}/api/0.6/changeset/create`,
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
 * @param {string} endpoint The API endpoint
 * @param {number} changesetId
 * @return {Promise}
 */
export function changesetCheckRequest(auth, endpoint, changesetId) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'GET',
        prefix: false,
        path: `${endpoint}/api/0.6/changeset/${changesetId.toString()}`,
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

/**
 * Update tags if a given changeset is still opened at OSM.
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {number} changesetId
 * @param {Object} object use to set multiples tags
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise}
 */
export function updateChangesetTagsRequest(
  auth,
  endpoint,
  changesetId,
  object
) {
  const changesetXml = buildChangesetFromObjectXml(object);
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'PUT',
        prefix: false,
        path: `${endpoint}/api/0.6/changeset/${changesetId.toString()}`,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        },
        content: changesetXml
      },
      (err, xml) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: 'Changeset update request failed',
                status: err.status,
                statusText: err.statusText
              })
            )
          );
        } else {
          return resolve(xmlToJson(new XMLSerializer().serializeToString(xml)));
        }
      }
    );
  });
}

/**
 * Request to fetch all OSM elements within a bbox extent
 * @param {string} endpoint The API endpoint
 * @param {number} left The minimal longitude (X)
 * @param {number} bottom The minimal latitude (Y)
 * @param {number} right The maximal longitude (X)
 * @param {number} top The maximal latitude (Y)
 * @return {Promise}
 */
export function fetchMapByBbox(endpoint, left, bottom, right, top) {
  const args = Array.from(arguments);
  if (args.length !== 5 && args.some(arg => arg === undefined)) {
    throw new Error("You didn't provide all arguments to the function");
  } else {
    const params = {
      bbox: `${left.toString()},${bottom.toString()},${right.toString()},${top.toString()}`
    };

    return fetch(`${endpoint}/api/0.6/map${buildQueryString(params)}`)
      .then(response => {
        if (response.status !== 200) {
          return response.text().then(message => Promise.reject(message));
        }
        return response.text();
      })
      .catch(message => {
        throw new RequestException(message);
      })
      .then(response => {
        return xmlToJson(response)
          .then(json => {
            return Promise.resolve(cleanMapJson(json));
          })
          .catch(error => {
            throw new RequestException(error);
          });
      });
  }
}

/**
 * Delete an OSM element
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {Object} element
 * @param {number} changesetId
 * @return {Promise} Promise with the new version number due to deletion
 */
export function deleteElementRequest(auth, endpoint, element, changesetId) {
  const copiedElement = simpleObjectDeepClone(element);
  const { _id: elementId, _type: elementType } = copiedElement;
  delete copiedElement._id;
  delete copiedElement._type;

  copiedElement.osm[elementType][0].$.changeset = changesetId;

  const elementXml = jsonToXml(copiedElement);
  const path = `${elementType}/${elementId}`;

  return new Promise(resolve => {
    auth.xhr(
      {
        method: 'DELETE',
        prefix: false,
        path: `${endpoint}/api/0.6/${path}`,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        },
        content: elementXml
      },
      (err, version) => {
        if (err) {
          throw new RequestException(err);
        }
        return resolve(parseInt(version, 10));
      }
    );
  });
}

/** Request to fetch relation(s) from an OSM element
 * @param {string} endpoint The API endpoint
 * @param {string} osmId
 * @return {Promise}
 */
export function fetchRelationsForElementRequest(endpoint, osmId) {
  return fetch(`${endpoint}/api/0.6/${osmId}/relations`)
    .then(response => response.text())
    .then(response => convertRelationsXmlToJson(response));
}

/**
 * Request to fetch preferences for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise} Promise with the value for the key
 */
export function getUserPreferencesRequest(auth, endpoint) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'GET',
        prefix: false,
        path: `${endpoint}/api/0.6/user/preferences`,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        }
      },
      (err, xml) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: 'Issue to get user preferences',
                status: err.status,
                statusText: err.statusText
              })
            )
          );
        }
        return resolve(xmlToJson(new XMLSerializer().serializeToString(xml)));
      }
    );
  });
}

/**
 * Request to set all preferences for a connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {Object} object An object to provide keys values to create XML preferences
 * @return {Promise} Promise
 */
export function setUserPreferencesRequest(auth, endpoint, object) {
  const preferencesXml = buildPreferencesFromObjectXml(object);
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'PUT',
        prefix: false,
        path: `${endpoint}/api/0.6/user/preferences`,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        },
        content: preferencesXml
      },
      (err, text) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: 'User preferences update request failed',
                status: err.status,
                statusText: err.statusText
              })
            )
          );
        } else {
          return resolve(text);
        }
      }
    );
  });
}

/**
 * Request to fetch a preference from a key for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {string} key The key to retrieve
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise} Promise with the value for the key
 */
export function getUserPreferenceByKeyRequest(auth, endpoint, key) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'GET',
        prefix: false,
        path: `${endpoint}/api/0.6/user/preferences/${key}`
      },
      (err, text) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: 'Issue to get this user preference',
                status: err.status,
                statusText: err.statusText
              })
            )
          );
        }
        return resolve(text);
      }
    );
  });
}

/**
 * Request to set a preference from a key for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {string} key The key to set
 * @param {string} value The value to set. Overwrite existing value if key exists
 * @return {Promise} Promise
 */
export function setUserPreferenceByKeyRequest(auth, endpoint, key, value) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'PUT',
        prefix: false,
        path: `${endpoint}/api/0.6/user/preferences/${key}`,
        options: {
          header: {
            'Content-Type': 'text/plain'
          }
        },
        content: value
      },
      (err, text) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: `User preference update request failed for ${key}`,
                status: err.status,
                statusText: err.statusText
              })
            )
          );
        } else {
          return resolve(text);
        }
      }
    );
  });
}

/**
 * Request to delete a preference from a key for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {string} key The key to use
 * @return {Promise} Promise
 */
export function deleteUserPreferenceRequest(auth, endpoint, key) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'DELETE',
        prefix: false,
        path: `${endpoint}/api/0.6/user/preferences/${key}`
      },
      (err, text) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: `User preference deletion request failed for ${key}`,
                status: err.status,
                statusText: err.statusText
              })
            )
          );
        } else {
          return resolve(text);
        }
      }
    );
  });
}
