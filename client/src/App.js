import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Groups from './Groups';
import TournamentForm from './TournamentForm';
import TeamForm from './TeamForm';

const id = '61434d44e34d661a5bc936a8';

function App() {
  const[data, setData] = useState({});

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
      <button>Start tournament</button>
    </div>
  );
}

export default App;
