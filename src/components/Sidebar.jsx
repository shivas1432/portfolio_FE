import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram, FaGithub, FaLinkedin,
  FaDownload, FaTimes, FaProjectDiagram, FaRobot,  FaAddressCard,
  FaFilePdf, FaUserTie, FaMedium, FaDev, FaStar, FaCog, FaBlog
} from 'react-icons/fa';
import '../css/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (link, download = false, requireCode = false) => {
    if (requireCode) {
      const inputCode = prompt('Enter access code to view References:');
      if (inputCode !== '733754') {
        alert('Incorrect code. Access denied.');
        return;
      }
    }

    // Check if the link is an external URL
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank');
    } else if (download) {
      window.open(link, '_blank');
    } else {
      navigate(link);
      toggleSidebar();
    }
  };

  const handleServicesReviews = (type) => {
    if (type === 'services') {
      navigate('/services');
    } else if (type === 'reviews') {
      navigate('/reviews');
    }
    toggleSidebar();
  };

  const handleArticleBlogButtons = (type) => {
    if (type === 'medium') {
      window.open('https://medium.com/@shivashanker7337', '_blank');
    } else if (type === 'devto') {
      window.open('https://dev.to/shiva_shanker_dec82951917', '_blank');
    } else if (type === 'blog') {
      window.open('https://shivawhispers.blogspot.com/', '_blank');
    }
  };

  const handleReferenceResumeButtons = (type) => {
    if (type === 'references') {
      const inputCode = prompt('Enter access code to view References:');
      if (inputCode !== '733754') {
        alert('Incorrect code. Access denied.');
        return;
      }
      navigate('/references');
      toggleSidebar();
    } else if (type === 'resume') {
      window.open('/cv.pdf', '_blank');
    }
  };

  useEffect(() => {
    if (isOpen) {
      const videos = document.querySelectorAll('.background-video');
      videos.forEach(video => video.play());
    }
  }, [isOpen]);

  const menuItems = [
    { className: 'div1', link: '/projects', label: 'My Work', icon: <FaProjectDiagram /> },
    { className: 'div2', link: '/ai-chat', label: 'AI Assistant', icon: <FaRobot /> },
    { 
      className: 'div3', 
      label: '', 
      splitButtons: true 
    },
    { 
      className: 'div4', link: '/contact', label: 'Get in Touch', icon: <FaEnvelope />, icons: true 
    },
    { className: 'div5', link: '/about', label: 'About Me', icon: <FaAddressCard /> },
    { 
      className: 'div6', 
      label: 'Articles & Blogs', 
      articleBlogButtons: true 
    },
    { 
      className: 'div7', 
      label: 'References & Resume', 
      referenceResumeButtons: true 
    }
  ];

  return (
    <>
      <div className="side-menu-btn1">
        <button onClick={() => window.history.back()} className="nav-btn1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 18v-6a3 3 0 0 0 -3 -3h-7" />
            <path d="M13 13l-4 -4l4 -4m-5 8l-4 -4l4 -4" />
          </svg>
          <span>Back</span>
        </button>
        <button onClick={() => window.location.href = '/'} className="nav-btn1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      <div className={`portfolio-popup ${isOpen ? 'active' : ''}`}>
        <div className="dashboard-container">
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

          <div className="dashboard-content">
            <div className="dashboard-main">
              <div className="parent">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`${item.className} clickable-container ${item.splitButtons ? 'split-container' : ''} ${item.articleBlogButtons ? 'article-blog-container' : ''} ${item.referenceResumeButtons ? 'reference-resume-container' : ''}`}
                    onClick={item.splitButtons || item.articleBlogButtons || item.referenceResumeButtons ? undefined : () => handleNavigation(item.link, item.download, item.requireCode)}
                  >
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
                      ) : item.splitButtons ? (
                        <>
                          <h2>{item.icon} {item.label}</h2>
                          <div className="split-buttons">
                            <button 
                              className="split-btn services-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServicesReviews('services');
                              }}
                            >
                              <FaCog />
                              <span>Services</span>
                            </button>
                            <button 
                              className="split-btn reviews-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleServicesReviews('reviews');
                              }}
                            >
                              <FaStar />
                              <span>Reviews</span>
                            </button>
                          </div>
                        </>
                      ) : item.articleBlogButtons ? (
                        <>
                          <h2>{item.label}</h2>
                          <div className="article-blog-buttons">
                            <button 
                              className="article-blog-btn medium-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArticleBlogButtons('medium');
                              }}
                            >
                              <FaMedium />
                              <span>Medium</span>
                            </button>
                            <button 
                              className="article-blog-btn devto-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArticleBlogButtons('devto');
                              }}
                            >
                              <FaDev />
                              <span>Dev.to</span>
                            </button>
                            <button 
                              className="article-blog-btn blog-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleArticleBlogButtons('blog');
                              }}
                            >
                              <FaBlog />
                              <span>Blog</span>
                            </button>
                          </div>
                        </>
                      ) : item.referenceResumeButtons ? (
                        <>
                          <h2>{item.label}</h2>
                          <div className="reference-resume-buttons">
                            <button 
                              className="reference-resume-btn references-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReferenceResumeButtons('references');
                              }}
                            >
                              <FaUserTie />
                              <span>References</span>
                            </button>
                            <button 
                              className="reference-resume-btn resume-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReferenceResumeButtons('resume');
                              }}
                            >
                              <FaFilePdf />
                              <span>Resume</span>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h2>{item.icon} {item.label}</h2>
                          {item.icons && (
                            <div className="icons-grid">
                              <a href="tel:+447867034729" className="icon-item" aria-label="Phone"><FaPhoneAlt /></a>
                              <a href="https://wa.me/+447867034729" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
                              <a href="mailto:shivashanker7337@gmail.com" className="icon-item" aria-label="Email"><FaEnvelope /></a>
                              <a href="https://github.com/shivas1432" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                              <a href="https://www.linkedin.com/in/shiva-kanugula-51a512252" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                              <a href="https://www.instagram.com/ss_web_innovations" className="icon-item" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
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