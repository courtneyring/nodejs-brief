module.exports = function(error, req, res, next) {
    res.status(500).json({error: error.toString()})
}


