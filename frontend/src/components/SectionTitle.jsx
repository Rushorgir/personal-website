import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ title, isTitleInView, titleRef, itemVariants, className = "mb-16" }) => {
  return (
    <motion.h2
      ref={titleRef}
      variants={itemVariants}
      className={`text-5xl md:text-6xl font-light tracking-tight text-center text-black dark:text-white ${className}`}
    >
      <span className="relative inline-flex items-center justify-center px-6 pt-[7px] pb-[9px] leading-[1.1] z-20 group cursor-default text-black dark:text-white">
        {/* Glassmorphism Background */}
        <motion.span
          className="absolute inset-0 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-md -z-10 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTitleInView ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
        {/* Animated Drawing Border Box */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible">
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="8"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="0.75"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isTitleInView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
        {title}
      </span>
    </motion.h2>
  );
};

export default SectionTitle;
