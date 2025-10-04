import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../mock';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-light tracking-tight mb-16 text-center text-black dark:text-white"
          >
            Experience
          </motion.h2>

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                
                <div className="pb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{item.year}</p>
                  <h3 className="text-2xl font-light mb-1 text-black dark:text-white">{item.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{item.organization}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;