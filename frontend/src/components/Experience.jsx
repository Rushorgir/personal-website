import React from "react";
import { motion, useInView as useInViewFM } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { experience } from "../mock";
import SectionTitle from "./SectionTitle";
import { containerVariants, itemVariants } from "../utils/animations";

const colors = [
  "text-red-500/80 dark:text-red-400/80 group-hover:text-red-500 dark:group-hover:text-red-400",
  "text-emerald-500/80 dark:text-emerald-400/80 group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
  "text-violet-500/80 dark:text-violet-400/80 group-hover:text-violet-500 dark:group-hover:text-violet-400",
];

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
      className={`group relative w-full border-l-2 md:border-l-0 ${isRightAligned ? "pl-8 md:pl-0 md:pr-12 md:text-right" : "pl-8 md:pl-12 md:text-left"} border-gray-200 dark:border-[#333]`}
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
        <h3
          className={`text-2xl font-light mb-1 transition-colors duration-200 ${colors[index % colors.length]}`}
        >
          {item.title}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{item.organization}</p>
        {Array.isArray(item.description) ? (
          <ul
            className={`list-disc pl-5 ${isRightAligned ? "md:pl-0 md:list-inside" : "md:pl-5 md:list-outside"} text-gray-800 dark:text-gray-200 leading-relaxed space-y-2`}
          >
            {item.description.map((point, pointIndex) => {
              const colonIndex = point.indexOf(":");
              return (
                <li key={pointIndex}>
                  {colonIndex !== -1 ? (
                    <>
                      <strong className="font-semibold">{point.slice(0, colonIndex + 1)}</strong>
                      {point.slice(colonIndex + 1)}
                    </>
                  ) : (
                    point
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const registerPoint = useScrollLineRegister();
  const titleRef = React.useRef(null);
  const isTitleInView = useInViewFM(titleRef, { margin: "0px 0px -40% 0px", once: true });

  React.useEffect(() => {
    registerPoint("experience-title", titleRef);
  }, [registerPoint]);

  const [ref, inView] = useInView({
    threshold: 0.02,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle
            title="Experience"
            isTitleInView={isTitleInView}
            titleRef={titleRef}
            itemVariants={itemVariants}
            className="mb-16 md:mb-24 w-full"
          />

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
