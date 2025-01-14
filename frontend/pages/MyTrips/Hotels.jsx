import HotelSearch from "../../components/Cards/Pages/MyTrips/HotelSearch"
import CartModal from "../Checkout/CartModal"


const Hotels = () => {
  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: "url('/assets/seattle_football_stadium.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <HotelSearch />
        <CartModal />
      </div>
    </div>
  );
};
export default Hotels