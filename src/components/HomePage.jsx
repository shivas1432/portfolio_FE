import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { WiTime3, WiDayCloudyGusts } from 'react-icons/wi';
import { BsCalendarDate } from 'react-icons/bs';
import { MdAccessTimeFilled } from 'react-icons/md';
import { FaNewspaper } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import '../css/HomePage.css';
import '../css/styles.css';


const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
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
  
  // Use useMemo to wrap the developerRoles array
  const developerRoles = useMemo(() => [
    "full-stack web developer",
    "react developer",
    "frontend developer",
    "backend developer",
    "UI/UX developer"
  ], []);

  const { isDarkMode, toggleTheme } = useTheme();

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

    createParallaxItems();
    document.addEventListener('mousemove', moveParallax);

    return () => {
      document.removeEventListener('mousemove', moveParallax);
      clearInterval(timeInterval);
    };
  }, []);

  // Completely rewritten typing animation
  useEffect(() => {
    // Calculate the current string being processed
    const currentIndex = loopNum % developerRoles.length;
    const fullText = developerRoles[currentIndex];
    
    // Set up the timer for typing/deleting
    let timer;
    
    if (isDeleting) {
      // If we're deleting, shorten the text
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, typingSpeed);
      
      // If text is deleted, start typing the next one
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    } else {
      // If we're typing, extend the text
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, typingSpeed);
      
      // If text is fully typed, pause then start deleting
      if (text === fullText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }
    
    // Clean up timer
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, developerRoles, typingSpeed]);

  const createParallaxItems = () => {
    const parallax = document.getElementById('parallax');
    if (parallax) {
      // Clear any existing items first
      while (parallax.firstChild) {
        parallax.removeChild(parallax.firstChild);
      }
      
      for (let i = 0; i < 10; i++) {
        const size = Math.random() * 200 + 50;
        const item = document.createElement('div');
        item.classList.add('parallax-item');
        item.style.width = `${size}px`;
        item.style.height = `${size}px`;
        item.style.left = `${Math.random() * 100}%`;
        item.style.top = `${Math.random() * 100}%`;
        item.style.opacity = Math.random() * 0.3;
        parallax.appendChild(item);
      }
    }
  };

  const moveParallax = (e) => {
    const items = document.querySelectorAll('.parallax-item');
    const { clientX: x, clientY: y } = e;
    items.forEach((item, i) => {
      const speed = 0.01 + (i * 0.005);
      item.style.transform = `translate(${(window.innerWidth / 2 - x) * speed}px, ${(window.innerHeight / 2 - y) * speed}px)`;
    });
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return '☀️ Good Morning!';
    if (currentHour < 17) return '🌞 Good Afternoon!';
    return '🌃 Good Evening!';
  };

  const handleSignOut = () => {
    onLogout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className="landing-page">
        <div className="name-title animated-title">
          <h1 className="glowing-text">Hi, I'm</h1>
          <h2 className="animated-name">SHIVASHANKER</h2>
          <div className="role-container">
            <p className="role-text typing">
              {text}<span className="cursor">|</span>
            </p>
          </div>
          <button onClick={handleSignOut} className="custom-button">Sign Out</button>
        </div>

        <div className="widget-container-section">
          <div className="widget-wrapper">
            <div className="widget-row single-row">
              <div className="widget-item" onClick={() => window.location.href = '/news'}>
                <div className="widget-icon"><FaNewspaper /></div>
                <div className="widget-label">NEWS</div>
                <div className="widget-subtitle">Fresh News</div>
              </div>

              <div className="widget-item" onClick={() => window.location.href = '/weather'}>
                <div className="widget-icon"><WiDayCloudyGusts /></div>
                <div className="widget-label">Weather</div>
                <div className="widget-subtitle">Live Weather</div>
              </div>

              <div className="widget-item">
                <div className="widget-icon"><WiTime3 /></div>
                <div className="widget-label">TIME</div>
                <div className="widget-subtitle">{currentTime}<br /><span>{getGreeting()}</span></div>
              </div>

              <div className="widget-item">
                <div className="widget-icon"><BsCalendarDate /></div>
                <div className="widget-label">DATE</div>
                <div className="widget-subtitle">{currentDate}<br />{currentDay}</div>
              </div>

              <div className="widget-item" onClick={toggleTheme}>
                <div className="widget-icon">{isDarkMode ? '🌙' : '☀️'}</div>
                <div className="widget-label">THEME</div>
                <div className="widget-subtitle">{isDarkMode ? 'Night Mode' : 'Day Mode'}</div>
              </div>

              <div className="widget-item">
                <div className="widget-icon"><MdAccessTimeFilled /></div>
                <div className="widget-label">BATTERY</div>
                <div className="widget-subtitle">{isCharging ? 'Charging' : 'Battery'} {batteryPercentage}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="parallax" id="parallax"></div>
    </div>
  );
};

export default HomePage;