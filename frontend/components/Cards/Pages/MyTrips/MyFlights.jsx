import React, { useState, useEffect } from "react";

const MyFlights = ({ flights, origin, destination, departureDate, adults }) => {
  const [flightDetailsList, setFlightDetailsList] = useState([]);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/api_app/flight_booking/${origin}/${destination}/${departureDate}/${adults}/`
        );
        if (response.ok) {
          const data = await response.json();
          setFlightDetailsList(data.data || []); // Ensure data is processed as an array
        } else {
          console.error("Error fetching flight details:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch flight details only if all required parameters are provided
    if (origin && destination && departureDate && adults) {
      fetchFlightDetails();
    }
  }, [origin, destination, departureDate, adults]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Flights</h2>
      <ul>
        {flightDetailsList.length > 0 ? (
          flightDetailsList.map((flightDetails, index) => (
            <li key={index} className="mb-4">
              <div className="border p-4">
                <h3 className="font-semibold">Flight ID: {flightDetails.id}</h3>
                <p>
                  <strong>Price:</strong> {flightDetails.price.currency} {flightDetails.price.total}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {flightDetails.itineraries[0].duration.replace("PT", "").toLowerCase()}
                </p>
                <p>
                  <strong>Departure:</strong>{" "}
                  {flightDetails.itineraries[0].segments[0].departure.iataCode} at{" "}
                  {flightDetails.itineraries[0].segments[0].departure.at}
                </p>
                <p>
                  <strong>Arrival:</strong>{" "}
                  {flightDetails.itineraries[0].segments[0].arrival.iataCode} at{" "}
                  {flightDetails.itineraries[0].segments[0].arrival.at}
                </p>
              </div>
            </li>
          ))
        ) : (
          <li>No flight details found.</li>
        )}
      </ul>
    </div>
  );
};

export default MyFlights;