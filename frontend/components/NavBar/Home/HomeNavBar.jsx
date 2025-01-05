import { Link } from 'react-router-dom';

const HomeNavBar = () => {
    return (
        <>
            <div className="navbar bg-base-100 justify-center">
                <Link to="/myfavoriteteam/" className="btn btn-ghost text-xl">My Favorite Team</Link>
                <Link to="/mytrips/" className="btn btn-ghost text-xl">My Trips</Link>
                <Link to="/nflstatistics/" className="btn btn-ghost text-xl">NFL Statistics</Link>
            </div>
        </>
    );
    }

export default HomeNavBar;