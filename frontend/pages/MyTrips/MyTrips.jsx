import MyTripNavBar from '../../components/NavBar/MyTrips/MyTripsNavBar';
import TopLeaguePlayers from '../../components/Cards/Pages/NFLStatistics/TopLeaguePlayers';
import TopOffensivePlayers from '../../components/Cards/Pages/NFLStatistics/TopOffensivePlayers';
import TopDefensivePlayers from '../../components/Cards/Pages/NFLStatistics/TopDefensivePlayers';


const MyTrips = () => {
    return (
        <>
            <div className="flex justify-center">
                <MyTripNavBar />
            </div>

            <h1 className="text-center text-3xl font-bold my-4">My Trips</h1>
            <h1 className="text-center text-3xl font-bold my-4">NFL Statistics</h1>
            <div className="flex flex-col items-center">
                <div className="w-full p-4 flex justify-center">
                    <TopLeaguePlayers />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <TopOffensivePlayers />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <TopDefensivePlayers />
                </div>
            </div>
        </>
    )
}

export default MyTrips;