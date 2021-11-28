module.exports = function(req, res, next) {

    if (req.headers['x-api-key'] !== process.env.LEAGUE_API_KEY) {
        res.sendStatus(401);
    }
    else {
        next();   
    }
}

