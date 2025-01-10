import { useState, useEffect } from 'react';

const TopPassingYards = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=passing_yards')
            .then(response => response.json())
            .then(data => {
                const topPlayers = data.sort((a, b) => b.passing_yards - a.passing_yards).slice(0, 10);
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
                    <h2 className="card-title">Top Passing Yards</h2>
                    <div className="w-full">
                        {players.map((player, index) => (
                            <div key={player.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                                <input 
                                    type="radio" 
                                    name="passing-accordion" 
                                    defaultChecked={index === 0} 
                                />
                                <div className="collapse-title text-xl font-medium">
                                    {index + 1}. {player.player.first_name} {player.player.last_name} - {player.passing_yards} yards
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
                                            <h3 className="font-bold">Passing Stats:</h3>
                                            <p>Games Played: {player.games_played}</p>
                                            <p>Completions: {player.passing_completions}</p>
                                            <p>Attempts: {player.passing_attempts}</p>
                                            <p>Completion %: {player.passing_completion_pct}%</p>
                                            <p>Yards/Attempt: {player.yards_per_pass_attempt}</p>
                                            <p>Passing TDs: {player.passing_touchdowns}</p>
                                            <p>Interceptions: {player.passing_interceptions}</p>
                                            <p>QBR: {player.qbr}</p>
                                            <p>Yards/Game: {player.passing_yards_per_game}</p>
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

export default TopPassingYards;