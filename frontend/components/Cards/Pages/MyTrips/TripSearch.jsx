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
      <div>
        <input type="text" placeholder="City Code" onChange={(e) => setCityCode(e.target.value)} />
        <button onClick={fetchHotels}>Search Hotels</button>
      </div>
      <div>
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