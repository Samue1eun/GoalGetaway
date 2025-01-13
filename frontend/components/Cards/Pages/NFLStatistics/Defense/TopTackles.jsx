import { useEffect, useState } from "react";

const TopTackles = () => {
    const [tackleStats, setTackleStats] = useState(null);

    useEffect(() => {
        const getTackleStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=total_tackles');
                const data = await response.json();
                setTackleStats(data);
            } catch (error) {
                console.error(`Error fetching tackle statistics: ${error}`);
            }
        };
        getTackleStats();
    }, []);

    const renderStatComp = (playerData, index) => {
        return (
            <div key={playerData.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                <input 
                    type="checkbox" 
                    name="tackles-accordion"
                />
                <div className="collapse-title text-xl font-medium">
                    {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.total_tackles} tackles
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
                            <h3 className="font-bold">Tackle Breakdown:</h3>
                            <p>Solo Tackles: {playerData.solo_tackles}</p>
                            <p>Assist Tackles: {playerData.assist_tackles}</p>
                            <div className="mt-2">
                                <h3 className="font-bold">Additional Stats:</h3>
                                <p>Games Played: {playerData.games_played}</p>
                                <p>Sacks: {playerData.defensive_sacks}</p>
                                <p>Forced Fumbles: {playerData.fumbles_forced}</p>
                                <p>Interceptions: {playerData.defensive_interceptions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {tackleStats ? 
                <div className="card bg-base-100 xl:w-full shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className="rounded-xl" 
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Top Tackles</h2>
                        <div className="w-full">
                            {tackleStats.map((player, index) => renderStatComp(player, index))}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default TopTackles;