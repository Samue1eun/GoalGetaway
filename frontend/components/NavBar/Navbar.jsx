import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities'
import NightAndDarkModeToggle from '../NightAndDarkModeToggle/NightAndDarkModeToggle';
import SettingsIconPageDirectory from '../Settings/SettingsIconPageDirectory/SettingsIconPageDirectory';
import { useState } from 'react';

const Navbar = () => {

    const [cartCount, setCartCount] = useState(0)
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
            <div className="navbar bg-primary justify-center">
                <Link to="/home/" className="btn btn-ghost hover:bg-transparent text-xl">Home</Link>
                <Link to="/mytrips/" className="btn btn-ghost hover:bg-transparent text-xl">Flights</Link>
                <Link to="/hotels/" className="btn btn-ghost hover:bg-transparent text-xl">Hotels</Link>
                <Link to="/myfavoriteteam/" className="btn btn-ghost hover:bg-transparent text-xl"> NFL Insight</Link>
                <Link to="/nflstatistics/" className="btn btn-ghost hover:bg-transparent text-xl">NFL Statistics</Link>
                
                
                <div className="flex w-full gap-6 justify-end p-4">
                    <button className="btn btn-outline w-30 btn-secondary" onClick={handleSignOut}>Log Out</button>
                    <NightAndDarkModeToggle />
                    <SettingsIconPageDirectory />
                </div>
            </div>
        </>
    );
    }

export default Navbar;