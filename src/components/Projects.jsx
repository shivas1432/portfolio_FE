import React, { useState, useEffect, useRef } from "react";
import "../css/Projects.css";

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

        <div className="tech-stack">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="project-links">
          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="button primary-button">Live view</a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="button secondary-button">Github Code</a>
        </div>
      </div>

      <div className="featured-preview">
        <img src={image} alt={title} className="featured-image" />
      </div>
    </div>
  );
};

const ProjectsList = () => {
  const [activeSection, setActiveSection] = useState(0);
  const featuredProjectsRef = useRef(null);
  const sectionRefs = useRef([]);

  const featuredProjects = [
    {
      id: 1,
      title: "DEVELOPER PORTFOLIO",
      description: "A sleek and responsive portfolio built with Next.js, TypeScript, and Tailwind CSS. It showcases my skills, projects, and services with smooth animations using Framer Motion. Integrated with MongoDB and Appwrite for dynamic content management, ensuring a seamless experience.",
      technologies: ["NEXT.JS", "TYPESCRIPT", "REACT.JS", "TAILWIND", "FRAMER-MOTION", "MONGODB", "APPWRITE"],
      image: "https://example.com/portfolio-preview.png",
      githubLink: "https://github.com/username/portfolio",
      liveLink: "https://portfolio-demo.com"
    },
    {
      id: 2,
      title: "DASHBOARD LAYOUT",
      description: "A dynamic drag-and-drop workflow builder for seamless automation pipeline creation. Built with React, Next.js, and Tailwind for an intuitive and responsive UI. Powered by Node.js and TypeScript for efficient performance.",
      technologies: ["REACT", "TYPESCRIPT", "NEXT.JS", "NODE.JS", "TAILWIND"],
      image: "https://example.com/dashboard-preview.png",
      githubLink: "https://github.com/username/dashboard",
      liveLink: "https://dashboard-demo.com"
    }
  ];
  
  const frontendProjects = [
    {
      id: 1,
      title: "PRO HEALTH",
      languages: "HTML + CSS + JavaScript",
      description: "A backend API built using Flask for data processing.",
      image: "https://imgur.com/l53zwrf.png",
      video: "lMaUKLqXt_Q",
      website: "https://prohealthssk.netlify.app",
    },
    {
      id: 2,
      title: "MELODY PULSE",
      languages: "HTML + CSS + JavaScript",
      description: "A static website for a portfolio with responsive design.",
      image: "https://imgur.com/mUGqOMU.png",
      video: "0tIzAk_gw7k",
      website: "https://melodypulsessk.netlify.app",
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
      image: "https://imgur.com/ocaXLSy.png",
      video: "GwuPy4u9-EY",
      website: "https://solarssk.netlify.app",
    },
    {
      id: 6,
      title: "RESTAURANT",
      languages: "HTML + CSS + JavaScript",
      description: "A content management system for blogs.",
      image: "https://imgur.com/bg2gSkJ.png",
      video: "hlFJpgoCrmY",
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
      image: "https://imgur.com/Lb0Bty1.png",
      video: "YwQ14oDNOtM",
      website: "https://gamestoressk.netlify.app",
    },
    {
      id: 9,
      title: "CYBER JUNGLE",
      languages: "HTML + Bootstrap",
      description: "An Android app for fitness tracking.",
      image: "https://imgur.com/oIykZoR.png",
      video: "UuAE2ATZTiw",
      website: "https://cyberjunglessk.netlify.app",
    },
    {
      id: 10,
      title: "WILDLIFE",
      languages: "HTML + CSS",
      description: "A high-performance web server for handling requests.",
      image: "https://imgur.com/fuOBDkL.png",
      video: "-oqwdIdGhdY",
      website: "https://wildlifessk.netlify.app",
    }
  ];

  const backendProjects = [
    {
      id: 1,
      title: "API AUTHENTICATION",
      languages: "Node.js + Express",
      description: "A backend API for handling user authentication with JWT.",
      image: "https://imgur.com/fuOBDkL.png",
      video: "dQw4w9WgXcQ",
      website: "https://apiauthentication.com",
    },
  ];

  useEffect(() => {
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    const handleFeaturedProjectsAnimation = () => {
      if (!featuredProjectsRef.current) return;

      if (isInViewport(featuredProjectsRef.current)) {
        const featuredProjectsRect = featuredProjectsRef.current.getBoundingClientRect();
        const containerTop = featuredProjectsRect.top;
        const containerHeight = featuredProjectsRect.height;

        const scrollProgress = Math.max(0, Math.min(1, 
          1 - (containerTop / (containerHeight * 0.5))
        ));

        if (scrollProgress > 0.5) {
          setActiveSection(1);
          sectionRefs.current[0].style.opacity = Math.max(0, 1 - ((scrollProgress - 0.5) * 2));
          sectionRefs.current[1].style.opacity = Math.min(1, (scrollProgress - 0.5) * 2);
          sectionRefs.current[1].style.transform = `translateY(${Math.max(0, 100 - ((scrollProgress - 0.5) * 200))}%)`;
        } else {
          setActiveSection(0);
          sectionRefs.current[0].style.opacity = 1;
          sectionRefs.current[1].style.opacity = 0;
          sectionRefs.current[1].style.transform = 'translateY(100%)';
        }
      }
    };

    window.addEventListener('scroll', handleFeaturedProjectsAnimation);
    handleFeaturedProjectsAnimation();

    return () => {
      window.removeEventListener('scroll', handleFeaturedProjectsAnimation);
    };
  }, []);

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
        <h1 className="hero-title">My Projects</h1>
        <p className="hero-subtitle">A collection of my work and experiments</p>
      </div>

      <div className="featured-projects" ref={featuredProjectsRef}>
        {featuredProjects.map((project, index) => (
          <div 
            key={project.id} 
            className={`featured-section ${activeSection === index ? 'active' : ''}`}
            ref={el => sectionRefs.current[index] = el}
          >
            <FeaturedProject {...project} />
          </div>
        ))}
      </div>

      <div className="all-projects-section">
        <h2 className="section-title">Frontend Projects</h2>
        <div className="projects-grid">
          {frontendProjects.map((project) => (
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

        <h2 className="section-title">Backend Projects</h2>
        <div className="projects-grid">
          {backendProjects.map((project) => (
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
      </div>
    </div>
  );
};

export default ProjectsList;