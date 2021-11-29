const logger = require('../utils/logger');

module.exports = function (error, req, res, next) {
    logger.error(`${error.status || 500} - ${error.message} - ${req.method} ${req.originalUrl}`);
    res.status(500).json({ error: error.toString() })
}


