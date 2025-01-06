import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities';
import HomeNavBar from '../../components/NavBar/Home/HomeNavBar';
import MyFavoriteTeamSportsNews from '../../components/Cards/Pages/Home/MyFavoriteTeamSportsNews';
import CurrentRoster from '../../components/Cards/Pages/Home/CurrentRoster';
import Recommendations from '../../components/Cards/Pages/Home/Recommendations';



const Home = () =>{
    const navigate = useNavigate(); 
    const handleSignOut = async () => {
        try {
            await logOut();
            alert('Logout successful');
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('There was an error logging out!', error.message);
            alert('Logout failed: ' + error.message);
        }
    };
    return (
        <>
            <div className="flex justify-center">
                <HomeNavBar />
            </div>
            <h1>Home</h1>
            <button onClick={handleSignOut}>Log out</button>
            <div className="flex flex-col items-center">
                <div className="w-full md:w-3/4 p-4 flex justify-center">
                    <MyFavoriteTeamSportsNews />
                </div>
                <div className="w-full md:w-3/4 p-4 flex justify-center">
                    <CurrentRoster />
                </div>
                <div className="w-full md:w-3/4 p-4 flex justify-center">
                    <Recommendations />
                </div>
            </div>
        </>
    )
}

export default Home;