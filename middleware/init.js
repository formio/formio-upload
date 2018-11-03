const debug = require('debug');
const uuid = require('uuid/v4');
module.exports = function(namespace) {
  const log = debug(namespace);
  return function initialize(req, res, next) {
    const reqId = uuid();
    req.cleanup = [];
    req.debug = (msg) => {
      log(`${reqId}: ${msg}`);
    };
    const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    req.debug(`New Request from ${req.get('Referrer')}: (${ip})`);
    next();
  }
};