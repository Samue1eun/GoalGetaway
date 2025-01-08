import NFLStatsNavBar from "../../components/NavBar/NFL Stats/NFLStatsNavBar";
// import TopLeaguePlayers from "../../components/Cards/Pages/NFLStatistics/TopLeaguePlayers";
// import TopOffensivePlayers from "../../components/Cards/Pages/NFLStatistics/TopOffensivePlayers";
// import TopDefensivePlayers from "../../components/Cards/Pages/NFLStatistics/TopDefensivePlayers";
import KickerPercentageCompletion from "../../components/Cards/Pages/NFLStatistics/Offense/KickerPercentageCompletion";
import TopPassingYards from "../../components/Cards/Pages/NFLStatistics/Offense/TopPassingYards";
import TopReceivingYards from "../../components/Cards/Pages/NFLStatistics/Offense/TopReceivingYards";
import TopRushingYards from "../../components/Cards/Pages/NFLStatistics/Offense/TopRushingYards";
import TopInterceptions from "../../components/Cards/Pages/NFLStatistics/Defense/TopInterceptions";
import TopSacks from "../../components/Cards/Pages/NFLStatistics/Defense/TopSacks";
import TopTackles from "../../components/Cards/Pages/NFLStatistics/Defense/TopTackles";



const NFLStats = () => {
    return (
        <>
            <div className="flex justify-center">
                <NFLStatsNavBar />
            </div>
            <h1 className="text-center text-3xl font-bold my-4">NFL Statistics</h1>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-3/4 p-4 flex justify-between">
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-center text-2xl font-bold my-4">Offense</h2>
                        <div className="p-6">
                            <TopPassingYards />
                        </div>
                        <div className="p-6">
                            <TopRushingYards />
                        </div>
                        <div className="p-6">
                            <TopReceivingYards />
                        </div>
                        <div className="p-6">
                            <KickerPercentageCompletion />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h2 className="text-center text-2xl font-bold my-4">Defense</h2>
                        <div className="p-6">
                            <TopInterceptions />
                        </div>
                        <div className="p-6">
                            <TopSacks />
                        </div>
                        <div className="p-6">
                            <TopTackles />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NFLStats;