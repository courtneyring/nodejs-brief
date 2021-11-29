require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const httpServer = http.createServer(app);
const routes = require('./src/routes/index.route.js');
const authHandler = require('./src/middleware/authHandler.middleware.js');
const errorHandler = require('./src/middleware/errorHandler.middleware.js');

app.use(cors());
app.use(authHandler);
app.use(routes);
app.use(errorHandler)

httpServer.listen(process.env.LEAGUE_SERVER_PORT, () => {
    console.log(`http server listening at port ${8099}`);
});


module.exports = { app };