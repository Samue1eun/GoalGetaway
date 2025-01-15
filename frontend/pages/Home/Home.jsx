import React from 'react';
import MyUpcomingEvents from '../../components/Cards/Pages/Home/MyUpcomingEvents';
import MostRecentScores from '../../components/Cards/Pages/MyFavoriteTeam/MostRecentScores';
import TopPlayers from '../../components/Cards/Pages/Home/TopPlayers';
import homeBackground from '../../assets/home_background.png';
import UpcomingTripsDisplayed from '../../components/UpcomingTripsDisplayed';




const Home = () => {
    return (
        <>
            <div
                className="hero flex justify-center justify-items-center min-h-screen w-full"
                style={{ backgroundImage: `url(${homeBackground})` }}
            >
            {/* <h1 className="text-center text-3xl font-bold my-4 mb-10">RedZone Getaway Dashboard</h1> */}

            <div className="flex mx-50 items-center w-full">
                <div className="w-1/2 mt-10 items-center gap-20 flex flex-col ">
                    <UpcomingTripsDisplayed />
                </div>
                <div className='mr-10 ml-10' >
                    <MyUpcomingEvents />
                </div>
                <div className="w-1/2 flex flex-col items-center  mt-10">
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