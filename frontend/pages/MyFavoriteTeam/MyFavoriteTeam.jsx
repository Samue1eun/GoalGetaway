import MyFavoriteTeamNavBar from '../../components/NavBar/MyFavoriteTeam/MyFavoriteTeamNavBar';
import TopPlayerStats from '../../components/Cards/Pages/MyFavoriteTeam/TopPlayerStats';
import CurrentTeamStandings from '../../components/Cards/Pages/MyFavoriteTeam/CurrentTeamStandings';
import MostRecentScores from '../../components/Cards/Pages/MyFavoriteTeam/MostRecentScores';
import Schedule from '../../components/Cards/Pages/MyFavoriteTeam/Schedule';
import TeamNews from '../../components/Cards/Pages/MyFavoriteTeam/TeamNews';


const MyFavoriteTeam = () => {
    return (
        <>
            <div className="flex justify-center">
                <MyFavoriteTeamNavBar />
            </div>

            <h1 className="text-center text-3xl font-bold my-4">My Favorite Team</h1>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-3/4 p-4 flex justify-center">
                    <TeamNews />
                </div>
                <div className="w-full md:w-3/4 p-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                    {/* Left of the page */}
                    <div className="flex flex-col items-center space-y-10">
                        <MostRecentScores />
                        <Schedule />
                    </div>
                    {/* Right of the page */}
                    <div className="flex flex-col items-center space-y-10">
                        <TopPlayerStats />
                        <CurrentTeamStandings />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyFavoriteTeam;