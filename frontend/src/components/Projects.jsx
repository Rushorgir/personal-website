import React from "react";
import { motion, useInView as useInViewFM } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { projects, personalInfo } from "../mock";
import { ExternalLink, BookOpen, Bot, Languages, AlarmClock } from "lucide-react";
import { Github } from "./BrandIcons";
import SectionTitle from "./SectionTitle";
import { projectsContainerVariants, projectsItemVariants } from "../utils/animations";

const iconMap = {
  BookOpen,
  Bot,
  Languages,
  AlarmClock,
};

const Projects = () => {
  const registerPoint = useScrollLineRegister();
  const btnRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const isTitleInView = useInViewFM(titleRef, { margin: "0px 0px -40% 0px", once: true });

  React.useEffect(() => {
    registerPoint("projects-btn", btnRef);
  }, [registerPoint]);

  const [ref, inView] = useInView({
    threshold: 0.02,
    triggerOnce: true,
  });

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={projectsContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle
            title="Featured Projects"
            isTitleInView={isTitleInView}
            titleRef={titleRef}
            itemVariants={projectsItemVariants}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon];
              return (
                <motion.div
                  key={project.id}
                  variants={projectsItemVariants}
                  className="group bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border border-gray-200 dark:border-[#333] overflow-hidden hover:border-black dark:hover:border-white hover:bg-white/80 dark:hover:bg-[#0a0a0a]/80 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] flex items-center justify-center bg-gray-50/50 dark:bg-[#0a0a0a]/50 group-hover:bg-gray-100/50 dark:group-hover:bg-white/5 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent
                        size={80}
                        strokeWidth={1}
                        className="text-gray-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-light mb-2 text-black dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs border border-gray-300 dark:border-[#333] text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm hover:underline text-black dark:text-white relative z-20"
                      >
                        <Github
                          size={16}
                          className="text-violet-500/80 dark:text-violet-400/80 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
                        />
                        Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 text-sm hover:underline text-black dark:text-white relative z-20"
                        >
                          <ExternalLink
                            size={16}
                            className="text-emerald-500/80 dark:text-emerald-400/80 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors"
                          />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={projectsItemVariants} className="text-center relative">
            <a
              ref={btnRef}
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-btn relative z-20 inline-flex items-center gap-2 px-8 py-3 border border-black dark:border-white text-black dark:text-white bg-white/10 dark:bg-[#0a0a0a]/10 backdrop-blur-md overflow-hidden hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
            >
              <Github size={20} />
              See More Projects on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
