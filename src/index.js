import 'babel-polyfill';
import osmAuth from 'osm-auth';
import defaultOptions from './defaultOptions.json';
import {
  removeTrailingSlash,
  realObjectCopy,
  throwIfNotPoint
} from 'helpers/utils';
import {
  fetchElementRequest,
  createChangesetRequest,
  changesetCheckRequest
} from './requests';

/**
 * OSM API request handler
 * @type {Object}
 */
export default class OsmRequest {
  /**
   * @access public
   * @param {Object} osmAuth Instance of osm-auth.
   * @param {Object} [options] Custom options to apply
   */
  constructor(options = {}) {
    this._options = {
      ...defaultOptions,
      ...options
    };

    this._options.endpoint = removeTrailingSlash(this._options.endpoint);

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
   * Create a shiny new OSM node element, in a geoJSON format
   * @param {number} lat
   * @param {number} lon
   * @param {[object]} [properties] Optional, initial properties
   * @return {object}
   */
  createNodeElement(lat, lon, properties = {}) {
    return {
      type: 'Feature',
      properties: { ...properties },
      geometry: {
        type: 'Point',
        coordinates: [lat, lon]
      }
    };
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
   * Add or replace a property in a given element
   * @param {object} element A geoJSON element
   * @param {string} propertyName
   * @param {string} propertyValue
   * @return {object} A new version of the geoJSON element
   */
  setProperty(element, propertyName, propertyValue) {
    throwIfNotPoint(element);

    const newElement = realObjectCopy(element);
    newElement.properties[propertyName] = propertyValue;
    return newElement;
  }

  /**
   * Add or replace several properties in a given element
   * @param {object} element A geoJSON element
   * @param {object} properties
   * @return {object} A new version of the geoJSON element
   */
  setProperties(element, properties) {
    throwIfNotPoint(element);

    const newElement = realObjectCopy(element);
    const clonedProperties = realObjectCopy(properties);

    for (const propertyName of Object.keys(clonedProperties)) {
      newElement.properties[propertyName] = clonedProperties[propertyName];
    }

    return newElement;
  }

  /**
   * Remove a property from a given element
   * @param {object} element A geoJSON element
   * @param {string} propertyName
   * @return {object} A new version of the geoJSON element
   */
  removeProperty(element, propertyName) {
    throwIfNotPoint(element);

    const newElement = realObjectCopy(element);
    delete newElement.properties[propertyName];
    return newElement;
  }

  /**
   * Replace the coordinates of the OSM node an return a copy of the element
   * @param {object} element
   * @param {number} lat
   * @param {number} lon
   * @return {object} A new version of the geoJSON element
   */
  setCoordinates(element, lat, lon) {
    throwIfNotPoint(element);

    const newElement = realObjectCopy(element);
    newElement.geometry.coordinates = [lon, lat];
    return newElement;
  }

  /**
   * Set the current UTC date to a given element
   * @param {object} element
   * @return {object} A new version of the geoJSON element
   */
  setTimestampToNow(element) {
    return this.setProperty(element, 'timestamp', new Date().toISOString());
  }

  /**
   * Increase the version number of an element
   * @param {object} element
   * @return {object} A new version of the geoJSON element
   */
  incrementVersion(element) {
    const currentVersion = parseInt(element.properties.version || 0, 10);
    return this.setProperty(
      element,
      'version',
      (currentVersion + 1).toString()
    );
  }

  /**
   * Send a request to OSM to create a new changeset
   * @param {string} [author]
   * @param {string} [comment]
   * @return {Promise}
   */
  createChangeset(author = '', comment = '') {
    return createChangesetRequest(this._auth, author, comment);
  }

  /**
   * Check if a changeset is still open
   * @param {number} changesetId
   * @return {Promise}
   */
  isChangesetStillOpen(changesetId) {
    return changesetCheckRequest(this._auth, changesetId);
  }
}
