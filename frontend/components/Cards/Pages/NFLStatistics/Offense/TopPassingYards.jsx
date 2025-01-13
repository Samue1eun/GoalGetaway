import { useEffect, useState } from "react";

const TopPassingYards = () => {
    const [passingStats, setPassingStats] = useState(null);

    useEffect(() => {
        const getPassingStats = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=passing_yards');
                const data = await response.json();
                setPassingStats(data);
            } catch (error) {
                console.error(`Error fetching passing statistics: ${error}`);
            }
        };
        getPassingStats();
    }, []);

    const renderStatComp = (playerData, index) => {
        return (
            <div key={playerData.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
                <input 
                    type="checkbox" 
                    name="passing-accordion"
                />
                <div className="collapse-title text-xl font-medium">
                    {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.passing_yards} yards
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
                            <h3 className="font-bold">Passing Stats:</h3>
                            <p>Games Played: {playerData.games_played}</p>
                            <p>Completions: {playerData.passing_completions}</p>
                            <p>Attempts: {playerData.passing_attempts}</p>
                            <p>Completion %: {playerData.passing_completion_pct}%</p>
                            <p>Yards/Attempt: {playerData.yards_per_pass_attempt}</p>
                            <p>Passing TDs: {playerData.passing_touchdowns}</p>
                            <p>Interceptions: {playerData.passing_interceptions}</p>
                            <p>QBR: {playerData.qbr}</p>
                            <p>Yards/Game: {playerData.passing_yards_per_game}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {passingStats ? 
                <div className="card bg-base-100 xl:w-full shadow-xl">
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
                            {passingStats.map((player, index) => renderStatComp(player, index))}
                        </div>
                    </div>
                </div>
            : null}
        </>
    );
};

export default TopPassingYards;