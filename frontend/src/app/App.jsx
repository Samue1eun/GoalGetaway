import { Outlet } from 'react-router-dom';
import NightAndDarkModeToggle from '../../components/NightAndDarkModeToggle/NightAndDarkModeToggle';
import SettingsIconPageDirectory from '../../components/Settings/SettingsIconPageDirectory/SettingsIconPageDirectory';
import { useEffect, useState } from 'react'
import { getNFLTeamInfo } from './utilities.jsx'

const App = () => {
    // The data will be return by team name(key) use dot notation
    // to access the rest. The imgs for the team logos and the team 
    // title imgs will be labeled as follows: 
    // WikipediaLogoUrl, WikipediaWordMarkUrl
    const [teamInfo, setTeamInfo] = useState([]);

    useEffect(() =>{
        const fetchTeamData = async() => {
            //2024 is the default for the initial render
            setTeamInfo(await getNFLTeamInfo("2024"));
        } 
        fetchTeamData();
    }, [])
    
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <div className="flex justify-end p-4">
                    <NightAndDarkModeToggle />
                    <SettingsIconPageDirectory />
                </div>
                <div className="flex-grow">
                    <Outlet />
                </div>
            </div>
        
            <Outlet context={{teamInfo, setTeamInfo}} />
        </>

    );
};

export default App;