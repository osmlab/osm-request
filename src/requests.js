import fetch from 'cross-fetch';
import {
  buildQueryString,
  findElementType,
  findElementId,
  checkIdIsNegative,
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

  copiedElement.$.changeset = changesetId;

  const osmContent = {
    osm: {
      $: {},
      node: [copiedElement]
    }
  };

  const elementXml = jsonToXml(osmContent);
  const path =
    elementId && !checkIdIsNegative(elementId)
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
 * Request to get OSM notes with textual search
 * @param {string} endpoint The API endpoint
 * @param {string} q Specifies the search query
 * @param {string} [format] It can be 'xml' (default) to get OSM
 * and convert to JSON, 'raw' to return raw OSM XML, 'json' to
 * return GeoJSON, 'gpx' to return GPX and 'rss' to return GeoRSS
 * @param {number} [limit] The maximal amount of notes to retrieve (between 1 and 10000, defaults to 100)
 * @param {number} [closed] The amount of days a note needs to be closed to no longer be returned (defaults to 7, 0 means only opened notes are returned, and -1 means all notes are returned)
 * @param {string} [display_name] Specifies the creator of the returned notes by using a valid display name. Does not work together with the user parameter
 * @param {number} [user] Specifies the creator of the returned notes by using a valid id of the user. Does not work together with the display_name parameter
 * @param {number} [from] Specifies the beginning of a date range to search in for a note
 * @param {number} [to] Specifies the end of a date range to search in for a note. Today date is the default
 * @return {Promise}
 */
export function fetchNotesSearchRequest(
  endpoint,
  q,
  format = 'xml',
  limit = null,
  closed = null,
  display_name = null,
  user = null,
  from = null,
  to = null
) {
  const params = {
    q
  };

  let baseUrl = `${endpoint}/api/0.6/notes/search.${format}`;
  if (format === 'raw') {
    baseUrl = `${endpoint}/api/0.6/notes/search`;
  }

  const objectOptionalArgs = {
    limit,
    closed,
    display_name,
    user,
    from,
    to
  };

  Object.entries(objectOptionalArgs).forEach(optional => {
    if (optional[1]) {
      params[optional[0]] = optional[1];
    }
  });

  return fetch(`${baseUrl}${buildQueryString(params)}`)
    .then(response => {
      if (response.status !== 200) {
        return response.text().then(message =>
          Promise.reject({
            message,
            status: response.status,
            statusText: response.statusText
          })
        );
      }

      return response;
    })
    .catch(message => {
      throw new RequestException(message);
    })
    .then(response => response.text())
    .then(text => {
      if (format === 'xml') {
        return convertNotesXmlToJson(text);
      } else {
        return text;
      }
    });
}

/**
 * Request to fetch OSM note by id
 * @param {string} endpoint The API endpoint
 * param {number} noteId Identifier for the note
 * @param {string} format It can be 'xml' (default) to get OSM
 * and convert to JSON, 'raw' to return raw OSM XML, 'json' to
 * return GeoJSON, 'gpx' to return GPX and 'rss' to return GeoRSS
 * @return {Promise}
 */
export function fetchNoteByIdRequest(endpoint, noteId, format = 'xml') {
  let url = `${endpoint}/api/0.6/notes/${noteId.toString()}.${format}`;
  if (format === 'raw') {
    url = `${endpoint}/api/0.6/notes/${noteId.toString()}`;
  }
  return fetch(url)
    .then(response => {
      if (response.status !== 200) {
        return response.text().then(message =>
          Promise.reject({
            message,
            status: response.status,
            statusText: response.statusText
          })
        );
      }

      return response;
    })
    .catch(message => {
      throw new RequestException(message);
    })
    .then(response => response.text())
    .then(text => {
      if (format === 'xml') {
        return convertNotesXmlToJson(text);
      } else {
        return text;
      }
    })
    .then(response => {
      if (format === 'xml') {
        return response.find(() => true);
      } else {
        return response;
      }
    });
}

/**
 * Request generic enough to manage all POST request for a particular note
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * param {number} noteId Identifier for the note
 * @param {string} text A mandatory text field with arbitrary text containing the note
 * @param {string} type Mandatory type. It can be 'comment', 'close' or 'reopen'
 * @return {Promise}
 */
export function genericPostNoteRequest(auth, endpoint, noteId, text, type) {
  const qs = buildQueryString({
    text
  });
  const url = `${endpoint}/api/0.6/notes/${noteId}/${type}${qs}`;
  return new Promise(resolve => {
    auth.xhr(
      {
        method: 'POST',
        prefix: false,
        path: url,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        }
      },
      (err, xml) => {
        if (err) {
          throw new RequestException(
            JSON.stringify({
              message: `Note ${type} change failed`,
              status: err.status,
              statusText: err.statusText
            })
          );
        }

        return resolve(
          convertNotesXmlToJson(new XMLSerializer().serializeToString(xml))
        );
      }
    );
  }).then(arr => arr.find(() => true));
}

