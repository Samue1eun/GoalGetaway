import { Link } from 'react-router-dom';

const MyTripsNavBar = () => {
    return (
        <>
            <div className="navbar bg-base-100 justify-center">
                <Link to="/" className="btn btn-ghost text-xl">Home</Link>
                <Link to="/myfavoriteteam/" className="btn btn-ghost text-xl">My Favorite Team</Link>
                <Link to="/nflstatistics/" className="btn btn-ghost text-xl">NFL Statistics</Link>
            </div>
        </>
    );
    }

export default MyTripsNavBar;