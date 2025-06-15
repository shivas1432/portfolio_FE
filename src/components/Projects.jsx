import React, { useState, useEffect, useRef, useCallback } from "react";
import "../css/Projects.css";
import { FaInstagram, FaTelegram, FaGithub } from 'react-icons/fa'; // Import the icons

const Project = ({ title, languages, description, image, video, website }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePreviewClick = () => {
    setIsVideoPlaying(true);
  };

  const handleCloseClick = () => {
    setIsVideoPlaying(false);
  };
  
  return (
    <div className={`project-card ${isVideoPlaying ? "show-video" : ""}`}>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <div className="project-languages">
          {languages.split('+').map((lang, index) => (
            <span key={index} className="language-tag">{lang.trim()}</span>
          ))}
        </div>

        <div className="project-media">
          {!isVideoPlaying ? (
            <img src={image} alt={title} className="project-image" />
          ) : (
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {!isVideoPlaying ? (
            <button className="preview-button" onClick={handlePreviewClick}>
              Preview
            </button>
          ) : (
            <button className="close-button" onClick={handleCloseClick}>
              Close
            </button>
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
  
  // New state for show more functionality
  const [showAllFrontend, setShowAllFrontend] = useState(false);
  const [showAllBackend, setShowAllBackend] = useState(false);

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
      description: "A web application for managing polyhouse farming operations. Users can track available vegitables ,fresh meat, and ordering online. Built with React, Node.js, and MongoDB.",
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
  
  const frontendProjects = [
       {
      id: 12,
      title: "Time Travel",
      languages: "HTML + CSS + JavaScript",
      description: "A backend API built using Flask for data processing.",
      image: "https://imgur.com/MfnoXfX.png",
      video: "lMaUKLqXt_Q",
      website: "https://timetravel1.netlify.app/",
    },
    {
      id: 13,
      title: "Client Portfolio",
      languages: "HTML + CSS + JavaScript",
      description: "A static website for a portfolio with responsive design.",
      image: "https://imgur.com/4pADS3u.png",
      video: "quzclXC6k9Q",
      website: "https://sahithimorampudiportfolio.netlify.app/",
    },
    {
      id: 14,
      title: " Client Portfolio",
      languages: "HTML + CSS",
      description: "A web application built using React for managing tasks.",
      image: "https://imgur.com/qewg0mX.png",
      video: "",
      website: "https://muteesportfolio.netlify.app/",
    },
    {
      id: 1,
      title: "CYBER JUNGLE",
      languages: "HTML + Bootstrap",
      description: "An Android app for fitness tracking.",
      image: "https://imgur.com/8l7CBm4.png",
      video: "Srjrm8rpq0o",
      website: "https://cyberjunglessk.netlify.app",
    },
  
    {
      id: 16,
      title: "1950-2050",
      languages: "HTML + CSS + JavaScript",
      description: "An enterprise application for managing inventory.",
      image: "https://imgur.com/KvBzTel.png",
      video: "FMCN35s9wi0",
      website: "https://1950-2050.netlify.app/",
    },
        {
      id: 10,
      title: "WILDLIFE",
      languages: "HTML + CSS",
      description: "A high-performance web server for handling requests.",
      image: "https://imgur.com/etjs1HV.png",
      video: "-oqwdIdGhdY",
      website: "https://wildlifessk.netlify.app",
    },
    {
      id: 9,
      title: "PRO HEALTH",
      languages: "HTML + CSS + JavaScript",
      description: "A backend API built using Flask for data processing.",
      image: "https://imgur.com/B2v6MJH.png",
      video: "lMaUKLqXt_Q",
      website: "https://prohealthssk.netlify.app",
    },
    {
      id: 2,
      title: "MELODY PULSE",
      languages: "HTML + CSS + JavaScript",
      description: "A static website for a portfolio with responsive design.",
      image: "https://imgur.com/3mV3g4v.png",
      video: "quzclXC6k9Q",
      website: "https://melodypulsessk.netlify.app",
    },
      {
      id: 15,
      title: "KINGDOM RUSH",
      languages: "HTML + CSS + JavaScript",
      description: "A RESTful web service for handling user authentication.",
      image: "https://imgur.com/faTJCBo.png",
      video: "Gn2NJeW26Tk",
      website: "https://kingdom-rush.netlify.app/",
    },
    {
      id: 3,
      title: "RESUME BUILDER",
      languages: "HTML + CSS",
      description: "A web application built using React for managing tasks.",
      image: "https://imgur.com/Swlckqm.png",
      video: "P0NhN_4FcAg",
      website: "https://resumebuilderssk.netlify.app",
    },
    {
      id: 4,
      title: "PORTFOLIO",
      languages: "HTML + CSS + JavaScript",
      description: "A RESTful web service for handling user authentication.",
      image: "https://imgur.com/aqOvcx5.png",
      video: "Gn2NJeW26Tk",
      website: "https://sampleportfoliossk.netlify.app",
    },
    {
      id: 5,
      title: "SOLAR",
      languages: "HTML + CSS + JavaScript",
      description: "An enterprise application for managing inventory.",
      image: "https://imgur.com/YFyxZ0o.png",
      video: "FMCN35s9wi0",
      website: "https://solarssk.netlify.app",
    },
    {
      id: 6,
      title: "RESTAURANT",
      languages: "HTML + CSS + JavaScript",
      description: "A content management system for blogs.",
      image: "https://imgur.com/stjW8BW.png",
      video: "_QX9Q7v7Upg",
      website: "https://restaurantssk.netlify.app",
    },
    {
      id: 7,
      title: "TRAVEL PLANNER",
      languages: "HTML + CSS + JavaScript",
      description: "A web application for booking hotels.",
      image: "https://imgur.com/s9Ddwc0.png",
      video: "YOUTUBE_VIDEO_ID_7",
      website: "https://travelplannerssk.netlify.app",
    },
    {
      id: 8,
      title: "GAME STORE",
      languages: "HTML + CSS + JavaScript",
      description: "A mobile application for tracking expenses.",
      image: "https://imgur.com/w33xXou.png",
      video: "Ehfmu4sBU4U",
      website: "https://gamestoressk.netlify.app",
    },
    
    {
      id: 11,
      title: "tech",
      languages: "HTML + CSS",
      description: "Evolution of technology and its impact from 1950-2050",
      image: "https://imgur.com/WzGqSiJ.png",
      video: "YBZVor_cBww",
      website: "https://1950-2050.netlify.app",
    }
  ];

  const backendProjects = [
    {
      id: 1,
      title: "weather",
      languages: "Node.js + Express + React",
      description: "weather API for fetching weather data by city name.",
      image: "https://imgur.com/UMIkVdp.png",
      video: "5nC9VG6jv3o",
      website: "https://apiauthentication.com",
    },
    {
      id: 2,
      title: "vapeshop",
      languages: "Node.js + Express + React",
      description: "order API for managing orders and products.",
      image: "https://imgur.com/PKPyEq8.png",
      video: "m64VLKz5l04",
      website: "https://apiauthentication.com",
    },
    {
      id: 3,
      title: "news",
      languages: "Node.js + Express + React",
      description: "live news API for fetching news articles by category.",
      image: "https://imgur.com/FVRHzT0.png",
      video: "1jXD-ZnBPTY",
      website: "https://apiauthentication.com",
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
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800); // Match this to your CSS transition duration
  }, [currentProject, isTransitioning, featuredProjects.length]);

  // Wheel event handler for desktop
  useEffect(() => {
    let wheelTimeout;
    const handleScroll = (e) => {
      if (!featuredSectionRef.current) return;
      
      const rect = featuredSectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView || isTransitioning) return;
      
      // Check if mouse is within the featured section
      const mouseY = e.clientY;
      const isMouseInFeaturedSection = 
        mouseY >= rect.top && 
        mouseY <= rect.bottom;
      
      if (isMouseInFeaturedSection) {
        // Prevent default scroll behavior
        e.preventDefault();
        
        // Get scroll direction
        const isScrollingDown = e.deltaY > 0;
        
        // Debounce scroll events
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

    // Use wheel event instead of scroll
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
      
      // Check if touch is within featured section
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
      
      // Check if touch is within featured section
      const touchY = e.touches[0].clientY;
      const isTouchInFeaturedSection = 
        touchY >= rect.top && 
        touchY <= rect.bottom;
      
      if (isTouchInFeaturedSection) {
        // Prevent page scroll when touching in featured section
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = (e) => {
      if (!featuredSectionRef.current || isTransitioning) return;
      const rect = featuredSectionRef.current.getBoundingClientRect();
      
      touchEndY = e.changedTouches[0].clientY;
      
      // Calculate swipe distance
      const swipeDistance = touchStartY - touchEndY;
      
      // Check if touch ended within featured section
      const touchY = e.changedTouches[0].clientY;
      const isTouchInFeaturedSection = 
        touchY >= rect.top && 
        touchY <= rect.bottom;
      
      if (isTouchInFeaturedSection && Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped up, show next
          changeProject("next");
        } else {
          // Swiped down, show previous
          changeProject("prev");
        }
      }
    };
    
    // Add touch event listeners
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isTransitioning, changeProject]);

  // Toggle for showing all projects
  const toggleShowAllFrontend = () => {
    setShowAllFrontend(!showAllFrontend);
  };

  const toggleShowAllBackend = () => {
    setShowAllBackend(!showAllBackend);
  };

  // Get the visible projects
  const visibleFrontendProjects = showAllFrontend ? frontendProjects : frontendProjects.slice(0, 4);
  const visibleBackendProjects = showAllBackend ? backendProjects : backendProjects.slice(0, 2);

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
        {/* Social Media Section at Top */}
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
        <h2 className="section-title">Frontend Projects</h2>
        <div className="projects-grid">
          {visibleFrontendProjects.map((project) => (
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
        
        {/* Show More/Less button for Frontend projects */}
        <div className="show-more-container">
          <button 
            className="show-more-button" 
            onClick={toggleShowAllFrontend}
          >
            {showAllFrontend ? "Show Less" : `Show More (${frontendProjects.length - 4} more projects)`}
          </button>
        </div>

        <h2 className="section-title">Backend Projects</h2>
        <div className="projects-grid">
          {visibleBackendProjects.map((project) => (
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
        
        {/* Show More/Less button for Backend projects */}
        {backendProjects.length > 2 && (
          <div className="show-more-container">
            <button 
              className="show-more-button" 
              onClick={toggleShowAllBackend}
            >
              {showAllBackend ? "Show More" : `Show More (${backendProjects.length - 2} more projects)`}
            </button>
          </div>
        )}
        

      </div>
    </div>
  );
};

export default ProjectsList;