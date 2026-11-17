export interface IslandStop {
  id: string;
  index: number;
  label: string;
  shortLabel: string;
  subtitle: string;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  islandPos: [number, number, number];
  environment: 'day' | 'golden' | 'sunset';
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  architectureType: 'swifthr' | 'manamaalai' | 'agency' | 'counterfeit' | 'zenvia';
  tags: string[];
  highlights: string[];
  accentColor: string;
  secondaryColor: string;
  previewType: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  subtitle: string;
  color: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  category: 'Education' | 'Internship' | 'Development' | 'AI & Research';
  description: string;
  skills: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconType: 'ai-web' | 'fullstack' | 'ai-integration' | 'webapp' | 'uiux' | 'automation';
}

export const ISLAND_STOPS: IslandStop[] = [
  {
    id: 'world',
    index: 0,
    label: 'World Overview',
    shortLabel: 'World',
    subtitle: 'Interactive 3D Archipelago',
    cameraPos: [0, 14.5, 29],
    cameraTarget: [0, 1.5, 0],
    islandPos: [0, 0, 0],
    environment: 'day',
  },
  {
    id: 'hero',
    index: 1,
    label: 'Home Island',
    shortLabel: 'Home',
    subtitle: 'Mekha M. — AI Web Developer',
    cameraPos: [-5.2, 6.2, 18.5],
    cameraTarget: [-1.8, 1.8, 2.5],
    islandPos: [-6.8, -1.2, 8.8],
    environment: 'day',
  },
  {
    id: 'about',
    index: 2,
    label: 'Origin — About Island',
    shortLabel: 'About',
    subtitle: 'Personal Introduction & Story',
    cameraPos: [-48, 4.8, 15.5],
    cameraTarget: [-48, 2.0, 0],
    islandPos: [-48, 0, 0],
    environment: 'day',
  },
  {
    id: 'skills',
    index: 3,
    label: 'Creative Lab — Skills Island',
    shortLabel: 'Skills',
    subtitle: 'Full Stack & AI Technology Ecosystem',
    cameraPos: [0, 6.2, -36.5],
    cameraTarget: [0, 2.3, -52],
    islandPos: [0, 0, -52],
    environment: 'day',
  },
  {
    id: 'projects',
    index: 4,
    label: 'Projects Archipelago',
    shortLabel: 'Projects',
    subtitle: '5 Featured Engineering & AI Systems',
    cameraPos: [56, 5.2, 19.5],
    cameraTarget: [56, 1.6, 0],
    islandPos: [56, 0, 0],
    environment: 'day',
  },
  {
    id: 'experience',
    index: 5,
    label: 'Career & Experience Island',
    shortLabel: 'Experience',
    subtitle: 'Education, Internships & Technical Journey',
    cameraPos: [-48, 5.6, -35.5],
    cameraTarget: [-48, 2.0, -50],
    islandPos: [-48, 0, -50],
    environment: 'golden',
  },
  {
    id: 'services',
    index: 6,
    label: 'Experiments & Services Island',
    shortLabel: 'Services',
    subtitle: 'AI Web Solutions & Engineering Capabilities',
    cameraPos: [48, 5.8, -34.5],
    cameraTarget: [48, 2.2, -50],
    islandPos: [48, 0, -50],
    environment: 'golden',
  },
  {
    id: 'contact',
    index: 7,
    label: 'Sunset Lighthouse — Contact',
    shortLabel: 'Contact',
    subtitle: "Have an Idea? Let's Build It.",
    cameraPos: [1.5, 4.6, 65.5],
    cameraTarget: [1.5, 2.2, 50],
    islandPos: [0, 0, 50],
    environment: 'sunset',
  },
];

