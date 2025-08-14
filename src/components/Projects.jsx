import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Projects.css";
import "../css/git.css";
import { FaInstagram, FaTelegram, FaGithub, FaArrowRight } from 'react-icons/fa';
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
  const navigate = useNavigate();
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const toggleShowAllTemplates = () => {
    setShowAllTemplates(!showAllTemplates);
  };

  const handleGitHubProjectsNavigation = () => {
    navigate('/github-projects');
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
                Explore <span className="highlight-number">75+</span> <span className="highlight-term">repositories</span> featuring <span className="highlight-number">50+</span> <span className="highlight-term">full-stack projects</span>, <span className="highlight-number">500+</span> <span className="highlight-term">animation design files</span>, 
                <span className="highlight-number">200+</span> <span className="highlight-term">websites</span>, <span className="highlight-number">50+</span> <span className="highlight-term">3D interactive experiences</span>, <span className="highlight-number">120+</span> <span className="highlight-term">Python projects</span>, 
                and <span className="highlight-number">50+</span> <span className="highlight-term">boilerplate codes</span>. & <span className="highlight-term">open-source</span> development opportunity.
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

      {/* Achievements Section */}
      <div className="popular-repos-section">
        <div className="achievements-container">
          <h2 className="section-title">Professional Achievements</h2>
          <p className="section-subtitle">
            Building impactful solutions and empowering the next generation of developers through mentorship and education
          </p>
          
          <div className="achievements-grid">
            <div className="repo-card achievement-card">
              <div className="achievement-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="achievement-content">
                <h3 className="achievement-number">500+</h3>
                <p className="achievement-label">Students Mentored</p>
                <p className="repo-description">Successfully guided aspiring developers through their coding journey with personalized mentorship and hands-on learning experiences</p>
              </div>
            </div>
            
            <div className="repo-card achievement-card reviews-card">
              <div className="achievement-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.48 3.499C11.728 2.85 12.272 2.85 12.52 3.499L14.344 8.093C14.456 8.381 14.728 8.579 15.04 8.619L20.092 9.363C20.784 9.462 21.067 10.33 20.569 10.81L16.978 14.289C16.748 14.511 16.644 14.835 16.704 15.146L17.602 20.173C17.735 20.861 17.01 21.387 16.399 21.06L11.941 18.951C11.668 18.806 11.332 18.806 11.059 18.951L6.60102 21.06C5.99002 21.387 5.26502 20.861 5.39802 20.173L6.29602 15.146C6.35602 14.835 6.25202 14.511 6.02202 14.289L2.43102 10.81C1.93302 10.33 2.21602 9.462 2.90802 9.363L7.96002 8.619C8.27202 8.579 8.54402 8.381 8.65602 8.093L10.48 3.499Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="achievement-content">
                <h3 className="achievement-number">4.9★</h3>
                <p className="achievement-label">Student Reviews</p>
                <p className="repo-description">Exceptional feedback and testimonials from students worldwide who have transformed their careers through my mentorship</p>
                <a 
                  href="/reviews" 
                  className="repo-link-button reviews-button"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.48 3.499C11.728 2.85 12.272 2.85 12.52 3.499L14.344 8.093C14.456 8.381 14.728 8.579 15.04 8.619L20.092 9.363C20.784 9.462 21.067 10.33 20.569 10.81L16.978 14.289C16.748 14.511 16.644 14.835 16.704 15.146L17.602 20.173C17.735 20.861 17.01 21.387 16.399 21.06L11.941 18.951C11.668 18.806 11.332 18.806 11.059 18.951L6.60102 21.06C5.99002 21.387 5.26502 20.861 5.39802 20.173L6.29602 15.146C6.35602 14.835 6.25202 14.511 6.02202 14.289L2.43102 10.81C1.93302 10.33 2.21602 9.462 2.90802 9.363L7.96002 8.619C8.27202 8.579 8.54402 8.381 8.65602 8.093L10.48 3.499Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>See Reviews</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Projects Navigation Section */}
      <div className="github-navigation-section">
        <div className="github-nav-card">
          <div className="github-nav-content">
            <FaGithub className="github-nav-icon" />
            <div className="github-nav-text">
              <h2 className="github-nav-title">Explore My GitHub Projects</h2>
            <p className="github-nav-description">
  Look at my <span className="highlight-number">19</span> favorite repositories featuring <span className="highlight-term">UK healthcare solutions</span>, <span className="highlight-term">AI applications</span>, and <span className="highlight-term">full-stack projects</span> here.
</p>
            </div>
            <button 
              className="github-nav-button"
              onClick={handleGitHubProjectsNavigation}
            >
              <span>View GitHub Projects</span>
              <FaArrowRight className="nav-arrow" />
            </button>
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