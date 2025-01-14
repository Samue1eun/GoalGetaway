import TripSearch from '../../components/Cards/Pages/MyTrips/TripSearch';
import MyFlights from '../../components/Cards/Pages/MyTrips/MyFlights';
import React, { useState } from "react";


const MyTrips = () => {
    const [originCode, setOriginCode] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [numOfAdults, setNumOfAdults] = useState(null);

    const handleFormDataFlights = (formData) => {
        setOriginCode(formData.originCode)
        setDestination(formData.destination)
        setDepartureDate(formData.departureDate)
        setNumOfAdults(formData.numOfAdults)
    };
    
    return (
        <div
          className="relative h-screen w-screen overflow-hidden"
          style={{
            backgroundImage: "url('/assets/airplane-flying-over-majestic-snow-capped-mountains-under-a-cloudy-sky-during-daytime-free-photo.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-center text-3xl font-bold my-4 text-white">Search Flights</h1>
            <div className="w-full p-4 flex justify-center">
              <TripSearch onFormData={handleFormDataFlights} />
            </div>
            <div className="w-full p-4 flex justify-center">
              <MyFlights
                originCode={originCode}
                destination={destination}
                departureDate={departureDate}
                numOfAdults={numOfAdults}
              />
            </div>
          </div>
        </div>
      );
    };
    

export default MyTrips;