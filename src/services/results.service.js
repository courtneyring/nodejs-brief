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

const getAll = async function () {
    let data = await dataService.getData('results');
    return data;
}

const getStatsByPlayer = async function (player) {
    let results = await getAll();
    let pointsByPlayers = flattenPlayers(results);
    let pointsArr = pointsByPlayers.filter((p) => p.player_id == player.player_id);
    let games_played = pointsArr.length;
    let points_scored = pointsArr.reduce((prev, curr) => {
        return prev += curr.points_scored;
    }, 0)
    return { games_played, points_scored }
}


const flattenPlayers = function (playerResults) {
    return playerResults.reduce((previousValue, currentValue) => {
        let homePlayers = currentValue.home_team.players;
        let awayPlayers = currentValue.visiting_team.players;
        let allPlayers = homePlayers.concat(awayPlayers)
        return previousValue.concat(allPlayers);
    }, [])
}

const mapPoints = function (games) {
    games.map((game) => {
        for (let [key, value] of Object.entries(game)) {
            let points = 0;
            for (let player of value.players) {
                points += player.points_scored;
            }
            game[key]['points'] =  points;
        }

    })
}

const getStatsByTeam = async function (team) {
    let teamId = team.team_id;
    let results = await getAll();
    let games = results.filter((d) => d.home_team.team_id == teamId || d.visiting_team.team_id == teamId);

    let stats = Object.assign({}, resetStats);
    stats.games_played = games.length;
    mapPoints(games);


    for (let game of games) {
        //Fix
        let teamKey = game.home_team.team_id == teamId ? 'home' : 'away';
        let teamLabel = teamKey == 'home' ? 'home_team' : 'visiting_team';
        let opposingLabel = teamKey == 'home' ? 'visiting_team' : 'home_team';
        let teamPoints = game[teamLabel].points;
        let opposingPoints = game[opposingLabel].points

        stats.points_scored += teamPoints;

        if (teamPoints > opposingPoints) {
            stats[`${teamKey}_wins`] += 1;
        }
        else if (teamPoints < opposingPoints) {
            stats[`${teamKey}_losses`] += 1;
        }
        else {
            stats[`${teamKey}_draws`] += 1;
        }

    }
    return stats;

}



module.exports = {
    getAll,
    getStatsByPlayer,
    getStatsByTeam
};