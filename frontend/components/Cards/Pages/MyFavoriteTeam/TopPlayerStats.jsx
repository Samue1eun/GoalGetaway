import { useEffect, useState } from "react";
import { getNFLTopPlayersStatic } from "../../../../src/app/utilities";

const TopPlayerStats = () => {

  const [topStats, setTopStats] = useState(null)

  useEffect(()=>{
    const getNFLTopStats = async() =>{
      try{
        const data = await getNFLTopPlayersStatic()
        console.log(data)
        setTopStats(data)
      }catch(error){
        console.error(`Error fetching player statistic: ${error}`)
      }
    }
    getNFLTopStats()
  }, [])

  const renderStatComp = (statKey, statData) => {
    return(
      <div className="p-6 mt-6" key={statKey}>
        <h4 className="text-3xl ">{statKey.replace(/_/g, " ").toUpperCase()}</h4>
        <p>NAME: {statData[0].player.first_name} {statData[0].player.last_name}</p>
        <p>{statKey.replace(/_/g, " ").toUpperCase()}: {statData[0][statKey]}</p>
        <br/>
      </div>
    )
  }

  return (
        <>
        {topStats ? 
        <>
        <div className="card w-full bg-base-100 h-[500px] shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">Top Player Stats</h2>
             <div className="flex flex-row flex-wrap items-center justify-center">
              {Object.keys(topStats).map((key) => {
                const statData = topStats[key];
                return renderStatComp(key, statData);
              })}
             </div>
          </div>
        </div>
        </>: null}
        

        </>
    )
}

export default TopPlayerStats;