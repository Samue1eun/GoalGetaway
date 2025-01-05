import TopPlayerStats from '../../components/Cards/Pages/MyFavoriteTeam/TopPlayerStats';
import CurrentTeamStandings from '../../components/Cards/Pages/MyFavoriteTeam/CurrentTeamStandings';
import MostRecentScores from '../../components/Cards/Pages/MyFavoriteTeam/MostRecentScores';
import Schedule from '../../components/Cards/Pages/MyFavoriteTeam/Schedule';
import TeamNews from '../../components/Cards/Pages/MyFavoriteTeam/TeamNews';


const MyFavoriteTeam = () => {
    return (
        <>
            <h1 className="text-center text-3xl font-bold my-4">My Favorite Team</h1>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-3/4 p-4 flex justify-center">
                    <TeamNews />
                </div>
                <div className="flex flex-col md:flex-row w-full md:w-3/4 justify-center">
                    {/* Left of the page */}
                    <div className="md:w-1/4 p-4 flex flex-col items-center">
                        <MostRecentScores />
                        <Schedule />
                    </div>
                    {/* Right of the page */}
                    <div className="md:w-3/4 p-4 flex flex-col items-center">
                        <TopPlayerStats />
                        <CurrentTeamStandings />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFavoriteTeam;