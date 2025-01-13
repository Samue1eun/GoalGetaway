import { useEffect, useState } from "react";

const TopSacks = () => {
    const [sacksStats, setSacksStats] = useState(null);

    useEffect(() => {
        const getSacksStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=defensive_sacks');
                const data = await response.json();
                setSacksStats(data);
            } catch (error) {
                console.error(`Error fetching sacks statistics: ${error}`);
            }
        };
        getSacksStats();
    }, []);

    const renderStatComp = (playerData, index) => {
        return (
            <div key={playerData.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                <input 
                    type="checkbox" 
                    name="sacks-accordion"
                />
                <div className="collapse-title text-xl font-medium">
                    {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.defensive_sacks} sacks
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
                            <h3 className="font-bold">Season Stats:</h3>
                            <p>Games Played: {playerData.games_played}</p>
                            <p>Sack Yards: {playerData.defensive_sack_yards}</p>
                            <p>Total Tackles: {playerData.total_tackles}</p>
                            <p>Solo Tackles: {playerData.solo_tackles}</p>
                            <p>Assist Tackles: {playerData.assist_tackles}</p>
                            <p>Forced Fumbles: {playerData.fumbles_forced}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {sacksStats ? 
                <div className="card bg-base-100 xl:w-full shadow-xl">
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
                            {sacksStats.map((player, index) => renderStatComp(player, index))}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default TopSacks;