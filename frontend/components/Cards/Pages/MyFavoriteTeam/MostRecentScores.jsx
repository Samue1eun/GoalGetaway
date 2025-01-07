import { useState, useEffect } from 'react';
import { getNFLGamesByDate } from '../../../../src/app/utilities.jsx'
import { format, subDays } from 'date-fns';

const MostRecentScores = () => {
  let currentDate = new Date();
  let formattedDate = format(currentDate, 'yyyy-MM-dd');

  const [isLoading, setIsLoading] = useState(false);
  const [teamStats, setTeamStats] = useState([]);
  const [dateOfLastGames , setDateOfLastGames] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchGameData = async (currentDate, formattedDate) => {
      setIsLoading(true);
      setError(null);

      while (teamStats.length === 0){
        try {
          const data = await getNFLGamesByDate(formattedDate);
          if (data && data.length > 0 ){
            setTeamStats(data);
            setDateOfLastGames(formattedDate)
            break;
          }
        }catch (error){
          console.error('Error fetching game data:', error);
          setError("Error fetching data");
        }
        currentDate = subDays(currentDate, 1);
        formattedDate = format(currentDate, 'yyyy-MM-dd');
      }
      setIsLoading(false);
    }
    if(!dateOfLastGames){
      fetchGameData(currentDate, formattedDate);
    }
  }, [])

    return (
        <>
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl" />
            </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Most Recent Scores</h2>
              {isLoading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : error ? (
                <p>{error}</p>
              ) : teamStats && teamStats.length > 0 ? (
                teamStats.map((game, index) => (
                  <div key={index}>
                    <h6 >
                      {game.home_team.full_name} vs. {game.visitor_team.full_name}
                    </h6>
                    <p>
                      {game.home_team_score} - {game.visitor_team_score}
                    </p>
                  </div>
                ))
                
              ) : (
              <p>No games found.</p>
            )}
          </div>
        </div>

        </>
    )
}

export default MostRecentScores;