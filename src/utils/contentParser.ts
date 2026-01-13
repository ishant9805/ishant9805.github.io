// Content Parser Utility - Fetches and parses about_me.txt

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    positioning: string;
    tags: string[];
  };
  about: {
    summary: string;
  };
  skills: {
    programming: string[];
    backend: string[];
    frontend: string[];
    databases: string[];
    ai: string[];
    electrical: string[];
    devops: string[];
  };
  projects: {
    name: string;
    description: string;
    problem?: string;
    solution?: string;
    techStack: string[];
    features: string[];
  }[];
  research: string[];
  education: {
    institution: string;
    degree: string;
    cgpa?: string;
    focus?: string;
    achievements?: string[];
  }[];
  achievements: {
    category: string;
    items: string[];
  }[];
  contact: {
    email: string;
    linkedin: string;
    github: string[];
  };
  vision: string;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const response = await fetch('/about_me.txt');
    const text = await response.text();
    return parseContent(text);
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return getDefaultData();
  }
}

function parseContent(text: string): PortfolioData {
  const data: PortfolioData = getDefaultData();

  // Parse Hero Section
  data.hero.name = extractValue(text, 'Name', 'Ishant Kumar');
  data.hero.title = extractValue(text, 'Title', 'AI Engineer | Data Scientist | Full Stack Developer');
  data.hero.positioning = extractValue(text, 'Positioning Statement', 'Building intelligent systems at the intersection of AI, software engineering, and embedded technology.');
  data.hero.tags = [
    'Artificial Intelligence & Data Science',
    'Backend & Distributed Systems',
    'Robotics, IoT & Computer Vision'
  ];

  // Parse About Section
  const summaryMatch = text.match(/Professional Summary[\s\S]*?paragraph:[\s\S]*?(I am a Data Science[\s\S]*?)(?=\n\n3\. Skills)/i);
  const extractedSummary = summaryMatch?.[1]?.trim();
  if (extractedSummary) data.about.summary = extractedSummary;

  // Parse Skills
  data.skills = {
    programming: ['Python', 'Java', 'JavaScript', 'SQL', 'Bash'],
    backend: ['Flask', 'FastAPI', 'Django', 'Django REST Framework', 'JWT Authentication', 'Celery & Redis', 'REST & GraphQL'],
    frontend: ['Vue.js (v2 & v3)', 'Bootstrap 5', 'Tailwind CSS'],
    databases: ['PostgreSQL', 'MySQL', 'Redis'],
    ai: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Web Scraping & Data Pipelines', 'Prompt Engineering', 'Data Analysis'],
    electrical: ['Microprocessors (8085)', 'Embedded Systems', 'Sensors & Actuators', 'Robotics Systems', 'IoT Architectures'],
    devops: ['Linux (WSL)', 'Git & GitHub', 'Docker', 'CI/CD', 'System Design']
  };

  // Parse Projects
  data.projects = [
    {
      name: 'Quiz Master',
      description: 'A scalable online quiz and assessment platform with real-time evaluation and background task processing.',
      problem: 'Traditional quiz platforms fail to scale under high concurrency and lack real-time analytics.',
      solution: 'Built a distributed backend using asynchronous workers and caching layers.',
      techStack: ['Flask', 'Vue.js', 'Redis', 'Celery', 'PostgreSQL'],
      features: ['Role-based authentication', 'Real-time quiz evaluation', 'Async result processing', 'Caching for performance', 'Admin dashboard']
    },
    {
      name: 'HousyDousy',
      description: 'A service marketplace platform connecting users with verified home service professionals.',
      techStack: ['Flask', 'Bootstrap', 'PostgreSQL'],
      features: ['User & professional onboarding', 'Booking system', 'Admin management', 'Service tracking']
    },
    {
      name: 'Vispr',
      description: 'A modern media-sharing social platform with real-time interactions.',
      techStack: ['Django', 'Tailwind CSS', 'PostgreSQL'],
      features: ['Image & text sharing', 'Social interactions', 'User profiles', 'Feed system']
    },
    {
      name: 'Inventro',
      description: 'An enterprise-grade inventory and warehouse management backend.',
      techStack: ['Python', 'PostgreSQL', 'REST API'],
      features: ['Company & warehouse management', 'SKU & product tracking', 'Role-based access control', 'Audit trails', 'Order processing', 'Dispatch & logistics']
    },
    {
      name: 'Agentic AI API Platform',
      description: 'A deployable agentic AI platform for automated data sourcing, analysis, and visualization.',
      techStack: ['Python', 'AI/ML', 'REST API', 'Data Visualization'],
      features: ['Web scraping', 'Data cleaning', 'Automated analysis', 'Chart generation', 'JSON API responses']
    }
  ];

  // Parse Research Interests
  data.research = [
    'Artificial Intelligence & Deep Learning',
    'Computer Vision for Robotics',
    'Autonomous Systems',
    'Embedded AI',
    'Cyber-Physical Systems',
    'Optimization & Control',
    'Smart Infrastructure',
    'Edge Computing'
  ];

  // Parse Education
  data.education = [
    {
      institution: 'IIT Madras',
      degree: 'B.Sc. Data Science & Applications',
      cgpa: '9.41',
      achievements: ['Topper in 14 Subjects']
    },
    {
      institution: 'MMMUT',
      degree: 'B.Tech Electrical Engineering',
      focus: 'Microprocessors, Embedded Systems, Control Systems'
    }
  ];

  // Parse Achievements
  data.achievements = [
    {
      category: 'Academic',
      items: ['Topper in 14 IIT Madras subjects', 'Scholarship recipient']
    },
    {
      category: 'Coding',
      items: ['5★ Python on HackerRank', 'Master Rank on Code360 (12,306 XP)']
    },
    {
      category: 'Certifications',
      items: ['Harvard CS50', 'freeCodeCamp Full Stack Certification']
    }
  ];

  // Parse Contact
  data.contact = {
    email: 'ishant9805@gmail.com',
    linkedin: 'https://linkedin.com/in/ishantkumar9805',
    github: ['github.com/ishant9805', 'github.com/23f2001685']
  };

  // Parse Vision
  data.vision = 'My long-term goal is to build intelligent cyber-physical systems that combine AI, robotics, and embedded engineering to solve real-world problems in infrastructure, healthcare, and automation. I am currently building AI-first platforms, learning advanced control systems, and preparing for research internships in applied AI and robotics.';

  return data;
}