export const BRAND_DATA = {
  name: 'MEKHA M.',
  displayName: 'Mekha M.',
  role: 'AI Web Developer | Full Stack Developer',
  heroRoleBadge: 'AI WEB DEVELOPER',
  brandIntroduction:
    'I build intelligent digital experiences by combining creativity, technology and artificial intelligence.',
  heroTagline: 'Turning Ideas Into Intelligent Digital Experiences.',
  ctaLabel: 'EXPLORE MY WORLD',
  audiences: [
    'Software companies & recruiters',
    'International freelance clients',
    'Startups & entrepreneurs',
    'Businesses seeking AI-powered web solutions',
  ],
  aboutHeading: "Hello, I'm Mekha.",
  aboutParagraphs: [
    'An aspiring AI Web Developer passionate about building modern applications, intelligent systems and creative digital experiences.',
    'I enjoy transforming real-world problems into practical technology solutions.',
  ],
  aboutTraits: ['Curious', 'Creative', 'Problem Solver'],
  verifiedHighlights: [
    {
      value: '5',
      label: 'Featured AI & Web Platforms',
      detail: 'SwiftHR, Manamaalai, AI Agency OS, Counterfeit Vision & Zenvia',
    },
    {
      value: '4',
      label: 'Core Tech Domains',
      detail: 'Frontend, Backend, Relational Databases & AI Engineering',
    },
    {
      value: '6',
      label: 'Specialized Services',
      detail: 'End-to-end AI Web Development to Workflow Automation',
    },
  ],
  careerInterests: [
    'AI-Native Web Applications',
    'Full Stack Product Engineering',
    'Intelligent Workflow Automation',
    'Computer Vision & Applied AI',
    'Interactive 3D & Modern UI/UX',
  ],
  contact: {
    heading: "HAVE AN IDEA?\nLET'S BUILD IT.",
    subtext:
      'Available for full-time software engineering roles, international freelance collaborations, and custom AI web platforms.',
    email: 'mekha.dev@gmail.com',
    linkedin: 'https://linkedin.com/in/mekha-m',
    linkedinDisplay: 'linkedin.com/in/mekha-m',
    github: 'https://github.com/mekha-m',
    githubDisplay: 'github.com/mekha-m',
  },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    category: 'Frontend Architecture',
    subtitle: 'Interactive UI & Modern Web',
    color: '#2dd4bf',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    category: 'Backend Engineering',
    subtitle: 'Scalable Logic & APIs',
    color: '#38bdf8',
    skills: ['Java', 'Python', 'REST APIs', 'JDBC'],
  },
  {
    id: 'database',
    category: 'Database Systems',
    subtitle: 'Structured Data & Queries',
    color: '#fbbf24',
    skills: ['MySQL', 'SQL'],
  },
  {
    id: 'ai-tools',
    category: 'AI & Developer Tools',
    subtitle: 'Intelligent Workflows & Version Control',
    color: '#f472b6',
    skills: ['AI Integration', 'Prompt Engineering', 'Git', 'GitHub', 'VS Code'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'swifthr',
    number: 'PROJECT 01',
    title: 'SWIFTHR',
    subtitle: 'Enterprise HRMS & Payroll Automation Platform',
    description:
      'HRMS platform with employee management, attendance, payroll and HR automation.',
    architectureType: 'swifthr',
    tags: ['React', 'TypeScript', 'Java', 'MySQL', 'REST APIs', 'Tailwind CSS'],
    highlights: [
      'Centralized employee directory, onboarding workflows, and role-based access control',
      'Real-time attendance tracking, shift scheduling, and leave approval pipelines',
      'Automated payroll calculation engine with compliance reporting and payslip generation',
      'Interactive HR analytics dashboard for workforce insights',
    ],
    accentColor: '#38bdf8',
    secondaryColor: '#0284c7',
    previewType: 'HRMS Dashboard & Workforce Telemetry',
  },
  {
    id: 'manamaalai',
    number: 'PROJECT 02',
    title: 'MANAMAALAI',
    subtitle: 'Modern Matrimony & Matchmaking Platform',
    description:
      'Matrimony platform with profile management, horoscope matching and subscription features.',
    architectureType: 'manamaalai',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Java', 'MySQL', 'REST APIs'],
    highlights: [
      'Rich multi-step profile management with preference filtering and privacy controls',
      'Automated astrological & horoscope compatibility matching module',
      'Tiered membership & subscription workflow with secure account management',
      'Responsive, culturally tailored user experience for families and individuals',
    ],
    accentColor: '#f472b6',
    secondaryColor: '#db2777',
    previewType: 'Profile Discovery & Compatibility Engine',
  },
  {
    id: 'ai-agency-os',
    number: 'PROJECT 03',
    title: 'AI AGENCY OS',
    subtitle: 'Intelligent Agency Operations & Workflow Suite',
    description:
      'AI-powered agency management platform for clients, projects and business workflows.',
    architectureType: 'agency',
    tags: ['Next.js', 'TypeScript', 'Python', 'AI Integration', 'Prompt Engineering', 'Tailwind CSS'],
    highlights: [
      'Unified command center for managing client portals, deliverables, and project sprints',
      'AI-assisted brief generation, task breakdown, and status summarization',
      'Automated workflow pipelines connecting client intake to delivery milestones',
      'Modular workspace designed for modern digital and AI agencies',
    ],
    accentColor: '#2dd4bf',
    secondaryColor: '#0d9488',
    previewType: 'AI Command Center & Client Pipeline',
  },
  {
    id: 'ai-counterfeit',
    number: 'PROJECT 04',
    title: 'AI COUNTERFEIT DETECTION',
    subtitle: 'Computer Vision Product Authentication System',
    description:
      'Computer vision-based counterfeit product detection system.',
    architectureType: 'counterfeit',
    tags: ['Python', 'AI Integration', 'React', 'REST APIs', 'Computer Vision', 'SQL'],
    highlights: [
      'Visual inspection pipeline analyzing packaging, logos, and structural patterns',
      'Automated anomaly detection comparing uploaded product scans against authentic references',
      'Real-time confidence classification and visual verification reporting interface',
      'Designed to protect supply chains and consumers from counterfeit goods',
    ],
    accentColor: '#a78bfa',
    secondaryColor: '#7c3aed',
    previewType: 'Visual Inspection & Authenticity Scanner',
  },
  {
    id: 'zenvia',
    number: 'PROJECT 05',
    title: 'ZENVIA',
    subtitle: 'Next-Gen AI Workflow Automation Concept',
    description:
      'AI automation platform concept.',
    architectureType: 'zenvia',
    tags: ['React', 'Next.js', 'TypeScript', 'AI Integration', 'Prompt Engineering', 'Tailwind CSS'],
    highlights: [
      'Node-based visual automation concept orchestrating multi-step AI tasks',
      'Intelligent prompt chaining and webhook integration architecture',
      'Clean glassmorphic control surface for monitoring autonomous task execution',
      'Built to streamline repetitive business and engineering operations',
    ],
    accentColor: '#34d399',
    secondaryColor: '#059669',
    previewType: 'Autonomous Workflow Node Orchestrator',
  },
];

