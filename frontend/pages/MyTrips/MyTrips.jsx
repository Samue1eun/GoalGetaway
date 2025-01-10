import MyTripNavBar from '../../components/NavBar/MyTrips/MyTripsNavBar';
import TripSearch from '../../components/Cards/Pages/MyTrips/TripSearch';
import MyFlights from '../../components/Cards/Pages/MyTrips/MyFlights';
import MyHotels from '../../components/Cards/Pages/MyTrips/MyHotels';
import MyEvents from '../../components/Cards/Pages/MyTrips/MyEvents';
import React, { useState } from "react";


const MyTrips = () => {
    const [hotels, setHotels] = useState([]);
    const [flights, setFlights] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [adults, setAdults] = useState(1);

    const handleHotelsFetched = (fetchedHotels) => {
        setHotels(fetchedHotels);
    };

    return (
        <>
            <div className="flex justify-center">
                <MyTripNavBar />
            </div>
            <h1 className="text-center text-3xl font-bold my-4">My Trips</h1>
            <div className="flex flex-col items-center">
                <div className="w-full p-4 flex justify-center">
                    <TripSearch 
                        onFlightsFetched={setFlights} 
                        onHotelsFetched={handleHotelsFetched} 
                        onOriginChange={setOrigin}
                        onDestinationChange={setDestination}
                        onDepartureDateChange={setDepartureDate}
                        onAdultsChange={setAdults}
                     />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyFlights 
                        flights={flights} 
                        origin={origin} 
                        destination={destination} 
                        departureDate={departureDate} 
                        adults={adults} 
                    />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyHotels hotels={hotels} />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyEvents />
                </div>
            </div>        
        </>
    )
}

export default MyTrips;