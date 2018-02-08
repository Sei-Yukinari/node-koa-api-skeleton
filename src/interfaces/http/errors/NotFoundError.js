export default class NotFoundError extends Error {
  details;

  constructor(details) {
    super('NotFoundError');
    this.details = details;
  }
}
