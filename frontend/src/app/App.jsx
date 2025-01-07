import { Outlet } from 'react-router-dom'
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
            <Outlet context={{teamInfo, setTeamInfo}} />
        </>

    );
};

export default App;