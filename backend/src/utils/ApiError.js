export default class ApiError extends Error {
  constructor(statusCode, message, extra = {}) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    Object.assign(this, extra);
  }
}
