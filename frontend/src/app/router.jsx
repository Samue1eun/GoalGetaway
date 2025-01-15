import { createBrowserRouter } from "react-router-dom"
import Home from '../../pages/Home/Home'
import Register from '../../pages/Register/Register'
import Login from "../../pages/LogIn/LogIn";
import MyEvents from '../../pages/MyEvents/MyEvents'
import MyFavoriteTeam from '../../pages/MyFavoriteTeam/MyFavoriteTeam'
import MyTrips from '../../pages/MyTrips/MyTrips'
import PlanTravel from '../../pages/PlanTravel/PlanTravel'
import SportsNews from '../../pages/SportsNews/SportsNews'
import NFLStats from '../../pages/NFLStats/NFLStats'
import Settings from '../../pages/Settings/Settings'
import App from './App'
import Hotels from "../../pages/MyTrips/Hotels"; 
import EventForm from '../../pages/MyEvents/EventForm';
import EditEventForm from '../../pages/MyEvents/EditEventForm';
import { getInfo } from './utilities';
import AddFavoriteTeam from "../../pages/AddFavoriteTeam/AddFavoriteTeam";
import CheckoutPage from "../../pages/Checkout/CheckoutPage";
import CartModal from "../../pages/Checkout/CartModal";
import { CartProvider } from '../../src/app/CartContext'; // Import CartProvider

const router = createBrowserRouter([
    {
        path:"/",
        element: (
            <CartProvider>
            <App/>
            </CartProvider>
        ),
        loader: getInfo,
        children:[
            {
                index: true,
                element: <Login />
            },
            {
                path:'/home/',
                element: <Home />
            },
            {
                path:'/register/',
                element: <Register />
            },
            {
                path:'/login/',
                element: <Login />
            },
            {
                path:'/addfavoriteteam/',
                element: <AddFavoriteTeam />
            },
            {
                path:'/mytrips/',
                element: <MyTrips />
            },
            {
                path:'/myevents/',
                element: <MyEvents />
            },
            {
                path: '/myevents/create/',
                element: <EventForm />
            },
            {
                path: '/myevents/edit/:eventId/',
                element: <EditEventForm />
            },
            {
                path:'/myfavoriteteam/',
                element: <MyFavoriteTeam />
            },
            {
                path: '/plantravel/',
                element: <PlanTravel />
            },
            {
                path: '/sportsnews/',
                element: <SportsNews />
            },
            {
                path: '/nflstatistics/',
                element: <NFLStats />
            },
            {
                path: '/settings/',
                element: <Settings />
            },
            {
                path: '/hotels/',
                element: <Hotels />
            },
            {
                path: "/checkout/",
                element: <CheckoutPage />
            },
            {
                path:'/cart-modal/',
                element: <CartModal />
            },
        ],
    },
])

export default router;