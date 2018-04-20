import { WrongElementTypeException } from 'exceptions/element';

/**
 * Remove the trailing slashes from an URL and return it
 * @param {string} url
 * @return {string} - The cleaned URL
 */
export function removeTrailingSlashes(url) {
  return url.replace(/\/*$/, '');
}

/**
 * Return a deep clone of an object.
 *
 * The object has to be a simple object notation. Not a Map, a Set or anything else.
 *
 * Object.assign and the spread operators can not be used as they do not replace children objects
 * by copies of themselves.
 *
 * Eg: If you use Object.assign or the rest operator on that object: { items: [{ childrenItem: 1 }] }
 * All the objects contained in the items array will be references to the first objects
 * @param {Object} object - A simple object notation. No Map, Set or anything
 * @return {Object}
 */
export function simpleObjectDeepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Tells if an ID is one of an OSM node
 * @param {string} osmId
 * @return {boolean}
 */
export function isNodeId(osmId) {
  return /^node\//.test(osmId);
}

/**
 * Throw an exception if the given element is not a Point
 * @param {Object} element
 */
export function throwIfNotPoint(element) {
  if (!element.geometry || element.geometry.type !== 'Point') {
    throw new WrongElementTypeException(
      'Other element types than Point are not supported for now'
    );
  }
}

/**
 * @param {Object} params
 * @return {string}
 */
export function buildQueryString(params) {
  const builtParams = [];

  for (const paramName of Object.keys(params)) {
    const encodedName = encodeURIComponent(paramName);
    const encodedvalue = encodeURIComponent(params[paramName]);

    builtParams.push(`${encodedName}=${encodedvalue}`);
  }

  const questionMark = builtParams.length > 0 ? '?' : '';
  const queryString = builtParams.join('&');

  return `${questionMark}${queryString}`;
}
