import React from "react";
import { motion, useInView as useInViewFM } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { personalInfo } from "../mock";
import { GraduationCap, Globe2, Target } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { containerVariants, itemVariants } from "../utils/animations";

const About = () => {
  const registerPoint = useScrollLineRegister();
  const dotRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const isTitleInView = useInViewFM(titleRef, { margin: "0px 0px -40% 0px", once: true });

  React.useEffect(() => {
    registerPoint("about-dot", dotRef);
  }, [registerPoint]);

  const [ref, inView] = useInView({
    threshold: 0.02,
    triggerOnce: true,
  });



  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="relative flex flex-col items-center">
            <SectionTitle
              title="About Me"
              isTitleInView={isTitleInView}
              titleRef={titleRef}
              itemVariants={itemVariants}
              className="mb-8"
            />
            {/* The dot from which the line starts */}
            <div ref={dotRef} className="w-3 h-3 bg-black dark:bg-white rounded-full mb-16 z-10" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6 md:p-8 relative z-10">
              <div
                className="absolute inset-0 md:bg-white/40 md:dark:bg-[#0a0a0a]/40 md:backdrop-blur-sm -z-10 pointer-events-none hidden md:block"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                  maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                }}
              ></div>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {personalInfo.careerGoal}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="group flex items-start gap-4 p-6 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-200">
                <GraduationCap className="w-8 h-8 flex-shrink-0 text-emerald-500/80 dark:text-emerald-400/80 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                <div>
                  <h3 className="font-normal text-lg mb-1 text-black dark:text-white">Education</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.education.degree} at {personalInfo.education.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {personalInfo.education.year}
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-6 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-200">
                <Globe2 className="w-8 h-8 flex-shrink-0 text-sky-500/80 dark:text-sky-400/80 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" />
                <div>
                  <h3 className="font-normal text-lg mb-1 text-black dark:text-white">Languages</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {personalInfo.languages.join(", ")}
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-6 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-200">
                <Target className="w-8 h-8 flex-shrink-0 text-red-500/80 dark:text-red-400/80 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                <div>
                  <h3 className="font-normal text-lg mb-1 text-black dark:text-white">Goals</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contributing to open source, creating impactful projects, participating in
                    hackathons
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
