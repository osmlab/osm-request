import { fetch, authxhr } from 'helpers/xhr';
import {
  findElementType,
  findElementId,
  checkIdIsNegative,
  simpleObjectDeepClone,
  buildApiUrl
} from 'helpers/utils';
import {
  buildChangesetXml,
  buildChangesetFromObjectXml,
  convertNotesXmlToJson,
  convertElementXmlToJson,
  convertElementsListXmlToJson,
  convertUserXmlToJson,
  jsonToXml,
  xmlToJson,
  cleanMapJson,
  buildPreferencesFromObjectXml
} from 'helpers/xml';
import { RequestException } from 'exceptions/request';

/**
 * Request to fetch an OSM element
 * @param {string} apiUrl The API URL
 * @param {string} osmId
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Object}
 */
export function fetchElementRequest(apiUrl, osmId, options = {}) {
  const elementType = findElementType(osmId);
  const elementId = findElementId(osmId);

  return fetch(buildApiUrl(apiUrl, `/${osmId}`), options).then(response =>
    convertElementXmlToJson(response, elementType, elementId)
  );
}

/**
 * Request to fetch way or relation and all other elements referenced by it
 * @param {string} apiUrl The API URL
 * @param {string} osmId Can only contain either a way or a relation
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise} Promise with well formatted JSON content
 */
export function fetchElementRequestFull(apiUrl, osmId, options = {}) {
  return fetch(buildApiUrl(apiUrl, `/${osmId}/full`), options).then(response =>
    xmlToJson(response)
      .then(json => Promise.resolve(cleanMapJson(json)))
      .catch(error => {
        throw new RequestException(error);
      })
  );
}

/**
 * Request to fetch an OSM element
 * @param {string} apiUrl The API URL
 * @param {Array} osmIds Eg: ['node/12345', 'node/6789']. We do not support optional version e.g 'node/12345v2'
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function multiFetchElementsByTypeRequest(apiUrl, osmIds, options = {}) {
  const elementType = findElementType(osmIds[0]);
  const ids = osmIds.map(osmId => findElementId(osmId));
  return fetch(
    buildApiUrl(apiUrl, `/${elementType}s?${elementType}s=${ids.join(',')}`),
    options
  ).then(response =>
    xmlToJson(response)
      .then(json => Promise.resolve(cleanMapJson(json)))
      .catch(error => {
        throw new RequestException(error);
      })
  );
}

/**
 * Request to fetch ways using the given OSM node
 * @param {string} apiUrl The API URL
 * @param {string} osmId
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Object}
 */
export function fetchWaysForNodeRequest(apiUrl, osmId, options = {}) {
  return fetch(buildApiUrl(apiUrl, `/${osmId}/ways`), options).then(response =>
    convertElementsListXmlToJson(response, 'way')
  );
}

/**
 * Send an element to OSM
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {Object} element
 * @param {number} changesetId
 * @return {Promise}
 */
export function sendElementRequest(auth, apiUrl, element, changesetId) {
  const copiedElement = simpleObjectDeepClone(element);
  const { _id: elementId, _type: elementType } = copiedElement;
  delete copiedElement._id;
  delete copiedElement._type;

  copiedElement.$.changeset = changesetId;

  const osmContent = {
    osm: {
      $: {}
    }
  };
  osmContent.osm[elementType] = [copiedElement];

  const elementXml = jsonToXml(osmContent);
  const path =
    elementId && !checkIdIsNegative(elementId)
      ? `/${elementType}/${elementId}`
      : `/${elementType}/create`;

  return authxhr(
    {
      method: 'PUT',
      prefix: false,
      path: buildApiUrl(apiUrl, path),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      },
      content: elementXml
    },
    auth
  ).then(version => parseInt(version, 10));
}

/**
 * Request to fetch OSM notes
 * @param {string} apiUrl The API URL
 * @param {number} left The minimal longitude (X)
 * @param {number} bottom The minimal latitude (Y)
 * @param {number} right The maximal longitude (X)
 * @param {number} top The maximal latitude (Y)
 * @param {number} [limit] The maximal amount of notes to retrieve (between 1 and 10000, defaults to 100)
 * @param {number} [closedDays] The amount of days a note needs to be closed to no longer be returned (defaults to 7, 0 means only opened notes are returned, and -1 means all notes are returned)
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Object}
 */
export function fetchNotesRequest(
  apiUrl,
  left,
  bottom,
  right,
  top,
  limit = null,
  closedDays = null,
  options = {}
) {
  const params = {
    bbox: `${left.toString()},${bottom.toString()},${right.toString()},${top.toString()}`
  };

  if (limit) {
    params.limit = limit;
  }

  if (closedDays !== null && typeof closedDays !== 'undefined') {
    params.closed = closedDays;
  }

  return fetch(buildApiUrl(apiUrl, '/notes', params), options).then(response =>
    convertNotesXmlToJson(response)
  );
}

