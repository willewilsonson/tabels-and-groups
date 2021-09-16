import axios from "axios";
import './Groups.css'

const id = '61434d44e34d661a5bc936a8';



const Groups = ({ data, setData }) => {

    const deleteTeam = e => {
        e.preventDefault();
        console.log(e.target.value);
        axios.patch(`posts/deleteTeam/${id}`, {
          teams: e.target.value,
        })
        .then(res => setData(res));
      }

    return(
        <div>Groups: 
        {data.groups?.map((g, i) => 
          <div className='group-container' key={i}>{g} {data.teams?.map((team, i) => 
            team.group === g ? <div className='team-container' key={i}><p>{team.teamName}</p><button value={i}onClick={(e) => deleteTeam(e)}>X</button></div> : '')}
          </div>)}
      </div>
    )
}

export default Groups;