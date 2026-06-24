import React from "react";
import { motion, useInView as useInViewFM } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { socialLinks } from "../mock";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import ObfuscatedEmail from "./ObfuscatedEmail";
import SectionTitle from "./SectionTitle";
import { containerVariants, itemVariants } from "../utils/animations";

const iconMap = {
  Github,
  Linkedin,
  Mail,
};

const Contact = () => {
  const registerPoint = useScrollLineRegister();
  const titleRef = React.useRef(null);
  const isTitleInView = useInViewFM(titleRef, { margin: "0px 0px -40% 0px", once: true });

  React.useEffect(() => {
    registerPoint("contact-title", titleRef);
  }, [registerPoint]);

  const [ref, inView] = useInView({
    threshold: 0.02,
    triggerOnce: true,
  });



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
          <div className="relative inline-block">
            <div ref={titleRef} className="absolute left-1/2 top-0 w-0 h-0 pointer-events-none" />
            <SectionTitle
              title="Get In Touch"
              isTitleInView={isTitleInView}
              itemVariants={itemVariants}
              className="mb-8"
            />
          </div>

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

              let colorClass = "";
              if (link.icon === "Mail")
                colorClass =
                  "text-rose-500/80 dark:text-rose-400/80 group-hover:text-rose-500 dark:group-hover:text-rose-400";
              else if (link.icon === "Linkedin")
                colorClass =
                  "text-sky-500/80 dark:text-sky-400/80 group-hover:text-sky-500 dark:group-hover:text-sky-400";
              else if (link.icon === "Github")
                colorClass =
                  "text-violet-500/80 dark:text-violet-400/80 group-hover:text-violet-500 dark:group-hover:text-violet-400";

              // Use ObfuscatedEmail for email links
              if (link.icon === "Mail") {
                return (
                  <ObfuscatedEmail
                    key={index}
                    className="group p-4 border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-200 text-black dark:text-white"
                  >
                    <Mail size={24} className={`${colorClass} transition-colors`} />
                  </ObfuscatedEmail>
                );
              }

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white hover:-translate-y-1 transition-all duration-200 text-black dark:text-white"
                  aria-label={link.name}
                >
                  {IconComponent && (
                    <IconComponent size={24} className={`${colorClass} transition-colors`} />
                  )}
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
