import { useState, useEffect } from 'react';

const LightAndDarkModeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    return (
        <>
        
        </>
    )
}

export default LightAndDarkModeToggle;