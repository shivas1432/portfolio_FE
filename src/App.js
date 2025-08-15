import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import './css/App.css';
import './css/themes.css';
import './css/assistant.css'; // Updated assistant CSS
import './css/interactive-bot-face.css'; // New bot CSS
import './css/voice-ui.css'; // Updated voice UI CSS
import './css/bot-hunger-system.css'; // NEW: Hunger system CSS
import AppRoutes from './routes/AppRoutes';
import HeroSection from './components/HeroSection';
import PortfolioAssistant from './components/PortfolioAssistant'; // New bot component

// Create a wrapper component to access theme context and location
function AppContent() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [guestName, setGuestName] = useState(null);
  const [currentPage, setCurrentPage] = useState('portfolio');

  // Detect current page based on route - Updated for all routes
  useEffect(() => {
    const path = location.pathname;
    
    // Exact route matching for all pages
    if (path === '/about') setCurrentPage('about');
    else if (path === '/skills') setCurrentPage('skills');
    else if (path === '/projects') setCurrentPage('projects');
    else if (path === '/github-projects') setCurrentPage('github-projects');
    else if (path === '/contact') setCurrentPage('contact');
    else if (path === '/services') setCurrentPage('services');
    else if (path === '/resume') setCurrentPage('resume');
    else if (path === '/references') setCurrentPage('references');
    else if (path === '/add-references') setCurrentPage('add-references');
    else if (path.startsWith('/edit-reference')) setCurrentPage('edit-reference');
    else if (path === '/blogs') setCurrentPage('blogs');
    else if (path === '/news') setCurrentPage('news');
    else if (path === '/uc') setCurrentPage('uc');
    else if (path === '/login') setCurrentPage('login');
    else if (path === '/register') setCurrentPage('register');
    else setCurrentPage('portfolio');
  }, [location]);

  useEffect(() => {
    const storedGuestName = localStorage.getItem('guestName');
    if (storedGuestName) {
      setGuestName(storedGuestName);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setError(null);
    setGuestName(null);
    localStorage.removeItem('guestName');
  };

  const handleLogout = () => {
    setUser(null);
    setGuestName(null);
    localStorage.removeItem('guestName');
  };

  const handleGuestAccessGranted = (name) => {
    setGuestName(name);
    localStorage.setItem('guestName', name);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Show HeroSection if no user or guestName */}
      {!user && !guestName ? (
        <HeroSection onSuccess={handleGuestAccessGranted} />
      ) : (
        <>
          <Layout user={user || guestName} onLogout={handleLogout}>
            <AppRoutes
              user={user}
              guestName={guestName}
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              handleGuestAccessGranted={handleGuestAccessGranted}
              handleError={handleError}
            />
          </Layout>
          
          {/* Add Portfolio Assistant Bot to every page */}
          <PortfolioAssistant currentPage={currentPage} />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;