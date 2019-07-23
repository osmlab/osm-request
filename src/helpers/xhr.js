import crossFetch from 'cross-fetch';
import xmlsrz from 'xmlserializer';
import { RequestException } from '../exceptions/request';

/**
 * Wrapper for fetching data from a given URL.
 * Uses either simple fetch or authenticated xhr according to specified options.
 * @param {string} url The URL to call
 * @param {Object} [options] Options object
 * @param {boolean} [options.auth] If auth XHR object is passed, it will be used instead of a simple fetch
 * @return {Promise} Resolves on response text, or rejects if any HTTP error occurs
 */
export function fetch(url, options = {}) {
  if (options.auth) {
    return new Promise((resolve, reject) => {
      options.auth.xhr(
        {
          method: 'GET',
          prefix: false,
          path: url
        },
        (err, res) => {
          if (err) {
            return reject(
              new RequestException(
                JSON.stringify({
                  message: `Request failed`,
                  status: err.status,
                  statusText: err.statusText
                })
              )
            );
          } else {
            if (res instanceof XMLDocument) {
              const mySerializer =
                window && window.XMLSerializer ? new XMLSerializer() : xmlsrz;
              return resolve(mySerializer.serializeToString(res));
            } else {
              return resolve(res);
            }
          }
        }
      );
    });
  } else {
    return crossFetch(url)
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
      .catch(error => {
        throw new RequestException(error);
      })
      .then(response => response.text());
  }
}
