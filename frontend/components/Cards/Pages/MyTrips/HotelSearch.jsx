import { useState } from 'react';
import { fetchHotels, fetchHotelDetails } from '../../../../src/app/utilities';
import { useCart } from '../../../../src/app/CartContext';

const HotelSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const displayLimit = 10;
  const { addToCart } = useCart();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await fetchHotels(cityCode);
    response = await fetchHotelDetails(response.data.slice(0, displayLimit));
    setHotels(response);
    if (response.length > 0) {
      setIsLoading(false);
    }
  }

  return (
    <div className="card glass bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 shadow-xl w-[750px] pb-10">
      <h1 className='text-4xl text-center mt-20 text-white'>Search Hotels</h1>
      <form onSubmit={handleSubmit} className='flex mt-20 justify-center'>
        <label className="input input-bordered flex items-center w-[550px] gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
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
      <div className='flex flex-wrap justify-center gap-12 mt-20 mb-20'>
        {isLoading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          hotels.length > 0 ? (
            hotels.map((hotelDetails, index) => (
              <div key={index} className="card card-normal w-80 h-[600px] card-bordered mb-4 text-white">
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
                  <button className="btn btn-primary self-center mt-auto mb-4" onClick={() => addToCart(hotelDetails)}>Add to cart</button>
                </div>
              </div>
            ))
          ) : (
            null
          )
        )}
      </div>
    </div>
  );
};

export default HotelSearch;