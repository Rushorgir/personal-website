import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
      style={{ outline: 'none' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5 text-black dark:text-white" strokeWidth={1.5} />
      ) : (
        <Moon className="w-5 h-5 text-black dark:text-white" strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
