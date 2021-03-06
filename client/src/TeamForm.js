import { useState, useEffect } from 'react';
import axios from 'axios';

const TeamForm = ({ id, data, setData, setUpdateGroup }) => {
    const[team, setTeam] = useState({
        teamName: '',
        playedGames: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        scoredGoals: 0,
        concededGoals: 0,
        goalDifference: 0,
        points: 0,
        group: '',
      })

      const handleTeamSubmit = e => {
        e.preventDefault();
        if (team.teamName === '') {
          return alert('Give the team a name');
        }
        if (team.group === '') {
          return alert('Place the team in a group');
        }
        console.log(team);
        axios.patch(`posts/${id}`, {
          teams: team,
        })
        .then(res => setData(res))
        .then(setUpdateGroup(true));
      }

    return(
        <form onSubmit={handleTeamSubmit}>
        <label>Team name:</label>
        <input 
          type='text'
          name='teamName'
          onChange={(e) => setTeam( {...team, [e.target.name]: e.target.value} )}
          value={data.teamName}
        />
        <select name='group' value={team.group} onChange={(e) => setTeam( {...team, [e.target.name]: e.target.value })}>
          <option value=''>-- Choose a group --</option>
          {data.groups?.map((group, i) => <option value={group} key={i}>{group}</option>)}
        </select>
        <button>+</button>
      </form>
    )
};

export default TeamForm;