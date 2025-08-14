import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [currentDay, setCurrentDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }));
  
  // Animation state variables
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const developerRoles = useMemo(() => [
    "full-stack web developer",
    "react developer", 
    "frontend developer",
    "backend developer",
    "UI/UX developer"
  ], []);

  const heroImages = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg"
  ];

  // Battery and time effects
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        setBatteryPercentage(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener('levelchange', () => {
          setBatteryPercentage(Math.round(battery.level * 100));
        });

        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging);
        });
      });
    }

    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString());
      setCurrentDay(now.toLocaleString('en-US', { weekday: 'long' }));
    }, 20000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  // Typing animation
  useEffect(() => {
    const currentIndex = loopNum % developerRoles.length;
    const fullText = developerRoles[currentIndex];
    
    let timer;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, typingSpeed);
      
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    } else {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, typingSpeed);
      
      if (text === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, developerRoles, typingSpeed]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return '☀️ Good Morning!';
    if (currentHour < 17) return '🌞 Good Afternoon!';
    return '🌃 Good Evening!';
  };

  const handleNavigateToNews = () => {
    navigate('/news');
  };

  const handleNavigateToWeather = () => {
    navigate('/weather');
  };

  const handleSignOut = () => {
    if (onLogout) onLogout();
    console.log('Signing out...');
  };

  const handleImageClick = (index) => {
    console.log('Image clicked:', index);
    setCurrentImageIndex(index);
  };

  const handleWidgetImageClick = (index) => {
    console.log('Widget image clicked:', index);
    setCurrentImageIndex(index);
  };

  return (
    <>
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:100,200,300,regular,500,600,700,800,900&display=swap" />
      
      <style>{`
        /* Reset and base styles */
        .homepage-wrapper {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .homepage-wrapper * {
          box-sizing: border-box;
        }

        /* WebFlow reset styles */
        .wf-force-outline-none[tabindex="-1"]:focus {
          outline: none;
        }

        /* Layout container styles similar to WebFlow */
        .w-layout-blockcontainer {
          max-width: 940px;
          margin-left: auto;
          margin-right: auto;
          display: block;
        }

        .w-container {
          margin-left: auto;
          margin-right: auto;
          max-width: 940px;
        }

        /* Theme Modes */
        .homepage-container.dark-theme {
          background: linear-gradient(135deg, #121212, #1a1a2e) !important;
          color: #fff !important;
        }

        .homepage-container.light-theme {
          background: linear-gradient(135deg, #f5f7fa, #e4e8f0) !important;
          color: #333 !important;
        }
        
        /* Hero section - full viewport */
        .hero-section {
          width: 100%;
          height: 100vh;
          position: relative;
          z-index: 1;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-container {
          width: 100%;
          height: 100vh;
          position: relative;
          z-index: 1;
          margin: 0;
          padding: 0;
          max-width: none !important;
        }

        .hero-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero-flex {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: -100px;
          z-index: 2;
          position: relative;
        }
        
        /* Main hero text - Large "SHIVASHANKER" with Professional Tilaghia Style */
        .hero-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 12vw, 12rem);
          font-weight: 600;
          line-height: 0.9;
          margin: 0 0 1rem 0;
          text-align: center;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          position: relative;
          z-index: 3;
          transition: color 0.5s ease;
        }

        /* Light theme text color */
        .light-theme .hero-text {
          color: #2c3e50;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Dark theme text color */
        .dark-theme .hero-text {
          color: #ecf0f1;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* Optional: Add subtle gradient overlay for extra elegance */
        .hero-text::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hero-text:hover::after {
          opacity: 1;
        }
        
        /* Typing animation container */
        .typing-container {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 500;
          color: #667eea;
          min-height: 3rem;
          margin: 1rem 0;
          position: relative;
          text-align: center;
          z-index: 3;
        }
        
        .cursor {
          opacity: 1;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* Sign out button */
        .signout-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .light-theme .signout-button {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .dark-theme .signout-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .signout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        
        /* Desktop image switcher */
        .desktop-image-switcher {
          display: flex;
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          gap: 12px;
          z-index: 10;
          flex-direction: row;
        }
        
        .desktop-thumb {
          width: 70px;
          height: 70px;
          border-radius: 12px;
          object-fit: cover;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .desktop-thumb.active {
          border: 3px solid #667eea;
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
        }
        
        .desktop-thumb:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
        }
        
        .mobile-image-switcher {
          display: none;
        }
        
        /* Widget container at bottom */
        .widget-container-section {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          width: 100%;
          max-width: 900px;
          padding: 0 20px;
        }
        
        .widget-wrapper {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }
        
        .widget-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-width: 110px;
          flex: 1;
          max-width: 130px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .light-theme .widget-item {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #333;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        
        .dark-theme .widget-item {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .widget-item:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
        }
        
        .light-theme .widget-item:hover {
          background: rgba(102, 126, 234, 0.15);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }
        
        .dark-theme .widget-item:hover {
          background: rgba(102, 126, 234, 0.25);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
        }
        
        .widget-icon {
          font-size: 1.6rem;
          margin-bottom: 8px;
          display: block;
          line-height: 1;
        }
        
        .widget-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: white;
          margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
        }
        
        .light-theme .widget-label {
          color: #333;
        }
        
        .dark-theme .widget-label {
          color: white;
        }
        
        .widget-subtitle {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.3;
          font-family: 'Inter', sans-serif;
        }
        
        .light-theme .widget-subtitle {
          color: rgba(0, 0, 0, 0.65);
        }
        
        .dark-theme .widget-subtitle {
          color: rgba(255, 255, 255, 0.8);
        }
        
        /* Background images */
        .hero-image-01, .hero-image-02, .hero-image-03 {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          object-fit: cover;
          z-index: -1;
          transition: opacity 0.8s ease;
        }
        
        /* Tablet responsive styles */
        @media (max-width: 1024px) {
          .hero-text {
            font-size: clamp(3rem, 10vw, 8rem);
          }
          
          .typing-container {
            font-size: clamp(1.2rem, 3.5vw, 2.5rem);
          }
          
          .desktop-thumb {
            width: 60px;
            height: 60px;
          }
          
          .widget-item {
            min-width: 100px;
            max-width: 120px;
            padding: 16px 12px;
          }
        }

          /* Mobile responsive styles for 501px-990px */
        @media (max-width: 990px) {
          .widget-wrapper {
            gap: 12px;
            padding: 0 10px;
          }
          
          .widget-item {
            min-width: 90px;
            max-width: 110px;
            padding: 14px 8px;
          }
          
          .widget-icon {
            font-size: 1.4rem;
            margin-bottom: 6px;
          }
          
          .widget-label {
            font-size: 0.65rem;
          }
          
          .widget-subtitle {
            font-size: 0.6rem;
          }
          
          .hero-text {
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 600;
          }
          
          .typing-container {
            font-size: clamp(1rem, 3vw, 2rem);
            margin: 1.5rem 0;
          }
          
          .hero-flex {
            margin-top: -80px;
          }
        }

        /* Small mobile layout - ≤500px */
        @media (max-width: 500px) {
          .desktop-image-switcher {
            display: none !important;
          }
          
          .homepage-wrapper {
            height: 100vh;
            height: 100dvh;
          }

          .hero-section {
            height: 100vh;
            height: 100dvh;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }

          .hero-container {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
          }

          .hero-wrapper {
            height: 100%;
            justify-content: flex-start;
            display: flex;
            flex-direction: column;
          }

          /* Content area - 64% of screen */
          .hero-flex {
            flex: 0 0 60%;
            justify-content: center;
            align-items: center;
            margin: 60px 0 0 0;
            padding: 20px;
            position: relative;
            z-index: 2;
          }

          /* Widget area - 30% of screen */
          .widget-container-section {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            flex: 0 0 35%;
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .widget-wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            width: 100%;
            padding: 0;
            margin-bottom: 90px;
          }
          
          .widget-item {
            min-height: 70px;
            padding: 10px 6px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            margin: 0;
            max-width: none;
            flex: none;
            border-radius: 12px;
          }
          
          .widget-icon {
            font-size: 1.1rem;
            margin-bottom: 4px;
          }
          
          .widget-label {
            font-size: 0.6rem;
            margin-bottom: 3px;
          }
          
          .widget-subtitle {
            font-size: 0.5rem;
            line-height: 1.2;
          }

          .hero-text {
            font-size: clamp(3rem, 8vw, 4rem);
            margin: 20px 0 1rem 0;
            line-height: 0.9;
            font-weight: 600;
          }

          .typing-container {
            font-size: clamp(2rem, 3vw, 1.5rem);
            margin: 0.5rem 0;
            min-height: 2rem;
          }

          .signout-button {
            top: 15px;
            right: 15px;
            padding: 8px 16px;
            font-size: 0.8rem;
            z-index: 20;
          }

          /* Mobile background images - cover only content area */
          .hero-image-01, .hero-image-02, .hero-image-03 {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 64% !important;
            object-fit: cover !important;
            z-index: -1 !important;
          }
          
          /* Mobile image switcher */
          .mobile-image-switcher {
            display: flex;
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            gap: 8px;
            z-index: 15;
          }
          
          .mobile-thumb {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            object-fit: cover;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
          }
          
          .mobile-thumb.active {
            border: 2px solid #667eea;
            transform: scale(1.1);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
          }
          
          .mobile-thumb:hover {
            transform: scale(1.05);
          }
        }

        /* Very small screens */
        @media (max-width: 320px) {
          .hero-text {
            font-size: clamp(1.5rem, 7vw, 4rem);
            font-weight: 600;
          }
          
          .typing-container {
            font-size: clamp(0.8rem, 2.5vw, 1.2rem);
          }
          
          .widget-item {
            min-height: 60px;
            padding: 8px 4px;
          }
          
          .widget-icon {
            font-size: 1rem;
          }
          
          .widget-label {
            font-size: 0.55rem;
          }
          
          .widget-subtitle {
            font-size: 0.45rem;
          }
        }
      `}</style>

      <div className="homepage-wrapper">
        <section className={`hero-section homepage-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
          <div className="w-layout-blockcontainer hero-container w-container">
            <div className="hero-wrapper">
              
              {/* Desktop image switcher */}
              <div className="desktop-image-switcher">
                {heroImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Switch to view ${index + 1}`}
                    className={`desktop-thumb ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
              
              {/* Mobile image switcher */}
              <div className="mobile-image-switcher">
                {heroImages.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Switch to view ${index + 1}`}
                    className={`mobile-thumb ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => handleWidgetImageClick(index)}
                  />
                ))}
              </div>
              
              <div className="hero-flex">
                <h1 className="hero-text">
                  SHIVASHANKER
                </h1>
                
                <div className="typing-container">
                  {text}<span className="cursor">|</span>
                </div>
              </div>
              
              {/* Background images */}
              <img 
                src={heroImages[0]} 
                loading="lazy" 
                alt="Hero image 1" 
                className="hero-image-01" 
                style={{
                  opacity: currentImageIndex === 0 ? 1 : 0,
                  zIndex: currentImageIndex === 0 ? -1 : -2
                }} 
              />
              <img 
                src={heroImages[1]} 
                loading="lazy" 
                alt="Hero image 2" 
                className="hero-image-02" 
                style={{
                  opacity: currentImageIndex === 1 ? 1 : 0,
                  zIndex: currentImageIndex === 1 ? -1 : -2
                }} 
              />
              <img 
                src={heroImages[2]} 
                loading="lazy" 
                alt="Hero image 3" 
                className="hero-image-03" 
                style={{
                  opacity: currentImageIndex === 2 ? 1 : 0,
                  zIndex: currentImageIndex === 2 ? -1 : -2
                }} 
              />

              {/* Sign out button */}
              <button onClick={handleSignOut} className="signout-button">
                Sign Out
              </button>

              {/* Widgets */}
              <div className="widget-container-section">
                <div className="widget-wrapper">
                  <div className="widget-item" onClick={handleNavigateToNews}>
                    <div className="widget-icon">📰</div>
                    <div className="widget-label">NEWS</div>
                    <div className="widget-subtitle">Fresh News</div>
                  </div>

                  <div className="widget-item" onClick={handleNavigateToWeather}>
                    <div className="widget-icon">🌤️</div>
                    <div className="widget-label">Weather</div>
                    <div className="widget-subtitle">Live Weather</div>
                  </div>

                  <div className="widget-item">
                    <div className="widget-icon">⏰</div>
                    <div className="widget-label">TIME</div>
                    <div className="widget-subtitle">{currentTime}<br /><span>{getGreeting()}</span></div>
                  </div>

                  <div className="widget-item">
                    <div className="widget-icon">📅</div>
                    <div className="widget-label">DATE</div>
                    <div className="widget-subtitle">{currentDate}<br />{currentDay}</div>
                  </div>

                  <div className="widget-item" onClick={toggleTheme}>
                    <div className="widget-icon">{isDarkMode ? '🌙' : '☀️'}</div>
                    <div className="widget-label">THEME</div>
                    <div className="widget-subtitle">{isDarkMode ? 'Night Mode' : 'Day Mode'}</div>
                  </div>

                  <div className="widget-item">
                    <div className="widget-icon">🔋</div>
                    <div className="widget-label">BATTERY</div>
                    <div className="widget-subtitle">{isCharging ? 'Charging' : 'Battery'} {batteryPercentage}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;