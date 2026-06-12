import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollLineRegister } from "./ScrollLineContext";
import { projects, personalInfo } from "../mock";
import { Github, ExternalLink, BookOpen, Bot, Languages, AlarmClock } from "lucide-react";

const iconMap = {
  BookOpen,
  Bot,
  Languages,
  AlarmClock,
};

const Projects = () => {
  const registerPoint = useScrollLineRegister();
  const btnRef = React.useRef(null);

  React.useEffect(() => {
    registerPoint("projects-btn", btnRef);
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
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-light tracking-tight mb-16 text-center"
          >
            <span className="relative inline-block px-8 py-4 z-20">
              <span
                className="absolute inset-0 bg-white/10 dark:bg-[#0a0a0a]/10 backdrop-blur-md -z-10 pointer-events-none"
                style={{
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                  maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                }}
              ></span>
              <span className="relative z-10 text-black dark:text-white">Featured Projects</span>
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => {
              const IconComponent = iconMap[project.icon];
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
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
                        className="flex items-center gap-2 text-sm hover:underline text-black dark:text-white relative z-20"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:underline text-black dark:text-white relative z-20"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={itemVariants} className="text-center relative">
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
