import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllNFLTeams, addTeamToUserFavorites } from '../../../src/app/utilities';

const AddFavoriteTeamCard = () => {
    const [teams, setTeams] = useState([]);
    const stockNFLImage = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png';
    const [currentSelectedTeam, setCurrentSelectedTeam] = useState(stockNFLImage);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { 
        setIsLoading(true);
        const fetchTeams = async () => {
            const data = await fetchAllNFLTeams();
            console.log(data);
            setTeams(data);
            setIsLoading(false);
        };
        fetchTeams();
    }, []);

    const handleAddFavorite = async () => {
        const teamId = teams[index].TeamID;
        const result = await addTeamToUserFavorites(teamId);
        if (result) {
            alert('Team added to favorites!');
            navigate('/home/')
        } else {
            alert('Failed to add team to favorites.');
        }
    };

    return (
        <>
            {!isLoading ? 
            <>
            <h1 className="text-center text-3xl font-bold my-4">Add Favorite Team</h1>
            <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body items-center text-center">
                    <div className="flex flex-col gap-12 mt-4">
                        <div className="flex flex-col items-center">
                                    <img src={currentSelectedTeam.WikipediaLogoUrl ? currentSelectedTeam.WikipediaLogoUrl: currentSelectedTeam} className="w-16 h-16" />
                                    <p className="text-xl">{currentSelectedTeam.FullName}</p>
                        </div>
                        <select className="select select-primary w-full max-w-xs"
                            onChange={(e) =>
                                            setCurrentSelectedTeam(
                                                teams.find((team) => team.FullName === e.target.value)
                                            )
                                        }
                        >
                            <option disabled selected>Pick your favorite team</option>
                            {teams.map((team, index) => (
                                <>
                                <option key={index}>{team.FullName}</option>
                                </>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-outline btn-primary" onClick={handleAddFavorite}>Add to Favorites</button>
                </div>
            </div>
            </>
        :
        <>
            <div className="flex items-center justify-center h-80 w-full">
            <span className="loading loading-ring loading-lg"></span>
            </div>
        </>
        }
        </>
    );
};

export default AddFavoriteTeamCard;