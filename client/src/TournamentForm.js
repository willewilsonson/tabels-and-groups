import { useState, useEffect } from 'react';
import axios from 'axios';
import './TournamentForm.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const TournamentForm = ({ id, setData }) => {
    const[title, setTitle] = useState('');
    const[groups, setGroups] = useState([]);
    const[groupsQuantity, setGroupsQuantity] = useState(0);

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
    )
};

export default TournamentForm;