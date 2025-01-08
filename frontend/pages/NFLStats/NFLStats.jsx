import NFLStatsNavBar from "../../components/NavBar/NFL Stats/NFLStatsNavBar";
// import TopLeaguePlayers from "../../components/Cards/Pages/NFLStatistics/TopLeaguePlayers";
// import TopOffensivePlayers from "../../components/Cards/Pages/NFLStatistics/TopOffensivePlayers";
// import TopDefensivePlayers from "../../components/Cards/Pages/NFLStatistics/TopDefensivePlayers";
import KickerPercentageCompletion from "../../components/Cards/Pages/NFLStatistics/Offense/KickerPercentageCompletion";
import TopPassingYards from "../../components/Cards/Pages/NFLStatistics/Offense/TopPassingYards";
import TopReceivingYards from "../../components/Cards/Pages/NFLStatistics/Offense/TopReceivingYards";
import TopRushingYards from "../../components/Cards/Pages/NFLStatistics/Offense/TopRushingYards";

const NFLStats = () => {
    return (
        <>
            <div className="flex justify-center">
                <NFLStatsNavBar />
            </div>
            <h1 className="text-center text-3xl font-bold my-4">NFL Statistics</h1>
            <div className="flex flex-col items-start">
                <h2 className="text-center text-3xl font-bold my-4">Offense</h2>
                <div className="w-full md:w-3/4 p-4 flex justify-start">
                    <TopPassingYards />
                </div>
                <div className="w-full md:w-3/4 p-4 flex justify-start">
                    <TopRushingYards />
                </div>
                <div className="w-full md:w-3/4 p-4 flex justify-start">
                    <TopReceivingYards />
                </div>
                <div className="w-full md:w-3/4 p-4 flex justify-start">
                    <KickerPercentageCompletion />
                </div>
            </div>
        </>
    )
}

export default NFLStats;