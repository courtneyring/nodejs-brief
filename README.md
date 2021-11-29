

## Overview

The purpose of this app is to provide an API to let users get tournament data cut in various ways. 

<br />
<br />


## Running the Application

### Run locally

- Rename .env.example to .env and fill in the missing LEAGUE_API_KEY variable
- Requires node to be installed on your computer

#### Run using docker

- Make sure docker is installed on your system then run the following to build an image and run it locally on port 8099.

```
 docker build -t nodejs-brief:latest .
 docker run -p 8099:8099 nodejs-brief:latest
```

#### Run without docker

Development Build:
```
npm install
npm run dev
```

Production Build:
```
npm install
npm run start
```


<br />
<br />


## API Details

#### Service URL
[http://localhost:8099](http://localhost:8099)

#### Authorization
All requests require an API key passed on the `x-api-key` header

#### Methods
All requests should use a GET method with `content-type: application/json`

<br />


### Teams Endpoints

#### Endpoints

|Endpoint|Return Value|
|-|-|
| `/teams/` | • Returns all teams in the tournament |
| `/teams/<ids>` | • Returns specified teams <br/> • `ids` are one or more team_id identifiers separated by commas <br /> •  Sending `*` as the `ids` value will return all teams <br />  |
| `/teams/<ids>/stats` | • Returns stats for specified teams <br /> • `ids` are one or more team_id  identifiers separated by commas <br /> • Sending `*` as the `ids` value will return stats for all teams <br /> • See below for list of stats returned  |

#### Stats Fields


| Name | Details |
|-|-|
|`team_id`| (String) Id of the team |
|`name`| (String) Name of the team |
|`home_wins`| (Integer) The number of match wins for the team when played at home |
|`home_losses`| (Integer) The number of match losses for the team when played at home |
|`home_draws`| (Integer) The number of matches drawn with the visiting team |
|`away_wins`| (Integer) The number of match wins for the team when played as the visiting team |
|`away_losses`| (Integer) The number of match losses for the team when played as the visiting team |
|`away_draws`| (Integer) The number of matches drawn with the visiting team when played as the visiting team|
|`points_scored`| (Integer) Total points scored for this team (both home and away) |
|`games_played`| (Integer) Total number of games played (both home and away) |



<br />

### Players Endpoints



#### Endpoints

|Endpoint|Return Value|
|-|-|
| `/players/` | • Returns all players in the tournament |
| `/players/<ids>` | • Returns specified players <br/> • `ids` are one or more player_id identifiers separated by commas <br /> •  Sending `*` as the `ids` value will return all players <br />  |
| `/player/<ids>/stats` | • Returns stats for specified players  <br /> • `ids` are one or more player_id identifiers separated by commas <br /> • Sending `*` as the `ids` value will return stats for all players <br /> • See below for list of stats returned  |

#### Stats Fields

| Name | Details |
|-|-|
|`player_id`| (String) Id of the player |
|`name`| (String) Name of the player |
|`age`| (Integer) Age of the player |
|`team_id`| (String) The players team Id |
|`team_name`| (String) The players team name |
|`games_played`| (Integer) The total number of matches the player has played (both home and away) |
|`points_scored`| (Integer) The total number of points scored by the player (both home and away) |

<br />

### Results Endpoints

|Endpoint|Return Value|
|-|-|
| `/results/` | • Returns outcomes for all games in the tournament |
