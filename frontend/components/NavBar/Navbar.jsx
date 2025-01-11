import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities'
import NightAndDarkModeToggle from '../NightAndDarkModeToggle/NightAndDarkModeToggle';
import SettingsIconPageDirectory from '../Settings/SettingsIconPageDirectory/SettingsIconPageDirectory';
const Navbar = () => {

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
                <Link to="/home/" className="btn btn-ghost text-xl">Home</Link>
                <Link to="/myfavoriteteam/" className="btn btn-ghost text-xl">Insight</Link>
                <Link to="/mytrips/" className="btn btn-ghost text-xl">My Trips</Link>
                <Link to="/nflstatistics/" className="btn btn-ghost text-xl">NFL Statistics</Link>
                
                <div className="flex w-full gap-6 justify-end p-4">
                <button className="btn btn-outline btn-secondary" onClick={handleSignOut}>Log Out</button>
                    <NightAndDarkModeToggle />
                    <SettingsIconPageDirectory />
                </div>
            </div>
        </>
    );
    }

export default Navbar;