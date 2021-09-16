import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const id = '61434d44e34d661a5bc936a8';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function App() {
  const[data, setData] = useState({});
  const[title, setTitle] = useState('');
  const[groups, setGroups] = useState([]);
  const[groupsQuantity, setGroupsQuantity] = useState(0);
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

  useEffect(() => {
    axios.get(`posts/${id}`)
      .then(res => setData(res.data));
  }, [data])

  useEffect(() => {
    const groupsArray = [];
    letters.forEach((letter, i) => {
      if (i < groupsQuantity) {
        groupsArray.push(letter)
      }
    })
    setGroups([...groupsArray]);
  }, [groupsQuantity]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(title);
    axios.patch(`posts/${id}`, { 
      title: title,
      groups: groups,
    })
      .then(res => setData(res))
  };

  const handleTeamSubmit = e => {
    e.preventDefault();
    console.log(team);
    axios.patch(`posts/${id}`, {
      teams: team,
    })
    .then(res => setData(res));
  }

  const deleteTeam = e => {
    e.preventDefault();
    console.log(e.target.value);
    axios.patch(`posts/deleteTeam/${id}`, {
      teams: e.target.value,
    })
    .then(res => setData(res));
  }

  return (
    <div className='App'> 
      <div>Name: {data.title}</div>
      <div>Groups: 
        {data.groups?.map((g, i) => 
          <div className='group-container' key={i}>{g} {data.teams?.map((team, i) => 
            team.group === g ? <div className='team-container'><p key={i}>{team.teamName}</p><button value={i}onClick={(e) => deleteTeam(e)}>X</button></div> : '')}
          </div>)}
      </div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>Groups:</label>
        <input 
          type='number'
          max='8'
          min='1'
          onChange={(e) => setGroupsQuantity(e.target.value)}
          value={groupsQuantity}
        />
        <button>tryck</button>
      </form>
      <form onSubmit={handleTeamSubmit}>
        <label>Team name:</label>
        <input 
          type='text'
          name='teamName'
          onChange={(e) => setTeam( {...team, [e.target.name]: e.target.value} )}
          value={data.teamName}
        />
        <select name='group' value={team.group} onChange={(e) => setTeam( {...team, [e.target.name]: e.target.value })}>
          <option>-- Choose a group --</option>
          {data.groups?.map((group, i) => <option value={group} key={i}>{group}</option>)}
        </select>
        <button>+</button>
      </form>
    </div>
  );
}

export default App;
