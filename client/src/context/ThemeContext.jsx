import React, { createContext, useContext, useState, useEffect } from 'react';
import LightLogo from "../svg/Logo/lightLogo.png";
import DarkLogo from "../svg/Logo/dark_logo.png";
import useCandidateAuth from '../hooks/useCandidateAuth';
import LightStars from "../svg/Background/Score_Light.png";
import DarkStars from "../svg/Background/Score_Dark.png";
import LightBanner from "../svg/Background/Banner-Light.png";
import DarkBanner from "../svg/Background/Banner-Dark.png";
import LightPopup from "../svg/Background/AssessmentPopup_light.png";
import DarkPopup from "../svg/Background/AssessmentPopup_dark.png";
import LightClosedBadge from "../svg/Icons/LightClosedBadge";
import DarkClosedBadge from "../svg/Icons/ClosedBadge";
import LightTelegramBanner from "../svg/Banners/lightTelegramBanner.png";
import DarkTelegramBanner from "../svg/Banners/telegramBanner.png";
import { useAuthContext } from './AuthProvider';
import { UNKNOWN_PROFILE_PICTURE_URL_DARK, UNKNOWN_PROFILE_PICTURE_URL_LIGHT } from '../utility/config';

const ThemeContext = createContext();

export const ThemesProvider = ({ children }) => {
    const { candidateData } = useCandidateAuth();
    const { user } = useAuthContext();
    const [canSave,setCanSave] = useState(false);

    // Check if theme exists in localStorage, default to 'dark'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return (candidateData || user) ? (savedTheme || 'dark') : 'dark';
    });

    useEffect(()=>{
        const savedTheme = localStorage.getItem('theme');
        //authenticated pages has theme
        if(candidateData || user){
            setTheme(savedTheme || 'dark')
        }else{
            if(savedTheme){
                setCanSave(false)
            }
            setTheme('dark')
        }
    },[candidateData,user])

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
    return context?.theme === 'light' ? UNKNOWN_PROFILE_PICTURE_URL_LIGHT : UNKNOWN_PROFILE_PICTURE_URL_DARK
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

export const useClosedBadge = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'dark' ? DarkClosedBadge :  LightClosedBadge 
}

export const useTelegramBanner = () => {
    const context = useContext(ThemeContext);
    return context?.theme === 'dark' ? DarkTelegramBanner :  LightTelegramBanner 
}

export default ThemeContext;