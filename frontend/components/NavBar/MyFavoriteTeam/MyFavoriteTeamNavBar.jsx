import { Link } from 'react-router-dom';

const MyFavoriteTeamNavBar = () => {
    return (
        <>
            <div className="navbar bg-base-100 justify-center">
                <Link to="/" className="btn btn-ghost text-xl">Home</Link>
                <Link to="/mytrips/" className="btn btn-ghost text-xl">My Trips</Link>
                <Link to="/nflstatistics/" className="btn btn-ghost text-xl">NFL Statistics</Link>
            </div>
        </>
    );
    }

export default MyFavoriteTeamNavBar;