import { osmAuth } from 'osm-auth';
import defaultOptions from './defaultOptions.json';
import { getCurrentIsoTimestamp } from 'helpers/time';
import {
  findElementType,
  findElementId,
  removeTrailingSlashes,
  simpleObjectDeepClone
} from 'helpers/utils';
import {
  fetchElementRequest,
  fetchElementRequestFull,
  multiFetchElementsByTypeRequest,
  fetchMapByBboxRequest,
  fetchRelationsForElementRequest,
  fetchWaysForNodeRequest,
  sendElementRequest,
  fetchNotesRequest,
  fetchNotesSearchRequest,
  fetchNoteByIdRequest,
  createNoteRequest,
  genericPostNoteRequest,
  createChangesetRequest,
  changesetCheckRequest,
  changesetGetRequest,
  updateChangesetTagsRequest,
  closeChangesetRequest,
  uploadChangesetOscRequest,
  fetchChangesetsRequest,
  deleteElementRequest,
  fetchUserRequest,
  getUserPreferencesRequest,
  setUserPreferencesRequest,
  getUserPreferenceByKeyRequest,
  setUserPreferenceByKeyRequest,
  deleteUserPreferenceRequest
} from './requests';

/**
 * OSM API request handler
 * @type {Object}
 */
export default class OsmRequest {
  /**
   * @access public
   * @param {Object} [options] Custom options to apply
   * @param {string} [options.scope] Scopes separated by a space, see https://wiki.openstreetmap.org/wiki/OAuth#OAuth_2.0 for all scopes (defaults to read_prefs write_prefs write_api write_notes)
   * @param {string} [options.client_id] The Client ID of your app. To register an app, see https://wiki.openstreetmap.org/wiki/OAuth#OAuth_2.0_2
   * @param {string} [options.redirect_uri] URL of your app (or url of app code) to rederict to after authentication.
   * @param {string} [options.access_token] Optional. OAuth2 bearer token to pre-authorize your app.
   * @param {string} [options.url] URL of the OSM server to use (defaults to https://openstreetmap.org)
   * @param {string} [options.apiUrl] URL of the OSM API to use (defaults to https://api.openstreetmap.org)
   * @param {boolean} [options.auto] If true, attempt to authenticate automatically when calling .xhr() or fetch() (default: false)
   * @param {Object} [options.singlepage] If true, use page redirection instead of a popup (default: false)
   * @param {string} [options.loading] Function called when auth-related xhr calls start
   * @param {string} [options.done] Function called when auth-related xhr calls end
   */
  constructor(options = {}) {
    this._options = {
      ...defaultOptions,
      ...options
    };

    this._options.url = removeTrailingSlashes(this._options.url);
    this._options.apiUrl = removeTrailingSlashes(this._options.apiUrl);
    this._auth = osmAuth({
      scope: this._options.scope,
      client_id: this._options.client_id,
      url: this._options.url,
      apiUrl: this._options.apiUrl,
      redirect_uri: this._options.redirect_uri,
      access_token: this._options.access_token,
      auto: this._options.auto,
      singlepage: this._options.singlepage,
      loading: this._options.loading,
      done: this._options.done,
      locale: this._options.locale
    });
  }

  /**
   * Return the API URL to use for the requests
   * @return {string} URL of the API
   */
  get apiUrl() {
    return this._options.apiUrl;
  }

