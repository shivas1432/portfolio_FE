import React, { useState } from "react";
import "../css/Projects.css";
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

const ProjectsList = () => {
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const toggleShowAllTemplates = () => {
    setShowAllTemplates(!showAllTemplates);
  };

  const visibleTemplatesProjects = showAllTemplates ? templatesProjects : templatesProjects.slice(0, 6);

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