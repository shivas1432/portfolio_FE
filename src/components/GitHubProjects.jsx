import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import '../css/GitHubProjects.css';

const GitHubProjects = () => {
  const [favoriteRepos, setFavoriteRepos] = useState([]);
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_USERNAME = 'shivas1432';
  const GITHUB_API_BASE = 'https://api.github.com';

  // Your favorite repositories list
  const FAVORITE_REPO_NAMES = [
    'NHS-Appointment-Optimization',
    'UK-Grocery-Price-Comparison-App',
    'UK-NutriHealth-AI',
    'Sign_Gesture_Speak',
    'python-projects',
    'UI-Paradise',
    'Website_Templates',
    'Interactive-3D-WebDesigns',
    'Animated-Designs',
    'boilerplate-codes',
    'Interactive-3D-Website-Templates',
    'Projects_Hub',
    'terminal-replica',
    'netflix-replica',
    'gemini-replica',
    'Resources-Every-Developer-Need',
    'AIBuddy',
    'Studymate_AI',
    'car_wash_booking_system_FE'
  ];

  // GitHub API headers
  const getHeaders = () => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;
    }
    
    return headers;
  };

  // Fetch GitHub user stats
  const fetchGitHubStats = async () => {
    // Simple stats - no complex API calls needed for basic display
    return true;
  };

  // Fetch repositories
  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all repositories
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        { headers: getHeaders() }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }

      const repos = await response.json();
      const ownRepos = repos.filter(repo => !repo.fork);
      
      setTotalRepos(ownRepos.length);

      // Filter favorite repositories
      const favorites = ownRepos.filter(repo => 
        FAVORITE_REPO_NAMES.includes(repo.name)
      );

      // Sort favorites by the order in FAVORITE_REPO_NAMES
      const sortedFavorites = FAVORITE_REPO_NAMES
        .map(name => favorites.find(repo => repo.name === name))
        .filter(repo => repo !== undefined);

      setFavoriteRepos(sortedFavorites);

    } catch (err) {
      setError(err.message);
      console.error('Error fetching repositories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Get primary language color
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      Shell: '#89e051',
      Vue: '#2c3e50',
      React: '#61dafb',
      'Jupyter Notebook': '#DA5B0B',
      SCSS: '#c6538c'
    };
    return colors[language] || '#6e7681';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle repository click
  const handleRepoClick = (repoUrl) => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle GitHub profile click
  const handleGitHubProfileClick = () => {
    window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="github-projects-container">
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <p>Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-projects-container">
        <div className="error-container">
          <h2>Unable to load repositories</h2>
          <p>{error}</p>
          <button onClick={fetchRepositories} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="github-projects-container">
      {/* GitHub Profile Link Section */}
      <div className="github-analytics">
        <div className="analytics-header">
          <FaGithub className="github-icon-header" />
          <div className="analytics-title">
            <h2>GitHub Analytics</h2>
            <p>View detailed analytics and contribution history on my GitHub profile</p>
          </div>
          <button 
            className="view-analytics-btn"
            onClick={handleGitHubProfileClick}
          >
            <FaGithub />
            <span>View GitHub Analytics</span>
            <FaExternalLinkAlt />
          </button>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="repositories-section">
        <div className="repos-header">
          <div className="header-content">
            <FaGithub className="github-icon" />
            <div className="header-text">
              <h1>My Favorite Repositories</h1>
              <p className="repo-count">
                Showing {favoriteRepos.length} favorite repos out of {totalRepos} total repositories
              </p>
            </div>
          </div>
          
          <button 
            className="github-profile-btn"
            onClick={handleGitHubProfileClick}
          >
            <FaGithub />
            <span>Watch more on GitHub</span>
            <FaExternalLinkAlt className="external-icon" />
          </button>
        </div>

        <div className="repositories-grid">
          {favoriteRepos.map((repo) => (
            <div
              key={repo.id}
              className="repository-card"
              onClick={() => handleRepoClick(repo.html_url)}
            >
              <div className="repo-header">
                <h3 className="repo-name">
                  {repo.name}
                  <FaExternalLinkAlt className="repo-external-icon" />
                </h3>
              </div>

              <p className="repo-description">
                {repo.description || 'A carefully crafted project showcasing modern development practices and innovative solutions.'}
              </p>

              <div className="repo-footer">
                <div className="repo-languages">
                  {repo.language && (
                    <span 
                      className="language-tag"
                      style={{ 
                        backgroundColor: getLanguageColor(repo.language) + '20',
                        color: getLanguageColor(repo.language),
                        borderColor: getLanguageColor(repo.language)
                      }}
                    >
                      <span 
                        className="language-dot"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      ></span>
                      {repo.language}
                    </span>
                  )}
                </div>
                <span className="repo-updated">
                  Updated {formatDate(repo.updated_at)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {favoriteRepos.length === 0 && (
          <div className="no-repos">
            <p>Loading your favorite repositories...</p>
            <button onClick={handleGitHubProfileClick} className="view-all-btn">
              View all repositories on GitHub
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubProjects;