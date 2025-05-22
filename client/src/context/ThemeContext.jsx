import React, { createContext, useContext, useState, useEffect } from 'react';
const ThemeContext = createContext();

export const ThemesProvider = ({ children }) => {
    // Check if theme exists in localStorage, default to 'dark'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    // Update theme in localStorage and apply CSS class when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;