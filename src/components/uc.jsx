import React, { useState, useEffect } from 'react';
import '../css/uc.css';

const UnderConstruction = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Animate in on mount
    setVisible(true);
    
    // Particle animation setup
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles-container');
      if (!particlesContainer) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size and animation duration
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
      }
    };
    
    createParticles();
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  const handleContactClick = (e) => {
    e.preventDefault();
    // Navigate to contact page
    window.location.href = "/contact";
  };
  
  return (
    <div className={`under-construction-page ${visible ? 'visible' : ''}`}>
      <div className="particles-container"></div>
      
      <div className="content-container">
        <div className="heading-container">
          <h1 className="main-heading">UNDER</h1>
          <h1 className="main-heading">CONSTRUCTION</h1>
        </div>
        
        <div className="message-container">
          <div className="brand">MESSAGE</div>
          
          <div className="message">
            <h2>We're giving the site<br />a little makeover.</h2>
          </div>
          
          <div className="info">
            <p>Come back later for our big reveal.</p>
            <p>We promise, it'll be worth it.</p>
            
            <div className="contact-info">
              <p>In the meantime, reach us at:</p>
              <a href="mailto:hello@reallygreatsite.com" className="email-link">shivashanker7337@gmail.com</a>
              
              <div className="social-links">
                <a href="#" aria-label="Instagram"><i className="social-icon instagram"></i></a>
                <a href="#" aria-label="Facebook"><i className="social-icon facebook"></i></a>
                <a href="#" aria-label="Twitter"><i className="social-icon twitter"></i></a>
              </div>
            </div>
            
            <button onClick={handleContactClick} className="contact-button">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;