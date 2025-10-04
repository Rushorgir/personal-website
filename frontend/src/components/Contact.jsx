import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo, socialLinks } from '../mock';
import { Github, Linkedin, Mail } from 'lucide-react';
import ObfuscatedEmail from './ObfuscatedEmail';

const iconMap = {
  Github,
  Linkedin,
  Mail
};

const Contact = () => {
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
    <section id="contact" className="py-24 md:py-32 bg-gray-50/50 dark:bg-[#0a0a0a]/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-light tracking-tight mb-8 text-black dark:text-white"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            {socialLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon];
              
              // Use ObfuscatedEmail for email links
              if (link.icon === 'Mail') {
                return (
                  <ObfuscatedEmail
                    key={index}
                    email={personalInfo.email}
                    className="p-4 border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-200 text-black dark:text-white"
                  >
                    <Mail size={24} />
                  </ObfuscatedEmail>
                );
              }
              
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-200 text-black dark:text-white"
                  aria-label={link.name}
                >
                  {IconComponent && <IconComponent size={24} />}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;