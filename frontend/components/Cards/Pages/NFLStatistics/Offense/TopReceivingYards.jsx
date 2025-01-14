import { useEffect, useState } from "react";

const TopReceivingYards = () => {
    const [receivingStats, setReceivingStats] = useState(null);

    useEffect(() => {
        const getReceivingStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=receiving_yards');
                const data = await response.json();
                setReceivingStats(data);
            } catch (error) {
                console.error(`Error fetching receiving statistics: ${error}`);
            }
        };
        getReceivingStats();
    }, []);

    const renderStatComp = (playerData, index) => {
        return (
            <div key={playerData.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                <input 
                    type="checkbox" 
                    name="receiving-accordion"
                />
                <div className="collapse-title text-xl font-medium">
                    {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.receiving_yards} yards
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
                            <h3 className="font-bold">Receiving Stats:</h3>
                            <p>Games Played: {playerData.games_played}</p>
                            <p>Receptions: {playerData.receptions}</p>
                            <p>Targets: {playerData.receiving_targets}</p>
                            <p>Yards/Reception: {playerData.yards_per_reception}</p>
                            <p>Touchdowns: {playerData.receiving_touchdowns}</p>
                            <p>First Downs: {playerData.receiving_first_downs}</p>
                            <p>Yards/Game: {playerData.receiving_yards_per_game}</p>
                            <p>Fumbles: {playerData.receiving_fumbles}</p>
                            <p>Fumbles Lost: {playerData.receiving_fumbles_lost}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {receivingStats ? 
                <div className="card bg-base-100 xl:w-full shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Top Receiving Yards</h2>
                        <div className="w-full">
                            {receivingStats.map((player, index) => renderStatComp(player, index))}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default TopReceivingYards;