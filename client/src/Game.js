import axios from "axios";
import { useState, useEffect } from "react";
import './Game.css';

const Game = ({ id, teams }) => {
    const[score, setScore] = useState({
        homeTeamScore: NaN,
        awayTeamScore: NaN,
        homeTeam: '',
        awayTeam: '',
    });

    const draw = () => {
        console.log('lika');
    };

    const win = index => {
        if (index === 0) {
            console.log('hemma');
            axios.patch(`posts/team/${id}`, [{
                teamName: score.homeTeam.teamName,
                playedGames: score.homeTeam.playedGames + 1,
                wins: score.homeTeam.wins + 1,
                scoredGoals: score.homeTeam.scoredGoals + score.homeTeamScore,
                concededGoals: score.homeTeam.concededGoals + score.awayTeamScore,
                points: score.homeTeam.points + 3,
                _id: score.homeTeam._id,
            }, {
                teamName: score.awayTeam.teamName,
                playedGames: score.awayTeam.playedGames + 1,
                wins: score.awayTeam.losses + 1,
                scoredGoals: score.awayTeam.scoredGoals + score.awayTeamScore,
                concededGoals: score.awayTeam.concededGoals + score.homeTeamScore,
                _id: score.awayTeam._id,

            }])
        }
        if (index === 1) {
            console.log('borta');
            axios.patch(`posts/team/${id}`, [{
                teamName: score.awayTeam.teamName,
                playedGames: score.awayTeam.playedGames + 1,
                wins: score.awayTeam.wins + 1,
                scoredGoals: score.awayTeam.scoredGoals + score.awayTeamScore,
                concededGoals: score.awayTeam.concededGoals + score.homeTeamScore,
                points: score.awayTeam.points + 3,
                _id: score.homeTeam._id,
            }, {
                teamName: score.homeTeam.teamName,
                playedGames: score.homeTeam.playedGames + 1,
                wins: score.homeTeam.losses + 1,
                scoredGoals: score.homeTeam.scoredGoals + score.homeTeamScore,
                concededGoals: score.homeTeam.concededGoals + score.awayTeamScore,
                _id: score.awayTeam._id,
            }])
        }
    };

    useEffect(() => {
        if (score.homeTeamScore === score.awayTeamScore) {
            draw();
        }
        if (score.homeTeamScore > score.awayTeamScore) {
            win(0);
        }
        if (score.awayTeamScore > score.homeTeamScore) {
            win(1);
        }
    }, [score])

    const homeOrAwayTeam = (i, team, event) => {
        if (i === 0) {
            setScore({
                ...score, 
                    homeTeamScore: Number(event.target.value),
                    homeTeam: team,
            });
        }
        if (i === 1) {
            setScore({
                ...score, 
                    awayTeamScore: Number(event.target.value),
                    awayTeam: team,
            });
        }
    };

    return(
        <div className="game">
            {teams?.map((team, i) => 
                <div className="game__game">
                    <form className="game__game">
                        {i === 0 ? <p>{team.teamName}</p>: ''}
                        <input
                            id={i}
                            type='number'
                            max='99'
                            min='0'
                            onChange={(e) => homeOrAwayTeam(i, team, e)}
                            value={score[i]}
                        ></input>
                        {i === 0 ? <span> - </span>: <p>{team.teamName}</p>}
                    </form>
                </div>)}
        </div>
    )
};

export default Game; 

