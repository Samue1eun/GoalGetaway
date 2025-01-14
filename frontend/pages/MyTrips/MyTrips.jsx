import TripSearch from '../../components/Cards/Pages/MyTrips/TripSearch';
import MyFlights from '../../components/Cards/Pages/MyTrips/MyFlights';
import React, { useState } from "react";
import airplaneLanding from "../../assets/airplane_landing.jpeg";


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
      className="hero flex justify-center justify-items-center min-h-screen w-full"
      style={{ backgroundImage: `url(${airplaneLanding})` }}
      >
        <div className="hero-overlay justify-center justify-items-center w-full p-4 bg-transparent">
          <div className="hero-content flex flex-col items-center">
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
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
      </div>
    </div>
      );
    };
    

export default MyTrips;