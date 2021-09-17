import { useState, useEffect } from 'react';

const Schedule = ({ showSchedule, data }) => {
    const[roundsQuantity, setRoundsQuantity] = useState(data.teams?.length);
    const[rounds, setRounds] = useState([]);

    const roundsArray = [];

    useEffect(() => {
        if (showSchedule) {
            setRoundsQuantity(data.teams?.length - 1)
        }
    }, [data]);

    useEffect(() => {
        console.log(showSchedule);
    }, [showSchedule])

    useEffect(() => {
        for (let i = 0; i < roundsArray.length; i++) {
            roundsArray.push(i+1);
        }
        setRounds(roundsArray)
    }, [showSchedule])

    return(
        <div>
            <div>{roundsQuantity}</div>
            <div>{data.teams?.map((team, i, teams) => <div key={i}>{team.teamName} - {teams[i+1]?.teamName}</div>)}</div>
        </div>
    )
}

export default Schedule;