import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
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
  
  // Use useMemo to wrap the developerRoles array
  const developerRoles = useMemo(() => [
    "full-stack web developer",
    "react developer", 
    "frontend developer",
    "backend developer",
    "UI/UX developer"
  ], []);

  // Hero images - Updated to use local images
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

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    return () => {
      document.body.className = '';
    };
  }, [isDarkMode]);

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

  // Function to handle widget image clicks on mobile
  const handleWidgetImageClick = (index) => {
    console.log('Widget image clicked:', index);
    setCurrentImageIndex(index);
  };

  return (
    <>
      <link href="https://cdn.prod.website-files.com/67de676f1c598cfa54564c7a/css/visua-webflow-template.webflow.shared.a95ef6634.css" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Archivo:100,200,300,regular,500,600,700,100italic,200italic,300italic,italic,500italic,600italic,700italic%7CInter:100,200,300,regular,500,600,700,800,900" media="all" />
      
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }

        .wf-force-outline-none[tabindex="-1"]:focus {
          outline: none;
        }
        
        /* Theme Modes */
        .dark-mode {
          background: linear-gradient(135deg, #121212, #1a1a2e) !important;
          color: #fff !important;
        }

        .light-mode {
          background: linear-gradient(135deg, #f5f7fa, #e4e8f0) !important;
          color: #333 !important;
        }
        
        .typing-container {
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 500;
          color: #667eea;
          min-height: 3rem;
          margin: 1rem 0;
          position: relative;
          text-align: center;
        }
        
        .hero-text {
          font-size: clamp(4rem, 12vw, 12rem) !important;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        body {
          overflow-x: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-section {
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          overflow-x: hidden;
          position: relative;
          z-index: 1;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin: 0;
          padding: 0;
        }
        
        .hero-container {
          max-width: 100vw;
          width: 100vw;
          height: 100vh;
          overflow-x: hidden;
          position: relative;
          z-index: 1;
          margin: 0;
          padding: 0;
        }

        .w-container {
          max-width: 100vw !important;
          width: 100vw !important;
          height: 100vh !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .cursor {
          opacity: 1;
          animation: blink 1s infinite;
        }
        
        .signout-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          z-index: 500;
        }
        
        .light-mode .signout-button {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .dark-mode .signout-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .signout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .hero-flex {
          margin-top: -50px;
        }
        
        .widget-container-section {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 500;
          width: 100%;
          max-width: 800px;
          padding: 0 10px;
        }
        
        .widget-wrapper {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          
        }
        
        .widget-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-width: 100px;
          flex: 1;
          max-width: 120px;
        }
        
        .light-mode .widget-item {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #333;
        }
        
        .dark-mode .widget-item {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }
        
        .widget-item:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateY(-3px);
        }
        
        .light-mode .widget-item:hover {
          background: rgba(102, 126, 234, 0.3);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .dark-mode .widget-item:hover {
          background: rgba(102, 126, 234, 0.2);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }
        
        .widget-icon {
          font-size: 1.4rem;
          margin-bottom: 6px;
          display: block;
        }
        
        .widget-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: white;
          margin-bottom: 4px;
        }
        
        .light-mode .widget-label {
          color: #333;
        }
        
        .dark-mode .widget-label {
          color: white;
        }
        
        .widget-subtitle {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.2;
        }
        
        .light-mode .widget-subtitle {
          color: rgba(0, 0, 0, 0.6);
        }
        
        .dark-mode .widget-subtitle {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .service-note {
          position: fixed;
          top: 70px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          z-index: 500;
        }
        
        .light-mode .service-note {
          background: rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.7);
        }
        
        .dark-mode .service-note {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
        }
        
        .hero-wrapper {
          position: relative;
          z-index: 1;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .hero-thumb-wrapper {
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 100;
        }
        
        .hero-thumb-wrapper:hover {
          transform: scale(1.05);
        }
        
        .hero-trigger-flex {
          position: fixed;
          bottom: 40px;
          right: 40px;
          display: flex;
          gap: 15px;
          z-index: 50;
        }
        
        .hero-image-wrapper {
          position: relative;
          z-index: 50;
          width: 120px;
          height: 80px;
        }
        
        .hero-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        
        /* Main hero images positioning */
        .hero-image-01, .hero-image-02, .hero-image-03 {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -2;
          transition: opacity 0.5s ease;
        }
        
        /* Hide problematic decorative elements globally */
        .curve, .hero-side-cut, .corner-lines, .absolute-left, .absolute-right,
        .transition, .blur-wrapper, .background {
          display: none !important;
        }
        
        /* Desktop image switcher - positioned in top-center for better mobile compatibility */
        .desktop-image-switcher {
          display: flex;
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          gap: 12px;
          z-index: 100;
          flex-direction: row;
        }
        
        .desktop-thumb {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          object-fit: cover;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
        }
        
        .desktop-thumb.active {
          border: 2px solid #667eea;
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .desktop-thumb:hover {
          transform: scale(1.03);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        /* For very small screens in desktop mode */
        @media (max-width: 600px) {
          .desktop-image-switcher {
            top: 15px;
            gap: 8px;
          }
          
          .desktop-thumb {
            width: 50px;
            height: 50px;
            border-radius: 8px;
          }
        }
        
        /* For medium screens in desktop mode */
        @media (min-width: 601px) and (max-width: 1024px) {
          .desktop-image-switcher {
            top: 18px;
            gap: 10px;
          }
          
          .desktop-thumb {
            width: 60px;
            height: 60px;
          }
        }
        
        .mobile-image-switcher {
          display: none;
        }
        
        /* ORIGINAL MOBILE STYLES for 501px-990px */
        @media (max-width: 990px) {
          .hero-trigger-flex {
            bottom: 180px;
            right: 50%;
            transform: translateX(50%);
            gap: 10px;
            justify-content: center;
          }
          
          .hero-image-wrapper {
            width: 80px;
            height: 50px;
          }
          
          .widget-wrapper {
            gap: 10px;
            margin-top: 40px;
            position: relative;
            
          }
          
          .widget-item {
            min-width: 80px;
            max-width: 100px;
            padding: 2px 2px;
          }
          
          .widget-icon {
            font-size: 1.2rem;
          }
          
          .widget-label {
            font-size: 0.6rem;
          }
          
          .widget-subtitle {
            font-size: 0.55rem;
          }
          
          .typing-container {
            font-size: clamp(1.2rem, 3vw, 2rem);
            font-weight: 500;
            margin: 2rem 0;
            color: #667eea;
            min-height: 2.5rem;
            margin-left: -50px;
            position: relative;
            bottom: 120px;
          }
          
          .hero-text {
            font-size: clamp(3rem, 10vw, 4rem) !important;
            bottom: 100px;
          }
        }

        /* NEW MOBILE LAYOUT - ONLY for screens ≤500px */
        @media (max-width: 500px) {
          .desktop-image-switcher {
            display: none !important;
          }
          
          * {
            margin: 0;
            padding: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }

          .hero-section {
            height: 100vh;
            height: 100dvh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
          }

          .hero-container {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            max-width: none;
          }

          .hero-wrapper {
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
            justify-content: flex-start;
            display: flex;
            flex-direction: column;
          }

          /* Image Section - Takes 70% of screen */
          .hero-flex {
            flex: 0 0 70%;
            justify-content: center;
            align-items: center;
            margin: 60px 0 0 0;
            padding: 0;
            position: relative;
            z-index: 10;
            width: 100%;
          }

          /* Widget Section - Takes bottom 30% */
          .widget-container-section {
            position: relative;
            bottom: auto;
            left: auto;
            transform: none;
            flex: 0 0 30%;
            width: 100vw;
            max-width: none;
            margin: 0;
            padding: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
          }
          
          .widget-wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            width: 100%;
            max-width: none;
            padding: 0 15px;
            margin: 0;
          }
          
          .widget-item {
            min-height: 65px;
            padding: 8px 4px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            margin: 0;
            max-width: none;
            flex: none;
          }
          
          .widget-icon {
            font-size: 1rem;
            margin-bottom: 4px;
          }
          
          .widget-label {
            font-size: 0.55rem;
          }
          
          .widget-subtitle {
            font-size: 0.45rem;
          }

          .typing-container {
            margin: 0.5rem 0;
            padding: 0;
            margin-left: 0;
            bottom: auto;
          }
          
          .hero-text {
            margin: 0 0 1rem 0;
            padding: 0;
            bottom: auto;
          }

          .signout-button {
            position: fixed;
            top: 15px;
            right: 15px;
            padding: 8px 14px;
            font-size: 0.75rem;
            z-index: 20;
          }

          .service-note {
            position: fixed;
            top: 60px;
            right: 15px;
            font-size: 1rem;
            padding: 4px 8px;
            z-index: 20;
          }

          /* Background images for mobile - cover top 70% full width */
          .hero-image-01, .hero-image-02, .hero-image-03 {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 70vh !important;
            object-fit: cover !important;
            z-index: -1 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Hide desktop thumbnail elements and decorative elements */
          .hero-trigger-flex, .hero-image-wrapper, .hero-thumb-wrapper, 
          .curve, .hero-side-cut, .socials-wrapper, .corner-lines,
          .transition, .blur-wrapper, .absolute-left, .absolute-right,
          .background {
            display: none !important;
          }
          
          /* Show mobile image switcher */
          .mobile-image-switcher {
            display: flex;
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            gap: 10px;
            z-index: 15;
          }
          
          .mobile-thumb {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.3s ease;
          }
          
          .mobile-thumb.active {
            border: 2px solid #667eea;
            transform: scale(1.1);
          }
          
          .mobile-thumb:hover {
            transform: scale(1.05);
          }
        }
      `}</style>

      <section className={`hero-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="w-layout-blockcontainer hero-container w-container">
          <div className="hero-wrapper">
            
            {/* Desktop image switcher - visible on larger screens */}
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
            
            {/* Mobile image switcher - only visible on small screens */}
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
              <h1 
                data-w-id="74fbe194-5b66-535e-4a21-3fe948fbb34d" 
                className="hero-text" 
                style={{opacity: 1, transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d'}}
              >
                SHIVASHANKER
              </h1>
              
              {/* Role typing animation */}
              <div className="typing-container">
                {text}<span className="cursor">|</span>
              </div>
            </div>
            
            {/* Main hero backgrounds - changes based on currentImageIndex */}
            <img 
              src={heroImages[0]} 
              loading="lazy" 
              alt="Hero image 1" 
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 456px, 100vw" 
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
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 456px, 100vw" 
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
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 456px, 100vw" 
              className="hero-image-03" 
              style={{
                opacity: currentImageIndex === 2 ? 1 : 0,
                zIndex: currentImageIndex === 2 ? -1 : -2
              }} 
            />
            
            <img loading="eager" src="https://cdn.prod.website-files.com/67de676f1c598cfa54564c7a/6816082703b8cabc97aef253_SideCutout.svg" alt="hexagon" className="hero-side-cut" style={{display: 'none'}} />
          
            
            <div className="corner-lines absolute" style={{display: 'none'}}></div>

            {/* Sign out button in corner */}
            <button onClick={handleSignOut} className="signout-button">
              Sign Out
            </button>

            {/* Widgets moved to bottom center of the container */}
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
    </>
  );
};

export default HomePage;