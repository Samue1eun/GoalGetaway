import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../src/app/utilities';
import NightAndDarkModeToggle from '../NightAndDarkModeToggle/NightAndDarkModeToggle';
import SettingsIconPageDirectory from '../Settings/SettingsIconPageDirectory/SettingsIconPageDirectory';
import { useState } from 'react';
import CartModal from '../../../frontend/pages/Checkout/CartModal.jsx';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      alert('Logout successful');
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('There was an error logging out!', error.message);
      alert('Logout failed: ' + error.message);
    }
  };

  // Open modal function
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="navbar bg-primary text-white justify-center">
        <Link to="/home/" className="btn btn-ghost hover:bg-transparent text-xl">Home</Link>
        <Link to="/mytrips/" className="btn btn-ghost hover:bg-transparent text-xl">Flights</Link>
        <Link to="/hotels/" className="btn btn-ghost hover:bg-transparent text-xl">Hotels</Link>
        <Link to="/myevents/" className="btn btn-ghost hover:bg-transparent text-xl">Events</Link>
        <Link to="/nflstatistics/" className="btn btn-ghost hover:bg-transparent text-xl">NFL Statistics</Link>

        <div className="flex w-full gap-6 justify-end p-4">
          <button className="btn w-30 btn-secondary" onClick={handleSignOut}>Log Out</button>

          {/* Button to open the modal */}
          <button
            onClick={openModal}
            className="btn transition-transform transform duration-300 ease-in-out hover:bg-transparent btn-ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

          <NightAndDarkModeToggle />
          <SettingsIconPageDirectory />
          {cartCount > 0 && (
            <div className="absolute top-7 right-40 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </div>
      </div>

      {/* Pass isOpen and onClose props to the CartModal */}
      <CartModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
