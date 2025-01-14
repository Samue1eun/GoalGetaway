import { useState } from 'react'
import { fetchHotels, fetchHotelDetails } from '../../../../src/app/utilities';

const HotelSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const displayLimit = 10;



  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await fetchHotels(cityCode)
    response = await fetchHotelDetails(response.data.slice(0, displayLimit))
    setHotels(response);
    if (response.length > 0) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className='text-4xl text-center mt-20'>Search Hotels</h1>
      <form onSubmit={handleSubmit} className='flex mt-20 justify-center'>
        <label className="input input-bordered flex items-center w-[550px] gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search Hotels by City Code"
            onChange={(e) => setCityCode(e.target.value)}
          />
          <button
            type='submit'
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
      </form>
      <div className='flex flex-wrap justify-center gap-4 mt-20 mb-20'>
        {isLoading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          hotels.length > 0 ? (
            hotels.map((hotelDetails, index) => (
              <div key={index} className="card card-normal w-1/4 h-[550px] card-bordered border-black mb-4">
                <div className="card-body flex flex-col justify-between items-center">
                  <div className="flex-grow w-full">
                    <img
                      src={hotelDetails.image_url}
                      alt={hotelDetails.name}
                      className="h-64 w-full rounded-t-lg"
                    />
                    <div className="divider divider-primary"></div>
                    <h3 className="card-title font-semibold">{hotelDetails.name}</h3>
                    <p>{hotelDetails.formatted_address}</p>
                  </div>
                  <button className="btn btn-primary self-center mt-auto mb-4">Add to cart</button>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels found.</p>
          )
        )}
      </div>
    </>
  );
};
export default HotelSearch