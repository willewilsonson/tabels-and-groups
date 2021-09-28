import { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';

const teams = [];
const gameOrder = [];

const Schedule = ({ id, showSchedule, data, group }) => {
    const[roundsQuantity, setRoundsQuantity] = useState(0);
    const[rounds, setRounds] = useState([]);

    // const postGamesToDb = (c) => {
    //     axios.patch(`posts/${id}`, {
    //         matches: c,
    //     })
    //     .then(res => console.log(res));
    // };

    // useEffect(() => {
    //     data.groups?.map(group => {
    //         rounds.filter(round => round.group === g)
    //     })
    // });

    useState(() => {
        data.groupSchedule.map(group => setRoundsQuantity(group.matches.length - 1));
    }, [group]);



    const splitIntoGames = (arr, len) => {
        let chunks = [], i = 0, n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }
        console.log(chunks);
        chunks.map(team => console.log(team));
        setRounds(chunks);
    }

    // useEffect(() => {
    //     axios.patch(`posts/${id}`, {
    //         matches: rounds,
    //     })
    //     .then(res => setData(res));
    // }, [rounds]);

    useEffect(() => {
        console.log(teams);
        if (teams.length === 0) {
            data.teams.map(team => teams.push(team));
        }
        return;
    }, [showSchedule])

    useEffect(() => {
        if (roundsQuantity > 0) {
            teams.map((team) => gameOrder.push(team));
            teams.push(teams.shift());
            setRoundsQuantity(roundsQuantity - 1)
        } if (roundsQuantity === 0) {
            console.log(gameOrder);
            splitIntoGames(gameOrder, 2);
        }
    }, [roundsQuantity]);

    return(
        <div>
            <div>{rounds.map((team, i) => <p key={i}>{team[0].teamName} - {team[1].teamName}</p>)}</div>
        </div>
    )
}

export default Schedule;