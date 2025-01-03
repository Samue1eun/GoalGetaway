import TopPlayerStats from '../../components/Cards/Pages/MyFavoriteTeam/TopPlayerStats';
import CurrentTeamStandings from '../../components/Cards/Pages/MyFavoriteTeam/CurrentTeamStandings';
import MostRecentScores from '../../components/Cards/Pages/MyFavoriteTeam/MostRecentScores';
import Schedule from '../../components/Cards/Pages/MyFavoriteTeam/Schedule';
import TeamNews from '../../components/Cards/Pages/MyFavoriteTeam/TeamNews';


const MyFavoriteTeam = () => {
    return (
        <>
            <h1>My Favorite Team</h1>
            <div className="flex justify-center items-center">
                <TeamNews />
            </div>
            <TopPlayerStats />
            <CurrentTeamStandings />
            <MostRecentScores />
            <Schedule />


        
        </>
    )
}

export default MyFavoriteTeam;