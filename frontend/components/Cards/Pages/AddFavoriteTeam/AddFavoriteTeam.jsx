import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllNFLTeams, addTeamToUserFavorites } from '../../../../src/app/utilities';

const AddFavoriteTeamCard = () => {
    const [teams, setTeams] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            const data = await fetchAllNFLTeams();
            setTeams(data);
        };
        fetchTeams();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teams.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + teams.length) % teams.length);
    };

    const handleAddFavorite = async () => {
        const teamId = teams[currentIndex].TeamID;
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
            <h1 className="text-center text-3xl font-bold my-4">Add Favorite Team</h1>
            <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body items-center text-center">
                    {teams.length > 0 && (
                        <div className="flex flex-col items-center">
                            <img src={teams[currentIndex].WikipediaLogoUrl} alt={teams[currentIndex].FullName} className="w-16 h-16" />
                            <p className="text-xl">{teams[currentIndex].FullName}</p>
                        </div>
                    )}
                    <button className="btn btn-outline" onClick={handleAddFavorite}>Add to Favorites</button>
                    <div className="join grid grid-cols-2 mt-4">
                        <button className="join-item btn btn-outline" onClick={handlePrevious}>Previous</button>
                        <button className="join-item btn btn-outline" onClick={handleNext}>Next</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AddFavoriteTeamCard;