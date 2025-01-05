import NFLStatsNavBar from "../../components/NavBar/NFL Stats/NFLStatsNavBar";


const NFLStats = () => {
    return (
        <>
            <div className="flex justify-center">
                <NFLStatsNavBar />
            </div>
            <h1 className="text-center text-3xl font-bold my-4">NFL Statistics</h1>
        </>
    )
}

export default NFLStats;