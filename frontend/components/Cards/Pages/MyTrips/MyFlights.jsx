import React, { useState, useEffect } from "react";
import { fetchFlightDetails } from '../../../../src/app/utilities.jsx';
import { useCart } from '../../../../src/app/CartContext';

const MyFlights = ({ originCode, destination, departureDate, numOfAdults }) => {
  const [flightDetailsList, setFlightDetailsList] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getFlights = async () => {
      const response = await fetchFlightDetails(originCode, destination, departureDate, numOfAdults);
      setFlightDetailsList(response.data);
    };
    if (originCode && destination && departureDate && numOfAdults) {
      getFlights();
    }
  }, [originCode, destination, departureDate, numOfAdults]);

  return (
    <div>
      <ul>
        {flightDetailsList.length > 0 ? (
          flightDetailsList.map((flightDetails, index) => (
            <li key={index} className="mb-4">
              <div className="card glass border p-4">
                <h3 className="card-title font-semibold self-center">Flight ID: {flightDetails.id}</h3>
                <p className="self-center"><strong>Price:</strong> ${flightDetails.price.total}</p>
                <p className="self-center"><strong>Duration:</strong> {flightDetails.itineraries[0].duration.replace("PT", "").toLowerCase()}</p>
                <p><strong>Departure:</strong> {flightDetails.itineraries[0].segments[0].departure.iataCode} @ {flightDetails.itineraries[0].segments[0].departure.at.replace("T", " ")}</p>
                <p><strong>Arrival:</strong> {flightDetails.itineraries[0].segments[0].arrival.iataCode} @ {flightDetails.itineraries[0].segments[0].arrival.at.replace("T", " ")}</p>
                {flightDetails.itineraries[0].segments.length > 1 && (
                  <>
                    <p className="self-center font-bold">CONNECTIONS</p>
                    <p><strong>Departure:</strong> {flightDetails.itineraries[0].segments[1].departure.iataCode} @ {flightDetails.itineraries[0].segments[1].departure.at.replace("T", " ")}</p>
                    <p><strong>Arrival:</strong> {flightDetails.itineraries[0].segments[1].arrival.iataCode} @ {flightDetails.itineraries[0].segments[1].arrival.at.replace("T", " ")}</p>
                  </>
                )}
                <div className="flex justify-center mt-6 mb-4">
                  <button className="btn btn-primary" onClick={() => addToCart(flightDetails)}>Add to cart</button>
                </div>
              </div>
            </li>
          ))
        ) : (
          null
        )}
      </ul>
    </div>
  );
};

export default MyFlights;