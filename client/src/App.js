import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const id = '6141e32e4b30db019bf2e6e1';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function App() {
  const[data, setData] = useState({});
  const[title, setTitle] = useState('');
  const[groups, setGroups] = useState([]);
  const[groupsQuantity, setGroupsQuantity] = useState(0);

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

  return (
    <div className="App"> 
      <div>Name: {data.title}</div>
      <div>GroupsQuantity: {data.groups?.map((g, i) => <p key={i}>{g}</p>)}</div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>Groups:</label>
        <input 
          type="number"
          max="8"
          min="1"
          onChange={(e) => setGroupsQuantity(e.target.value)}
          value={groupsQuantity}
        />
        <button>tryck</button>
      </form>
    </div>
  );
}

export default App;
