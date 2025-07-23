import React, { createContext, useContext, useState, useEffect } from 'react';
import LightLogo from "../svg/Logo/lightLogo.svg";
import DarkLogo from "../svg/Logo/dark_logo.png";
import useCandidateAuth from '../hooks/useCandidateAuth';
import LightStars from "../svg/Background/Stars_light.png";
import DarkStars from "../svg/Background/Stars.svg";
import LightBanner from "../svg/Background/AssessmentBanner_light.png";
import DarkBanner from "../svg/Background/AssessmentBanner.svg";
import LightPopup from "../svg/Background/AssessmentPopup_light.png";
import DarkPopup from "../svg/Background/AssessmentPopup.svg";
import { useAuthContext } from './AuthProvider';

const ThemeContext = createContext();

export const ThemesProvider = ({ children }) => {
    const { candidateData } = useCandidateAuth();
    const { hasUser } = useAuthContext();
    const [canSave,setCanSave] = useState(false);

    // Check if theme exists in localStorage, default to 'dark'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return (candidateData || hasUser) ? (savedTheme || 'dark') : 'dark';
    });

    useEffect(()=>{
        const savedTheme = localStorage.getItem('theme');
        //authenticated pages has theme
        if(candidateData || hasUser){
            setTheme(savedTheme || 'dark')
        }else{
            if(savedTheme){
                setCanSave(false)
            }
            setTheme('dark')
        }
    },[candidateData,hasUser])

    // Update theme in localStorage and apply CSS class when theme changes
    useEffect(() => {
        if(canSave){
            localStorage.setItem('theme', theme);
        }
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme,canSave]);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setCanSave(true)
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

export const useUnknownProfilePicture = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'light' ? 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1748257206/Light-Mode-Dummy-DP-Trim_sx1l86.png' : 'https://res.cloudinary.com/djuwzdbwy/image/upload/v1743743999/Unknown_image_DARK_MODE_izdmv9.png'
}

export const useLogo = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'dark' ? LightLogo : DarkLogo
}

export const useScoreBg = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'dark' ? DarkStars :  LightStars 
}

export const useAssessmentBannerBg = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'dark' ? DarkBanner :  LightBanner 
}

export const useAssessmentPopupBg = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'dark' ? DarkPopup :  LightPopup 
}

export default ThemeContext;