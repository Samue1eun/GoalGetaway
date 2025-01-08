import { useOutletContext } from "react-router-dom";
import { getNFLPlayoffSchedule } from '../../../../src/app/utilities'
import { useEffect, useState } from 'react'

const Schedule = ({favoriteTeam}) => {
    const { teamInfo } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
      const getTeamSchedule = async(favoriteTeam) =>{
        setIsLoading(true);
        setError(null);

        try{
          const data = await getNFLPlayoffSchedule();
          console.log(data)
        }catch(error){
          console.error('Error fetching game data:', error);
          setError("Error fetching data");
        }
      } 
      getTeamSchedule(favoriteTeam)
    }, [])
    

    return (
        <>
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
            <img
            src={teamInfo[favoriteTeam].WikipediaWordMarkUrl}
            className="rounded-xl" />
            </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Upcoming Matches</h2>
              <p>Favorite Team Schedule here</p>
          </div>
        </div>

        </>
    )
}

export default Schedule;