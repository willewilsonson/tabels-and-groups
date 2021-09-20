import { useState, useEffect } from 'react';

const teams = [];
const gameOrder = [];

const Schedule = ({ showSchedule, data }) => {
    const[roundsQuantity, setRoundsQuantity] = useState(data.teams?.length - 1);
    const[rounds, setRounds] = useState([]);

    function splitIntoGames(arr, len) {
        let chunks = [], i = 0, n = arr.length;
        while (i < n) {
          chunks.push(arr.slice(i, i += len));
        }
        console.log(chunks);
        setRounds(chunks);
      }
    
    useEffect(() => {
        if (teams.length === 0) {
            data.teams.map(team => teams.push(team.teamName));
        }
    }, [data])

    useEffect(() => {
        // console.log(roundsQuantity);
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
            <div>{rounds.map(team => <p>{team[0]} - {team[1]}</p>)}</div>
        </div>
    )
}

export default Schedule;