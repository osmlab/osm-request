import 'babel-polyfill';

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
      ...options
    };
  }
}
