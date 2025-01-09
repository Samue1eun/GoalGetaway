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
            <h2 className="card-title">Top Player Stats</h2>
              <p>Enter Stats Here</p>
          </div>
        </div>
        </>: null}
        

        </>
    )
}

export default TopPlayerStats;