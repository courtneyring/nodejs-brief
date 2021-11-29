const dataService = require('./data.service');

const initialStats = {
    home_wins: 0,
    home_losses: 0,
    home_draws: 0,
    away_wins: 0,
    away_losses: 0,
    away_draws: 0,
    points_scored: 0,
    games_played: 0
}

const getAll = async function () {
    let data = await dataService.getData('results');
    return data;
}

const getStatsByPlayer = async function (player) {
    let results = await getAll();
    let pointsByPlayers = results.reduce(_playersReducer, []);
    let pointsArr = pointsByPlayers.filter((p) => p.player_id == player.player_id);
    let games_played = pointsArr.length;
    let points_scored = pointsArr.reduce(_pointsReducer, 0);
    return { games_played, points_scored }
}


const getStatsByTeam = async function (team) {
    let teamId = team.team_id;
    let results = await getAll();
    let games = results.filter((d) => d.home_team.team_id == teamId || d.visiting_team.team_id == teamId);
    let stats = _reduceStats(games, teamId);
    return stats;
}

// Uses the games array to calculate and tally the outcome of each game as well as total games played, and total points scored across all games. Returns an object with each of these stats.
const _reduceStats = function (games, teamId) {
    return games.reduce((previousVal, currentVal) => {
        let stats = { ...previousVal };
        let { teamKey, teamPlayers, opposingPlayers } = _getLocation(currentVal, teamId);
        let teamPoints = teamPlayers.reduce(_pointsReducer, 0);
        let opposingPoints = opposingPlayers.reduce(_pointsReducer, 0);
        let outcome = _getOutcome(teamPoints, opposingPoints);
        stats[`${teamKey}_${outcome}`] += 1;
        stats.points_scored += teamPoints;
        stats.games_played += 1;
        return stats;
    }, initialStats);
}

// Flattens nested player stats of each team within each game into an array objects
const _playersReducer = (previousValue, currentValue) => {
    let homePlayers = currentValue.home_team.players;
    let awayPlayers = currentValue.visiting_team.players;
    let allPlayers = homePlayers.concat(awayPlayers)
    return previousValue.concat(allPlayers);
}


const _pointsReducer = (acc, current) => {
    return acc += current.points_scored;
}

const _getOutcome = function (teamPoints, opposingPoints) {
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

const _getLocation = function (game, teamId) {
    let homePlayers = game.home_team.players;
    let visitingPlayers = game.visiting_team.players

    if (game.home_team.team_id == teamId) {
        return { teamKey: 'home', teamPlayers: homePlayers, opposingPlayers: visitingPlayers }
    }
    else return { teamKey: 'away', teamPlayers: visitingPlayers, opposingPlayers: homePlayers };
}


module.exports = {
    getAll,
    getStatsByTeam,
    getStatsByPlayer
};