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
      <div key={statKey}>
        <h4 className="text-3xl">{statKey.replace(/_/g, " ").toUpperCase()}</h4>
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
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl" />
            </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">Top Player Stats</h2>
             <div>
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