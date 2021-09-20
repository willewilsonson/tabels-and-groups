import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Groups from './Groups';
import TournamentForm from './TournamentForm';
import TeamForm from './TeamForm';
import Schedule from './Schedule';

const id = '61449caf6cc821d6202a4474';

function App() {
  const[data, setData] = useState({});
  const[showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    axios.get(`posts/${id}`)
      .then(res => setData(res.data));
  }, [data])

  return (
    <div className='App'> 
      <div>Name: {data.title}</div>
      <Groups id={id} data={data} setData={setData}/>
      <TournamentForm id={id} setData={setData}/>
      <TeamForm id={id} data={data} setData={setData}/>
      <button onClick={() => showSchedule ? setShowSchedule(false) : setShowSchedule(true)}>Start tournament</button>
      {showSchedule ? <Schedule showSchedule={showSchedule} data={data}/> : ''}
    </div>
  );
}

export default App;
