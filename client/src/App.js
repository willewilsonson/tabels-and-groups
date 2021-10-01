import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Groups from './Groups';
import TournamentForm from './TournamentForm';
import TeamForm from './TeamForm';
import Schedule from './Schedule';

const id = '6156ed3cb2e888f350d9dc05';

function App() {
  const[data, setData] = useState({});
  const[showSchedule, setShowSchedule] = useState(false);
  const[updateGroup, setUpdateGroup] = useState(false);
  const[matches, setMatches] = useState([]);

  const handleClick = e => {
    e.preventDefault();
    showSchedule ? setShowSchedule(false) : setShowSchedule(true);
  };

  useEffect(() => {
    axios.get(`posts/${id}`)
      .then(res => setData(res.data));
  }, [data])

  useEffect(() => {
    setMatches(data.matches);
    return;
  }, [showSchedule]);

  return (
    <div className='App'>
      <p>{data.title}</p>
      <TournamentForm id={id} setData={setData}/>
      <TeamForm id={id} data={data} setData={setData}  updateGroup={updateGroup} setUpdateGroup={setUpdateGroup}/>
      <button onClick={(e) => handleClick(e)}>Start tournament</button>
      <Groups id={id} data={data} setData={setData} showSchedule={showSchedule}  updateGroup={updateGroup} setUpdateGroup={setUpdateGroup}/>
      {showSchedule ? data.groupSchedule?.map((group, i) => <Schedule key={i} id={id} group={group} showSchedule={showSchedule} data={data} setData={setData} matches={matches}/>) 
      : ''}
      {/* {showSchedule ? <Schedule showSchedule={showSchedule} data={data}/> : ''} */}
    </div>
  );
}

export default App;
