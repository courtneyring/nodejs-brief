const logger = require('./logger');
require('dotenv').config();

module.exports = () => {
    let requiredVars = ['LEAGUE_SERVER_PORT', 'LEAGUE_SOURCE_ROOT_URL', 'LEAGUE_API_KEY'];
    let unsetVars = requiredVars.filter((envVar) => process.env[envVar] === undefined || process.env[envVar] === '');
    if (unsetVars.length) {
        logger.error(`Missing Environment Variables: ${unsetVars.join(', ')}`);
        process.exit();
    }
}