import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "../mock";

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const renderContent = (item, isEven) => (
    <div className={`relative w-full ${isEven ? "border-l-2 md:border-l-0 md:border-r-2 pl-8 md:pl-0 md:pr-12 md:text-right" : "border-l-2 pl-8 md:pl-12 md:text-left"} border-gray-200 dark:border-[#333]`}>
      
      {/* Mobile Dot */}
      <div className="md:hidden absolute -left-[9px] top-0 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
      
      {/* Desktop Dot */}
      <div className={`hidden md:block absolute top-0 w-4 h-4 bg-black dark:bg-white rounded-full ${isEven ? '-right-[9px]' : '-left-[9px]'}`}></div>

      <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{item.year}</p>
      <h3 className="text-2xl font-light mb-1 text-black dark:text-white">
        {item.title}
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        {item.organization}
      </p>
      {Array.isArray(item.description) ? (
        <ul className="list-disc pl-5 md:pl-0 md:list-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
          {item.description.map((point, pointIndex) => (
            <li key={pointIndex}>{point}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-light tracking-tight mb-16 md:mb-24 text-center text-black dark:text-white"
          >
            Experience
          </motion.h2>

          <div className="relative">
            <div className="space-y-16 md:space-y-24">
              {experience.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="w-full"
                  >
                    {renderContent(item, isEven)}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
