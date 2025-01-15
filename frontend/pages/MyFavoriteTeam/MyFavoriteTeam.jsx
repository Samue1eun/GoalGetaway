// import TopPlayerStats from '../../components/Cards/Pages/MyFavoriteTeam/TopPlayerStats';
import MostRecentScores from '../../components/Cards/Pages/MyFavoriteTeam/MostRecentScores';
// import Schedule from '../../components/Cards/Pages/MyFavoriteTeam/Schedule';
import { useState } from 'react';
import footballFieldBackground from "../../assets/sunset_football_field.jpg";


const MyFavoriteTeam = () => {
 

    return (
        <>
            {/* Main container with background image */}
            <div
                className="hero flex justify-center justify-items-center min-h-screen w-full"
                style={{ backgroundImage: `url(${footballFieldBackground})` }}
            >
                <div className="hero-overlay justify-center justify-items-center w-full p-4 bg-transparent">

                    <div className="hero-content w-full flex flex-col items-center">

                        {/* Main content section */}
                        <div className="w-full p-4 flex justify-center">
                            <div className="flex flex-col items-center space-y-10 w-full max-w-screen-xl">
                                
                                {/* MostRecentScores section */}
                                <div className="relative  w-full h-[500px]">  {/* Set custom height */}
                                    <MostRecentScores />
                                </div>
                                
                                {/* <Schedule /> */}
                            </div>
                        </div>

                        {/* <div className="flex flex-col items-center space-y-10 w-full max-w-screen-xl">
                            <TopPlayerStats />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyFavoriteTeam;
