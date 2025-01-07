import { use } from 'react';
import { useState, useEffect } from 'react';

const FavoriteTeamSelection = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        // Fetch the JSON data from the API
        fetch('http://127.0.0.1:8000/api/v1/api_app/nfl_teams/')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (event) => {
        setSelectedTeam(event.target.value);
    };
    
    return (
        <>
            <div className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="btn m-1">Team Selection</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {teams.map(team => (
                        <li key={team.TeamID}>
                            <a onClick={() => setSelectedTeam(team.FullName)}>{team.FullName}</a>
                        </li>
                    ))}
                </ul>
            </div>  
        </>
    )
}

export default FavoriteTeamSelection;