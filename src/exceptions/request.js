export class RequestException extends Error {
  constructor(message) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestException);
    }
    this.name = 'RequestException';
  }
}
