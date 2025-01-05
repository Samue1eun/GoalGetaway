import { Link } from 'react-router-dom';

const NFLStatsNavBar = () => {
    return (
        <>
            <div className="navbar bg-base-100 justify-center">
                <Link to="/" className="btn btn-ghost text-xl">Home</Link>
                <Link to="/myfavoriteteam/" className="btn btn-ghost text-xl">My Favorite Team</Link>
                <Link to="/mytrips/" className="btn btn-ghost text-xl">My Trips</Link>
            </div>
        </>
    );
    }

export default NFLStatsNavBar;