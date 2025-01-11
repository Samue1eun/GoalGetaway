import React, { useState } from "react";

const TripSearch = ({onFormData}) => {
  const [cityCode, setCityCode] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numOfAdults, setNumOfAdults] = useState("");

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

  const handleSubmit = (e) =>{
    e.preventDefault();
    let formData = {
      "originCode": originCode,
      "destination": destination,
      "departureDate": departureDate,
      "numOfAdults": numOfAdults
    }
    onFormData(formData)
  }

    return (
      <form onSubmit={handleSubmit}>
       <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search Hotels by City Code"
          onChange={(e) => setCityCode(e.target.value)}
        /> 
        <button
          onClick={fetchHotels}
          className="btn btn-circle btn-sm btn-primary"
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

      <div className="w-[550px] flex flex-col ">

        {/* Origin Code input bar */}
        <label className="input input-bordered mt-10 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <input 
            type="text" 
            className="grow" 
            placeholder="Origin Code" 
            value={originCode}
            onChange={(e) => setOriginCode(e.target.value)}  />
        </label>

        {/* Destination Code input bar */}
        <label className="input mt-2 input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <input 
            type="text" 
            className="grow" 
            placeholder="Destination Code" 
            value={destination}
            onChange={(e) => setDestination(e.target.value)} />
        </label>

        {/* Departure Date input bar */}
        <label className="input mt-2 input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
          <input 
            type="text" 
            className="grow" 
            placeholder="Departure Date YYYY-MM-DD"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </label>

        {/* Number of Adults input bar */}
        <label className="input mt-2 input-bordered flex items-center gap-2" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
          <input 
            type="text" 
            className="grow" 
            placeholder="Number of Adults"
            value={numOfAdults}
            onChange={(e) => setNumOfAdults(Number(e.target.value))}
          />
        </label>
        <input className="btn btn-primary w-60 mt-4 self-center" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default TripSearch;