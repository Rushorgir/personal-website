import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { socialLinks } from "../mock";
import { Github, Linkedin, Mail } from "lucide-react";
import ObfuscatedEmail from "./ObfuscatedEmail";

const iconMap = {
  Github,
  Linkedin,
  Mail,
};

const Contact = () => {
  const registerPoint = useScrollLineRegister();
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    registerPoint("contact-title", titleRef);
  }, [registerPoint]);

  const [ref, inView] = useInView({
    threshold: 0.02,
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

  return (
    <section id="contact" className="py-24 md:py-32 relative z-20">
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
            className="text-5xl md:text-6xl font-light tracking-tight mb-8 inline-block relative"
          >
            {/* Hidden anchor point positioned higher up to terminate the scroll line early and hide it completely */}
            <div ref={titleRef} className="absolute left-1/2 top-4 w-0 h-0 pointer-events-none" />
            <span className="relative inline-block px-8 py-4 z-20">
              <span
                className="absolute inset-0 bg-white/10 dark:bg-[#0a0a0a]/10 backdrop-blur-md -z-10 pointer-events-none"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                  maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                }}
              ></span>
              <span className="relative z-10 text-black dark:text-white">Get In Touch</span>
            </span>
          </motion.h2>

          <motion.div variants={itemVariants} className="md:p-8 inline-block mb-12 relative z-10">
            <div
              className="absolute inset-0 md:bg-white/40 md:dark:bg-[#0a0a0a]/40 md:backdrop-blur-sm -z-10 pointer-events-none hidden md:block"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              }}
            ></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to
              be part of your visions.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-6">
            {socialLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon];

              // Use ObfuscatedEmail for email links
              if (link.icon === "Mail") {
                return (
                  <ObfuscatedEmail
                    key={index}
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
