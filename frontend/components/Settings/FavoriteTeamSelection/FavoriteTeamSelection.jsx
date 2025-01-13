// import { useState, useEffect } from 'react';
// import { addTeamToUserFavorites } from '../../../src/app/utilities.jsx';

// const FavoriteTeamSelection = () => {
//     const [teams, setTeams] = useState([]);
//     const [selectedTeam, setSelectedTeam] = useState('');

//     useEffect(() => {
//         // Fetch the JSON data from the API
//         fetch('http://127.0.0.1:8000/api/v1/api_app/nfl_teams/')
//             .then(response => response.json())
//             .then(data => setTeams(data))
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     const handleAddFavorite = async (teamId) => {
//         const result = await addTeamToUserFavorites(teamId);
//         if (result) {
//             setSelectedTeam(teamId);
//             console.log('Team added to favorites:', result);
//         } else {
//             console.error('Failed to add team to favorites');
//         }
//     };
    
//     return (
//         <>
//         <div className="dropdown dropdown-right">
//             <div tabIndex={0} role="button" className="btn m-1">Team Selection</div>
//             <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//                 {teams.map(team => (
//                     <li key={team.TeamID}>
//                         <a
//                             onClick={() => handleAddFavorite(team.TeamID)}
//                             className={selectedTeam === team.TeamID ? 'bg-gray-200' : ''}
//                         >
//                             {team.FullName}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         </>
//     )
// }

// export default FavoriteTeamSelection;