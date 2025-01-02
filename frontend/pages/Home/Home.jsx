import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities';


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
            <h1>Home</h1>
            <button onClick={handleSignOut}>Log out</button>
        </>
    )
}

export default Home;