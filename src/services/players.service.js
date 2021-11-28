const dataService = require('./data.service');

const get = async function(ids){
    let allPlayers = await getAll();
    if (ids == '*') return allPlayers;
    else return allPlayers.filter(player => ids.includes(player.player_id));
}

const getAll = async function(){
    let data = await dataService.getData('players');
    return data;
}


module.exports = {
    get,
    getAll
};