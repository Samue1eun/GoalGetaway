import MyTripNavBar from '../../components/NavBar/MyTrips/MyTripsNavBar';
import TripSearch from '../../components/Cards/Pages/MyTrips/TripSearch';
import MyFlights from '../../components/Cards/Pages/MyTrips/MyFlights';
import MyHotels from '../../components/Cards/Pages/MyTrips/MyHotels';
import MyEvents from '../../components/Cards/Pages/MyTrips/MyEvents';


const MyTrips = () => {
    return (
        <>
            <div className="flex justify-center">
                <MyTripNavBar />
            </div>
            <h1 className="text-center text-3xl font-bold my-4">My Trips</h1>
            <div className="flex flex-col items-center">
                <div className="w-full p-4 flex justify-center">
                    <TripSearch />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyFlights />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyHotels />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyEvents />
                </div>
            </div>        </>
    )
}

export default MyTrips;