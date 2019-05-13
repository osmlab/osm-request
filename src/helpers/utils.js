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
 * Return the type of an element based on the full OSM ID
 * @param {string} osmId
 * @return {string}
 */
export function findElementType(osmId) {
  return /^(\w+)\//.exec(osmId)[1];
}

/**
 * Return the ID of an element based on the full OSM ID
 * @param {string} osmId
 * @return {string}
 */
export function findElementId(osmId) {
  return /\/(\d+)$/.exec(osmId)[1];
}

/**
 * Check the OSM ID e.g -12 is negative
 * @param {string} id
 * @return {boolean}
 */
export function checkIdIsNegative(id) {
  return /^[-]\d+$/.test(id);
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
