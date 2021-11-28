const dataService = require('./data.service');

const resetStats = {
    home_wins: 0, 
    home_losses: 0, 
    home_draws: 0, 
    away_wins: 0,
    away_losses: 0, 
    away_draws: 0,
    points_scored: 0,
    games_played: 0
}

const getAll = async function(){
    let data = await dataService.getData('results');
    return data;
}

const getStatsByPlayer = async function(player) {
    let results = await getAll();
    let pointsByPlayers = _reducePlayers(results);
    let pointsArr = pointsByPlayers.filter((p) => p.player_id == player.player_id);
    let games_played = pointsArr.length;
    let points_scored = _reducePoints(pointsArr);
    return {games_played, points_scored}
}


const getStatsByTeam = async function(team) {
    let teamId = team.team_id;
    let results = await getAll();
    let games = results.filter((d) => d.home_team.team_id == teamId || d.visiting_team.team_id == teamId);
    let points = _getPoints(games);
    let stats = _calcStats(points, teamId);
    return stats;
}

const _reducePoints = function(arr) {
    return arr.reduce((previousValue, currentValue) => {
        return previousValue += currentValue.points_scored;
    }, 0)
}

const _reducePlayers = function(playerResults) {
    return playerResults.reduce((previousValue, currentValue) => {
        let homePlayers = currentValue.home_team.players;
        let awayPlayers = currentValue.visiting_team.players;
        let allPlayers = homePlayers.concat(awayPlayers)
        return previousValue.concat(allPlayers);
    }, [])
}

const _calcStats = function(games, teamId) {
  
    let stats = Object.assign({}, resetStats);
    stats.games_played = games.length;

    for (let game of games) {
        let {teamKey, teamLabel, opposingLabel} = _getLocation(game, teamId);
        let teamPoints = game[teamLabel].points;
        let opposingPoints = game[opposingLabel].points

        stats.points_scored += teamPoints;
        let outcome = _getOutcome(teamPoints, opposingPoints);
        stats[`${teamKey}_${outcome}`] +=1;
    }
    return stats;
}

const _getOutcome = function(teamPoints, opposingPoints) {
    if (teamPoints > opposingPoints) {
        return 'wins';
    }
    else if (teamPoints < opposingPoints) {
        return 'losses';
    }
    else {
        return 'draws';
    }
}

const _getLocation = function(game, teamId) {
    if (game.home_team.team_id == teamId) {
        return {teamKey: 'home', teamLabel: 'home_team', opposingLabel: 'visiting_team'}
    }
    else return {teamKey: 'away', teamLabel: 'visiting_team', opposingLabel: 'home_team'};
}


const _getPoints = function(games) {
    let points = games.map((game) => {
        let obj = {};
        for (let [key, value] of Object.entries(game)) {
            let points = 0;
            for (let player of value.players) {
                points += player.points_scored;
            }
            obj[key] = {...value, points}
        }
        return obj
    })
    return points;
}


module.exports = {
    getAll, 
    getStatsByTeam,
    getStatsByPlayer
};