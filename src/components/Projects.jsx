import React, { useState, useEffect, useRef, useCallback } from "react";
import "../css/Projects.css";
import { FaInstagram, FaTelegram, FaGithub } from 'react-icons/fa';

const Project = ({ title, languages, description, image, video, website }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (video) {
      setIsVideoPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoPlaying(false);
  };
  
  return (
    <div 
      className={`project-card ${isVideoPlaying ? "show-video" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-content">
        <h3 className="project-title">{title}</h3>

        <div className="project-media">
          {!isVideoPlaying ? (
            <img src={image} alt={title} className="project-image" />
          ) : (
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&loop=1&playlist=${video}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
              ></iframe>
            </div>
          )}

          {/* Optional: Show a play icon overlay when not playing */}
          {!isVideoPlaying && video && (
            <div className="video-overlay">
              <div className="play-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        <p className="project-description">{description}</p>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="website-link"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

const FeaturedProject = ({ title, description, technologies, image, githubLink, liveLink }) => {
  return (
    <div className="featured-project">
      <div className="featured-content">
        <h2 className="featured-title">{title}</h2>
        <p className="featured-description">{description}</p>
        <div className="project-links">
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="button primary-button">Live view</a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="button secondary-button">Github Code</a>
        </div>
        
        <div className="tech-stack">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>

      <div className="featured-preview">
        <img src={image} alt={title} className="featured-image" />
      </div>
    </div>
  );
};

const ProjectsList = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [previousProject, setPreviousProject] = useState(null);
  const [direction, setDirection] = useState("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const featuredSectionRef = useRef(null);
  
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const featuredProjects = [
    {
      id: 1,
      title: "CARWASH WEB APPLICATION[date fixed]",
      description: "A full-stack web application for booking and managing car wash services. Users can book services, manage their bookings, and make payments securely. Built with React, Node.js, and MySQL.",
      technologies: [
        "REACT.JS", 
        "NODE.JS", 
        "CSS", 
        "MYSQL", 
        "GOOGLE CLOUD", 
        "NPM", 
        "FRAMER-MOTION", 
        "AI ASSISTANCE", 
        "REAL-TIME UPDATES", 
        "SECURE AUTHENTICATION", 
        "GOOGLE LOGIN"
      ],
      image: "https://i.imgur.com/eSPsj0A.jpeg",
      githubLink: "/uc",
      liveLink: "/uc"
    },
    
    {
      id: 2,
      title: "POLYHOUSE FARMING VEGETABLES[work in progress]",
      description: "A web application for managing polyhouse farming operations. Users can track available vegetables, fresh meat, and ordering online. Built with React, Node.js, and MongoDB.",
      technologies: [
        "REACT.JS", 
        "NODE.JS", 
        "CSS", 
        "MYSQL", 
        "GOOGLE CLOUD", 
        "NPM", 
        "FRAMER-MOTION", 
        "AI ASSISTANCE", 
        "REAL-TIME UPDATES", 
        "SECURE AUTHENTICATION", 
        "GOOGLE LOGIN"
      ],
      image: "https://example.com/dashboard-preview.png",
      githubLink: "/uc",
      liveLink: "/uc"
    },
    {
      id: 3,
      title: " VAPESHOP E-COMMERCE APPLICATION[work in progress]", 
      description: "A full-stack e-commerce platform for managing vape products and orders. Users can browse products, manage their orders, and make payments securely to buy bulk orders. Built with React, Node.js, and MySQL.",
      technologies: [
        "REACT.JS", 
        "NODE.JS", 
        "CSS", 
        "MYSQL", 
        "GOOGLE CLOUD", 
        "NPM", 
        "FRAMER-MOTION", 
        "AI ASSISTANCE", 
        "REAL-TIME UPDATES", 
        "SECURE AUTHENTICATION", 
        "GOOGLE LOGIN"
      ],
      image: "https://i.imgur.com/ktvx1r4.png",
      githubLink: "/uc",
      liveLink: "/uc"
    }
  ];
  
  const templatesProjects = [
    {
      id: 12,
      title: "Time Travel",
      languages: "HTML + CSS + JavaScript",
      description: "A modern time-travel themed website template with sleek animations and responsive design.",
      image: "https://imgur.com/MfnoXfX.png",
      video: "lMaUKLqXt_Q",
      website: "https://timetravel1.netlify.app/",
    },
    {
      id: 13,
      title: "Client Portfolio",
      languages: "HTML + CSS + JavaScript",
      description: "A clean and professional portfolio template perfect for showcasing creative work.",
      image: "https://imgur.com/4pADS3u.png",
      video: "quzclXC6k9Q",
      website: "https://sahithimorampudiportfolio.netlify.app/",
    },
    {
      id: 14,
      title: " Client Portfolio",
      languages: "HTML + CSS",
      description: "A minimalist portfolio template with elegant typography and smooth transitions.",
      image: "https://imgur.com/qewg0mX.png",
      video: "",
      website: "https://muteesportfolio.netlify.app/",
    },
    {
      id: 1,
      title: "CYBER JUNGLE",
      languages: "HTML + Bootstrap",
      description: "A futuristic cyberpunk-themed template with neon effects and dynamic layouts.",
      image: "https://imgur.com/8l7CBm4.png",
      video: "Srjrm8rpq0o",
      website: "https://cyberjunglessk.netlify.app",
    },
    {
      id: 16,
      title: "1950-2050",
      languages: "HTML + CSS + JavaScript",
      description: "A timeline template showcasing the evolution of technology from 1950 to 2050.",
      image: "https://imgur.com/KvBzTel.png",
      video: "FMCN35s9wi0",
      website: "https://1950-2050.netlify.app/",
    },
    {
      id: 10,
      title: "WILDLIFE",
      languages: "HTML + CSS",
      description: "A nature-inspired template perfect for wildlife photography and conservation sites.",
      image: "https://imgur.com/etjs1HV.png",
      video: "-oqwdIdGhdY",
      website: "https://wildlifessk.netlify.app",
    },
    {
      id: 9,
      title: "PRO HEALTH",
      languages: "HTML + CSS + JavaScript",
      description: "A professional healthcare template with modern design and user-friendly interface.",
      image: "https://imgur.com/B2v6MJH.png",
      video: "lMaUKLqXt_Q",
      website: "https://prohealthssk.netlify.app",
    },
    {
      id: 2,
      title: "MELODY PULSE",
      languages: "HTML + CSS + JavaScript",
      description: "A music-themed template with dynamic audio visualizations and vibrant colors.",
      image: "https://imgur.com/3mV3g4v.png",
      video: "quzclXC6k9Q",
      website: "https://melodypulsessk.netlify.app",
    },
    {
      id: 15,
      title: "KINGDOM RUSH",
      languages: "HTML + CSS + JavaScript",
      description: "A gaming-inspired template with interactive elements and immersive design.",
      image: "https://imgur.com/faTJCBo.png",
      video: "Gn2NJeW26Tk",
      website: "https://kingdom-rush.netlify.app/",
    },
    {
      id: 3,
      title: "RESUME BUILDER",
      languages: "HTML + CSS",
      description: "A smart template for creating professional resumes with customizable layouts.",
      image: "https://imgur.com/Swlckqm.png",
      video: "P0NhN_4FcAg",
      website: "https://resumebuilderssk.netlify.app",
    },
    {
      id: 4,
      title: "PORTFOLIO",
      languages: "HTML + CSS + JavaScript",
      description: "A versatile portfolio template suitable for designers, developers, and creatives.",
      image: "https://imgur.com/aqOvcx5.png",
      video: "Gn2NJeW26Tk",
      website: "https://sampleportfoliossk.netlify.app",
    },
    {
      id: 5,
      title: "SOLAR",
      languages: "HTML + CSS + JavaScript",
      description: "An eco-friendly template promoting renewable energy with stunning visuals.",
      image: "https://imgur.com/YFyxZ0o.png",
      video: "FMCN35s9wi0",
      website: "https://solarssk.netlify.app",
    },
    {
      id: 6,
      title: "RESTAURANT",
      languages: "HTML + CSS + JavaScript",
      description: "A delicious restaurant template with appetizing design and menu showcase.",
      image: "https://imgur.com/stjW8BW.png",
      video: "_QX9Q7v7Upg",
      website: "https://restaurantssk.netlify.app",
    },
    {
      id: 7,
      title: "TRAVEL PLANNER",
      languages: "HTML + CSS + JavaScript",
      description: "An adventure-ready template for travel agencies and tourism websites.",
      image: "https://imgur.com/s9Ddwc0.png",
      video: "YOUTUBE_VIDEO_ID_7",
      website: "https://travelplannerssk.netlify.app",
    },
    {
      id: 8,
      title: "GAME STORE",
      languages: "HTML + CSS + JavaScript",
      description: "A gaming marketplace template with modern e-commerce functionality.",
      image: "https://imgur.com/w33xXou.png",
      video: "Ehfmu4sBU4U",
      website: "https://gamestoressk.netlify.app",
    },
    {
      id: 11,
      title: "TECH EVOLUTION",
      languages: "HTML + CSS",
      description: "A comprehensive template showcasing technology evolution and future innovations.",
      image: "https://imgur.com/WzGqSiJ.png",
      video: "YBZVor_cBww",
      website: "https://1950-2050.netlify.app",
    }
  ];

  // Define changeProject function before it's used in useEffect
  const changeProject = useCallback((dir) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(dir);
    setPreviousProject(currentProject);
    
    if (dir === "next") {
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
    } else {
      setCurrentProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [currentProject, isTransitioning, featuredProjects.length]);

  // Wheel event handler for desktop
  useEffect(() => {
    let wheelTimeout;
    const handleScroll = (e) => {
      if (!featuredSectionRef.current) return;
      
      const rect = featuredSectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView || isTransitioning) return;
      
      const mouseY = e.clientY;
      const isMouseInFeaturedSection = 
        mouseY >= rect.top && 
        mouseY <= rect.bottom;
      
      if (isMouseInFeaturedSection) {
        e.preventDefault();
        
        const isScrollingDown = e.deltaY > 0;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          if (isScrollingDown) {
            changeProject("next");
          } else {
            changeProject("prev");
          }
        }, 50);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleScroll);
      clearTimeout(wheelTimeout);
    };
  }, [isTransitioning, changeProject]);

  // Touch event handlers for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;
    
    const handleTouchStart = (e) => {
      if (!featuredSectionRef.current) return;
      const rect = featuredSectionRef.current.getBoundingClientRect();
      
      const touchY = e.touches[0].clientY;
      const isTouchInFeaturedSection = 
        touchY >= rect.top && 
        touchY <= rect.bottom;
      
      if (isTouchInFeaturedSection) {
        touchStartY = e.touches[0].clientY;
      }
    };
    
    const handleTouchMove = (e) => {
      if (!featuredSectionRef.current) return;
      const rect = featuredSectionRef.current.getBoundingClientRect();
      
      const touchY = e.touches[0].clientY;
      const isTouchInFeaturedSection = 
        touchY >= rect.top && 
        touchY <= rect.bottom;
      
      if (isTouchInFeaturedSection) {
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = (e) => {
      if (!featuredSectionRef.current || isTransitioning) return;
      const rect = featuredSectionRef.current.getBoundingClientRect();
      
      touchEndY = e.changedTouches[0].clientY;
      
      const swipeDistance = touchStartY - touchEndY;
      
      const touchY = e.changedTouches[0].clientY;
      const isTouchInFeaturedSection = 
        touchY >= rect.top && 
        touchY <= rect.bottom;
      
      if (isTouchInFeaturedSection && Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          changeProject("next");
        } else {
          changeProject("prev");
        }
      }
    };
    
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTransitioning, changeProject]);

  const toggleShowAllTemplates = () => {
    setShowAllTemplates(!showAllTemplates);
  };

  const visibleTemplatesProjects = showAllTemplates ? templatesProjects : templatesProjects.slice(0, 6);

  return (
    <div className="projects-container">
      <div className="hero-section">
        <div className="animated-background">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
         <h1 className="hero-title">My Work</h1>
        <p className="hero-subtitle">A collection of my work and experiments</p>
        
        <div className="social-media-container">
          <div className="social-buttons">
            <a 
              href="https://www.instagram.com/ss_web_innovations/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button instagram-button"
            >
              <FaInstagram style={{ fontSize: '20px', marginRight: '8px', color: 'white' }} />
              <span>Follow on Instagram (100K+)</span>
            </a>
            
            <a 
              href="https://t.me/helpme_coder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button telegram-button"
            >
              <FaTelegram style={{ fontSize: '20px', marginRight: '8px', color: 'white' }} />
              <span>Join Telegram Group (25K+)</span>
            </a>
            
            <a 
              href="https://github.com/shivas1432?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button github-button"
            >
              <FaGithub style={{ fontSize: '20px', marginRight: '8px', color: 'white' }} />
              <span>View GitHub Repositories</span>
            </a>
          </div>
        </div>
      </div>

      <div className="featured-projects-container" ref={featuredSectionRef}>
        <div className="featured-projects-title">
          <h2>Ongoing Projects</h2>
          <div className="project-navigation">
            <button 
              className="nav-button prev" 
              onClick={() => changeProject("prev")}
              aria-label="Previous project"
            >
              &#8592;
            </button>
            <div className="project-indicators">
              {featuredProjects.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentProject ? "active" : ""}`}
                  onClick={() => {
                    if (index !== currentProject) {
                      setDirection(index > currentProject ? "next" : "prev");
                      setPreviousProject(currentProject);
                      setCurrentProject(index);
                    }
                  }}
                ></span>
              ))}
            </div>
            <button 
              className="nav-button next" 
              onClick={() => changeProject("next")}
              aria-label="Next project"
            >
              &#8594;
            </button>
          </div>
        </div>
        
        <div className="featured-projects-wrapper">
          <div className="featured-projects-scroll-info">
            <div className="scroll-icon">
              <div className="scroll-wheel"></div>
            </div>
            <p>Scroll to navigate projects</p>
          </div>
          
          <div className="featured-projects">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`featured-section 
                  ${index === currentProject ? "active" : ""} 
                  ${index === previousProject ? "previous" : ""}
                  ${direction}`}
              >
                <FeaturedProject {...project} />
              </div>
            ))}
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
              languages={project.languages}
              description={project.description}
              image={project.image}
              video={project.video}
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