export default class ValidationError extends Error {
  details;
  constructor(details) {
    super('ValidationError');
    this.details = details;
  }
}
