import { getNFLPlayoffSchedule, getNFLGamesByDate } from '../../../../src/app/utilities.jsx'
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Schedule = () => {
  const { teamInfo } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bracket, setBracket] = useState(null);
  let matches = {}
  
  useEffect(() => {
    const getTeamSchedule = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getNFLPlayoffSchedule();
        setBracket(data.rounds); 
      } catch (error) {
        console.error('Error fetching game data:', error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    getTeamSchedule();
  }, []);
  
  // Function to render each round's matchups
  const renderRound = (roundName, matches) => {

    return (
      
      <div className="relative flex flex-col items-center space-y-8">
        {/* Round Title */}
        <h2 className="text-xl font-semibold mb-4">{roundName}</h2>

        {/* Matchups for this round */}
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div key={match.id} className="flex flex-col items-center">
              <div className="flex gap-16 items-center">
                {/* Team 1 (Home Team) */}
                <div className={`flex flex-col items-center w-32 p-4 rounded-lg `}>
                {teamInfo[match.home.alias] ? 
                      <img src={teamInfo[match.home.alias]} />
                    :
                    <span>{match.home.name}</span>
                  }
                </div>

                {/* VS Separator */}
                <div className="flex justify-center items-center">
                  <span className="font-bold text-xl">VS</span>
                </div>

                {/* Team 2 (Away Team) */}
                <div className={`flex flex-col items-center w-32 p-4 rounded-lg  `}>
                  {teamInfo[match.away.alias] ? 
                      <img src={teamInfo[match.away.alias]} />
                    :
                      <span>{match.away.name}</span>
                  }
                
                </div>
              </div>

              {/* Match Status (Score or TBD) */}
              <div className="text-lg mt-2">
                <span>{match.status ?? "TBD"}</span>
              </div>
            </div>
          ))}
        </div>
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
    return <p className="text-red-500 text-center">Oops, something went wrong. Please try again later.</p>;
  }

  if (!bracket) {
    return <p className="text-gray-500 text-center">No playoff data available.</p>;
  } else {
    matches = {
      "Wild Card Round": (bracket[0]["bracketed"][0]["games"] ? bracket[0]["bracketed"][0]["games"] : bracket[0]["games"]),
      "Divisional Round": (bracket[1]["bracketed"][0]["games"] ? bracket[1]["bracketed"][0]["games"] : bracket[1]["games"]),
      "Conference Championship Round": (bracket[2]["bracketed"][0]["games"] ? bracket[2]["bracketed"][0]["games"] : bracket[2]["games"]),
      "Super Bowl": (bracket[3]["bracketed"][0]["games"] ? bracket[3]["bracketed"][0]["games"] : bracket[3]["games"]),
    };
  }

  const isDictionary = (obj) => {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
  };

  return (
    <>
      {isDictionary(teamInfo) ?
      
        <div className="container mx-auto p-4 text-white glass w-full rounded-box bg-opacity-50">
          <h1 className="text-3xl font-bold text-center mt-6 mb-6">NFL Playoff Bracket</h1>

        {/* Render each round dynamically */}
          <div className="flex flex-col  justify-center  flex-wrap">
          {bracket[0] && renderRound("Wild Card Round", matches["Wild Card Round"])}
          <div className="divider divider-primary"></div>
          {bracket[1] && renderRound("Divisional Round", matches["Divisional Round"])}
          <div className="divider divider-primary"></div>
          {bracket[2] && renderRound("Conference Championship Round", matches["Conference Championship Round"])}
          <div className="divider divider-primary"></div>
          {bracket[3] && renderRound("Super Bowl", matches["Super Bowl"])}
        </div>
      </div> : null}
    </>
  );
};

export default Schedule;
