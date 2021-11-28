const data = require('../data/players.json');


const get = function(ids){
    return getAll().filter(player => ids.includes(player.player_id));
}

const getAll = function(){
    return data;
}


module.exports = {
    get,
    getAll
};