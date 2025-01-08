import { useState, useEffect } from 'react';

const TopSacks = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
      // Fetch the JSON data from the API
      fetch('http://127.0.0.1:8000/api/v1/api_app/top_stats/?season=2024&stat_requested=defensive_sacks')
          .then(response => response.json())
          .then(data => {
              // Sort players by passing yards in descending order and take the top 10
              const topPlayers = data.sort((a, b) => b.defensive_sacks - a.defensive_sacks).slice(0, 10);
              setPlayers(topPlayers);
          })
          .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <>
        <div className="card bg-base-100 w-full shadow-xl">
            <figure className="px-10 pt-10">
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl" />
            </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Top Sacks</h2>
                {players.map((player, index) => (
                    <div key={player.player.id} className="p-2">
                        <p>{index + 1}. {player.player.first_name} {player.player.last_name} - {player.defensive_sacks} sacks</p>
                    </div>
                ))}
          </div>
        </div>

        </>
    )
}

export default TopSacks;