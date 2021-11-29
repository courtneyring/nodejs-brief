const morgan = require('morgan');
const logger = require('../utils/logger');


const successHandler = morgan('common', {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
  });
  
  const errorHandler = morgan('common', {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
  });


module.exports = {
    successHandler, 
    errorHandler
}