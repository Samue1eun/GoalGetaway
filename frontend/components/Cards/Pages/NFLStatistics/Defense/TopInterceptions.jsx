import { useEffect, useState } from "react";

const TopInterceptions = () => {
    const [interceptStats, setInterceptStats] = useState(null);

    useEffect(() => {
        const getInterceptionStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=defensive_interceptions');
                const data = await response.json();
                setInterceptStats(data);
            } catch (error) {
                console.error(`Error fetching interception statistics: ${error}`);
            }
        };
        getInterceptionStats();
    }, []);

    const renderStatComp = (playerData, index) => {
        return (
            <div key={playerData.player.id} className="collapse collapse-arrow bg-opacity-10 backdrop-blur-lg border border-black border-opacity-30 shadow-xl mb-2">
                <input 
                    type="checkbox" 
                    name="interceptions-accordion"
                />
                <div className="collapse-title text-xl font-medium">
                    {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.defensive_interceptions} INTs
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
                            <p>Interception TDs: {playerData.interception_touchdowns}</p>
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
            {interceptStats ? 
                <div className="card glass bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-xl w-[500px]">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Top Interceptions</h2>
                        <div className="w-full">
                            {interceptStats.map((player, index) => renderStatComp(player, index))}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default TopInterceptions;