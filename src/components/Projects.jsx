import React, { useState } from "react";
import "../css/Projects.css";
import "../css/git.css";
import { FaInstagram, FaTelegram, FaGithub } from 'react-icons/fa';
// Import project data from separate file
import { templatesProjects } from './projectsData.jsx';

const Project = ({ title, image, website }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <div 
      className={`project-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={title} className="project-image" />

      {/* Show visit site button on hover */}
      {isHovered && (
        <div className="hover-overlay">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-site-button"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site
          </a>
        </div>
      )}
    </div>
  );
};

const RepoCard = ({ name, description, repoLink, language }) => {
  return (
    <div className="repo-card" data-language={language}>
      <div className="repo-header">
        <h3 className="repo-name">{name}</h3>
      </div>
      <p className="repo-description">{description}</p>
      {language && <span className="repo-language">{language}</span>}
      <a
        href={repoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="repo-link-button"
      >
        <FaGithub />
        <span>View Repository</span>
      </a>
    </div>
  );
};

const ProjectsList = () => {
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);

  const toggleShowAllTemplates = () => {
    setShowAllTemplates(!showAllTemplates);
  };

  const toggleShowAllRepos = () => {
    setShowAllRepos(!showAllRepos);
  };

  const visibleTemplatesProjects = showAllTemplates ? templatesProjects : templatesProjects.slice(0, 6);

  // Popular GitHub repositories data
  const popularRepos = [
    {
      id: 1,
      name: "UK-Grocery-Price-Comparison-App",
      description: "A comprehensive, production-ready web application for comparing grocery prices across major UK supermarkets including Tesco, ASDA, Sainsbury's, Morrisons, Lidl, and Aldi.",
      repoLink: "https://github.com/shivas1432/UK-Grocery-Price-Comparison-App",
      language: "React"
    },
    {
      id: 2,
      name: "NHS-Appointment-Optimization",
      description: "This production-ready application showcases advanced React/TypeScript development while solving real-world healthcare challenges. The platform provides intelligent appointment matching, predictive analytics.",
      repoLink: "https://github.com/shivas1432/NHS-Appointment-Optimization",
      language: "TypeScript"
    },
    {
      id: 3,
      name: "UK-NutriHealth-AI",
      description: "I built an AI-powered platform that predicts vitamin and mineral deficiency risks before symptoms appear, potentially saving the NHS millions while improving the health of 67 million UK residents.",
      repoLink: "https://github.com/shivas1432/UK-NutriHealth-AI",
      language: "AI/Python"
    },
    {
      id: 9,
      name: "120+ python-projects",
      description: "Collection of featuring 120+ Python projects ranging from beginner to advanced levels. This repository serves as a practical learning platform where students can explore diverse Python applications.",
      repoLink: "https://github.com/shivas1432/python-projects",
      language: "Python"
    },
    {
      id: 4,
      name: "600+ Animated-Designs",
      description: "600+ creative collection of HTML, CSS, and JavaScript animations and interactive designs. This repository showcases various web animation techniques and UI components perfect for learning.",
      repoLink: "https://github.com/shivas1432/Animated-Designs",
      language: "JavaScript"
    },
    {
      id: 5,
      name: "Website_Templates",
      description: "100+ responsive website templates - business, portfolio, e-commerce & more. HTML5/CSS3/JS. Mobile-first & ready to deploy.",
      repoLink: "https://github.com/shivas1432/Website_Templates",
      language: "HTML"
    },
    {
      id: 6,
      name: "Interactive-3D-Website-Templates",
      description: "40+ Premium collection of interactive 3D website templates built with Three.js and modern web technologies. Features responsive designs for portfolios, businesses, gaming, and creative projects.",
      repoLink: "https://github.com/shivas1432/Interactive-3D-Website-Templates",
      language: "Three.js"
    },
    {
      id: 7,
      name: "car_wash_booking_system_FE",
      description: "A React-based car wash booking application with user authentication, booking management, profile handling, and an admin dashboard. Integrates with Google OAuth and Firebase for enhanced features.",
      repoLink: "https://github.com/shivas1432/car_wash_booking_system_FE",
      language: "React"
    },
    {
      id: 8,
      name: "AI_VoiceCoach",
      description: "Advanced AI English tutor providing immersive conversation practice with real-time pronunciation analysis, grammar corrections, and adaptive learning pathways and also submitted in World's Largest competition.",
      repoLink: "https://github.com/shivas1432/AI_VoiceCoach",
      language: "AI/Python"
    },
    
    {
      id: 10,
      name: "Amezon_Replica",
      description: "A comprehensive e-commerce web application built with the MERN stack, featuring modern React patterns, secure authentication, payment processing, and admin functionality.",
      repoLink: "https://github.com/shivas1432/Amezon_Replica",
      language: "MERN"
    },
    {
      id: 11,
      name: "netflix-replica",
      description: "Advanced Netflix replica with modern React architecture and premium features.",
      repoLink: "https://github.com/shivas1432/netflix-replica",
      language: "React"
    },
    {
      id: 12,
      name: "gemini-replica",
      description: "A modern, responsive Gemini AI interface built with React and Vite. This project demonstrates my full-stack development skills with a focus on AI integration and user experience.",
      repoLink: "https://github.com/shivas1432/gemini-replica",
      language: "React"
    },
    {
      id: 13,
      name: "terminal-replica",
      description: "A minimalist web-based terminal interface with a glowing blue border aesthetic. Simulates basic terminal commands and interaction, built entirely with HTML, CSS, and JavaScript.",
      repoLink: "https://github.com/shivas1432/terminal-replica",
      language: "JavaScript"
    }
  ];

  const visibleRepos = showAllRepos ? popularRepos : popularRepos.slice(0, 3);

  return (
    <div className="projects-container">
      <div className="hero-section">
         <h1 className="hero-title">My Work</h1>
        <p className="hero-subtitle">A collection of my work and experiments</p>
        
        <div className="social-media-container">
          <div className="social-buttons">
            <div className="social-card">
              <h3 className="social-card-title">Instagram Community</h3>
              <p className="social-card-description">
                Join our thriving Instagram <span className="highlight-term">community</span> of <span className="highlight-number">100K+</span> <span className="highlight-term">developers and designers</span>. Get daily <span className="highlight-term">inspiration</span>, 
                web development <span className="highlight-term">tips</span>, and behind-the-scenes content of our latest projects and content creation process.
              </p>
              <a 
                href="https://www.instagram.com/ss_web_innovations/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button instagram-button"
              >
                <FaInstagram />
                <span>Follow on Instagram</span>
              </a>
            </div>
            
            <div className="social-card">
              <h3 className="social-card-title">Telegram Group</h3>
              <p className="social-card-description">
                Connect with <span className="highlight-number">25K+</span> <span className="highlight-term">like-minded developers</span> in our Telegram <span className="highlight-term">community</span>. Get <span className="highlight-term">instant help</span>, 
                share <span className="highlight-term">resources</span>, participate in <span className="highlight-term">coding challenges</span>, and network with <span className="highlight-term">professionals</span>.
              </p>
              <a 
                href="https://t.me/helpme_coder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button telegram-button"
              >
                <FaTelegram />
                <span>Join Telegram Group</span>
              </a>
            </div>
            
            <div className="social-card">
              <h3 className="social-card-title">GitHub Repositories</h3>
              <p className="social-card-description">
                Explore <span className="highlight-number">70+</span> <span className="highlight-term">repositories</span> featuring <span className="highlight-number">40+</span> <span className="highlight-term">full-stack projects</span>, <span className="highlight-number">500+</span> <span className="highlight-term">animation design files</span>, 
                <span className="highlight-number">200+</span> <span className="highlight-term">websites</span>, <span className="highlight-number">50+</span> <span className="highlight-term">3D interactive experiences</span>, and <span className="highlight-number">120+</span> <span className="highlight-term">Python projects Repo</span>. 
                 & <span className="highlight-term">open-source  </span>development opportunity.
              </p>
              <a 
                href="https://github.com/shivas1432?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button github-button"
              >
                <FaGithub />
                <span>View Repositories</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Popular GitHub Repositories Section */}
      <div className="popular-repos-section">
        <h2 className="section-title">Popular GitHub Repositories</h2>
        <p className="section-subtitle">
          Explore my top and favorite repos out of 70+ repositories that showcase different aspects of web development. 
          Look at{' '}
          <a 
            href="https://github.com/shivas1432?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}
          >
            GitHub
          </a>
          {' '}for all full stack application repositories
        </p>
        <div className="repos-grid">
          {visibleRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              description={repo.description}
              repoLink={repo.repoLink}
              language={repo.language}
            />
          ))}
        </div>
        
        <div className="show-more-container">
          <button 
            className="show-more-button" 
            onClick={toggleShowAllRepos}
          >
            {showAllRepos ? "Show Less" : `Show More (${popularRepos.length - 3} more repositories)`}
          </button>
        </div>
      </div>

      <div className="all-projects-section">
        <h2 className="section-title">My Creative Templates</h2>
        <div className="projects-grid">
          {visibleTemplatesProjects.map((project) => (
            <Project
              key={project.id}
              title={project.title}
              image={project.image}
              website={project.website}
            />
          ))}
        </div>
        
        <div className="show-more-container">
          <button 
            className="show-more-button" 
            onClick={toggleShowAllTemplates}
          >
            {showAllTemplates ? "Show Less" : `Show More (${templatesProjects.length - 6} more templates)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;