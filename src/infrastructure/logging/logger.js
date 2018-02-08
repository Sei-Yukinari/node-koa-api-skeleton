import Log4js from 'log4js';

module.exports = () => {
  Log4js.configure({
    appenders: { log: { type: 'console', filename: 'cheese.log' } },
    categories: { default: { appenders: ['log'], level: 'info' } },
  });
  const logger = Log4js.getLogger();
  return logger;
};
