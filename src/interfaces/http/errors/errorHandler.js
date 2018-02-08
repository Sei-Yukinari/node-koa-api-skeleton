const Status = require('http-status');

/* istanbul ignore next */
module.exports = (ctx) => { // eslint-disable-line no-unused-vars
  const logger = ctx.scope.resolve('logger');
  logger.error(ctx.error);
  ctx.status = Status.INTERNAL_SERVER_ERROR;
  ctx.body = {
    type: 'InternalServerError',
    message: 'The server failed to handle this request',
  };
};
