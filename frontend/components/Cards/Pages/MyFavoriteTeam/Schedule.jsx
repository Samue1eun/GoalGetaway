import { useOutletContext } from "react-router-dom";
import { getNFLPlayoffSchedule } from '../../../../src/app/utilities'
import { useEffect, useState } from 'react';

const Schedule = ({ favoriteTeam }) => {
  const { teamInfo } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bracket, setBracket] = useState(null);

  useEffect(() => {
    const getTeamSchedule = async (favoriteTeam) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getNFLPlayoffSchedule();
        console.log(data);
        setBracket(data.rounds); // Assuming `data` contains the playoff bracket
      } catch (error) {
        console.error('Error fetching game data:', error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    getTeamSchedule(favoriteTeam);
  }, [favoriteTeam]);

  // Function to render each round's matchups
  const renderRound = (roundName, matches) => {
    return (
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-2xl font-semibold">{roundName}</h2>
        {matches.map((match) => (
          <div key={match.id} className="card w-64 bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="text-lg font-semibold">
                {match.home.name} vs {match.away.name}
              </h3>
              <div className="flex justify-between mt-4">
                <button className="btn btn-sm btn-primary" disabled>
                  {match.score1 !== null && match.score2 !== null
                    ? `${match.status} - ${match.status}`
                    : "TBD"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Ensure bracket is available before rendering
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!bracket) {
    return <p>No bracket data available.</p>;
  }
  console.log(bracket[0].bracketed[0].games)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">NFL Playoff Bracket</h1>

      {/* Render each round dynamically */}
      <div className="flex justify-center gap-16">
        {/* Round 1 */}
        {bracket && renderRound(bracket[0].name, bracket[0].bracketed[0].games)}

        {/* Round 2 */}
        {bracket.round2 && renderRound("Round 2", bracket.round2)}

        {/* Finals */}
        {bracket.finals && renderRound("Finals", bracket.finals)}
      </div>
    </div>
  );
};

export default Schedule;
