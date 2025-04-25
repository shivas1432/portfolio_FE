import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaGraduationCap, FaSchool, FaUniversity, FaBookOpen } from 'react-icons/fa';
import '../css/AboutMe.css';
import Skills from '../components/skills'; // Import the Skills component

// No more MapContainer or react-leaflet components

const AboutMe = () => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [details, setDetails] = useState('');
  const [bgClass, setBgClass] = useState('');
  const [activeLocation, setActiveLocation] = useState(null);
  
  // Reference to the map container DOM element
  const mapContainerRef = useRef(null);
  // Reference to the Leaflet map instance
  const mapInstanceRef = useRef(null);
  // Reference to the marker
  const markerRef = useRef(null);
  // Reference to the popup
  const popupRef = useRef(null);

  const locations = [
    {
      id: 'schooling',
      name: 'Schooling',
      grade: '95%',
      place: 'Little Soldier High School, Warangal',
      country: 'India',
      details: 'General Education',
      coords: { lat: 17.9805, lng: 79.5696 },
      bgClass: 'schooling-bg',
      icon: <FaSchool />,
    },
    {
      id: 'highschool',
      name: '12th Grade',
      grade: '94%',
      place: 'SR JUNIOR COLLEGE, Hanamkonda',
      country: 'India',
      details: 'MPC',
      coords: { lat: 18.007202, lng: 79.558296 },
      bgClass: 'highschool-bg',
      icon: <FaBookOpen />,
    },
    {
      id: 'bachelors',
      name: "Bachelor's Degree",
      grade: '65%',
      place: 'VAAGDEVI ENGINEERING COLLEGE, Warangal',
      country: 'India',
      details: 'Computer Science',
      coords: { lat: 17.8897, lng: 79.6009 },
      bgClass: 'bachelors-bg',
      icon: <FaGraduationCap />,
    },
    {
      id: 'masters',
      name: "Master's Degree",
      grade: '65%',
      place: 'CARDIFF METROPOLITAN UNIVERSITY, Cardiff',
      country: 'UK',
      details: 'Advanced Computer Science',
      coords: { lat: 51.481583, lng: -3.179090 },
      bgClass: 'masters-bg',
      icon: <FaUniversity />,
    },
  ];

  // Custom marker icon (created once)
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'pulse-marker'
  });

  // Initialize the map
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize map only if container exists and map doesn't
      const map = L.map(mapContainerRef.current, {
        center: [location.lat, location.lng],
        zoom: 13,
        zoomControl: false
      });
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);
      
      // Create marker and popup but don't add content yet
      const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(map);
      const popup = L.popup().setContent(`<div class="custom-popup">
        <div>${details || 'Select a location to view details'}</div>
      </div>`);
      
      marker.bindPopup(popup);
      
      // Save references
      mapInstanceRef.current = map;
      markerRef.current = marker;
      popupRef.current = popup;
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Properly destroy the map when component unmounts
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
        popupRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Update map when location changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && popupRef.current) {
      // Update marker position
      markerRef.current.setLatLng([location.lat, location.lng]);
      
      // Update popup content
      popupRef.current.setContent(`<div class="custom-popup">
        <div>${details || 'Select a location to view details'}</div>
      </div>`);
      
      // Pan the map to the new location
      mapInstanceRef.current.setView([location.lat, location.lng], 13, {
        animate: true,
        duration: 1
      });
    }
  }, [location, details]);

  useEffect(() => {
    // Initial animation
    const sections = document.querySelectorAll('.animate-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleLocationClick = (location) => {
    setLocation(location.coords);
    setDetails(
      `<b>Place:</b> ${location.place} <br/>
       <b>Country:</b> ${location.country} <br/>
       <b>Course Details:</b> ${location.details}<br/>
       <b>Grade:</b> ${location.grade} `
    );
    setBgClass(location.bgClass);
    setActiveLocation(location.id);
    
    // Smooth scroll to map
    document.querySelector('.map-details-container').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const techStack = [
    // Frontend
    { name: 'HTML5', icon: 'html5', color: 'text-orange-500' },
    { name: 'CSS3', icon: 'css3-alt', color: 'text-blue-500' },
    { name: 'JavaScript (ES6+)', icon: 'js', color: 'text-yellow-500' },
    { name: 'React.js', icon: 'react', color: 'text-cyan-400' },
    { name: 'Bootstrap', icon: 'bootstrap', color: 'text-primary' },
    { name: 'jQuery', icon: 'js', color: 'text-blue-600' },
    { name: 'SASS', icon: 'sass', color: 'text-pink-500' },
    { name: 'EJS', icon: 'code', color: 'text-blue-700' },
  
    // Backend
    { name: 'Node.js', icon: 'node', color: 'text-green-500' },
    { name: 'Express.js', icon: 'server', color: 'text-gray-400' },
    { name: 'RESTful APIs', icon: 'code-branch', color: 'text-purple-500' },
    { name: 'MySQL', icon: 'database', color: 'text-red-500' },
    { name: 'MongoDB', icon: 'database', color: 'text-green-600' },
    { name: 'PostgreSQL (Basic)', icon: 'database', color: 'text-blue-500' },
  
    // Authentication & Security
    { name: 'Passport.js', icon: 'shield-alt', color: 'text-yellow-700' },
    { name: 'JWT (JSON Web Tokens)', icon: 'key', color: 'text-gray-700' },
    { name: 'OAuth 2.0', icon: 'lock', color: 'text-blue-500' },
    { name: 'bcrypt', icon: 'lock', color: 'text-gray-500' },
  
    // Cloud & Hosting
    { name: 'Google Cloud (GCP)', icon: 'cloud', color: 'text-blue-400' },
    { name: 'AWS (EC2)', icon: 'cloud', color: 'text-orange-500' },
    { name: 'Render', icon: 'cloud', color: 'text-gray-700' },
    { name: 'Netlify', icon: 'cloud', color: 'text-teal-500' },
    { name: 'Vercel', icon: 'cloud', color: 'text-white' },
    { name: 'InfinityFree', icon: 'cloud', color: 'text-green-500' },
  
    // Tools & Platforms
    { name: 'Git', icon: 'git-alt', color: 'text-red-500' },
    { name: 'GitHub', icon: 'github', color: 'text-white' },
    { name: 'Postman', icon: 'paper-plane', color: 'text-orange-500' },
    { name: 'Visual Studio Code', icon: 'code', color: 'text-blue-500' },
    { name: 'NPM', icon: 'npm', color: 'text-green-500' },
    { name: 'Heroku', icon: 'cloud', color: 'text-purple-500' },
  
    // Programming Languages
    { name: 'Python', icon: 'python', color: 'text-blue-500' },
    { name: 'Java', icon: 'java', color: 'text-red-500' },
    { name: 'C/C++ (Basics)', icon: 'file-code', color: 'text-blue-500' },
  ];
  

  return (
    <div className="about-me">
      {/* New Hero Section - Dark Theme */}
      <div className="hero-section-dark animate-section">
        <div className="hero-title">
          <h1>About Me</h1>
        </div>
        
        <div className="hero-content">
          <div className="hero-profile">
            <div className="profile-image-container">
              <img src="/images/3.png" alt="Profile" className="profile-image" />
            </div>
            
            <div className="profile-description">
              <h2>I'm a passionate Full-Stack Developer who loves building dynamic, user-friendly applications.</h2>
              <p>I thrive on solving problems, creating seamless experiences, and continuously expanding my skills. Always eager to learn and grow, I'm currently looking for new opportunities to contribute and innovate.</p>
              <div className="location-indicator">
                <FaMapMarkerAlt className="location-icon" />
                <span>Warangal, Telangana, India</span>
              </div>
            </div>
          </div>
          
          <div className="hero-sections">
            <div className="education-section">
              <h3>Education</h3>
              <div className="education-item">
                <div className="education-details">
                  <h4>Cardiff Metropolitan University</h4>
                  <p>Master of Science in Advanced Computer Science</p>
                </div>
                <div className="education-meta">
                  <span className="education-year">Sept 2022 – Jan2024 </span>
                  <span className="education-grade">Percentage: 65%</span>
                </div>
              </div>
             
              <div className="education-item">
                <div className="education-details">
                  <h4>Vaagdevi Engineering College</h4>
                  <p>Bachelor of Technology in Computer Science and Engineering</p>
                </div>
                <div className="education-meta">
                  <span className="education-year">Aug2016 – Dec2020 </span>
                  <span className="education-grade">Percentage: 68%</span>
                </div>
              </div>
              <div className="education-item">
                <div className="education-details">
                  <h4>SR Junior College</h4>
                  <p>Intermediate (12th Grade) </p>
                </div>
                <div className="education-meta">
                  <span className="education-year"> 2014 – 2016 </span>
                  <span className="education-grade">Percentage: 94%</span>
                </div>
              </div>
            </div>
            
            <div className="experience-section-dark">
              <h3>Experience</h3>
              <div className="experience-item">
                <div className="experience-details">
                  <h4>Backend Developer</h4>
                  <p>Infinite Tech Solutions, Pune</p>
                </div>
                <div className="experience-meta">
                  <span className="experience-period">Jan 2021 - Jun 2022</span>
                  <span className="experience-location">Hybrid</span>
                </div>
                <ul className="experience-achievements">
                  <li>Optimized backend systems using <strong>Node.js, Express.js, and Python (Django, Flask)</strong>, boosting response time by <strong>20%</strong>.</li>
                  <li>Integrated <strong>RESTful APIs</strong> to improve web-mobile communication, cutting latency by <strong>15%</strong>.</li>
                  <li>Designed <strong>MySQL databases</strong>, optimizing data handling and reducing query times by <strong>25%</strong>.</li>
                  <li>Enhanced service reliability under high traffic, improving uptime by <strong>30%</strong>.</li>
                  <li>Collaborated with teams to deliver seamless end-to-end solutions, speeding project delivery by <strong>15%</strong>.</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-details">
                  <h4>Data Analyst Intern</h4>
                  <p>Nexus Software System, Pune</p>
                </div>
                <div className="experience-meta">
                  <span className="experience-period">Nov 2019 – Nov 2020</span>
                  <span className="experience-location">Remote</span>
                </div>
                <ul className="experience-achievements">
                  <li>Streamlined data processing with <strong>Excel, SQL, and Python</strong>, boosting efficiency by <strong>30%</strong>.</li>
                  <li>Created dynamic dashboards with <strong>Power BI</strong> and <strong>Tableau</strong>, enhancing decision-making.</li>
                  <li>Optimized <strong>SQL queries</strong> for faster data retrieval, reducing query time by <strong>20%</strong>.</li>
                  <li>Automated reports using <strong>Python</strong> and <strong>Excel VBA</strong>, improving reporting speed by <strong>25%</strong>.</li>
                  <li>Collaborated with teams to provide actionable insights, improving project outcomes by <strong>15%</strong>.</li>
                </ul>
              </div>
            </div>
            
            <div className="tech-stack-section">
              <h3>Tech Stack</h3>
              
              {/* Skills Component Integration */}
              <div className="skills-visualization-container animate-section">
                <h4 className="tech-stack-subtitle">Interactive Skills Visualization</h4>
                <p className="tech-stack-description">Hover or tap to explore my skill categories</p>
                <Skills />
              </div>
              
              <div className="tech-grid">
                {techStack.map((tech, index) => (
                  <div key={index} className="tech-item">
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Education Journey Section */}
      <div className="education-journey animate-section">
        <div className="section-title">
          <h2>My Educational Journey</h2>
          <p>Click on any education stage to view its location on the interactive 3D map</p>
        </div>
        <div className="locations">
          {locations.map((loc) => (
            <div 
              key={loc.id} 
              className={`location-button ${activeLocation === loc.id ? 'active' : ''}`}
              onClick={() => handleLocationClick(loc)}
            >
              <div className="location-icon">{loc.icon}</div>
              <h3>{loc.name}</h3>
              <p>{loc.place}</p>
              <div className="view-map">
                <FaMapMarkerAlt />
                <span>View on Map</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map and Details Container */}
      <div className="map-details-container animate-section">
        <div className={`map-container ${bgClass}`}>
          <div className="map-overlay"></div>
          {/* Instead of MapContainer, we just use a div with a ref */}
          <div 
            ref={mapContainerRef} 
            style={{ width: '100%', height: '500px' }} 
            className="map-3d"
          ></div>
        </div>

        <div className="details-container">
          <div className="details-content">
            <h2>Location Details</h2>
            <div className="details-info" dangerouslySetInnerHTML={{ __html: details || 'Select a location from above to view details' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;