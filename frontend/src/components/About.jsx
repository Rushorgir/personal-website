import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../mock';
import { GraduationCap, Globe2, Target } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
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
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.careerGoal}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-200">
                <GraduationCap className="w-8 h-8 flex-shrink-0 text-black dark:text-white" />
                <div>
                  <h3 className="font-normal text-lg mb-1 text-black dark:text-white">Education</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.education.degree} at {personalInfo.education.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{personalInfo.education.year}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-200">
                <Globe2 className="w-8 h-8 flex-shrink-0 text-black dark:text-white" />
                <div>
                  <h3 className="font-normal text-lg mb-1 text-black dark:text-white">Languages</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.languages.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-200">
                <Target className="w-8 h-8 flex-shrink-0 text-black dark:text-white" />
                <div>
                  <h3 className="font-normal text-lg mb-1 text-black dark:text-white">Goals</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contributing to open source, creating impactful projects, participating in hackathons
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;