export const DEFAULT_EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: 'Present',
    title: 'AI Web Developer & Full Stack Builder',
    organization: 'Independent Product & Portfolio Engineering',
    category: 'AI & Research',
    description:
      'Architecting intelligent web applications including AI Agency OS, Zenvia automation concepts, and computer vision counterfeit detection systems using React, Next.js, TypeScript, Python, and AI integrations.',
    skills: ['React', 'Next.js', 'TypeScript', 'Python', 'AI Integration', 'Prompt Engineering'],
  },
  {
    id: 'exp-2',
    period: 'Full Stack Development',
    title: 'Full Stack Application Engineering',
    organization: 'Enterprise & Platform Projects (SwiftHR & Manamaalai)',
    category: 'Development',
    description:
      'Designed and developed end-to-end web platforms featuring HRMS payroll/attendance automation and matrimony profile/horoscope matching backed by Java, JDBC, REST APIs, and MySQL.',
    skills: ['Java', 'JDBC', 'REST APIs', 'MySQL', 'SQL', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'exp-3',
    period: 'Technical Training & Internships',
    title: 'Software Engineering & Web Development Practice',
    organization: 'Hands-On Industry & Academic Training',
    category: 'Internship',
    description:
      'Focused on object-oriented programming in Java & Python, relational database design in SQL/MySQL, version control with Git & GitHub, and modern responsive frontend engineering.',
    skills: ['Java', 'Python', 'SQL', 'Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'exp-4',
    period: 'Academic Foundation',
    title: 'Computer Science & Engineering Education',
    organization: 'University / Academic Curriculum',
    category: 'Education',
    description:
      'Built a strong foundation in algorithms, software engineering, database management systems, web technologies, and applied artificial intelligence. (Click "Edit Timeline" to customize your exact degree & dates!)',
    skills: ['Software Engineering', 'DBMS', 'Web Technologies', 'AI Fundamentals'],
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-01',
    number: '01',
    title: 'AI Web Development',
    subtitle: 'Intelligent Modern Web Platforms',
    description:
      'Building next-generation web applications infused with AI capabilities, smart interfaces, and responsive performance.',
    deliverables: ['AI-Powered Web Apps', 'Interactive Dashboards', 'Next.js & React Architectures'],
    iconType: 'ai-web',
  },
  {
    id: 'srv-02',
    number: '02',
    title: 'Full Stack Development',
    subtitle: 'End-to-End Frontend & Backend Systems',
    description:
      'Complete application engineering from responsive React/Next.js frontends to robust Java, Python, and MySQL backends.',
    deliverables: ['RESTful API Design', 'Database Schema & SQL', 'Authentication & Role Systems'],
    iconType: 'fullstack',
  },
  {
    id: 'srv-03',
    number: '03',
    title: 'AI Integration',
    subtitle: 'LLMs, Vision & Smart Features',
    description:
      'Embedding large language models, prompt-engineered assistants, and computer vision pipelines into existing or new products.',
    deliverables: ['Custom AI Assistants', 'Prompt Engineering', 'Vision & Classification APIs'],
    iconType: 'ai-integration',
  },
  {
    id: 'srv-04',
    number: '04',
    title: 'Web Application Development',
    subtitle: 'Custom SaaS & Business Portals',
    description:
      'Developing tailored business platforms like HRMS suites, client portals, and subscription-based web products.',
    deliverables: ['SaaS Platforms', 'Enterprise Portals', 'Scalable Web Systems'],
    iconType: 'webapp',
  },
  {
    id: 'srv-05',
    number: '05',
    title: 'UI/UX Implementation',
    subtitle: 'Immersive 3D & Pixel-Perfect Frontends',
    description:
      'Translating ambitious visual concepts into smooth, interactive 3D and 2D web experiences with Tailwind CSS and Three.js.',
    deliverables: ['3D Web Experiences', 'Design-to-Code Execution', 'Micro-Interactions & Motion'],
    iconType: 'uiux',
  },
  {
    id: 'srv-06',
    number: '06',
    title: 'Workflow Automation',
    subtitle: 'Streamlined Business & AI Pipelines',
    description:
      'Automating repetitive operational tasks, data processing, and multi-step business logic with intelligent workflows.',
    deliverables: ['Process Automation', 'API Orchestration', 'Automated Reporting'],
    iconType: 'automation',
  },
];
