import { useState, useEffect, useRef } from 'react';
import { getNFLGamesByDate } from '../../../../src/app/utilities.jsx';
import { format, subDays, parseISO } from 'date-fns';
import { useOutletContext } from 'react-router-dom';

const MostRecentScores = () => {
  let currentDate = new Date();
  let formattedDate = format(currentDate, 'yyyy-MM-dd');

  const { teamInfo } = useOutletContext();  // Team information context
  const [isLoading, setIsLoading] = useState(false);
  const [teamStats, setTeamStats] = useState([]);
  const [dateOfLastGames, setDateOfLastGames] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchGameData = async (currentDate, formattedDate) => {
      setIsLoading(true);
      setError(null);
      let statsRetrieved = false;

      while (teamStats.length === 0) {
        try {
          const data = await getNFLGamesByDate(formattedDate);
          if (data && data.length > 0) {
            setTeamStats(data);
            setDateOfLastGames(formattedDate);
            statsRetrieved = true;
            break;
          }
        } catch (error) {
          console.error('Error fetching game data:', error);
          setError("Error fetching data");
        }
        if (statsRetrieved === false) {
          currentDate = subDays(currentDate, 1);
          formattedDate = format(currentDate, 'yyyy-MM-dd');
        }
      }
      setIsLoading(false);
    };

    if (!dateOfLastGames) {
      fetchGameData(currentDate, formattedDate);
    }
  }, [dateOfLastGames, formattedDate, currentDate, teamStats]);

  const parsedDate = dateOfLastGames ? parseISO(dateOfLastGames) : null;
  const formattedGameDate = parsedDate ? format(parsedDate, 'eee, dd') : ''; // formatted into 'Mon, 06'

  useEffect(() => {
    // Automatically move to the next card every 7 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === teamStats.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change item every 7 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [teamStats]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teamStats.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamStats.length - 1 : prevIndex - 1
    );
  };

  // Fallback values in case team data is missing
  const fallbackColor = "#ccc";  // Default color if PrimaryColor is missing
  const fallbackLogo = "/path/to/default/logo.png";  // Fallback logo URL

  return (
    <>
      {isLoading ? (
        <span className="loading loading-ring loading-lg"></span>
      ): teamStats && teamStats.length > 0 ? (
        <div className="card glass text-white w-full shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Most Recent Scores: {formattedGameDate}</h2>
            <div className="relative carousel w-full space-x-4">
              {/* Carousel loop */}
              <div
                ref={carouselRef}
                className="carousel-container w-full flex justify-center overflow-hidden"
              >
                <div
                  className="carousel-items flex transition-transform ease-in-out duration-[1.7s]" // Transition time increased to 1.7s for smoother sliding
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: 'transform 1.7s ease-in-out', // Custom transition timing of 1.7s
                  }}
                >
                  {teamStats.map((game, index) => (
                    <div
                      key={index}
                      className="carousel-item w-full flex justify-center"
                    >
                      <div className=" self-center text-white h-72 w-[500px] ">
                        <div className=" flex flex-col items-center justify-center text-center">
                          {/* Score Section */}
                          <h3 className="text-xl font-bold">
                            {game.home_team.name} vs {game.visitor_team.name}
                          </h3>

                          <div className="flex items-center justify-between space-x-4 w-full mt-4">
                            {/* Home Team */}
                            <div
                              className="flex items-center justify-center w-2/5 p-4 border-4 rounded-lg"
                              style={{
                                backgroundColor:
                                  teamInfo[game.home_team.name]?.PrimaryColor
                                    ? "#" + teamInfo[game.home_team.name].PrimaryColor
                                    : fallbackColor,
                                borderColor:
                                  teamInfo[game.home_team.name]?.SecondaryColor
                                    ? "#" + teamInfo[game.home_team.name].SecondaryColor
                                    : fallbackColor,
                              }}
                            >
                              <img
                                className="w-[80px] h-[80px]"
                                src={teamInfo[game.home_team.name]?.WikipediaLogoUrl || fallbackLogo}
                                alt="Home Team"
                              />
                            </div>

                            {/* VS Text */}
                            <h1 className="text-2xl font-bold text-center">vs.</h1>

                            {/* Visitor Team */}
                            <div
                              className="flex items-center justify-center w-2/5 p-4 border-4 rounded-lg"
                              style={{
                                backgroundColor:
                                  teamInfo[game.visitor_team.name]?.PrimaryColor
                                    ? "#" + teamInfo[game.visitor_team.name].PrimaryColor
                                    : fallbackColor,
                                borderColor:
                                  teamInfo[game.visitor_team.name]?.SecondaryColor
                                    ? "#" + teamInfo[game.visitor_team.name].SecondaryColor
                                    : fallbackColor,
                              }}
                            >
                              <img
                                className="w-[80px] h-[80px]"
                                src={teamInfo[game.visitor_team.name]?.WikipediaLogoUrl || fallbackLogo}
                                alt="Visitor Team"
                              />
                            </div>
                          </div>

                          {/* Score Section with Sporty Design */}
                          <div
                            className="mt-4 text-3xl card card-bordered font-bold py-2 px-4 rounded-lg"
                            style={{
                              backgroundColor: "#2A9D8F", // A sport-style background color
                              color: "white", // white score text for contrast
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // added text shadow for sporty look
                            }}
                          >
                            {game.home_team_score} - {game.visitor_team_score}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prev & Next Buttons */}
              <div className="absolute top-3/4 left-4 transform -translate-y-1/2 z-10">
                <button
                  className="btn btn-circle"
                  onClick={goToPrev}
                  aria-label="Previous Game"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute top-3/4 right-4 transform -translate-y-1/2 z-10">
                <button
                  className="btn btn-circle"
                  onClick={goToNext}
                  aria-label="Next Game"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null }
    </>
  );
};

export default MostRecentScores;
