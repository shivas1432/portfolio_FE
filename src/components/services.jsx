import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Services.css';
import { FaLaptopCode, FaChartLine, FaShoppingCart, FaPaintBrush, FaCode, FaTools, FaStar } from 'react-icons/fa';

const Services = () => {
  const navigate = useNavigate();

  const handleNavigateToContact = () => {
    navigate('/contact');
  };

  const handleNavigateToReviews = () => {
    navigate('/reviews');
  };

  useEffect(() => {
    setTimeout(() => {
      const initialElements = document.querySelectorAll('.slide-in-left2, .slide-in-right2');
      initialElements.forEach(el => {
        el.classList.add('active');
      });
    }, 300);
    
    const observerOptions = {
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.fade-up2, .fade-in2, .scale-up2');
    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });

    const cursorEffect = document.getElementById('cursor-effect2');
    
    const handleMouseMove = (e) => {
      if (cursorEffect) {
        cursorEffect.style.left = e.clientX + 'px';
        cursorEffect.style.top = e.clientY + 'px';
      }
    };
    
    const handleMouseDown = () => {
      if (cursorEffect) {
        cursorEffect.classList.add('click');
        setTimeout(() => {
          cursorEffect.classList.remove('click');
        }, 500);
      }
    };
    
    const interactiveElements = document.querySelectorAll('a, button, .service-card2');
    
    const handleMouseEnter = () => {
      if (cursorEffect) cursorEffect.classList.add('hover');
    };
    
    const handleMouseLeave = () => {
      if (cursorEffect) cursorEffect.classList.remove('hover');
    };
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-effect2" id="cursor-effect2"></div>
      
      <section className="hero2">
        <div className="animated-shapes2">
          <div className="shape2 shape-12"></div>
          <div className="shape2 shape-22"></div>
          <div className="shape2 shape-32"></div>
          <div className="shape2 shape-42"></div>
          
          <div className="code-particle2 code-12">&lt;/&gt;</div>
          <div className="code-particle2 code-22">{'{...}'}</div>
          <div className="code-particle2 code-32">&lt;/&gt;</div>
          <div className="code-particle2 code-42">&lt;script&gt;</div>
        </div>
        
        <div className="container2">
          <div className="hero-content2">
            <div className="hero-text2 slide-in-left2">
              <h1 className="hero-title2">Professional <span>Web Development</span> Services</h1>
              <p className="hero-subtitle2">We provide a complete solution for all your online website needs.</p>
              <div className="hero-buttons2">
                <button onClick={handleNavigateToReviews} className="btn2 btn-reviews2">
                  <div className="btn-icon-wrapper">
                    <FaStar className="star-icon" />
                    <FaStar className="star-icon star-2" />
                    <FaStar className="star-icon star-3" />
                  </div>
                  <span className="btn-text">Training Reviews</span>
                  <div className="btn-glow"></div>
                  <div className="btn-particles">
                    <span className="particle particle-1"></span>
                    <span className="particle particle-2"></span>
                    <span className="particle particle-3"></span>
                    <span className="particle particle-4"></span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="hero-image2 slide-in-right2">
              <svg xmlns="http://www.w3.org/2000/svg" width="600" height="500" viewBox="0 0 600 500" id="hero-img">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3498db', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#F5A623', stopOpacity: 1}} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <g transform="translate(100,50)">
                  <rect x="150" y="140" width="80" height="160" rx="10" fill="#3498db" />
                  <circle cx="190" cy="120" r="40" fill="#F5A623" />
                  <rect x="170" y="300" width="20" height="60" fill="#333" />
                  <rect x="190" y="300" width="20" height="60" fill="#333" />
                  
                  <rect x="20" y="100" width="100" height="80" rx="5" fill="#2c3e50" />
                  <rect x="25" y="105" width="90" height="65" rx="2" fill="#ecf0f1" />
                  <line x1="30" y1="115" x2="110" y2="115" stroke="#3498db" strokeWidth="2">
                    <animate attributeName="x2" values="110;90;110" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="30" y1="125" x2="90" y2="125" stroke="#e74c3c" strokeWidth="2">
                    <animate attributeName="x2" values="90;80;100;90" dur="5s" repeatCount="indefinite" />
                  </line>
                  <line x1="30" y1="135" x2="100" y2="135" stroke="#2ecc71" strokeWidth="2">
                    <animate attributeName="x2" values="100;70;100" dur="3.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="30" y1="145" x2="80" y2="145" stroke="#f39c12" strokeWidth="2">
                    <animate attributeName="x2" values="80;95;80" dur="4.5s" repeatCount="indefinite" />
                  </line>
                  <rect x="55" y="180" width="30" height="10" rx="5" fill="#34495e" />
                  
                  <rect x="270" y="130" width="70" height="90" rx="5" fill="#2c3e50" />
                  <rect x="275" y="135" width="60" height="75" rx="2" fill="#ecf0f1" />
                  <rect x="295" y="215" width="20" height="3" rx="1" fill="#34495e" />
                  
                  <text x="285" y="160" fontFamily="monospace" fontSize="12" fill="#3498db" filter="url(#glow)">&lt;/&gt;</text>
                  <text x="285" y="180" fontFamily="monospace" fontSize="12" fill="#e74c3c" filter="url(#glow)">{'{}'}</text>
                  
                  <g className="gear1">
                    <circle cx="380" cy="100" r="20" fill="none" stroke="#F5A623" strokeWidth="4" />
                    <circle cx="380" cy="100" r="10" fill="none" stroke="#F5A623" strokeWidth="2" />
                    <line x1="380" y1="80" x2="380" y2="86" stroke="#F5A623" strokeWidth="4" />
                    <line x1="380" y1="114" x2="380" y2="120" stroke="#F5A623" strokeWidth="4" />
                    <line x1="360" y1="100" x2="366" y2="100" stroke="#F5A623" strokeWidth="4" />
                    <line x1="394" y1="100" x2="400" y2="100" stroke="#F5A623" strokeWidth="4" />
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 380 100" to="360 380 100" dur="15s" repeatCount="indefinite" />
                  </g>
                  
                  <g className="gear2">
                    <circle cx="350" cy="160" r="15" fill="none" stroke="#3498db" strokeWidth="3" />
                    <circle cx="350" cy="160" r="7" fill="none" stroke="#3498db" strokeWidth="1" />
                    <line x1="350" y1="145" x2="350" y2="150" stroke="#3498db" strokeWidth="3" />
                    <line x1="350" y1="170" x2="350" y2="175" stroke="#3498db" strokeWidth="3" />
                    <line x1="335" y1="160" x2="340" y2="160" stroke="#3498db" strokeWidth="3" />
                    <line x1="360" y1="160" x2="365" y2="160" stroke="#3498db" strokeWidth="3" />
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360 350 160" to="0 350 160" dur="12s" repeatCount="indefinite" />
                  </g>
                  
                  <g className="ui-elements" opacity="0.7">
                    <rect x="50" y="220" width="60" height="10" rx="5" fill="#3498db">
                      <animate attributeName="width" values="60;70;60" dur="5s" repeatCount="indefinite" />
                    </rect>
                    <rect x="50" y="240" width="40" height="10" rx="5" fill="#F5A623">
                      <animate attributeName="width" values="40;50;40" dur="7s" repeatCount="indefinite" />
                    </rect>
                    <rect x="50" y="260" width="50" height="10" rx="5" fill="#2ecc71">
                      <animate attributeName="width" values="50;45;55;50" dur="6s" repeatCount="indefinite" />
                    </rect>
                  </g>
                </g>
                
                <circle cx="150" cy="80" r="5" fill="#F5A623" opacity="0.7">
                  <animate attributeName="cy" values="80;60;80" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="450" cy="200" r="8" fill="#3498db" opacity="0.5">
                  <animate attributeName="cy" values="200;180;200" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="r" values="8;6;8" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="350" cy="350" r="6" fill="#2ecc71" opacity="0.6">
                  <animate attributeName="cy" values="350;330;350" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="r" values="6;9;6" dur="3.5s" repeatCount="indefinite" />
                </circle>
                
                <g opacity="0.6">
                  <text x="100" y="400" fontFamily="monospace" fontSize="14" fill="#3498db" filter="url(#glow)">function() {'{ }'}</text>
                  <text x="390" y="120" fontFamily="monospace" fontSize="12" fill="#F5A623" filter="url(#glow)">const app = {'{ }'}</text>
                  <text x="200" y="450" fontFamily="monospace" fontSize="10" fill="#2ecc71" filter="url(#glow)">import React from "react"</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      <section className="services2" id="services">
        <div className="container2">
          <div className="section-heading2 fade-up2">
            <h2 className="section-title2">Our Services</h2>
            <p className="section-subtitle2">We offer comprehensive web development solutions tailored to your specific needs</p>
          </div>
          
          <div className="services-grid2">
            <div className="service-card2 fade-up2">
              <div className="service-icon2">
                <FaLaptopCode />
              </div>
              <h3 className="service-title2">Web Applications, Webpages and Personal Portfolios</h3>
              <p className="service-description2">Custom-built web applications and responsive websites designed to showcase your brand and engage your audience.</p>
            </div>
            
            <div className="service-card2 fade-up2 stagger-delay-12">
              <div className="service-icon2">
                <FaChartLine />
              </div>
              <h3 className="service-title2">Web Analytics and Reporting</h3>
              <p className="service-description2">Data-driven insights to track performance and make informed decisions about your online presence.</p>
            </div>
            
            <div className="service-card2 fade-up2 stagger-delay-22">
              <div className="service-icon2">
                <FaShoppingCart />
              </div>
              <h3 className="service-title2">E-Commerce Development</h3>
              <p className="service-description2">Powerful online stores with secure payment gateways and inventory management systems.</p>
            </div>
            
            <div className="service-card2 fade-up2 stagger-delay-12">
              <div className="service-icon2">
                <FaPaintBrush />
              </div>
              <h3 className="service-title2">UI/UX Design Pages & Logos</h3>
              <p className="service-description2">Intuitive user interfaces and experiences that delight your customers and keep them coming back.</p>
            </div>
            
            <div className="service-card2 fade-up2 stagger-delay-22">
              <div className="service-icon2">
                <FaCode />
              </div>
              <h3 className="service-title2">Full Stack Training Sessions</h3>
              <p className="service-description2">Learn the latest web development technologies and techniques from experienced professionals.</p>
            </div>
            
            <div className="service-card2 fade-up2 stagger-delay-32">
              <div className="service-icon2">
                <FaTools />
              </div>
              <h3 className="service-title2">Website Maintenance and Support</h3>
              <p className="service-description2">Ongoing technical support and maintenance to keep your website running smoothly and securely.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta2">
        <div className="gradient-bg2"></div>
        <div className="container2">
          <div className="cta-content2 fade-up2">
            <h2 className="cta-title2">Ready to Build Your Online Presence?</h2>
            <p className="cta-subtitle2">Get in touch with us today and let's create something amazing together.</p>
            <button onClick={handleNavigateToContact} className="btn2 btn-primary2">CONTACT US</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;