/**
 * Request to get OSM notes with textual search
 * @param {string} apiUrl The API URL
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
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function fetchNotesSearchRequest(
  apiUrl,
  q,
  format = 'xml',
  limit = null,
  closed = null,
  display_name = null,
  user = null,
  from = null,
  to = null,
  options = {}
) {
  const params = {
    q
  };

  let path = `/notes/search.${format}`;
  if (format === 'raw') {
    path = `/notes/search`;
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

  return fetch(buildApiUrl(apiUrl, path, params), options).then(text => {
    if (format === 'xml') {
      return convertNotesXmlToJson(text);
    } else {
      return text;
    }
  });
}

/**
 * Request to fetch OSM note by id
 * @param {string} apiUrl The API URL
 * param {number} noteId Identifier for the note
 * @param {string} format It can be 'xml' (default) to get OSM
 * and convert to JSON, 'raw' to return raw OSM XML, 'json' to
 * return GeoJSON, 'gpx' to return GPX and 'rss' to return GeoRSS
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function fetchNoteByIdRequest(
  apiUrl,
  noteId,
  format = 'xml',
  options = {}
) {
  let path = `/notes/${noteId.toString()}.${format}`;
  if (format === 'raw') {
    path = `/notes/${noteId.toString()}`;
  }
  return fetch(buildApiUrl(apiUrl, path), options).then(text => {
    if (format === 'xml') {
      return convertNotesXmlToJson(text);
    } else {
      return text;
    }
  });
}

/**
 * Request generic enough to manage all POST request for a particular note
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * param {number} noteId Identifier for the note
 * @param {string} text A mandatory text field with arbitrary text containing the note
 * @param {string} type Mandatory type. It can be 'comment', 'close' or 'reopen'
 * @return {Promise}
 */
export function genericPostNoteRequest(auth, apiUrl, noteId, text, type) {
  return authxhr(
    {
      method: 'POST',
      prefix: false,
      path: buildApiUrl(apiUrl, `/notes/${noteId}/${type}`, { text }),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      }
    },
    auth
  )
    .then(txt => convertNotesXmlToJson(txt))
    .then(arr => arr.find(() => true));
}

/**
 * Request to create a note
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {number} lat Specifies the latitude of the note
 * @param {number} lon Specifies the longitude of the note
 * @param {string} text A mandatory text field with arbitrary text containing the note
 * @return {Promise}
 */
export function createNoteRequest(auth, apiUrl, lat, lon, text) {
  const params = {
    lat,
    lon,
    text
  };
  return authxhr(
    {
      method: 'POST',
      prefix: false,
      path: buildApiUrl(apiUrl, '/notes', params),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      }
    },
    auth
  )
    .then(txt => convertNotesXmlToJson(txt))
    .then(arr => arr.find(() => true));
}

/**
 * Request to create OSM changeset
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {string} [createdBy]
 * @param {string} [comment]
 * @param {string} [tags] An object with keys values to set to tags
 * @return {Promise}
 */
export function createChangesetRequest(
  auth,
  apiUrl,
  createdBy = '',
  comment = '',
  tags = {}
) {
  const changesetXml = buildChangesetXml(createdBy, comment, tags);

  return authxhr(
    {
      method: 'PUT',
      prefix: false,
      path: buildApiUrl(apiUrl, '/changeset/create'),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      },
      content: changesetXml
    },
    auth
  ).then(changesetId => parseInt(changesetId, 10));
}

/**
 * Checks if a given changeset is still opened at OSM.
 * @param {string} apiUrl The API URL
 * @param {number} changesetId
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function changesetCheckRequest(apiUrl, changesetId, options = {}) {
  return changesetGetRequest(apiUrl, changesetId, options).then(res => {
    let isOpened;

    try {
      isOpened = res.osm.changeset[0].$.open === 'true';
    } catch (e) {
      isOpened = false;
    }

    if (!isOpened) {
      throw new Error('Changeset not opened');
    }

    return changesetId;
  });
}

/**
 * Get a changeset for a given id at OSM.
 * @param {string} apiUrl The API URL
 * @param {number} changesetId
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function changesetGetRequest(apiUrl, changesetId, options = {}) {
  return fetch(
    buildApiUrl(apiUrl, `/changeset/${changesetId.toString()}`),
    options
  ).then(response => xmlToJson(response));
}
/**
 * Update tags if a given changeset is still opened at OSM.
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {number} changesetId
 * @param {string} [createdBy]
 * @param {string} [comment]
 * @param {Object} [tags] Use to set multiples tags
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise}
 */
