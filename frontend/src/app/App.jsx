import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const App = () => {
    return (
        // <div>
        //     <header>
        //         <h1>Redzone Getaway</h1>
        //         {/* Add navigation links or other header content here */}
        //     </header>
        //     <main>
                <Outlet />
        //     {/* </main>
        //     <footer>
        //         {/* Add footer content here */}
        //     </footer>
        // </div> */}
    );
};

export default App;