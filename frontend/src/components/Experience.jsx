import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { experience } from "../mock";

const ExperienceItem = ({ item, isRightAligned, index }) => {
  const registerPoint = useScrollLineRegister();
  const topRef = React.useRef(null);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    registerPoint(`experience-${index}-top`, topRef);
    registerPoint(`experience-${index}-bottom`, bottomRef);
  }, [registerPoint, index]);

  return (
    <div
      className={`relative w-full border-l-2 md:border-l-0 ${isRightAligned ? "pl-8 md:pl-0 md:pr-12 md:text-right" : "pl-8 md:pl-12 md:text-left"} border-gray-200 dark:border-[#333]`}
    >
      {/* Mobile Dot */}
      <div className="md:hidden absolute -left-[9px] top-0 w-4 h-4 bg-black dark:bg-white rounded-full"></div>

      {/* Desktop Anchor Top */}
      <div
        ref={topRef}
        className={`hidden md:block absolute top-[76px] w-1 h-1 ${isRightAligned ? "-right-0" : "-left-0"}`}
      ></div>

      {/* Desktop Anchor Bottom */}
      <div
        ref={bottomRef}
        className={`hidden md:block absolute bottom-10 w-1 h-1 ${isRightAligned ? "-right-0" : "-left-0"}`}
      ></div>

      <div className="md:p-8 inline-block relative z-10">
        <div
          className="absolute inset-0 md:bg-white/40 md:dark:bg-[#0a0a0a]/40 md:backdrop-blur-sm -z-10 pointer-events-none hidden md:block"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        ></div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">{item.year}</p>
        <h3 className="text-2xl font-light mb-1 text-black dark:text-white">{item.title}</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{item.organization}</p>
        {Array.isArray(item.description) ? (
          <ul
            className={`list-disc pl-5 ${isRightAligned ? "md:pl-0 md:list-inside" : "md:pl-5 md:list-outside"} text-gray-700 dark:text-gray-300 leading-relaxed space-y-2`}
          >
            {item.description.map((point, pointIndex) => (
              <li key={pointIndex}>{point}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const registerPoint = useScrollLineRegister();
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    registerPoint("experience-title", titleRef);
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
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            ref={titleRef}
            variants={itemVariants}
            className="text-5xl md:text-6xl font-light tracking-tight mb-16 md:mb-24 text-center w-full"
          >
            <span className="relative inline-block px-8 py-4 z-20">
              <span
                className="absolute inset-0 bg-white/10 dark:bg-[#0a0a0a]/10 backdrop-blur-md -z-10 pointer-events-none"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                  maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                }}
              ></span>
              <span className="relative z-10 text-black dark:text-white">Experience</span>
            </span>
          </motion.h2>

          <div className="relative">
            <div className="space-y-16 md:space-y-24">
              {experience.map((item, index) => {
                const isRightAligned = index % 2 !== 0;
                return (
                  <motion.div key={item.id} variants={itemVariants} className="w-full">
                    <ExperienceItem item={item} isRightAligned={isRightAligned} index={index} />
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
