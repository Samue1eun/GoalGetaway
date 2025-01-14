import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities';
import CurrentRoster from '../../components/Cards/Pages/Home/CurrentRoster';
import MyUpcomingEvents from '../../components/Cards/Pages/Home/MyUpcomingEvents';
import NextGame from '../../components/Cards/Pages/Home/NextGame';



const Home = () =>{
    return (
        <>
            <h1 className="text-center text-3xl font-bold my-4">Home</h1>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-3/4 p-4 flex justify-between">
                    <div className="w-1/2 p-2">
                        <MyUpcomingEvents />
                    </div>
                    <div className="w-1/2 p-2">
                        <NextGame />
                    </div>
                </div>
                <div className="w-full md:w-3/4 p-4 flex justify-center">
                    <CurrentRoster />
                </div>
            </div>
        </>
    )
}

export default Home;