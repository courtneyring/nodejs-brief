const express = require('express');
const http = require('http');
const cors = require('cors');

require('dotenv').config()


const app = express();
app.use(cors());
const routes = require('./src/routes/index.route.js');
app.use(routes);

const httpServer = http.createServer(app);
httpServer.listen(8099);
console.log(`http server listening at port ${8099}`);

module.exports = { app };