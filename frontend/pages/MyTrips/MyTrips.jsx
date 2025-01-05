import MyTripNavBar from '../../components/NavBar/MyTrips/MyTripsNavBar';

const MyTrips = () => {
    return (
        <>
            <div className="flex justify-center">
                <MyTripNavBar />
            </div>

            <h1 className="text-center text-3xl font-bold my-4">My Trips</h1>
        </>
    )
}

export default MyTrips;