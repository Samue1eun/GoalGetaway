import { useNavigate } from 'react-router-dom';

const SettingsIconPageDirectory = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/settings/');
    };
    return (
        <>
            <button onClick={handleClick} className="p-2 rounded-full">
                <svg 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" 
                    className="h-9 w-9"
                >
                    <path 
                        d="m19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0 -1.07-.48l-1.88.38a1 1 0 0 1 -1.15-.66l-.61-1.83a1 1 0 0 0 -.95-.68h-4a1 1 0 0 0 -1 .68l-.56 1.83a1 1 0 0 1 -1.15.66l-1.93-.38a1 1 0 0 0 -1 .48l-2 3.46a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32l-1.27 1.44a1 1 0 0 0 -.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0 -.12-1.17zm-1.49 1.34.8.9-1.28 2.22-1.18-.24a3 3 0 0 0 -3.45 2l-.38 1.12h-2.56l-.36-1.14a3 3 0 0 0 -3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 0 0 0-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 0 0 3.45-2l.38-1.13h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 0 0 0 3.98zm-6.77-6a4 4 0 1 0 4 4 4 4 0 0 0 -4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z"
                    />
                </svg>
            </button>
        </>
    )
}

export default SettingsIconPageDirectory;