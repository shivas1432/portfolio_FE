import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import './css/App.css';
import './css/themes.css'; // Import the new theme CSS file
import AppRoutes from './routes/AppRoutes';
import HeroSection from './components/HeroSection';

// Create a wrapper component to access theme context
function AppContent() {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [guestName, setGuestName] = useState(null);

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
    <Router>
      <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        {error && <div className="alert alert-danger">{error}</div>}
        
        {/* Show HeroSection if no user or guestName */}
        {!user && !guestName ? (
          <HeroSection onSuccess={handleGuestAccessGranted} />
        ) : (
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
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;