import axios from "axios";
import { useState, useEffect } from "react";
import './Game.css';

const Game = ({ id, teams, setData }) => {
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
                draws: score.homeTeam.draws,
                losses: score.homeTeam.losses,
                scoredGoals: score.homeTeam.scoredGoals + score.homeTeamScore,
                concededGoals: score.homeTeam.concededGoals + score.awayTeamScore,
                goalDifference: score.homeTeam.goalDifference + (score.homeTeam - score.awayTeam),
                points: score.homeTeam.points + 3,
                group: score.homeTeam.group,
                _id: score.homeTeam._id,
            }, {
                teamName: score.awayTeam.teamName,
                playedGames: score.awayTeam.playedGames + 1,
                wins: score.awayTeam.wins + 1,
                draws: score.awayTeam.draws,
                losses: score.awayTeam.losses,
                scoredGoals: score.awayTeam.scoredGoals + score.awayTeamScore,
                concededGoals: score.awayTeam.concededGoals + score.homeTeamScore,
                goalDifference: score.awayTeam.goalDifference + (score.awayTeam - score.homeTeam),
                points: score.awayTeam.points + 3,
                group: score.awayTeam.group,
                _id: score.awayTeam._id,
            }])
            .then(res => setData(res));
        }
        if (index === 1) {
            console.log('borta');
            axios.patch(`posts/team/${id}`, [{
                teamName: score.awayTeam.teamName,
                playedGames: score.awayTeam.playedGames + 1,
                wins: score.awayTeam.wins + 1,
                draws: score.awayTeam.draws,
                losses: score.awayTeam.losses,
                scoredGoals: score.awayTeam.scoredGoals + score.awayTeamScore,
                concededGoals: score.awayTeam.concededGoals + score.homeTeamScore,
                goalDifference: score.awayTeam.goalDifference + (score.awayTeam - score.homeTeam),
                points: score.awayTeam.points + 3,
                group: score.awayTeam.group,
                _id: score.awayTeam._id,
            }, {
                teamName: score.homeTeam.teamName,
                playedGames: score.homeTeam.playedGames + 1,
                wins: score.homeTeam.wins + 1,
                draws: score.homeTeam.draws,
                losses: score.homeTeam.losses,
                scoredGoals: score.homeTeam.scoredGoals + score.homeTeamScore,
                concededGoals: score.homeTeam.concededGoals + score.awayTeamScore,
                goalDifference: score.homeTeam.goalDifference + (score.homeTeam - score.awayTeam),
                points: score.homeTeam.points + 3,
                group: score.homeTeam.group,
                _id: score.homeTeam._id,
            }])
            .then(res => setData(res));
        }
    };

    // useEffect(() => {
    //     if (score.homeTeamScore === score.awayTeamScore) {
    //         draw();
    //     }
    //     if (score.homeTeamScore > score.awayTeamScore) {
    //         win(0);
    //     }
    //     if (score.awayTeamScore > score.homeTeamScore) {
    //         win(1);
    //     }
    // }, [score]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (score.homeTeamScore === score.awayTeamScore) {
            draw();
        }
        if (score.homeTeamScore > score.awayTeamScore) {
            win(0);
        }
        if (score.awayTeamScore > score.homeTeamScore) {
            win(1);
        }
    };

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
                    <form onSubmit={handleSubmit} className="game__game">
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
                        {i === 1 ? <button>Done</button> : ''}
                    </form>
                </div>)}
        </div>
    )
};

export default Game; 