function extractValue(text: string, key: string, defaultValue: string): string {
  const regex = new RegExp(`${key}\\s*[:\\n]\\s*([^\\n]+)`, 'i');
  const match = text.match(regex);
  const captured = match?.[1]?.trim();
  return captured ?? defaultValue;
}

function getDefaultData(): PortfolioData {
  return {
    hero: {
      name: 'Ishant Kumar',
      title: 'AI Engineer | Data Scientist | Full Stack Developer | Electrical Engineer',
      positioning: 'Building intelligent systems at the intersection of AI, software engineering, and embedded technology.',
      tags: ['Artificial Intelligence & Data Science', 'Backend & Distributed Systems', 'Robotics, IoT & Computer Vision']
    },
    about: {
      summary: 'I am a Data Science and Applications student at IIT Madras with a strong foundation in Electrical Engineering from MMMUT. I specialize in backend engineering, AI-driven systems, and data-intensive applications.'
    },
    skills: {
      programming: ['Python', 'Java', 'JavaScript', 'SQL', 'Bash'],
      backend: ['Flask', 'FastAPI', 'Django', 'REST & GraphQL'],
      frontend: ['Vue.js', 'Bootstrap 5', 'Tailwind CSS'],
      databases: ['PostgreSQL', 'MySQL', 'Redis'],
      ai: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
      electrical: ['Microprocessors', 'Embedded Systems', 'IoT'],
      devops: ['Linux', 'Git & GitHub', 'Docker', 'CI/CD']
    },
    projects: [],
    research: [],
    education: [],
    achievements: [],
    contact: {
      email: 'ishant9805@gmail.com',
      linkedin: 'https://linkedin.com/in/ishantkumar9805',
      github: ['github.com/ishant9805']
    },
    vision: ''
  };
}
