import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Groups from './Groups';
import TournamentForm from './TournamentForm';
import TeamForm from './TeamForm';
import Schedule from './Schedule';

const id = '61561ecf65118ec000c826cc';

function App() {
  const[data, setData] = useState({});
  const[showSchedule, setShowSchedule] = useState(false);
  const[updateGroup, setUpdateGroup] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    showSchedule ? setShowSchedule(false) : setShowSchedule(true);
  };

  useEffect(() => {
    axios.get(`posts/${id}`)
      .then(res => setData(res.data));
  }, [data])

  return (
    <div className='App'>
      <p>{data.title}</p>
      <TournamentForm id={id} setData={setData}/>
      <TeamForm id={id} data={data} setData={setData}  updateGroup={updateGroup} setUpdateGroup={setUpdateGroup}/>
      <button onClick={(e) => handleClick(e)}>Start tournament</button>
      <Groups id={id} data={data} setData={setData} showSchedule={showSchedule}  updateGroup={updateGroup} setUpdateGroup={setUpdateGroup}/>
      {showSchedule ? data.groupSchedule?.map((group, i) => <Schedule key={i} id={id} group={group} showSchedule={showSchedule} data={data} setData={setData}/>) 
      : ''}
      {/* {showSchedule ? <Schedule showSchedule={showSchedule} data={data}/> : ''} */}
    </div>
  );
}

export default App;
