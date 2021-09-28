import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Groups from './Groups';
import TournamentForm from './TournamentForm';
import TeamForm from './TeamForm';
import Schedule from './Schedule';

const id = '6153192c57ed3f1918f00ad4';

function App() {
  const[data, setData] = useState({});
  const[showSchedule, setShowSchedule] = useState(false);

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
      <Groups id={id} data={data} setData={setData} showSchedule={showSchedule}/>
      {showSchedule ? data.groupSchedule?.map((group, i) => <Schedule key={i} id={id} group={group} showSchedule={showSchedule} data={data} setData={setData}/>) 
      : ''}
      <TournamentForm id={id} setData={setData}/>
      <TeamForm id={id} data={data} setData={setData}/>
      <button onClick={(e) => handleClick(e)}>Start tournament</button>
      {/* {showSchedule ? <Schedule showSchedule={showSchedule} data={data}/> : ''} */}
    </div>
  );
}

export default App;
