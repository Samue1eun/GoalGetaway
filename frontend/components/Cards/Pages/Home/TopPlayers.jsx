import React, { useState, useEffect } from 'react';

const TopPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getTopPlayers = async () => {
      try {
        const urls = [
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=defensive_interceptions',
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=defensive_sacks',
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=total_tackles',
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=field_goal_pct',
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=passing_yards',
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=receiving_yards',
          'http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=rushing_yards'
        ];

        const fetchData = async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return data[0]; // Assuming the top player is the first item in the response
        };

        const allData = await Promise.all(urls.map(fetchData));
        setPlayers(allData);
      } catch (error) {
        console.error(`Error fetching top players: ${error}`);
      }
    };
    getTopPlayers();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
  };

  const formatStatValue = (player) => {
    if (player.defensive_interceptions) return `${player.defensive_interceptions} interceptions`;
    if (player.defensive_sacks) return `${player.defensive_sacks} sacks`;
    if (player.total_tackles) return `${player.total_tackles} tackles`;
    if (player.field_goal_pct) return `${player.field_goal_pct}%`;
    if (player.passing_yards) return `${player.passing_yards} yards`;
    if (player.receiving_yards) return `${player.receiving_yards} yards`;
    if (player.rushing_yards) return `${player.rushing_yards} yards`;
    return '';
  };

  if (players.length === 0) {
    return <p>Loading...</p>;
  }

  const currentPlayer = players[currentIndex];

  return (
    <div className="card glass bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 shadow-xl w-full pb-10">
      <h1 className='text-4xl text-center mt-20 text-white'>Top Players</h1>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{`${currentPlayer.player.first_name} ${currentPlayer.player.last_name}`}</h2>
        <div className="flex flex-col items-center mb-5 text-white">
          <p>{`Top Stat: ${formatStatValue(currentPlayer)}`}</p>
          <p>{`Position: ${currentPlayer.player.position} (${currentPlayer.player.position_abbreviation})`}</p>
          <p>{`Height: ${currentPlayer.player.height}`}</p>
          <p>{`Weight: ${currentPlayer.player.weight}`}</p>
          <p>{`Jersey: #${currentPlayer.player.jersey_number}`}</p>
          <p>{`College: ${currentPlayer.player.college}`}</p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handlePrevious}>Previous</button>
          <button className="btn btn-primary" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TopPlayers;