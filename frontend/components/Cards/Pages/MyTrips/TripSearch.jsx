import React, { useState } from "react";

const TripSearch = ({ onHotelsFetched, onFlightsFetched, onOriginChange, onDestinationChange, onDepartureDateChange, onAdultsChange }) => {
  const [cityCode, setCityCode] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);

  const fetchHotels = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/api_app/hotel_data/${cityCode}/`);
        console.log("Fetching hotels...");
        if (response.ok) {
            const hotels = await response.json();
            console.log("Hotels fetched successfully:", hotels);
            onHotelsFetched(hotels);
        } else {
            console.error("Error fetching hotels:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const fetchFlights = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/api_app/flight_booking/${origin}/${destination}/${departureDate}/${adults}/`
    );

    if (response.ok) {
      const flights = await response.json();
      console.log("Flights fetched successfully:", flights);
      onFlightsFetched(flights.data || []); // Pass the flight data to the parent
    } else {
      console.error("Error fetching flights:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

    return (
      <div>
       <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search Hotels by City Code"
          onChange={(e) => setCityCode(e.target.value)}
        /> 
        <button
          onClick={fetchHotels}
          className="p-2 rounded-full bg-red-500 text-white opacity-70 hover:bg-red-600 transition-all cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
      <div style={{marginTop: "22px"}}>
        <input type="text" placeholder="Origin" onChange={(e) => onOriginChange(e.target.value)} />
        <input type="text" placeholder="Destination" onChange={(e) => onDestinationChange(e.target.value)} />
        <input type="date" placeholder="Departure Date" onChange={(e) => onDepartureDateChange(e.target.value)} />
        <input type="number" placeholder="Adults" onChange={(e) => onAdultsChange(Number(e.target.value))} />
        <button onClick={fetchFlights}>Search Flights</button>
      </div>
    </div>
  );
};

export default TripSearch;