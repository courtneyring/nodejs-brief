require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const httpServer = http.createServer(app);
const routes = require('./src/routes/index.route.js');
const auth = require('./src/middleware/auth.js');

app.use(cors());
app.use(auth);
app.use(routes);
app.use((error, req, res, next) => {
    return res.status(500).json({error: error.toString()})
})

httpServer.listen(process.env.LEAGUE_SERVER_PORT, () => {
    console.log(`http server listening at port ${8099}`);
});


module.exports = { app };