import React from 'react';
import { personalInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-[#333] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Designed and built with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;