export function updateChangesetTagsRequest(
  auth,
  apiUrl,
  changesetId,
  createdBy = '',
  comment = '',
  tags = {}
) {
  const changesetXml = buildChangesetFromObjectXml(tags, createdBy, comment);
  return authxhr(
    {
      method: 'PUT',
      prefix: false,
      path: buildApiUrl(apiUrl, `/changeset/${changesetId.toString()}`),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      },
      content: changesetXml
    },
    auth
  ).then(txt => xmlToJson(txt));
}

/**
 * Request to close changeset for a given id if still opened
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {number} changesetId
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise} Empty string if it works
 */
export function closeChangesetRequest(auth, apiUrl, changesetId) {
  return authxhr(
    {
      method: 'PUT',
      prefix: false,
      path: buildApiUrl(apiUrl, `/changeset/${changesetId.toString()}/close`),
      options: {
        header: {
          'Content-Type': 'text/plain'
        }
      }
    },
    auth
  );
}

/**
 * Request to upload an OSC file content conforming to the OsmChange specification OSM changeset
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {string} changesetId
 * @param {string} osmChangeContent OSC file content text
 * @return {Promise}
 */
export function uploadChangesetOscRequest(
  auth,
  apiUrl,
  changesetId,
  osmChangeContent
) {
  return authxhr(
    {
      method: 'POST',
      prefix: false,
      path: buildApiUrl(apiUrl, `/changeset/create`),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      },
      content: osmChangeContent
    },
    auth
  ).then(txt => xmlToJson(txt));
}

/**
 * Request to get changesets from OSM API
 * @param {string} apiUrl The API URL
 * @param {Object} options  Optional parameters
 * @param {number} [options.left] The minimal longitude (X)
 * @param {number} [options.bottom] The minimal latitude (Y)
 * @param {number} [options.right] The maximal longitude (X)
 * @param {number} [options.top] The maximal latitude (Y)
 * @param {string} [options.display_name] Specifies the creator of the returned notes by using a valid display name. Does not work together with the user parameter
 * @param {number} [options.user] Specifies the creator of the returned notes by using a valid id of the user. Does not work together with the display_name parameter
 * @param {string} [options.time] Can be a unique value T1 or two values T1, T2 comma separated. Find changesets closed after value T1 or find changesets that were closed after T1 and created before T2. In other words, any changesets that were open at some time during the given time range T1 to T2. Time format is anything that http://ruby-doc.org/stdlib-2.6.3/libdoc/date/rdoc/DateTime.html#method-c-parse can parse.
 * @param {number} [options.open] Only finds changesets that are still open but excludes changesets that are closed or have reached the element limit for a changeset (50.000 at the moment). Can be set to true
 * @param {number} [options.closed] Only finds changesets that are closed or have reached the element limit. Can be set to true
 * @param {number} [options.changesets] Finds changesets with the specified ids
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function fetchChangesetsRequest(apiUrl, options = {}) {
  const keys = [
    'left',
    'bottom',
    'right',
    'top',
    'display_name',
    'user',
    'time',
    'open',
    'closed',
    'changesets'
  ];

  const params = {};
  keys.forEach(key => {
    if (key in options && options[key]) {
      params[key] = options[key].toString();
    }
  });

  if (params.left && params.bottom && params.right && params.top) {
    params.bbox = `${params.left.toString()},${params.bottom.toString()},${params.right.toString()},${params.top.toString()}`;
    delete params.left;
    delete params.bottom;
    delete params.right;
    delete params.top;
  }

  return fetch(buildApiUrl(apiUrl, '/changesets', params), {
    auth: options.auth
  }).then(text => xmlToJson(text));
}

/**
 * Request to fetch all OSM elements within a bbox extent
 * @param {string} apiUrl The API URL
 * @param {number} left The minimal longitude (X)
 * @param {number} bottom The minimal latitude (Y)
 * @param {number} right The maximal longitude (X)
 * @param {number} top The maximal latitude (Y)
 * @param {string} mode The mode is json so output in the promise will be an object, otherwise, it will be an object and a XML string
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function fetchMapByBboxRequest(
  apiUrl,
  left,
  bottom,
  right,
  top,
  mode = 'json',
  options = {}
) {
  const args = Array.from(arguments);
  if (args.length < 5 && args.some(arg => typeof arg === 'undefined')) {
    throw new Error("You didn't provide all arguments to the function");
  } else {
    const params = {
      bbox: `${left.toString()},${bottom.toString()},${right.toString()},${top.toString()}`
    };

    return fetch(buildApiUrl(apiUrl, '/map', params), options).then(
      response => {
        if (mode !== 'json') {
          return Promise.all([
            xmlToJson(response)
              .then(json => Promise.resolve(cleanMapJson(json)))
              .catch(error => {
                throw new RequestException(error);
              }),
            response
          ]);
        } else {
          return xmlToJson(response)
            .then(json => Promise.resolve(cleanMapJson(json)))
            .catch(error => {
              throw new RequestException(error);
            });
        }
      }
    );
  }
}

/**
 * Delete an OSM element
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {Object} element
 * @param {number} changesetId
 * @return {Promise} Promise with the new version number due to deletion
 */
