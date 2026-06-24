import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { smoothScrollTo } from "../utils/animations";

const Header = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Typing animation state with exact Minecraft colors
  const words = ["Rushaan Nayyar", "Rushorgir"];
  const minecraftColors = ["dark_red", "gold", "aqua", "lime_green"];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentColorName, setCurrentColorName] = useState("");

  useEffect(() => {
    let timer;
    const fullText = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      const nextIndex = (wordIndex + 1) % words.length;
      setWordIndex(nextIndex);

      if (nextIndex === 1) {
        const randomColor = minecraftColors[Math.floor(Math.random() * minecraftColors.length)];
        setCurrentColorName(randomColor);
      } else {
        setCurrentColorName("");
      }
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  const isDark = theme === "dark";
  const getMinecraftColor = () => {
    if (wordIndex !== 1 || !currentColorName) return undefined;
    switch (currentColorName) {
      case "dark_red":
        return isDark ? "#FF5555" : "#AA0000"; // Light Red in dark mode, Dark Red in light mode
      case "gold":
        return isDark ? "#FFAA00" : "#C29200"; // Gold in dark mode, Ochre/Dark Yellow in light mode
      case "aqua":
        return isDark ? "#55FFFF" : "#00AAAA";
      case "lime_green":
        return isDark ? "#55FF55" : "#00AA00";
      default:
        return undefined;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetY);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-gray-200/80 dark:border-[#333]/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-xl font-mono font-medium tracking-tight cursor-default select-none inline-block whitespace-nowrap min-w-[180px] ${
              !currentColorName ? "text-black dark:text-white" : ""
            }`}
            style={currentColorName ? { color: getMinecraftColor() } : undefined}
          >
            {displayedText}
            <span className="inline-block w-[2px] h-[1.1em] bg-current ml-1 align-middle animate-pulse" />
          </span>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 relative group active:scale-95"
                style={{ outline: "none" }}
              >
                {item.name}
                <span className="absolute left-0 -bottom-[1px] w-0 h-[1px] bg-black dark:bg-white group-hover:w-full transition-all duration-300 ease-out"></span>
              </button>
            ))}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white"
              style={{ outline: "none" }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-[#333] pt-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white py-2 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
