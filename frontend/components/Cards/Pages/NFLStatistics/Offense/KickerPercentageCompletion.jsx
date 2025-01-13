import { useState, useEffect } from 'react';

const KickerPercentageCompletion = () => {
  const [kickerStats, setKickerStats] = useState([]);

  useEffect(() => {
      const getKickerStats = async () => {
          try {
              const response = await fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=field_goal_pct');
              const data = await response.json();
              const topKickers = data.sort((a, b) => b.field_goal_pct - a.field_goal_pct).slice(0, 10);
              setKickerStats(topKickers);
          } catch (error) {
              console.error(`Error fetching kicker statistics: ${error}`);
          }
      };
      getKickerStats();
  }, []);

  const renderStatComp = (playerData, index) => {
      return (
          <div key={playerData.player.id} className="collapse collapse-arrow bg-base-200 mb-2">
              <input 
                  type="checkbox" 
                  name="kicker-accordion"
              />
              <div className="collapse-title text-xl font-medium">
                  {index + 1}. {playerData.player.first_name} {playerData.player.last_name} - {playerData.field_goal_pct}%
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
                          <h3 className="font-bold">Kicking Stats:</h3>
                          <p>Games Played: {playerData.games_played}</p>
                          <p>Field Goals Made: {playerData.field_goals_made}</p>
                          <p>Field Goals Attempted: {playerData.field_goal_attempts}</p>
                          <p>Field Goal %: {playerData.field_goal_pct}%</p>
                      </div>
                      <div className="mt-2">
                          <h3 className="font-bold">Field Goals by Distance:</h3>
                          <p>20-29 Yards Made: {playerData.field_goals_made_20_29}</p>
                          <p>30-39 Yards Made: {playerData.field_goals_made_30_39}</p>
                          <p>40-49 Yards Made: {playerData.field_goals_made_40_49}</p>
                          <p>50+ Yards Made: {playerData.field_goals_made_50}</p>
                          <p>1-19 Yards Attempted: {playerData.field_goals_attempts_1_19}</p>
                          <p>20-29 Yards Attempted: {playerData.field_goals_attempts_20_29}</p>
                          <p>30-39 Yards Attempted: {playerData.field_goals_attempts_30_39}</p>
                          <p>40-49 Yards Attempted: {playerData.field_goals_attempts_40_49}</p>
                          <p>50+ Yards Attempted: {playerData.field_goals_attempts_50}</p>
                    </div>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-4">Top Kicker Completion Percentages</h1>
      <div className="card bg-base-100 xl:w-full shadow-xl">
        <div className="card-body">
          {kickerStats.map((playerData, index) => renderStatComp(playerData, index))}
        </div>
      </div>
    </>
  );
};

export default KickerPercentageCompletion;