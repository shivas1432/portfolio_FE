import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSpinner, FaPlay, FaStar } from 'react-icons/fa';
import '../css/GitHubProjects.css';

const GitHubProjects = () => {
  const [favoriteRepos, setFavoriteRepos] = useState([]);
  const [otherRepos, setOtherRepos] = useState([]);
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_USERNAME = 'shivas1432';
  const GITHUB_API_BASE = 'https://api.github.com';

  // Your favorite repositories list (maintaining original order)
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

  // Manual creation dates for each repository
  const FAVORITE_REPOS_WITH_DATES = {
    // Everything else - March 2024 to April 2025
    'NHS-Appointment-Optimization': '2024-08-15',
    'UK-Grocery-Price-Comparison-App': '2024-09-22',
    'UK-NutriHealth-AI': '2024-10-18',
    'Sign_Gesture_Speak': '2024-07-10',
    'python-projects': '2024-06-25',
    'Projects_Hub': '2024-11-30',
    'AIBuddy': '2025-01-15',
    'Studymate_AI': '2025-02-20',
    'car_wash_booking_system_FE': '2025-03-28',
    
    // Website Templates, UI Paradise, Boilerplate, Resources - Sept 2023 to May 2024
    'UI-Paradise': '2023-10-30',
    'Website_Templates': '2023-09-25',
    'Interactive-3D-WebDesigns': '2024-01-28',
    'Animated-Designs': '2024-02-14',
    'boilerplate-codes': '2024-03-18',
    'Interactive-3D-Website-Templates': '2024-04-05',
    'Resources-Every-Developer-Need': '2024-05-12',
    
    // Replicas - Sept 2023 to Jan 2024
    'terminal-replica': '2023-10-15',
    'netflix-replica': '2023-11-20',
    'gemini-replica': '2024-01-10'
  };

  // Demo links for each repository - you can replace these with actual links
  const DEMO_LINKS = {
    'NHS-Appointment-Optimization': 'https://demo-nhs-appointment.vercel.app',
    'UK-Grocery-Price-Comparison-App': 'https://uk-grocery-price-comparison-app.netlify.app/',
    'UK-NutriHealth-AI': 'https://demo-nutrihealth.herokuapp.com',
    'Sign_Gesture_Speak': 'https://signgesture.netlify.app/',
    'python-projects': 'https://github.com/shivas1432/python-projects',
    'UI-Paradise': 'https://www.instagram.com/ss_web_innovations/',
    'Website_Templates': 'https://shivashanker.com/projects',
    'Interactive-3D-WebDesigns': 'https://www.instagram.com/ss_web_innovations/',
    'Animated-Designs': 'https://www.instagram.com/ss_web_innovations/',
    'boilerplate-codes': 'https://api-boilerplate-code-generator.netlify.app/',
    'Interactive-3D-Website-Templates': 'https://shivashanker.com/projects',
    'Projects_Hub': 'https://github.com/shivas1432/Projects_Hub.git',
    'terminal-replica': 'https://terminal-replica-demo.vercel.app',
    'netflix-replica': 'https://netflix-replica-demo.netlify.app',
    'gemini-replica': 'https://gemini-replica-demo.vercel.app',
    'Resources-Every-Developer-Need': 'https://github.com/shivas1432/Resources-Every-Developer-Need.git',
    'AIBuddy': 'https://github.com/shivas1432/AIBuddy.git',
    'Studymate_AI': 'https://studymatee-ai.netlify.app/',
    'car_wash_booking_system_FE': 'https://carwash-booking-demo.vercel.app'
  };

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

      // Separate favorite and other repositories
      const favorites = [];
      const others = [];

      ownRepos.forEach(repo => {
        const enhancedRepo = {
          ...repo,
          manual_created_at: FAVORITE_REPOS_WITH_DATES[repo.name] || repo.created_at,
          demo_link: DEMO_LINKS[repo.name],
          is_favorite: FAVORITE_REPO_NAMES.includes(repo.name)
        };

        if (FAVORITE_REPO_NAMES.includes(repo.name)) {
          favorites.push(enhancedRepo);
        } else {
          others.push(enhancedRepo);
        }
      });

      // Sort favorites by the order in FAVORITE_REPO_NAMES
      const sortedFavorites = FAVORITE_REPO_NAMES
        .map(name => favorites.find(repo => repo.name === name))
        .filter(repo => repo !== undefined);

      // Sort other repositories by updated date (most recent first)
      const sortedOthers = others.sort((a, b) => 
        new Date(b.updated_at) - new Date(a.updated_at)
      );

      setFavoriteRepos(sortedFavorites);
      setOtherRepos(sortedOthers);

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

  // Handle demo click
  const handleDemoClick = (e, demoUrl) => {
    e.stopPropagation(); // Prevent card click event
    window.open(demoUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle GitHub profile click
  const handleGitHubProfileClick = () => {
    window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank', 'noopener,noreferrer');
  };

  // Repository Card Component
  const RepositoryCard = ({ repo, isFavorite = false }) => (
    <div
      key={repo.id}
      className={`repository-card ${isFavorite ? 'favorite-repo' : 'other-repo'}`}
      onClick={() => handleRepoClick(repo.html_url)}
    >
      <div className="repo-header">
        <h3 className="repo-name">
          {isFavorite && <FaStar className="favorite-icon" />}
          {repo.name}
          <FaExternalLinkAlt className="repo-external-icon" />
        </h3>
      </div>

      <p className="repo-description">
        {repo.description || 'A carefully crafted project showcasing modern development practices and innovative solutions.'}
      </p>

      <div className="repo-footer">
        <div className="repo-actions">
          {repo.demo_link && (
            <button 
              className="demo-btn"
              onClick={(e) => handleDemoClick(e, repo.demo_link)}
            >
              <FaPlay className="demo-icon" />
              <span>Live Demo</span>
            </button>
          )}
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
          {isFavorite ? 'Created' : 'Updated'} {formatDate(isFavorite ? repo.manual_created_at : repo.updated_at)}
        </span>
      </div>
    </div>
  );

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

      {/* Favorite Repositories Section */}
      <div className="repositories-section">
        <div className="repos-header">
          <div className="header-content">
            <FaStar className="star-icon" />
            <div className="header-text">
              <h1>Featured Repositories</h1>
              <p className="repo-count">
                My {favoriteRepos.length} favorite and most impactful projects
              </p>
            </div>
          </div>
          
          <button 
            className="github-profile-btn"
            onClick={handleGitHubProfileClick}
          >
            <FaGithub />
            <span>View GitHub Profile</span>
            <FaExternalLinkAlt className="external-icon" />
          </button>
        </div>

        <div className="repositories-grid">
          {favoriteRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} isFavorite={true} />
          ))}
        </div>
      </div>

      {/* Other Repositories Section */}
      {otherRepos.length > 0 && (
        <div className="repositories-section other-repos-section">
          <div className="repos-header">
            <div className="header-content">
              <FaGithub className="github-icon" />
              <div className="header-text">
                <h1>Other Repositories</h1>
                <p className="repo-count">
                  Showing {otherRepos.length} additional repositories • Total: {totalRepos} repositories
                </p>
              </div>
            </div>
          </div>

          <div className="repositories-grid">
            {otherRepos.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} isFavorite={false} />
            ))}
          </div>
        </div>
      )}

      {favoriteRepos.length === 0 && otherRepos.length === 0 && (
        <div className="no-repos">
          <p>Loading your repositories...</p>
          <button onClick={handleGitHubProfileClick} className="view-all-btn">
            View all repositories on GitHub
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubProjects;