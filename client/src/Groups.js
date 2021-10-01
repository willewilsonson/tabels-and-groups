import axios from "axios";
import { useEffect, useState } from "react";
import './Groups.css'
// import Schedule from './Schedule';

const Groups = ({ id, data, setData, showSchedule, updateGroup, setUpdateGroup }) => {
    const[groupLength, setGroupLength] = useState([data.teams]);

    useEffect(() => {
        console.log(groupLength);
    }, [groupLength]);

    const saveGroup = (group) => {
        console.log(updateGroup);
        console.log(data.teams);
        const teamsByGroup = data.teams.filter(team => team.group === group);
        const groupInDb = data.groupSchedule?.filter(g => g.group !== group);

        groupInDb.push({group: group, teams: teamsByGroup, matches: []})

        axios.patch(`posts/matches/${id}`, {
            groupSchedule: groupInDb,
        })
        .then(res => setData(res))
        .then(setUpdateGroup(false));
        console.log(data.teams);
        console.log(updateGroup);
    };

    useEffect(() => {
        console.log(updateGroup);
    }, [updateGroup]);

    const deleteTeam = e => {
        e.preventDefault();
        console.log(e.target.value);
        axios.patch(`posts/deleteTeam/${id}`, {
          teams: e.target.value,
        })
        .then(res => setData(res))
        .then(setUpdateGroup(true));
      }

    const createGroups = (g, i) => {
    return <div key={i}>
        <span className="group-name">{g}</span>
        <table className='group-container'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>SG</th>
                    <th>CG</th>
                    <th>GD</th>
                    <th>P</th>
                </tr>
            </thead>
            {data.teams?.map((team, i) => createTeamsForGroup(g, team, i))}
        </table>
        <button onClick={() => saveGroup(g)}>Refresh Schedule</button>
    </div>
    };

      const createTeamsForGroup = (g, team, i) => {
        return team.group === g
                    ? <tbody key={i}>
                        <tr className='team-container'>
                            <td>{team.teamName}</td>
                            <td>{team.wins}</td>
                            <td>{team.draws}</td>
                            <td>{team.losses}</td>
                            <td>{team.scoredGoals}</td>
                            <td>{team.concededGoals}</td>
                            <td>{team.goalDifference}</td>
                            <td>{team.points}</td>
                            <td>
                                <button value={i}onClick={(e) => deleteTeam(e)}>X</button>
                            </td>
                        </tr>
                    </tbody>
                    : false;
      };

    return(
        <div>Groups: 
            {data.groups?.map((g, i) => createGroups(g, i))}
      </div>
    )
};

export default Groups;