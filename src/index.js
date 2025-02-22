const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const httpServer = http.createServer(app);
const logger = require('./utils/logger');
const initEnvironment = require('./utils/environment');
const routes = require('./routes/index.route.js');
const authHandler = require('./middleware/authHandler.middleware.js');
const errorHandler = require('./middleware/errorHandler.middleware.js');
const morganConfig = require('./middleware/morganConfig.middleware.js');

app.use(morganConfig.successHandler);
app.use(morganConfig.errorHandler);
app.use(cors());
app.use(authHandler);
app.use(routes);
app.use(errorHandler)

initEnvironment();

httpServer.listen(process.env.LEAGUE_SERVER_PORT, () => {
    logger.info(`Server started and running on http://localhost:${process.env.LEAGUE_SERVER_PORT}`)
});


module.exports = { app };