  /**
   * Retrieve the OSM notes in given bounding box
   * @param {number} left The minimal longitude (X)
   * @param {number} bottom The minimal latitude (Y)
   * @param {number} right The maximal longitude (X)
   * @param {number} top The maximal latitude (Y)
   * @param {number} [limit] The maximal amount of notes to retrieve (between 1 and 10000, defaults to 100)
   * @param {number} [closedDays] The amount of days a note needs to be closed to no longer be returned (defaults to 7, 0 means only opened notes are returned, and -1 means all notes are returned)
   * @return {Promise} Resolves on notes list
   */
  fetchNotes(left, bottom, right, top, limit = null, closedDays = null) {
    return fetchNotesRequest(
      this.apiUrl,
      left,
      bottom,
      right,
      top,
      limit,
      closedDays,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Fetch OSM notes with textual search
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
  fetchNotesSearch(
    q,
    format = 'xml',
    limit = null,
    closed = null,
    display_name = null,
    user = null,
    from = null,
    to = null
  ) {
    return fetchNotesSearchRequest(
      this.apiUrl,
      q,
      format,
      limit,
      closed,
      display_name,
      user,
      from,
      to,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Get OSM note by id
   * param {number} noteId Identifier for the note
   * @param {string} format It can be 'xml' (default) to get OSM
   * and convert to JSON, 'raw' to return raw OSM XML, 'json' to
   * return GeoJSON, 'gpx' to return GPX and 'rss' to return GeoRSS
   * @return {Promise}
   */
  fetchNote(noteId, format = 'xml') {
    return fetchNoteByIdRequest(
      this.apiUrl,
      noteId,
      format,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Create an OSM note
   * @param {number} lat Specifies the latitude of the note
   * @param {number} lon Specifies the longitude of the note
   * @param {string} text A mandatory text field with arbitrary text containing the note
   * @return {Promise}
   */
  createNote(lat, lon, text) {
    return createNoteRequest(this._auth, this.apiUrl, lat, lon, text);
  }

  /**
   * Comment an OSM note
   * @param {string} text A mandatory text field with arbitrary text containing the note
   * @return {Promise}
   */
  commentNote(noteId, text) {
    return genericPostNoteRequest(
      this._auth,
      this.apiUrl,
      noteId,
      text,
      'comment'
    );
  }

  /**
   * Close an OSM note
   * @param {string} text A mandatory text field with arbitrary text containing the note
   * @return {Promise}
   */
  closeNote(noteId, text) {
    return genericPostNoteRequest(
      this._auth,
      this.apiUrl,
      noteId,
      text,
      'close'
    );
  }

  /**
   * Reopen an OSM note
   * @param {string} text A mandatory text field with arbitrary text containing the note
   * @return {Promise}
   */
  reopenNote(noteId, text) {
    return genericPostNoteRequest(
      this._auth,
      this.apiUrl,
      noteId,
      text,
      'reopen'
    );
  }

  /**
   * Send a request to OSM to create a new changeset
   * @param {string} [createdBy]
   * @param {string} [comment]
   * @param {string} [tags]
   * @return {Promise}
   */
  createChangeset(createdBy = '', comment = '', tags = {}) {
    return createChangesetRequest(
      this._auth,
      this.apiUrl,
      createdBy,
      comment,
      tags
    );
  }

  /**
   * Check if a changeset is still open
   * @param {number} changesetId
   * @return {Promise}
   */
  isChangesetStillOpen(changesetId) {
    return changesetCheckRequest(
      this.apiUrl,
      changesetId,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Get a changeset for a given id
   * @param {number} changesetId
   * @return {Promise}
   */
  fetchChangeset(changesetId) {
    return changesetGetRequest(
      this.apiUrl,
      changesetId,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Update changeset tags if still open
   * @param {number} changesetId
   * @param {string} [createdBy]
   * @param {string} [comment]
   * @param {Object} [object] use to set multiples tags
   * @throws Will throw an error for any request with http code 40x
   * @return {Promise}
   */
  updateChangesetTags(changesetId, createdBy = '', comment = '', object = {}) {
    return updateChangesetTagsRequest(
      this._auth,
      this.apiUrl,
      changesetId,
      createdBy,
      comment,
      object
    );
  }

  /**
   * Close changeset for a given id if still opened
   * @param {number} changesetId
   * @throws Will throw an error for any request with http code 40x.
   * @return {Promise} Empty string if it works
   */
  closeChangeset(changesetId) {
    return closeChangesetRequest(this._auth, this.apiUrl, changesetId);
  }

  /**
   * Upload an OSC file content conforming to the OsmChange specification OSM changeset
   * @param {string} changesetId
   * @param {string} osmChangeContent OSC file content text
   * @throws Will throw an error for any request with http code 40x.
   * @return {Promise}
   */
  uploadChangesetOsc(changesetId, osmChangeContent) {
    return uploadChangesetOscRequest(
      this._auth,
      this.apiUrl,
      changesetId,
      osmChangeContent
    );
  }

  /**
   * Fetch changesets from OSM API
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
   * @return {Promise}
   */
  fetchChangesets(options) {
    return fetchChangesetsRequest(this.apiUrl, {
      auth: this._options.always_authenticated ? this._auth : null,
      ...options
    });
  }

  /**
   * Create a shiny new OSM node element, in a JSON format
   * @param {number} lat
   * @param {number} lon
   * @param {Object} [tags] Optional, initial tags
   * @param {string} [id] Optional, identifier for OSM element
   * @return {Object}
   */
  createNodeElement(lat, lon, tags = {}, id) {
    const node = {
      $: {
        lat: lat,
        lon: lon
      },
      tag: [],
      _type: 'node'
    };
    if (typeof id !== 'undefined') {
      node._id = id.toString();
    }

    node.tag = Object.keys(tags).map(tagName => ({
      $: {
        k: tagName.toString(),
        v: tags[tagName].toString()
      }
    }));

    return node;
  }

  /**
   * Create a shiny new OSM way element, in a JSON format
   * @param {Array<string>} nodeOsmIds
   * @param {Object} [tags] Optional, initial tags
   * @param {string} [id] Optional, identifier for OSM element
   * @return {Object}
   */
  createWayElement(nodeOsmIds, tags = {}, id) {
    const way = {
      $: {},
      nd: nodeOsmIds.map(id => ({
        $: {
          ref: findElementId(id)
        }
      })),
      tag: [],
      _type: 'way'
    };

    if (typeof id !== 'undefined') {
      way._id = id.toString();
    }

    way.tag = Object.keys(tags).map(tagName => ({
      $: {
        k: tagName.toString(),
        v: tags[tagName].toString()
      }
    }));
    return way;
  }

  /**
   * Create a shiny new OSM relation element, in a JSON format
   * @param {Array<Object>} osmElements Array of object with keys id and optional role key. Key id contains an osmId value like 'node/1234'
   * @param {Object} [tags] Optional, initial tags
   * @param {string} [id] Optional, identifier for OSM element
   * @return {Object}
   */
  createRelationElement(osmElements, tags = {}, id) {
    const relation = {
      $: {},
      member: osmElements.map(elementObject => {
        const { id, role } = elementObject;
        const elementType = findElementType(id);
        const elementId = findElementId(id);
        const elementObjectCopy = {
          type: elementType,
          ref: elementId
        };
        if (typeof role !== 'undefined') {
          elementObjectCopy.role = elementObject.role;
        }
        return {
          $: elementObjectCopy
        };
      }),
      tag: [],
      _type: 'relation'
    };

    if (typeof id !== 'undefined') {
      relation._id = id.toString();
    }

    relation.tag = Object.keys(tags).map(tagName => ({
      $: {
        k: tagName.toString(),
        v: tags[tagName].toString()
      }
    }));
    return relation;
  }

  /**
   * Fetch an OSM element by its ID and optionnally
   * all other elements referenced by it
   * @param {string} osmId Eg: node/12345
   * @param {Object} options  Optional parameters
   * @param {boolean} [options.full] True for getting all elements referenced by this element
   * @return {Promise}
   */
  fetchElement(osmId, options) {
    if (options && options.full) {
      return fetchElementRequestFull(
        this.apiUrl,
        osmId,
        this._options.always_authenticated ? { auth: this._auth } : {}
      );
    } else {
      return fetchElementRequest(
        this.apiUrl,
        osmId,
        this._options.always_authenticated ? { auth: this._auth } : {}
      );
    }
  }

  /**
   * Fetch multiple OSM elements by it full OSM IDs. Work only with a type of elements, no mixed elements type are allowed
   * @param {Array} osmIds Eg: ['node/12345', 'node/6789']. We do not support optional version e.g 'node/12345v2'
   * @return {Promise}
   */
  fetchMultipleElements(osmIds) {
    return multiFetchElementsByTypeRequest(
      this.apiUrl,
      osmIds,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Fetch relation(s) from an OSM element
   * @param {string} osmId Eg: node/12345
   * @return {Promise}
   */
  fetchRelationsForElement(osmId) {
    return fetchRelationsForElementRequest(
      this.apiUrl,
      osmId,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Fetch ways using the given OSM node
   * @param {string} osmId Eg: node/12345
   * @return {Promise} Resolve on ways array (each one can be used as an Element for all other functions)
   */
  fetchWaysForNode(osmId) {
    return fetchWaysForNodeRequest(
      this.apiUrl,
      osmId,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Find an element with it OsmId within an OSM collection
   * @param {Object} json An object with key that can be 'node', 'way', 'relation'
   * @param {string} osmId Eg: node/12345
   * @return {Obejct} OSM element
   */
  findElementWithinOSMCollection(json, osmId) {
    const elementType = findElementType(osmId);
    const elementId = findElementId(osmId);
    if (elementType in json) {
      return json[elementType].find(element => element.$.id === elementId);
    }
    return undefined;
  }

  /**
   * Get all tags of this element as an object
   * @param {Object} element
   * @return {Object} Tags of this element
   */
  getTags(element) {
    const tags = {};
    if (element && element.tag) {
      element.tag.forEach(t => {
        tags[t.$.k] = t.$.v;
      });
    }
    return tags;
  }

  /**
   * Use setTag instead. Will be removed in the future.
   * @deprecated
   */
  setProperty(element, propertyName, propertyValue) {
    return this.setTag(element, propertyName, propertyValue);
  }

  /**
   * Add or replace a tag in a given element
   * @param {Object} element
   * @param {string} tagName
   * @param {string} tagValue
   * @return {Object} A new version of the element
   */
  setTag(element, tagName, tagValue) {
    const newElement = simpleObjectDeepClone(element);
    const filteredTags = newElement.tag
      ? newElement.tag.filter(tag => tag.$.k !== tagName.toString())
      : [];

    newElement.tag = [
      ...filteredTags,
      {
        $: {
          k: tagName.toString(),
          v: tagValue.toString()
        }
      }
    ];

    return newElement;
  }

  /**
   * Use setTags instead. Will be removed in the future.
   * @deprecated
   */
  setProperties(element, properties) {
    return this.setTags(element, properties);
  }

  /**
   * Add or replace several tags in a given element
   * @param {Object} element
   * @param {Object} tags
   * @return {Object} A new version of the element
   */
  setTags(element, tags) {
    const newElement = simpleObjectDeepClone(element);
    const clonedTags = simpleObjectDeepClone(tags);
    const tagsName = Object.keys(clonedTags);

    const filteredTags = newElement.tag
      ? newElement.tag.filter(tag => !tagsName.includes(tag.$.k))
      : [];
    const formattedTags = tagsName.map(tagName => ({
      $: {
        k: tagName.toString(),
        v: clonedTags[tagName].toString()
      }
    }));

    newElement.tag = [...filteredTags, ...formattedTags];

    return newElement;
  }

  /**
   * Completely replace tags of a given element
   * @param {Object} element
   * @param {Object} tags The tags that will replace completely current element tags
   * @return {Object} A new version of the element
   */
  replaceTags(element, tags) {
    const newElement = simpleObjectDeepClone(element);
    const clonedTags = simpleObjectDeepClone(tags);
    const formattedTags = Object.entries(clonedTags).map(kv => ({
      $: {
        k: kv[0].toString(),
        v: kv[1].toString()
      }
    }));

    newElement.tag = formattedTags;
    return newElement;
  }

  /**
   * Use removeTag instead. Will be removed in the future.
   * @deprecated
   */
  removeProperty(element, propertyName) {
    return this.removeTag(element, propertyName);
  }

  /**
   * Remove a tag from a given element
   * @param {Object} element
   * @param {string} tagName
   * @return {Object} A new version of the element
   */
  removeTag(element, tagName) {
    const newElement = simpleObjectDeepClone(element);
    const filteredTags = newElement.tag.filter(tag => tag.$.k !== tagName);

    newElement.tag = filteredTags;

    return newElement;
  }

  /**
   * Replace the coordinates of the OSM node and return a copy of the element
   * @param {Object} element
   * @param {number} lat
   * @param {number} lon
   * @return {Object} A new version of the element
   */
  setCoordinates(element, lat, lon) {
    const newElement = simpleObjectDeepClone(element);
    newElement.$.lat = lat.toString();
    newElement.$.lon = lon.toString();

    return newElement;
  }

  /**
   * Get the nodes ids of the OSM way
   * @param {Object} way
   * @return {Array<string>} nodeOsmIds
   */
  getNodeIdsForWay(way) {
    return way.nd.map(node => `node/${node.$.ref}`);
  }

  /**
   * Replace the nodes of the OSM way and return a copy of the way
   * @param {Object} way
   * @param {Array<string>} nodeOsmIds
   * @return {Object} A new version of the way
   */
  setNodeIdsForWay(way, nodeOsmIds) {
    const newWay = simpleObjectDeepClone(way);
    newWay.nd = nodeOsmIds.map(id => ({
      $: {
        ref: findElementId(id)
      }
    }));
    return newWay;
  }

  /**
   * Get the members objects from an OSM relation
   * @param {Object} relation
   * @return {Array<Object>} Array of object with keys id with osmId value e.g 'node/1234' and optional role key
   */
  getRelationMembers(relation) {
    return relation.member.map(member => {
      const { type, ref, role } = member.$;
      const elementObjectCopy = {
        id: `${type}/${ref}`
      };
      if (typeof role !== 'undefined') {
        elementObjectCopy.role = role;
      }
      return elementObjectCopy;
    });
  }

  /**
   * Replace the members objects of the OSM relation and return a copy of the relation
   * @param {Object} relation
   * @param {Array<Object>} osmElements Array of object with keys id and optional role key. Key id contains an osmId value like 'node/1234'
   * @return {Object} A new version of the relation
   */
  setRelationMembers(relation, osmElements) {
    const newRelation = simpleObjectDeepClone(relation);
    newRelation.member = osmElements.map(elementObject => {
      const { id, role } = elementObject;
      const elementType = findElementType(id);
      const elementId = findElementId(id);
      const elementObjectCopy = {
        type: elementType,
        ref: elementId
      };
      if (typeof role !== 'undefined') {
        elementObjectCopy.role = elementObject.role;
      }
      return {
        $: elementObjectCopy
      };
    });
    return newRelation;
  }

  /**
   * Set the current UTC date to a given element
   * @param {Object} element
   * @return {Object} A new version of the element
   */
  setTimestampToNow(element) {
    const newElement = simpleObjectDeepClone(element);
    newElement.$.timestamp = getCurrentIsoTimestamp();

    return newElement;
  }

  /**
   * Change the version number (given by API) of an element
   * @param {Object} element
   * @param {int} version
   * @return {Object} A new version of the element
   */
  setVersion(element, version) {
    const newElement = simpleObjectDeepClone(element);
    newElement.$.version = parseInt(version, 10).toString();

    return newElement;
  }

  /**
   * Send an element to OSM
   * @param {Object} element
   * @param {number} changesetId
   * @return {Promise}
   */
  sendElement(element, changesetId) {
    return sendElementRequest(this._auth, this.apiUrl, element, changesetId);
  }

  /**
   * Request to fetch all OSM elements within a bbox extent
   * @param {number} left The minimal longitude (X)
   * @param {number} bottom The minimal latitude (Y)
   * @param {number} right The maximal longitude (X)
   * @param {number} top The maximal latitude (Y)
   * @param {string} mode The mode is json so output in the promise will be an object, otherwise, it will be an object and a XML string
   * @return {Promise}
   */
  fetchMapByBbox(left, bottom, right, top, mode = 'json') {
    return fetchMapByBboxRequest(
      this.apiUrl,
      left,
      bottom,
      right,
      top,
      mode,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Delete an element from OSM
   * @param {Object} element
   * @param {number} changesetId
   * @return {Promise} Promise with the new version number due to deletion
   */
  deleteElement(element, changesetId) {
    return deleteElementRequest(this._auth, this.apiUrl, element, changesetId);
  }

  /**
   * Get an user details
   * @param {string} userId The user ID
   * @return {Promise} Resolves on user details as JSON
   */
  fetchUser(userId) {
    return fetchUserRequest(
      this.apiUrl,
      userId,
      this._options.always_authenticated ? { auth: this._auth } : {}
    );
  }

  /**
   * Get all preferences from connected user
   * @return {Promise} Promise with Well formatted JSON of user preferences
   */
  getUserPreferences() {
    return getUserPreferencesRequest(this._auth, this.apiUrl);
  }

  /**
   * Set all preferences for a connected user
   * @param {Object} object An object to provide keys values to create XML preferences
   * @return {Promise} Promise
   */
  setUserPreferences(object) {
    return setUserPreferencesRequest(this._auth, this.apiUrl, object);
  }

  /**
   * Get a preference from a key for the connected user
   * @param {string} key The key to retrieve
   * @return {Promise} Promise with the value for the key
   */
  getUserPreferenceByKey(key) {
    return getUserPreferenceByKeyRequest(this._auth, this.apiUrl, key);
  }

  /**
   * Set a preference from a key for the connected user
   * @param {string} key The key to set.
   * @param {string} value The value to set. Overwrite existing value if key exists
   * @return {Promise} Promise
   */
  setUserPreferenceByKey(key, value) {
    return setUserPreferenceByKeyRequest(this._auth, this.apiUrl, key, value);
  }

  /**
   * Delete a preference from a key for the connected user
   * @param {string} key The key to use.
   * @return {Promise} Promise
   */
  deleteUserPreference(key) {
    return deleteUserPreferenceRequest(this._auth, this.apiUrl, key);
  }
}
