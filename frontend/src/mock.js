export const personalInfo = {
  name: "Rushaan Nayyar",
  title: "AI/ML Developer & Computer Science Student",
  bio: "I am a Computer Science (AI/ML) undergraduate at VIT Chennai passionate about building scalable, production-grade applications. I thrive in taking full ownership of complex engineering challenges and transforming ambiguous requirements into reliable, real-world solutions. My focus is on creating software that delivers measurable impact.",
  email: "nayyarrushaan@gmail.com",
  github: "https://github.com/Rushorgir?tab=repositories",
  linkedin: "https://www.linkedin.com/in/rushaan-nayyar",
  education: {
    institution: "VIT Chennai",
    degree: "Computer Science",
    year: "Second Year",
  },
  languages: ["English", "Hindi", "German"],
  careerGoal:
    "I actively participate in hackathons and contribute to open-source communities to continuously refine my skills. My goal is to leverage my expertise in AI/ML and full-stack development to build innovative products that solve meaningful problems at scale.",
};

export const projects = [
  {
    id: 1,
    title: "Zenly",
    description:
      "AI-powered journaling system for mental health support and emotional well-being for students in higher education",
    longDescription:
      "An intelligent journaling platform that uses machine learning to provide personalized mental health insights and emotional support through natural language processing.",
    icon: "BookOpen",
    technologies: ["JavaScript", "React", "PostgreSQL"],
    githubUrl: "https://github.com/Rushorgir/Zenly-SIH",
    liveUrl: null,
  },
  {
    id: 2,
    title: "OD-Calculator",
    description:
      "A tool designed to help VIT Chennai students easily calculate and manage their on-duty hours.",
    longDescription:
      "A web application built to assist VIT Chennai students in calculating and managing their on-duty hours. It features a secure login system backed by PostgreSQL and is hosted on Vercel.",
    icon: "BookOpen",
    technologies: ["JavaScript", "PostgreSQL", "Vercel"],
    githubUrl: "https://github.com/Rushorgir/OD-Calculator",
    liveUrl: "https://od-calculator-one.vercel.app/",
  },
  {
    id: 3,
    title: "Hermes",
    description:
      "AI-powered multilingual translator that solves the nuance problem in machine translation by preserving the implied meaning",
    longDescription:
      "Advanced translation system using deep learning to maintain contextual meaning, idiomatic expressions, and cultural nuances across multiple languages.",
    icon: "Languages",
    technologies: ["Python", "HTML/CSS/JS", "Ollama", "NLP"],
    githubUrl: "https://github.com/Rushorgir/Hermes",
    liveUrl: null,
  },
];

export const skills = {
  languages: [
    { name: "Python", icon: "Code2" },
    { name: "C", icon: "FileCode" },
    { name: "C++", icon: "FileCode" },
    { name: "JavaScript", icon: "FileCode" },
    { name: "TypeScript", icon: "FileCode" },
  ],
  frontend: [
    { name: "React", icon: "Component" },
    { name: "Next.js", icon: "Layout" },
    { name: "HTML", icon: "Layout" },
    { name: "CSS", icon: "Palette" },
  ],
  backend: [
    { name: "Node.js", icon: "Server" },
    { name: "Express.js", icon: "Server" },
    { name: "Flask", icon: "Server" },
  ],
  database: [
    { name: "MongoDB", icon: "Database" },
    { name: "PostgreSQL", icon: "Database" },
    { name: "SQL", icon: "Database" },
  ],
  tools: [
    { name: "Git", icon: "Code" },
    { name: "GitHub", icon: "Github" },
    { name: "Vercel", icon: "Globe" },
    { name: "Ollama", icon: "Brain" },
    { name: "Supabase", icon: "Database" },
  ],
};

export const experience = [
  {
    id: 1,
    year: "June 2026",
    title: "SDE Intern",
    organization: "Manipal Business Solutions",
    description: [
      "Developed and optimized AI-powered bots calling on-field agents and customers, directly impacting over 10,000 users regularly.",
      "Conducted rigorous quality assurance and identified critical bugs in deployed applications and websites.",
      "Engineered automated testing scripts to streamline the QA process for web and mobile platforms.",
    ],
  },
  {
    id: 2,
    year: "2025 - Present",
    title: "Open Source Developer",
    organization: "GitHub Community and College Events",
    description: [
      "Contributing to open-source projects and building impactful solutions through hackathons.",
      "Participated in Smart India Hackathon 2025, where I developed Zenly.",
      "Participated in HacktoberFest 2025, reaching the maximum contributions milestone of 6+ contributions.",
    ],
  },
  {
    id: 3,
    year: "2025 - Present",
    title: "AI/ML Core Member",
    organization: "HackClub & OSPC, VIT Chennai",
    description: [
      "Active member of the AI/ML department of HackClub and Open Source department of OSPC, two of VIT Chennai's top-ranked technical clubs.",
      "Organizing hackathons and technical events with HackClub to foster innovation and collaboration.",
      "Secured a Top 4 finish in OSPC’s Inter-Club Machine Learning Competition.",
    ],
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    icon: "Github",
    url: "https://github.com/Rushorgir",
  },
  {
    name: "LinkedIn",
    icon: "Linkedin",
    url: "https://www.linkedin.com/in/rushaan-nayyar-177105379/",
  },
  {
    name: "Email",
    icon: "Mail",
    url: "mailto:nayyarrushaan@gmail.com",
  },
];
