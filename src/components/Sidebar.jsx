import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaWhatsapp, 
  FaInstagram, 
  FaGithub, 
  FaLinkedin, 
  FaDownload, 
  FaTimes, 
  FaProjectDiagram, 
  FaRobot, 
  FaTools, 
  FaAddressCard, 
  FaFilePdf, 
  FaUserTie, 
  FaBlog
} from 'react-icons/fa';
import '../css/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  // Function to handle navigation or downloads
  const handleNavigation = (link, download = false) => {
    if (download) {
      window.open(link, '_blank');
    } else {
      navigate(link);
      toggleSidebar();
    }
  };
  
  // Handle animation for videos when menu opens
  useEffect(() => {
    if (isOpen) {
      // Start videos playing when the menu opens
      const videos = document.querySelectorAll('.background-video');
      videos.forEach(video => {
        video.play();
      });
    }
  }, [isOpen]);

  // Menu items configuration with proper icons
  const menuItems = [
    { 
      className: 'div1', 
      link: '/projects', 
      video: 'background', 
      label: 'Projects', 
      icon: <FaProjectDiagram />
    },
    { 
      className: 'div2', 
      link: '/ai-chat', 
      label: 'AI Assistant', 
      icon: <FaRobot />
    },
    { 
      className: 'div3', 
      link: '', 
      label: '', 
      icon: <FaTools />
    },
    { 
      className: 'div4', 
      link: '/contact', 
      label: 'Get in Touch', 
      icon: <FaEnvelope />,
      icons: true
    }, 
    { 
      className: 'div5', 
      link: '/about', 
      video: 'background', 
      label: 'About Me', 
      icon: <FaAddressCard />
    },
    { 
      className: 'div8', 
      link: 'assets/resume.pdf', 
      label: 'Resume', 
      icon: <FaFilePdf />,
      download: true
    },
    { 
      className: 'div7', 
      link: '/references', 
      video: 'background', 
      label: 'References', 
      icon: <FaUserTie />
    },
    { 
      className: 'div6', 
      link: '/blogs', 
      label: 'Blogs', 
      icon: <FaBlog />
    }
  ];

  return (
    <>
      {/* Top Edge Menu Button */}
      <div className="side-menu-btn1">
        <button onClick={() => window.history.back()} className="nav-btn1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 18v-6a3 3 0 0 0 -3 -3h-7" />
            <path d="M13 13l-4 -4l4 -4m-5 8l-4 -4l4 -4" />
          </svg>
          <span>Back</span>
        </button>

        <button onClick={() => window.location.href = '/'} className="nav-btn1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          </svg>
          <span>Home</span>
        </button>

        <button onClick={toggleSidebar} className="nav-btn1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" />
            <path d="M20 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" />
            <path d="M10 13h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z" />
            <path d="M17 13a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z" />
          </svg>
          <span>Menu</span>
        </button>
      </div>

      {/* Portfolio Popup/Sidebar with Top Edge Animation */}
      <div className={`portfolio-popup ${isOpen ? 'active' : ''}`}>
        <div className="dashboard-container">
          {/* Main Dashboard Video Background - Kept as is */}
          <div className="dashboard-background-video">
            <video autoPlay muted loop preload="auto">
              <source src="./videos/background.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="dashboard-header">
            <div className="dashboard-stats">
              <div className="button-group">
                <button className="custom-button" onClick={toggleSidebar}>
                  <FaTimes /> <span>Close</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content with Enhanced Grid */}
          <div className="dashboard-content">
            <div className="dashboard-main">
              <div className="parent">
                {menuItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`${item.className} clickable-container`} 
                    onClick={() => handleNavigation(item.link, item.download)}
                  >
                    {/* Keep videos only for main containers, use animated backgrounds for others */}
                    {item.video && (item.className === 'div1' || item.className === 'div5' || item.className === 'div7') ? (
                      <div className="background-video-container">
                        <video className="background-video" muted loop preload="auto">
                          <source src={`./videos/${item.video}`} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <div className="animated-gradient-bg"></div>
                    )}
                    
                    <div className="container-content">
                      {item.download ? (
                        <button className="download-button">
                          <div className="docs">
                            {item.icon} {item.label}
                          </div>
                          <div className="download">
                            <FaDownload />
                          </div>
                        </button>
                      ) : (
                        <>
                          <h2>{item.icon} {item.label}</h2>
                          {item.icons && (
                            <div className="icons-grid">
                              <a href="tel:+447867034729" className="icon-item" aria-label="Phone">
                                <FaPhoneAlt />
                              </a>
                              <a href="https://wa.me/+447867034729" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <FaWhatsapp />
                              </a>
                              <a href="mailto:shivashanker7337@gmail.com" className="icon-item" aria-label="Email">
                                <FaEnvelope />
                              </a>
                              <a href="https://github.com/shivas1432" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub />
                              </a>
                              <a href="www.linkedin.com/in/shiva-kanugula-51a512252" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin />
                              </a>
                              <a href="https://www.instagram.com/ss_web_services" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;