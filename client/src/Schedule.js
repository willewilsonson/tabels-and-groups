import { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';
import Game from './Game';

const Schedule = ({ id, showSchedule, data, setData, group, matches }) => {
    const[roundsQuantity, setRoundsQuantity] = useState(0);
    const[teamsGroupOne, setTeamsGroupOne] = useState([]);
    const[teamsGroupTwo, setTeamsGroupTwo] = useState([]);
    const[gameOrder, setGameOrder] = useState([]);
    const[rounds, setRounds] = useState([]);

    useEffect(() => {
        // console.log(teamsGroupOne);
        // console.log(teamsGroupTwo);
    }, [teamsGroupOne]);

    const splitIntoGames = (arr, len) => {
        let chunks = [], i = 0, n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }
        // console.log(chunks);
        // chunks.map(team => console.log(team));
        setRounds(chunks);
    };

    useEffect(() => {
        const length = group.teams.length;
        const half = length / 2;
        if (teamsGroupOne.length === 0) {
            setTeamsGroupOne([...teamsGroupOne, ...group.teams.slice(0, length / 2)]);
            setTeamsGroupTwo([...teamsGroupTwo, ...group.teams.slice(half, length)]);
            setRoundsQuantity(group.teams.length - 1)
        };
    }, [showSchedule]);

    const nextRound = (g1, g2) => {
        const array = [...g1, ...g2];
        const n1 = [...g1.slice(0, 1), ...g2.slice(0, 1), ...g1.slice(1, g1.length - 1)];
        const n2 = [...g2.slice(1, g2.length), ...g1.slice(g1.length - 1, g1.length)];
        setTeamsGroupOne(n1);
        setTeamsGroupTwo(n2);
        return array;
    };

    useEffect(() => {
        if (roundsQuantity > 0) {
            const updateTeams = nextRound(teamsGroupOne, teamsGroupTwo)
            setGameOrder(gameOrder => [...gameOrder, ...updateTeams]);
            setRoundsQuantity(roundsQuantity - 1);
        }
        if (roundsQuantity === 0) {
            // console.log(gameOrder, ' slut');
            splitIntoGames(gameOrder, 2);
        }
    }, [roundsQuantity]);

    useEffect(() => {
        // console.log(gameOrder);
    }, [gameOrder]);

    return(
        <div className="schedule">
            {/* <div>{rounds?.map((team, i) => <p key={i}>{team[0].teamName} - {team[1].teamName}</p>)}</div> */}
            {rounds.map((teams, i) => <Game key={i} index={i} id={id} teams={teams} data={data} setData={setData} matches={matches}/>)}
        </div>
    )
};

export default Schedule; 