import osmAuth from 'osm-auth';
import defaultOptions from './defaultOptions.json';
import { getCurrentIsoTimestamp } from 'helpers/time';
import { removeTrailingSlashes, simpleObjectDeepClone } from 'helpers/utils';
import {
  fetchElementRequest,
  fetchMapByBbox,
  fetchWaysForNodeRequest,
  sendElementRequest,
  fetchNotesRequest,
  createChangesetRequest,
  changesetCheckRequest,
  deleteElementRequest
} from './requests';

/**
 * OSM API request handler
 * @type {Object}
 */
export default class OsmRequest {
  /**
   * @access public
   * @param {Object} [options] Custom options to apply
   */
  constructor(options = {}) {
    this._options = {
      ...defaultOptions,
      ...options
    };

    this._options.endpoint = removeTrailingSlashes(this._options.endpoint);

    this._auth = osmAuth({
      url: this._options.endpoint,
      oauth_consumer_key: this._options.oauthConsumerKey,
      oauth_secret: this._options.oauthSecret,
      oauth_token: this._options.oauthUserToken,
      oauth_token_secret: this._options.oauthUserTokenSecret
    });
  }

  /**
   * Return the API endpoint to use for the requests
   * @return {string} URL of the API endpoint
   */
  get endpoint() {
    return this._options.endpoint;
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
      this.endpoint,
      left,
      bottom,
      right,
      top,
      limit,
      closedDays
    );
  }

  /**
   * Send a request to OSM to create a new changeset
   * @param {string} [createdBy]
   * @param {string} [comment]
   * @return {Promise}
   */
  createChangeset(createdBy = '', comment = '') {
    return createChangesetRequest(
      this._auth,
      this.endpoint,
      createdBy,
      comment
    );
  }

  /**
   * Check if a changeset is still open
   * @param {number} changesetId
   * @return {Promise}
   */
  isChangesetStillOpen(changesetId) {
    return changesetCheckRequest(this._auth, this.endpoint, changesetId);
  }

  /**
   * Create a shiny new OSM node element, in a JSON format
   * @param {number} lat
   * @param {number} lon
   * @param {Object} [properties] Optional, initial properties
   * @return {Object}
   */
  createNodeElement(lat, lon, properties = {}) {
    const element = {
      osm: {
        $: {},
        node: [
          {
            $: {
              lat: lat,
              lon: lon
            },
            tag: []
          }
        ]
      },
      _type: 'node'
    };

    element.osm.node[0].tag = Object.keys(properties).map(propertyName => ({
      $: {
        k: propertyName.toString(),
        v: properties[propertyName].toString()
      }
    }));

    return element;
  }

  /**
   * Fetch an OSM element by its ID
   * @param {string} osmId Eg: node/12345
   * @return {Promise}
   */
  fetchElement(osmId) {
    return fetchElementRequest(this.endpoint, osmId);
  }

  /**
   * Fetch ways using the given OSM node
   * @param {string} osmId Eg: node/12345
   * @return {Promise} Resolve on ways array (each one can be used as an Element for all other functions)
   */
  fetchWaysForNode(osmId) {
    return fetchWaysForNodeRequest(this.endpoint, osmId);
  }

  /**
   * Add or replace a property in a given element
   * @param {Object} element
   * @param {string} propertyName
   * @param {string} propertyValue
   * @return {Object} A new version of the element
   */
  setProperty(element, propertyName, propertyValue) {
    const elementType = element._type;
    const newElement = simpleObjectDeepClone(element);
    const innerElement = newElement.osm[elementType][0];
    const filteredTags = innerElement.tag
      ? innerElement.tag.filter(tag => tag.$.k !== propertyName.toString())
      : [];

    innerElement.tag = [
      ...filteredTags,
      {
        $: {
          k: propertyName.toString(),
          v: propertyValue.toString()
        }
      }
    ];

    return newElement;
  }

  /**
   * Add or replace several properties in a given element
   * @param {Object} element
   * @param {Object} properties
   * @return {Object} A new version of the element
   */
  setProperties(element, properties) {
    const newElement = simpleObjectDeepClone(element);
    const clonedProperties = simpleObjectDeepClone(properties);
    const propertiesName = Object.keys(clonedProperties);

    const elementType = element._type;
    const innerElement = newElement.osm[elementType][0];
    const filteredTags = innerElement.tag
      ? innerElement.tag.filter(tag => !propertiesName.includes(tag.$.k))
      : [];
    const formattedProperties = propertiesName.map(propertyName => ({
      $: {
        k: propertyName.toString(),
        v: clonedProperties[propertyName].toString()
      }
    }));

    innerElement.tag = [...filteredTags, ...formattedProperties];

    return newElement;
  }

  /**
   * Remove a property from a given element
   * @param {Object} element
   * @param {string} propertyName
   * @return {Object} A new version of the element
   */
  removeProperty(element, propertyName) {
    const elementType = element._type;
    const newElement = simpleObjectDeepClone(element);
    const innerElement = newElement.osm[elementType][0];
    const filteredTags = innerElement.tag.filter(
      tag => tag.$.k !== propertyName
    );

    innerElement.tag = filteredTags;

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
    const elementType = element._type;
    const newElement = simpleObjectDeepClone(element);
    newElement.osm[elementType][0].$.lat = lat.toString();
    newElement.osm[elementType][0].$.lon = lon.toString();

    return newElement;
  }

  /**
   * Set the current UTC date to a given element
   * @param {Object} element
   * @return {Object} A new version of the element
   */
  setTimestampToNow(element) {
    const elementType = element._type;
    const newElement = simpleObjectDeepClone(element);
    newElement.osm[elementType][0].$.timestamp = getCurrentIsoTimestamp();

    return newElement;
  }

  /**
   * Change the version number (given by API) of an element
   * @param {Object} element
   * @param {int} version
   * @return {Object} A new version of the element
   */
  setVersion(element, version) {
    const elementType = element._type;
    const newElement = simpleObjectDeepClone(element);
    const innerElement = newElement.osm[elementType][0];
    innerElement.$.version = parseInt(version).toString();

    return newElement;
  }

  /**
   * Send an element to OSM
   * @param {Object} element
   * @param {number} changesetId
   * @return {Promise}
   */
  sendElement(element, changesetId) {
    return sendElementRequest(this._auth, this.endpoint, element, changesetId);
  }

  /**
   * Request to fetch all OSM elements within a bbox extent
   * @param {number} left The minimal longitude (X)
   * @param {number} bottom The minimal latitude (Y)
   * @param {number} right The maximal longitude (X)
   * @param {number} top The maximal latitude (Y)
   * @return {Promise}
   */
  fetchMapByBbox(left, bottom, right, top) {
    return fetchMapByBbox(this._options.endpoint, left, bottom, right, top);
  }

  /**
   * Delete an element from OSM
   * @param {Object} element
   * @param {number} changesetId
   * @return {Promise} Promise with the new version number due to deletion
   */
  deleteElement(element, changesetId) {
    return deleteElementRequest(
      this._auth,
      this.endpoint,
      element,
      changesetId
    );
  }
}
