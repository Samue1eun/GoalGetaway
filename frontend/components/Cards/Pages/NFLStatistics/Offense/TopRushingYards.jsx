import { useEffect, useState } from "react";

const TopRushingYards = () => {
    const [rushingStats, setRushingStats] = useState(null);

    useEffect(() => {
        const getRushingStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=rushing_yards');
                const data = await response.json();
                setRushingStats(data);
            } catch (error) {
                console.error(`Error fetching rushing statistics: ${error}`);
            }
        };
        getRushingStats();
    }, []);

    const renderStatComp = (playerData, index) => {
        return (
            <div key={playerData.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                <input 
                    type="checkbox" 
                    name="rushing-accordion"
                />
                <div className="collapse-title text-xl font-medium">
                    {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.rushing_yards} yards
                </div>
                <div className="collapse-content">
                    <div className="text-left">
                        <p>Position: {playerData.player.position} ({playerData.player.position_abbreviation})</p>
                        <p>Height: {playerData.player.height}</p>
                        <p>Weight: {playerData.player.weight}</p>
                        <p>Jersey: #{playerData.player.jersey_number}</p>
                        <p>College: {playerData.player.college}</p>
                        <p>Experience: {playerData.player.experience}</p>
                        <p>Age: {playerData.player.age}</p>
                        <div className="mt-2">
                            <h3 className="font-bold">Rushing Stats:</h3>
                            <p>Games Played: {playerData.games_played}</p>
                            <p>Attempts: {playerData.rushing_attempts}</p>
                            <p>Yards/Attempt: {playerData.yards_per_rush_attempt}</p>
                            <p>Touchdowns: {playerData.rushing_touchdowns}</p>
                            <p>First Downs: {playerData.rushing_first_downs}</p>
                            <p>Yards/Game: {playerData.rushing_yards_per_game}</p>
                            <p>Fumbles: {playerData.rushing_fumbles}</p>
                            <p>Fumbles Lost: {playerData.rushing_fumbles_lost}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {rushingStats ? 
                <div className="card bg-base-100 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" 
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Top Rushing Yards</h2>
                        <div className="w-full">
                            {rushingStats.map((player, index) => renderStatComp(player, index))}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default TopRushingYards;