import 'babel-polyfill';
import defaultOptions from './defaultOptions.json';

/**
 * OSM API request handler
 * @type {Object}
 */
export default class OsmRequest {
  /**
   * @param {Object} [options] Custom options to apply
   */
  constructor(options) {
    this._options = {
      ...defaultOptions,
      ...options
    };
  }

  /**
   * Return the API endpoint to use for the requests
   * @return {string} URL of the API endpoint
   */
  get endpoint() {
    return this._options.endpoint;
  }
}
