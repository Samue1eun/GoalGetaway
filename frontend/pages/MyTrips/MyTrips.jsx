import MyTripNavBar from '../../components/NavBar/MyTrips/MyTripsNavBar';
import TripSearch from '../../components/Cards/Pages/MyTrips/TripSearch';
import MyFlights from '../../components/Cards/Pages/MyTrips/MyFlights';
import MyHotels from '../../components/Cards/Pages/MyTrips/MyHotels';
import MyEvents from '../../components/Cards/Pages/MyTrips/MyEvents';
import React, { useState } from "react";


const MyTrips = () => {
    const [hotels, setHotels] = useState([]);
    const [originCode, setOriginCode] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [numOfAdults, setNumOfAdults] = useState(1);

    const handleFormDataFlights = (formData) => {
        setOriginCode(formData.originCode)
        setDestination(formData.destination)
        setDepartureDate(formData.departureDate)
        setNumOfAdults(formData.numOfAdults)
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
                        onFormData={handleFormDataFlights}
                     />
                </div>
                <div className="w-full p-4 flex justify-center">
                    <MyFlights 
                        originCode={originCode} 
                        destination={destination} 
                        departureDate={departureDate} 
                        numOfAdults={numOfAdults} 
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