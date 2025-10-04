import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-[#0a0a0a] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group focus:outline-none active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp 
            size={20} 
            className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
