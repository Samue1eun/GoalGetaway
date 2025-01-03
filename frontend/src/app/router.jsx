import { createBrowserRouter } from "react-router-dom"
import Home from '../../pages/Home/Home'
import Register from '../../pages/Register/Register'
import Login from '../../pages/Login/Login'
import MyEvents from '../../pages/MyEvents/MyEvents'
import MyFavoriteTeam from '../../pages/MyFavoriteTeam/MyFavoriteTeam'
import MyTrips from '../../pages/MyTrips/MyTrips'
import PlanTravel from '../../pages/PlanTravel/PlanTravel'
import SportsNews from '../../pages/SportsNews/SportsNews'
import SportsStats from '../../pages/SportsStats/SportsStats'
import App from './App'


const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                index: true,
                element: <Home />
            },
            {
                path:'/registration/',
                element: <Register />
            },
            {
                path:'/login/',
                element: <Login />
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
                path: '/sportsstats/',
                element: <SportsStats />
            }
        ],
    },
])

export default router;