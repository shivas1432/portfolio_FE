// portfolioData.jsx - Comprehensive Portfolio Information
import React from 'react';

export const portfolioData = {
  // Personal Information
  personalInfo: {
    fullName: "Kanugula Shivashanker",
    firstName: "Shivashanker",
    nicknames: ["Shiva", "Shanker"],
    title: "Full-Stack Web Developer",
    location: "Cardiff, UK (CF11 6JE)",
    experience: "3+ years in web development and data analysis",
    
    // Contact Information
    contact: {
      email: "shivashanker7337@gmail.com",
      phone: "07867034729",
      linkedin: "https://www.linkedin.com/in/shivashanker-kanugula-51a512252",
      github: "https://github.com/shivas1432",
      portfolio: "https://shivashankerportfolio.netlify.app",
      instagram: "https://www.instagram.com/ss_web_servicess",
      telegram: "https://t.me/helpme_coder",
      personalWebsite: "https://www.shivashanker.com"
    },
    
    // Professional Summary
    summary: "I'm a passionate full-stack web developer who thrives on building scalable applications with React, Node.js, Express, and MySQL. My expertise lies in creating high-performance solutions that handle real-world demands, with deep experience in API integrations and authentication systems like OAuth 2.0 and JWT. I've deployed projects across various cloud platforms including GCP, AWS, Netlify, and Render, always focusing on optimal performance and user experience.",
    
    // Key Highlights
    highlights: [
      "Reduced server response times by 40% through backend optimizations",
      "Achieved 3x higher concurrent user capacity in production systems", 
      "Increased user engagement metrics by 25% through API integrations",
      "Improved database query performance by 60%",
      "Decreased system downtime by 35% through comprehensive testing",
      "Built 20+ interactive UI projects with focus on responsive design",
      "Successfully deployed projects on multiple cloud platforms"
    ]
  },

  // Technical Skills (Organized by proficiency levels)
  skills: {
    frontend: {
      expert: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js"],
      advanced: ["Bootstrap", "jQuery", "SASS/SCSS", "EJS", "Responsive Design", "Tailwind CSS"],
      intermediate: ["UI/UX Design", "Cross-browser Compatibility", "Material-UI", "Styled Components"]
    },
    backend: {
      expert: ["Node.js", "Express.js", "RESTful APIs"],
      advanced: ["Python", "Django", "Flask", "Microservices Architecture"],
      intermediate: ["API Integration", "Server Optimization", "GraphQL", "Socket.io"]
    },
    database: {
      expert: ["MySQL", "MongoDB"],
      advanced: ["Database Architecture", "Query Optimization", "Data Modeling"],
      intermediate: ["PostgreSQL", "Firebase Firestore", "Cloud SQL", "Redis"]
    },
    cloud: {
      expert: ["Google Cloud Platform (GCP)", "Netlify"],
      advanced: ["AWS (EC2, S3)", "Render", "Vercel"],
      intermediate: ["Heroku", "InfinityFree", "Firebase Hosting", "Docker"]
    },
    security: {
      expert: ["Passport.js", "JSON Web Tokens (JWT)", "OAuth 2.0"],
      advanced: ["bcrypt", "Authentication Systems", "Session Management"],
      intermediate: ["Cybersecurity Fundamentals", "Data Encryption", "HTTPS/SSL"]
    },
    tools: {
      expert: ["Git", "GitHub", "Visual Studio Code", "NPM"],
      advanced: ["Postman", "Power BI", "Tableau", "Webpack"],
      intermediate: ["Excel", "SQL Workbench", "Docker", "Jenkins"]
    },
    programming: {
      expert: ["JavaScript", "Python"],
      advanced: ["SQL", "VBA", "TypeScript"],
      intermediate: ["Java", "C/C++", "PHP"]
    }
  },

  // Detailed Project Portfolio
  projects: [
    {
      id: 1,
      name: "Real-Time Car Wash Booking Web Application",
      type: "Full-Stack Web Application",
      description: "A comprehensive car wash platform featuring manual and Google login, secure payment processing, and real-time booking capabilities with AI-powered customer assistance.",
      
      technologies: {
        frontend: ["React", "CSS3", "Bootstrap"],
        backend: ["Node.js", "Express.js"],
        database: ["Cloud SQL", "MySQL"],
        authentication: ["OAuth 2.0", "Google APIs", "JWT"],
        hosting: ["Firebase Hosting", "Render"],
        additional: ["AI Integration", "Payment Gateway"]
      },
      
      features: [
        "Dual authentication system (Manual registration & Google OAuth)",
        "Comprehensive user profiles with multiple vehicle management",
        "Real-time booking system with date/time/service selection",
        "AI-powered chatbot for service information and customer support",
        "Complete booking history tracking and customer review system",
        "Multi-channel help center with FAQ and live support",
        "Fully responsive UI optimized for all devices",
        "Secure payment processing with multiple payment options",
        "Admin dashboard for booking and service management",
        "Automated email notifications and SMS alerts"
      ],
      
      keyAchievements: [
        "Implemented real-time booking system handling 100+ concurrent users",
        "Integrated AI chatbot reducing customer service inquiries by 60%",
        "Achieved 99.9% uptime with robust error handling",
        "Optimized database queries for sub-second response times"
      ],
      
      challenges: [
        "Real-time booking conflict resolution",
        "AI chatbot training for domain-specific queries",
        "Secure payment gateway integration",
        "Multi-device responsive design optimization"
      ],
      
      learnings: [
        "Advanced React patterns for real-time applications",
        "AI integration and natural language processing",
        "Payment system architecture and security",
        "Real-time data synchronization techniques"
      ],
      
      urls: {
        live: "Available on request (Demo available)",
        github: "https://github.com/shivas1432",
        documentation: "Available on request"
      },
      
      status: "Completed & Production Ready",
      duration: "4 months",
      teamSize: "Solo Developer",
      impact: "Streamlined car wash booking process for 500+ users"
    },

    {
      id: 2,
      name: "Personal Portfolio & Interactive Resume",
      type: "Dynamic Portfolio Website",
      description: "A sophisticated, self-updating portfolio website featuring real-time customization, admin dashboard, and AI-powered visitor assistance with comprehensive project showcases.",
      
      technologies: {
        frontend: ["React", "CSS3", "JavaScript"],
        backend: ["Node.js", "Express.js"],
        database: ["SQL", "MySQL"],
        apis: ["Weather API", "News APIs", "Google APIs"],
        authentication: ["OAuth 2.0", "JWT"],
        hosting: ["Netlify", "Render"],
        additional: ["AI Chatbot Integration", "Real-time Data"]
      },
      
      features: [
        "Self-updating portfolio with comprehensive admin dashboard",
        "Dynamic light/dark mode with user preference persistence",
        "Time-based personalized greetings and seasonal themes",
        "Live weather updates integrated with location services",
        "AI-powered chatbot for intelligent visitor support and queries",
        "Seamless Google OAuth and manual registration system",
        "Live news feed integration with personalized content",
        "Dynamic background customization with multiple themes",
        "Complete CRUD operations for portfolio management",
        "Advanced contact form with automated email responses",
        "Performance analytics and visitor tracking dashboard",
        "SEO optimization with meta tags and structured data"
      ],
      
      keyAchievements: [
        "Achieved 95+ Google PageSpeed score for performance",
        "Implemented AI chatbot answering 90% of visitor queries",
        "Integrated real-time data from 5+ external APIs",
        "Created responsive design working across 15+ device types"
      ],
      
      challenges: [
        "AI chatbot integration for portfolio-specific queries",
        "Real-time data synchronization from multiple APIs",
        "Cross-browser compatibility and performance optimization",
        "SEO optimization for dynamic content"
      ],
      
      learnings: [
        "Advanced AI integration patterns",
        "Real-time data management with React hooks",
        "Performance optimization techniques",
        "Modern web development best practices"
      ],
      
      urls: {
        live: "https://shivashankerportfolio.netlify.app",
        github: "https://github.com/shivas1432",
        admin: "Available for demonstration"
      },
      
      status: "Live & Continuously Updated",
      duration: "3 months (Ongoing maintenance)",
      teamSize: "Solo Developer",
      impact: "Professional online presence attracting 1000+ monthly visitors"
    },

    {
      id: 3,
      name: "Vapeshop Offlicense E-commerce Platform",
      type: "E-commerce Web Application",
      description: "A modern e-commerce platform specifically designed for vape products with secure payment integration, inventory management, and comprehensive order processing.",
      
      technologies: {
        frontend: ["React", "CSS3", "Bootstrap"],
        backend: ["Node.js", "Express.js"],
        database: ["MongoDB", "MySQL"],
        authentication: ["OAuth 2.0", "Google APIs", "JWT"],
        hosting: ["Firebase Hosting", "Render"],
        additional: ["Payment Gateway", "Inventory Management"]
      },
      
      features: [
        "Comprehensive product catalog with advanced filtering",
        "Shopping cart with persistent state management",
        "Secure user authentication and profile management",
        "Multiple payment gateway integration",
        "Real-time inventory tracking and management",
        "Order processing and tracking system",
        "Customer review and rating system",
        "Admin dashboard for product and order management",
        "Responsive design for mobile commerce",
        "Email notifications for order updates"
      ],
      
      challenges: [
        "E-commerce security and payment processing",
        "Real-time inventory synchronization",
        "Complex product catalog management",
        "Mobile-first responsive design"
      ],
      
      learnings: [
        "E-commerce architecture patterns",
        "Payment gateway integration",
        "Inventory management systems",
        "Mobile commerce optimization"
      ],
      
      urls: {
        live: "In Development",
        github: "https://github.com/shivas1432",
        demo: "Available on request"
      },
      
      status: "In Development (70% Complete)",
      duration: "2 months (Ongoing)",
      teamSize: "Solo Developer",
      impact: "Creating digital commerce solution for local business"
    },

    {
      id: 4,
      name: "Polyhouse Market Agricultural Platform",
      type: "Marketplace Web Application",
      description: "An innovative agricultural marketplace platform connecting greenhouse farmers with buyers, featuring product listings, communication systems, and market analytics.",
      
      technologies: {
        frontend: ["React", "CSS3", "JavaScript"],
        backend: ["Node.js", "Express.js"],
        database: ["MongoDB", "MySQL"],
        authentication: ["OAuth 2.0", "Google APIs"],
        hosting: ["Firebase Hosting", "Render"],
        additional: ["Market Analytics", "Communication System"]
      },
      
      features: [
        "Dual-sided marketplace for farmers and buyers",
        "Comprehensive farmer and buyer profile management",
        "Advanced product listing with image galleries",
        "In-app communication and negotiation system",
        "Market price analytics and trend tracking",
        "Order management and delivery coordination",
        "Rating and review system for trust building",
        "Mobile-responsive design for field use",
        "Agricultural calendar and seasonal insights",
        "Multi-language support for diverse users"
      ],
      
      challenges: [
        "Understanding agricultural market dynamics",
        "Building trust between farmers and buyers",
        "Mobile optimization for field conditions",
        "Real-time price tracking and analytics"
      ],
      
      learnings: [
        "Agricultural technology domain knowledge",
        "Marketplace development patterns",
        "Rural user experience design",
        "Agricultural data analytics"
      ],
      
      urls: {
        live: "In Development",
        github: "https://github.com/shivas1432",
        prototype: "Available for demonstration"
      },
      
      status: "In Development (60% Complete)",
      duration: "2 months (Ongoing)",
      teamSize: "Solo Developer",
      impact: "Digitizing agricultural marketplace for 200+ farmers"
    },

    {
      id: 5,
      name: "Frontend Development Showcase",
      type: "UI/UX Design Collection",
      description: "A comprehensive collection of 20+ interactive UI projects demonstrating advanced frontend capabilities, animations, and responsive design principles.",
      
      technologies: {
        frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "SCSS"],
        templating: ["EJS"],
        tools: ["Webpack", "Sass", "Git"],
        design: ["Figma", "Adobe XD"],
        additional: ["CSS Animations", "Interactive Elements"]
      },
      
      projects: [
        "Modern landing pages with smooth scroll animations",
        "Interactive dashboards with real-time data visualization",
        "Responsive e-commerce product showcases",
        "Advanced form validation with custom styling",
        "CSS Grid and Flexbox layout demonstrations",
        "Mobile-first responsive design templates",
        "Cross-browser compatible components",
        "Accessibility-focused UI elements",
        "Performance-optimized animation libraries",
        "Modern CSS techniques and methodologies"
      ],
      
      keyAchievements: [
        "Created 20+ unique, reusable UI components",
        "Achieved 100% cross-browser compatibility",
        "Optimized animations for 60fps performance",
        "Implemented WCAG 2.1 accessibility standards"
      ],
      
      challenges: [
        "Cross-browser compatibility optimization",
        "Performance optimization for complex animations",
        "Responsive design across diverse devices",
        "Accessibility compliance implementation"
      ],
      
      learnings: [
        "Advanced CSS animation techniques",
        "Responsive design methodologies",
        "Performance optimization strategies",
        "Modern frontend development patterns"
      ],
      
      urls: {
        live: "Multiple demos available",
        github: "https://github.com/shivas1432",
        showcase: "Integrated in portfolio website"
      },
      
      status: "Completed & Expanding",
      duration: "6 months",
      teamSize: "Solo Developer",
      impact: "Demonstrates versatility in frontend development"
    }
  ],

  // Education Details
  education: {
    masters: {
      degree: "Master of Science in Advanced Computer Science",
      university: "Cardiff Metropolitan University",
      location: "Cardiff, UK",
      period: "September 2022 – January 2024",
      grade: "65% (Merit)",
      credits: "180/180 Credits",
      
      coursework: [
        "Advanced Software Engineering",
        "Machine Learning and AI",
        "Cloud Computing and Distributed Systems",
        "Cybersecurity and Network Defense",
        "Data Analytics and Visualization",
        "Mobile Application Development",
        "Project Management and Agile Methodologies"
      ],
      
      projects: [
        "Location Privacy in Mobile Cloud Computing",
        "Geospatial Analysis using Python and ArcGIS",
        "End-User Computing Risk Management",
        "AI-powered Web Application Development"
      ],
      
      achievements: [
        "Merit classification with 65% overall grade",
        "Completed advanced research project on mobile cloud security",
        "Gained expertise in cutting-edge technologies",
        "Developed strong analytical and problem-solving skills"
      ]
    },
    
    bachelors: {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      university: "Vaagdevi Engineering College",
      location: "Warangal, India",
      period: "August 2016 – December 2020",
      grade: "6.7/10 CGPA",
      
      coursework: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Technologies",
        "Operating Systems"
      ],
      
      projects: [
        "Web-based Student Management System",
        "E-commerce Application using Java",
        "Database Design for Inventory Management",
        "Network Security Implementation"
      ],
      
      achievements: [
        "Strong foundation in computer science fundamentals",
        "Completed multiple programming projects",
        "Active participation in coding competitions",
        "Leadership roles in technical societies"
      ]
    },
    
    intermediate: {
      institution: "SR Junior College",
      stream: "Mathematics, Physics, Chemistry (MPC)",
      year: "2016",
      grade: "94%",
      location: "Telangana, India"
    },
    
    secondary: {
      school: "Little Soldier Concept School",
      year: "2014",
      grade: "9.5/10 CGPA",
      location: "Telangana, India"
    }
  },

  // Professional Experience
  experience: [
    {
      id: 1,
      company: "Infinite Tech Solutions",
      location: "Pune, India",
      position: "Backend Developer",
      duration: "January 2021 – June 2022",
      type: "Full-time",
      
      responsibilities: [
        "Architected robust backend systems using Node.js, Express.js, and Python frameworks (Django, Flask)",
        "Implemented performance optimizations that reduced server response times by 40% and enabled 3x higher concurrent user capacity",
        "Designed and integrated RESTful APIs connecting web and mobile platforms seamlessly, driving a 25% increase in user engagement metrics",
        "Led MySQL database architecture initiatives with focus on optimization strategies, achieving 60% improvement in query performance",
        "Partnered with cross-functional teams to deliver end-to-end solutions, conducting comprehensive testing and troubleshooting that decreased system downtime by 35%",
        "Mentored junior developers in best practices for backend development",
        "Implemented security measures including authentication and data protection protocols"
      ],
      
      technologies: ["Node.js", "Express.js", "Python", "Django", "Flask", "MySQL", "MongoDB", "RESTful APIs", "JWT", "OAuth"],
      
      achievements: [
        "40% reduction in server response times",
        "3x improvement in concurrent user capacity",
        "25% increase in user engagement metrics",
        "60% improvement in database query performance",
        "35% decrease in system downtime"
      ],
      
      projects: [
        "E-commerce backend system handling 10,000+ daily transactions",
        "Real-time chat application supporting 1000+ concurrent users",
        "API gateway for microservices architecture",
        "Database optimization for legacy systems"
      ]
    },
    
    {
      id: 2,
      company: "Nexus Software System",
      location: "Pune, India",
      position: "Data Analyst Intern",
      duration: "November 2019 – November 2020",
      type: "Internship",
      
      responsibilities: [
        "Transformed complex datasets into actionable insights using Excel, SQL, and Python (Pandas, NumPy)",
        "Crafted compelling visual narratives through Power BI and Tableau dashboards",
        "Architected sophisticated SQL queries to uncover hidden patterns while building Python and VBA automation workflows",
        "Bridged the gap between technical analysis and business strategy, collaborating with cross-functional teams to deliver data-driven recommendations",
        "Automated repetitive data processing tasks reducing manual effort by 70%",
        "Created comprehensive reports for executive decision-making"
      ],
      
      technologies: ["Python", "Pandas", "NumPy", "SQL", "Excel", "Power BI", "Tableau", "VBA", "Statistical Analysis"],
      
      achievements: [
        "70% reduction in manual data processing time",
        "Created 50+ automated reports and dashboards",
        "Identified cost-saving opportunities worth $100K annually",
        "Improved data accuracy by 95% through automated validation"
      ],
      
      projects: [
        "Sales performance analytics dashboard",
        "Customer behavior analysis using machine learning",
        "Financial forecasting models",
        "Inventory optimization recommendations"
      ]
    }
  ],

  // Certifications and Training
  certifications: [
    {
      name: "Full-Stack Web Development",
      provider: "Udemy",
      date: "March 2024",
      credential: "Verified Certificate",
      skills: ["React", "Node.js", "MongoDB", "Express.js"]
    },
    {
      name: "Cybersecurity Fundamentals & Network Defense",
      provider: "Cisco Certified",
      date: "January 2023",
      credential: "Cisco Certification",
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment"]
    },
    {
      name: "TCS iON Career Edge - Young Professional",
      provider: "Tata Consultancy Services (TCS iON)",
      date: "February 2022",
      credential: "Professional Certificate",
      skills: ["Professional Skills", "Communication", "Problem Solving"]
    }
  ],

  // Services Offered
  services: {
    webDevelopment: {
      title: "Full-Stack Web Development",
      description: "End-to-end web application development using modern technologies",
      technologies: ["React", "Node.js", "Express", "MongoDB", "MySQL"],
      deliverables: ["Responsive websites", "Web applications", "API development", "Database design"]
    },
    
    frontendDevelopment: {
      title: "Frontend Development & UI/UX",
      description: "Creating beautiful, responsive, and user-friendly interfaces",
      technologies: ["React", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      deliverables: ["Responsive design", "Interactive UI", "Performance optimization", "Cross-browser compatibility"]
    },
    
    backendDevelopment: {
      title: "Backend Development & APIs",
      description: "Robust server-side development and API integration",
      technologies: ["Node.js", "Express", "Python", "Django", "RESTful APIs"],
      deliverables: ["API development", "Database integration", "Authentication systems", "Performance optimization"]
    },
    
    consultation: {
      title: "Technical Consultation",
      description: "Expert advice on technology stack and architecture decisions",
      areas: ["Technology selection", "Architecture planning", "Performance optimization", "Best practices"]
    }
  },

  // Availability and Rates
  availability: {
    status: "Available for freelance projects",
    workingHours: "Flexible, UK timezone preferred",
    responseTime: "Within 24 hours",
    projectTypes: ["Short-term projects", "Long-term contracts", "Consultation", "Code review"],
    
    rates: {
      consultation: "£50/hour",
      development: "£40-60/hour (based on project complexity)",
      projectBased: "Negotiable based on scope and timeline"
    }
  },

  // FAQ Section
  faq: [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in full-stack web development with React, Node.js, Express, and databases like MySQL and MongoDB. I also have strong experience with Python, cloud platforms (GCP, AWS), and modern development tools."
    },
    {
      question: "How long have you been coding?",
      answer: "I have over 3 years of professional experience in web development and data analysis, plus additional years of learning and personal projects during my education."
    },
    {
      question: "Do you work on both frontend and backend?",
      answer: "Yes! I'm a full-stack developer comfortable working on both frontend (React, HTML, CSS, JavaScript) and backend (Node.js, Express, Python, databases) technologies."
    },
    {
      question: "What's your experience with databases?",
      answer: "I have extensive experience with MySQL and MongoDB, including database design, optimization, and query performance improvement. I've achieved 60% performance improvements in previous projects."
    },
    {
      question: "Do you work with cloud platforms?",
      answer: "Absolutely! I have expertise with Google Cloud Platform, AWS, Netlify, and Render. I've deployed numerous projects across these platforms with focus on performance and scalability."
    },
    {
      question: "Can you help with AI integration?",
      answer: "Yes! I have experience integrating AI chatbots and AI-powered features into web applications, as demonstrated in my car wash booking and portfolio projects."
    },
    {
      question: "What's your approach to responsive design?",
      answer: "I follow mobile-first design principles and ensure cross-browser compatibility. All my projects are fully responsive and work seamlessly across devices, from mobile phones to desktop computers."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, I offer maintenance and support services for projects I develop. This includes bug fixes, updates, and feature enhancements as needed."
    }
  ],

  // Keywords for better search and context matching
  keywords: {
    skills: ["react", "javascript", "node", "nodejs", "express", "python", "html", "css", "mysql", "mongodb", "full-stack", "frontend", "backend", "web development"],
    experience: ["backend developer", "data analyst", "infinite tech", "nexus software", "pune", "cardiff", "3 years"],
    education: ["masters", "cardiff metropolitan", "computer science", "engineering", "degree"],
    projects: ["car wash", "portfolio", "vapeshop", "polyhouse", "booking", "e-commerce", "marketplace"],
    contact: ["hire", "freelance", "available", "email", "phone", "linkedin", "github"],
    location: ["cardiff", "uk", "wales", "pune", "india"],
    achievements: ["40% performance", "3x capacity", "60% optimization", "35% downtime reduction"]
  }
};

