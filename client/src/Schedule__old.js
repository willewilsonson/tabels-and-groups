import { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';
import Groups from './Groups';

const gameOrder = [];

const Schedule = ({ id, showSchedule, data, group, key }) => {
    const[roundsQuantity, setRoundsQuantity] = useState(0);
    const[rounds, setRounds] = useState([]);
    const[teams, setTeams] = useState([]);

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
        if (teams.length === 0) {
            setTeams(group.matches);
            setRoundsQuantity(group.matches.length - 1);
        }
        return;
    }, [showSchedule]);

    useEffect(() => {
        console.log(teams);
    }, [teams]);

    useEffect(() => {
        console.log(roundsQuantity);
        if (roundsQuantity > 0) {
            teams.map((team) => gameOrder.push(team));
            teams.push(teams.shift());
            setRoundsQuantity(roundsQuantity - 1)
        } 
        if (roundsQuantity === 0) {
            console.log(gameOrder);
            splitIntoGames(gameOrder, 2);
        }
    }, [roundsQuantity]);

    return(
        <div>
            <div>{rounds.map((team, i) => <p key={i}>{team[0].teamName} - {team[1].teamName}</p>)}</div>
        </div>
    )
};

export default Schedule;