import HotelSearch from "../../components/Cards/Pages/MyTrips/HotelSearch"
import CartModal from "../../pages/Checkout/CartModal"
import seattleStadium from "../../assets/seattle_football_stadium.jpg"


const Hotels = () => {
  return (
    <div
    className="hero flex justify-center justify-items-center min-h-screen w-full"
    style={{ backgroundImage: `url(${seattleStadium})` }}
    >
        <div className="hero-overlay justify-center justify-items-center w-full p-4 bg-transparent">
          <div className="hero-content flex flex-col items-center">
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <HotelSearch />
              <CartModal />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hotels