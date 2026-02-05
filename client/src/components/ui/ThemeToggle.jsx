import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 aspect-square h-11 rounded-xl hover-outline transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Moon size={20} className="text-accent-100" />
            ) : (
                <Sun size={20} className="text-accent-100" />

            )}
        </button>
    );
};

export default ThemeToggle;