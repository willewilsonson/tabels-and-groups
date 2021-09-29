import { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';
import Groups from './Groups';

const Schedule = ({ id, showSchedule, data, group, key }) => {
    const[roundsQuantity, setRoundsQuantity] = useState(0);
    const[teams, setTeams] = useState([]);
    const[gameOrder, setGameOrder] = useState([]);
    const[rounds, setRounds] = useState([]);

    const splitIntoGames = (arr, len) => {
        let chunks = [], i = 0, n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }
        console.log(chunks);
        chunks.map(team => console.log(team));
        setRounds(chunks);
    };

    useEffect(() => {
        if (teams.length === 0) {
            setTeams([...teams, ...group.matches]);
            setRoundsQuantity(group.matches.length - 1)
        };
    }, [showSchedule]);

    useEffect( async () => {
        const teamsCopy = teams;
        if (roundsQuantity > 0) {
            teamsCopy.push(teamsCopy.shift());
            setGameOrder(gameOrder => [...gameOrder, ...teamsCopy])
            setTeams(teamsCopy);
            setRoundsQuantity(roundsQuantity - 1);
        }
        if (roundsQuantity === 0) {
            console.log('slut');
            splitIntoGames(gameOrder, 2);
        }
    }, [roundsQuantity]);

    return(
        <div className="schedule">
            <div>{rounds.map((team, i) => <p key={i}>{team[0].teamName} - {team[1].teamName}</p>)}</div>
        </div>
    )
};

export default Schedule;