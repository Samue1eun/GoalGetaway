import NFLStatsNavBar from "../../components/NavBar/NFL Stats/NFLStatsNavBar";
// import TopLeaguePlayers from "./../components/Cards/Pages/NFLStatistics/TopLeaguePlayers";
import TopOffensivePlayers from "../../components/Cards/Pages/NFLStatistics/TopOffensivePlayers";
import TopDefensivePlayers from "../../components/Cards/Pages/NFLStatistics/TopDefensivePlayers";
import TopQuarterbacks from "../../components/Cards/Pages/NFLStatistics/TopLeaguePlayers";


const NFLStats = () => {
    return (
        <>
            <div className="flex justify-center">
                <NFLStatsNavBar />
            </div>
            <h1 className="text-center text-3xl font-bold my-4">NFL Statistics</h1>
            <div className="flex flex-col items-center">
                <div className="w-full p-4 flex justify-center">
                    <TopQuarterbacks />
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

export default NFLStats;