export function deleteElementRequest(auth, apiUrl, element, changesetId) {
  const copiedElement = simpleObjectDeepClone(element);
  const { _id: elementId, _type: elementType } = copiedElement;
  delete copiedElement._id;
  delete copiedElement._type;

  copiedElement.$.changeset = changesetId;

  const osmContent = {
    osm: {
      $: {}
    }
  };
  osmContent.osm[elementType] = [copiedElement];

  const elementXml = jsonToXml(osmContent);
  const path = `/${elementType}/${elementId}`;

  return authxhr(
    {
      method: 'DELETE',
      prefix: false,
      path: buildApiUrl(apiUrl, path),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      },
      content: elementXml
    },
    auth
  ).then(version => parseInt(version, 10));
}

/** Request to fetch relation(s) from an OSM element
 * @param {string} apiUrl The API URL
 * @param {string} osmId
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Promise}
 */
export function fetchRelationsForElementRequest(apiUrl, osmId, options = {}) {
  return fetch(buildApiUrl(apiUrl, `/${osmId}/relations`), options).then(
    response => convertElementsListXmlToJson(response, 'relation')
  );
}

/**
 * Request to fetch an OSM user details
 * @param {string} apiUrl The API URL
 * @param {string} userId The user ID
 * @param {Object} [options] Options
 * @param {Object} [options.auth] Auth XHR object to use instead of unauthenticated call
 * @return {Object}
 */
export function fetchUserRequest(apiUrl, userId, options = {}) {
  return fetch(buildApiUrl(apiUrl, `/user/${userId}`), options).then(response =>
    convertUserXmlToJson(response)
  );
}

/**
 * Request to fetch preferences for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise} Promise with the value for the key
 */
export function getUserPreferencesRequest(auth, apiUrl) {
  return authxhr(
    {
      method: 'GET',
      prefix: false,
      path: buildApiUrl(apiUrl, '/user/preferences'),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      }
    },
    auth
  ).then(txt => xmlToJson(txt));
}

/**
 * Request to set all preferences for a connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {Object} object An object to provide keys values to create XML preferences
 * @return {Promise} Promise
 */
export function setUserPreferencesRequest(auth, apiUrl, object) {
  const preferencesXml = buildPreferencesFromObjectXml(object);
  return authxhr(
    {
      method: 'PUT',
      prefix: false,
      path: buildApiUrl(apiUrl, '/user/preferences'),
      options: {
        header: {
          'Content-Type': 'text/xml'
        }
      },
      content: preferencesXml
    },
    auth
  );
}

/**
 * Request to fetch a preference from a key for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {string} key The key to retrieve
 * @throws Will throw an error for any request with http code 40x.
 * @return {Promise} Promise with the value for the key
 */
export function getUserPreferenceByKeyRequest(auth, apiUrl, key) {
  return authxhr(
    {
      method: 'GET',
      prefix: false,
      path: buildApiUrl(apiUrl, `/user/preferences/${key}`)
    },
    auth
  );
}

/**
 * Request to set a preference from a key for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {string} key The key to set
 * @param {string} value The value to set. Overwrite existing value if key exists
 * @return {Promise} Promise
 */
export function setUserPreferenceByKeyRequest(auth, apiUrl, key, value) {
  return authxhr(
    {
      method: 'PUT',
      prefix: false,
      path: buildApiUrl(apiUrl, `/user/preferences/${key}`),
      options: {
        header: {
          'Content-Type': 'text/plain'
        }
      },
      content: value
    },
    auth
  );
}

/**
 * Request to delete a preference from a key for the connected user
 * @param {osmAuth} auth An instance of osm-auth
 * @param {string} apiUrl The API URL
 * @param {string} key The key to use
 * @return {Promise} Promise
 */
export function deleteUserPreferenceRequest(auth, apiUrl, key) {
  return authxhr(
    {
      method: 'DELETE',
      prefix: false,
      path: buildApiUrl(apiUrl, `/user/preferences/${key}`)
    },
    auth
  );
}
