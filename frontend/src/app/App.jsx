import { Outlet } from 'react-router-dom';
import NightAndDarkModeToggle from '../../components/NightAndDarkModeToggle/NightAndDarkModeToggle';
import SettingsIconPageDirectory from '../../components/Settings/SettingsIconPageDirectory/SettingsIconPageDirectory';

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex justify-end p-4">
                <NightAndDarkModeToggle />
                <SettingsIconPageDirectory />
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
};

export default App;