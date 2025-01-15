import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities';
// import CurrentRoster from '../../components/Cards/Pages/Home/CurrentRoster';
import MyUpcomingEvents from '../../components/Cards/Pages/Home/MyUpcomingEvents';
// import NextGame from '../../components/Cards/Pages/Home/NextGame';
import MostRecentScores from '../../components/Cards/Pages/MyFavoriteTeam/MostRecentScores';
import TopPlayers from '../../components/Cards/Pages/Home/TopPlayers';
import homeBackground from '../../assets/home_background.png';
import redZoneGetawayLogo from '../../assets/redzone_getaway_logo.png';



const Home = () => {
    return (
        <>
            <div
                className="hero flex justify-center justify-items-center min-h-screen w-full"
                style={{ backgroundImage: `url(${homeBackground})` }}
            >
            {/* <h1 className="text-center text-3xl font-bold my-4 mb-10">RedZone Getaway Dashboard</h1> */}

            <div className="flex w-full">
                <div className="w-1/2 mt-10 flex flex-col items-center">
                    <img src={redZoneGetawayLogo} alt="RedZone Getaway Logo" className="h-40 mb-5"/>
                    <MyUpcomingEvents />
                </div>
                <div className="w-1/2 flex flex-col mt-10">
                <div className="space-y-10 mb-10">
                    <MostRecentScores />
                    <TopPlayers />
                </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default Home;