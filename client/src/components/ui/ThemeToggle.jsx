import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-xl hover:bg-background-60 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Moon size={20} className="text-primary-100" />
            ) : (
                <Sun size={20} className="text-yellow-100" />

            )}
        </button>
    );
};

export default ThemeToggle;