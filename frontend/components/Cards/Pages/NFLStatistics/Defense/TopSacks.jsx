import { useState, useEffect } from 'react';

const TopSacks = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=defensive_sacks')
            .then(response => response.json())
            .then(data => {
                const topPlayers = data.sort((a, b) => b.defensive_sacks - a.defensive_sacks).slice(0, 10);
                setPlayers(topPlayers);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <div className="card bg-base-100 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                        className="rounded-xl" 
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Top Sacks</h2>
                    <div className="w-full">
                        {players.map((player, index) => (
                            <div key={player.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                                <input 
                                    type="radio" 
                                    name="sacks-accordion" 
                                    defaultChecked={index === 0} 
                                />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {player.player.first_name} {player.player.last_name} - {player.defensive_sacks} sacks
                                </div>
                                <div className="collapse-content">
                                    <div className="text-left">
                                        <p>Position: {player.player.position} ({player.player.position_abbreviation})</p>
                                        <p>Height: {player.player.height}</p>
                                        <p>Weight: {player.player.weight}</p>
                                        <p>Jersey: #{player.player.jersey_number}</p>
                                        <p>College: {player.player.college}</p>
                                        <p>Experience: {player.player.experience}</p>
                                        <p>Age: {player.player.age}</p>
                                        <div className="mt-2">
                                            <h3 className="font-bold">Season Stats:</h3>
                                            <p>Games Played: {player.games_played}</p>
                                            <p>Sack Yards: {player.defensive_sack_yards}</p>
                                            <p>Total Tackles: {player.total_tackles}</p>
                                            <p>Solo Tackles: {player.solo_tackles}</p>
                                            <p>Assist Tackles: {player.assist_tackles}</p>
                                            <p>Forced Fumbles: {player.fumbles_forced}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopSacks;