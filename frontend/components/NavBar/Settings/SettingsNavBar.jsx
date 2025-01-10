import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../src/app/utilities'

const SettingsNavBar = () => {
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
            <div className="navbar bg-base-100 justify-center">
                <Link to="/home/" className="btn btn-ghost text-xl">Home</Link>
                <Link to="/myfavoriteteam/" className="btn btn-ghost text-xl">My Favorite Team</Link>
                <Link to="/mytrips/" className="btn btn-ghost text-xl">My Trips</Link>
                <Link to="/nflstatistics/" className="btn btn-ghost text-xl">NFL Statistics</Link>
                <button className="btn btn-outline btn-primary" onClick={handleSignOut}>Log Out</button>
            </div>
        </>
    );
    }

export default SettingsNavBar;