/**
 * Request to create a note
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {number} lat Specifies the latitude of the note
 * @param {number} lon Specifies the longitude of the note
 * @param {string} text A mandatory text field with arbitrary text containing the note
 * @return {Promise}
 */
export function createNoteRequest(auth, endpoint, lat, lon, text) {
  const qs = buildQueryString({
    lat,
    lon,
    text
  });
  const url = `${endpoint}/api/0.6/notes${qs}`;
  return new Promise(resolve => {
    auth.xhr(
      {
        method: 'POST',
        prefix: false,
        path: url,
        options: {
          header: {
            'Content-Type': 'text/xml'
          }
        }
      },
      (err, xml) => {
        if (err) {
          throw new RequestException(
            JSON.stringify({
              message: 'Note creation failed',
              status: err.status,
              statusText: err.statusText
            })
          );
        }

        return resolve(
          convertNotesXmlToJson(new XMLSerializer().serializeToString(xml))
        );
      }
    );
  }).then(arr => arr.find(() => true));
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
 * Get a changeset for a given id at OSM.
 * @param {string} endpoint The API endpoint
 * @param {number} changesetId
 * @return {Promise}
 */
export function changesetGetRequest(endpoint, changesetId) {
  return fetch(`${endpoint}/api/0.6/changeset/${changesetId.toString()}`)
    .then(response => {
      if (response.status !== 200) {
        return response.text().then(message =>
          Promise.reject({
            message,
            status: response.status,
            statusText: response.statusText
          })
        );
      }
      return response.text();
    })
    .catch(message => {
      throw new RequestException(message);
    })
    .then(response => {
      return xmlToJson(response);
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
 * Request to close changeset for a given id if still opened
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} endpoint The API endpoint
 * @param {number} changesetId
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise} Empty string if it works
 */
export function closeChangesetRequest(auth, endpoint, changesetId) {
  return new Promise((resolve, reject) => {
    auth.xhr(
      {
        method: 'PUT',
        prefix: false,
        path: `${endpoint}/api/0.6/changeset/${changesetId.toString()}/close`,
        options: {
          header: {
            'Content-Type': 'text/plain'
          }
        }
      },
      (err, text) => {
        if (err) {
          return reject(
            new RequestException(
              JSON.stringify({
                message: 'Changeset close request failed',
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
 * Request to fetch all OSM elements within a bbox extent
 * @param {string} endpoint The API endpoint
 * @param {number} left The minimal longitude (X)
 * @param {number} bottom The minimal latitude (Y)
 * @param {number} right The maximal longitude (X)
 * @param {number} top The maximal latitude (Y)
 * @param {string} mode The mode is json so output in the promise will be an object, otherwise, it will be an object and a XML string
 * @return {Promise}
 */
export function fetchMapByBboxRequest(
  endpoint,
  left,
  bottom,
  right,
  top,
  mode = 'json'
) {
  const args = Array.from(arguments);
  if (args.length < 5 && args.some(arg => arg === undefined)) {
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
        if (mode !== 'json') {
          return Promise.all([
            xmlToJson(response)
              .then(json => {
                return Promise.resolve(cleanMapJson(json));
              })
              .catch(error => {
                throw new RequestException(error);
              }),
            response
          ]);
        } else {
          return xmlToJson(response)
            .then(json => {
              return Promise.resolve(cleanMapJson(json));
            })
            .catch(error => {
              throw new RequestException(error);
            });
        }
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

  copiedElement.$.changeset = changesetId;

  const osmContent = {
    osm: {
      $: {},
      node: [copiedElement]
    }
  };

  const elementXml = jsonToXml(osmContent);
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