// Helper functions for data retrieval
export const getSkillsByCategory = (category) => {
  return portfolioData.skills[category] || {};
};

export const getProjectById = (id) => {
  return portfolioData.projects.find(project => project.id === id);
};

export const getProjectsByTechnology = (tech) => {
  return portfolioData.projects.filter(project => 
    project.technologies.frontend?.includes(tech) ||
    project.technologies.backend?.includes(tech) ||
    project.technologies.database?.includes(tech)
  );
};

export const getExperienceByCompany = (company) => {
  return portfolioData.experience.find(exp => 
    exp.company.toLowerCase().includes(company.toLowerCase())
  );
};

export const searchPortfolioData = (query) => {
  const normalizedQuery = query.toLowerCase();
  const results = {
    skills: [],
    projects: [],
    experience: [],
    education: [],
    contact: []
  };

  // Search in skills
  Object.entries(portfolioData.skills).forEach(([category, levels]) => {
    Object.entries(levels).forEach(([level, skills]) => {
      skills.forEach(skill => {
        if (skill.toLowerCase().includes(normalizedQuery)) {
          results.skills.push({ category, level, skill });
        }
      });
    });
  });

  // Search in projects
  portfolioData.projects.forEach(project => {
    if (project.name.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery)) {
      results.projects.push(project);
    }
  });

  // Search in experience
  portfolioData.experience.forEach(exp => {
    if (exp.company.toLowerCase().includes(normalizedQuery) ||
        exp.position.toLowerCase().includes(normalizedQuery)) {
      results.experience.push(exp);
    }
  });

  return results;
};

// React component for rendering portfolio data (optional)
const PortfolioDataComponent = () => {
  return (
    <div className="portfolio-data-wrapper">
      {/* This component can be used to display portfolio data if needed */}
      <div className="portfolio-summary">
        <h2>{portfolioData.personalInfo.fullName}</h2>
        <p>{portfolioData.personalInfo.title}</p>
        <p>{portfolioData.personalInfo.summary}</p>
      </div>
    </div>
  );
};

export default PortfolioDataComponent;