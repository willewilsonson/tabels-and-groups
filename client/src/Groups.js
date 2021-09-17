import axios from "axios";
import './Groups.css'

const Groups = ({ id, data, setData }) => {

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
            <div>
                <span className="group-name">{g}</span>
                <table className='group-container' key={i}>
                    <tr>
                        <th>Name</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>SG</th>
                        <th>CG</th>
                        <th>GD</th>
                        <th>P</th>
                    </tr>
                    {data.teams?.map((team, i) => team.group === g
                    ? <tr className='team-container' key={i}>
                        <td>{team.teamName}</td>
                        <td>{team.wins}</td>
                        <td>{team.draws}</td>
                        <td>{team.losses}</td>
                        <td>{team.scoredGoals}</td>
                        <td>{team.concededGoals}</td>
                        <td>{team.goalDifference}</td>
                        <td>{team.points}</td>
                        <button value={i}onClick={(e) => deleteTeam(e)}>X</button>
                    </tr> 
                    : '')}
            </table>
          </div>
          )}
      </div>
    )
}

export default Groups;