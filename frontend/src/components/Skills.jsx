import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../mock';
import {
  Code2,
  Brain,
  Sparkles,
  Network,
  FileCode,
  Component,
  Layout,
  Palette,
  Server,
  Database,
  Code,
  Github,
  Globe
} from 'lucide-react';

const iconMap = {
  Code2,
  Brain,
  Sparkles,
  Network,
  FileCode,
  Component,
  Layout,
  Palette,
  Server,
  Database,
  Code,
  Github,
  Globe
};

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const SkillCard = ({ name, icon }) => {
    const IconComponent = iconMap[icon];
    return (
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 p-4 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 hover:-translate-y-1 transition-all duration-200"
      >
        {IconComponent && <IconComponent size={20} className="flex-shrink-0 text-black dark:text-white" />}
        <span className="text-sm text-black dark:text-white">{name}</span>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-24 md:py-32 bg-gray-50/50 dark:bg-[#0a0a0a]/50">
      <div className="max-w-7xl mx-auto px-6">
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
            Skills & Technologies
          </motion.h2>

          <div className="space-y-12">
            <div>
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-light mb-6 text-black dark:text-white"
              >
                Core Expertise
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {skills.core.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
                ))}
              </motion.div>
            </div>

            <div>
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-light mb-6 text-black dark:text-white"
              >
                Currently Learning
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
              >
                {skills.learning.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
                ))}
              </motion.div>
            </div>

            <div>
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-light mb-6 text-black dark:text-white"
              >
                Tools & Platforms
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {skills.tools.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;