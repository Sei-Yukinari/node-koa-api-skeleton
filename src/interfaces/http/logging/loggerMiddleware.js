const morgan = require('morgan');
const LoggerStreamAdapter = require('../../../infrastructure/logging/LoggerStreamAdapter');

module.exports = ({ logger }) => (
  morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger),
  })
);
