import React from "react";
import { motion, useInView as useInViewFM } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { skills } from "../mock";
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
  Globe,
} from "lucide-react";
import SectionTitle from "./SectionTitle";
import { containerVariants, itemVariants } from "../utils/animations";

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
  Globe,
};

const SkillCard = ({ name, icon }) => {
  const IconComponent = iconMap[icon];
  return (
    <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 hover:-translate-y-1 transition-all duration-200">
      {IconComponent && (
        <IconComponent size={20} className="flex-shrink-0 text-black dark:text-white" />
      )}
      <span className="text-sm text-black dark:text-white">{name}</span>
    </div>
  );
};

const SkillCategory = ({ id, title, data }) => {
  const registerPoint = useScrollLineRegister();
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    registerPoint(id, titleRef);
  }, [id, registerPoint]);

  return (
    <div>
      <div ref={titleRef} className="mb-6 inline-block">
        <motion.h3
          variants={itemVariants}
          className="text-2xl font-light text-black dark:text-white relative z-20"
        >
          {title}
        </motion.h3>
      </div>
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </motion.div>
    </div>
  );
};
const Skills = () => {
  const titleRef = React.useRef(null);
  const isTitleInView = useInViewFM(titleRef, { margin: "0px 0px -40% 0px", once: true });

  const categories = [
    { id: "skills-0", title: "Languages", data: skills.languages },
    { id: "skills-1", title: "Frontend", data: skills.frontend },
    { id: "skills-2", title: "Backend", data: skills.backend },
    { id: "skills-3", title: "Database", data: skills.database },
    { id: "skills-4", title: "Tools", data: skills.tools },
  ];

  const [ref, inView] = useInView({
    threshold: 0.02,
    triggerOnce: true,
  });

  return (
    <section id="skills" className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle
            title="Skills & Technologies"
            isTitleInView={isTitleInView}
            titleRef={titleRef}
            itemVariants={itemVariants}
          />

          <div className="space-y-12">
            {categories.map((cat) => (
              <SkillCategory key={cat.id} id={cat.id} title={cat.title} data={cat.data} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
