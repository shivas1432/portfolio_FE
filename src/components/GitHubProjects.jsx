import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSpinner, FaPlay, FaStar, FaCode, FaCopy, FaPalette, FaFolder, FaUser } from 'react-icons/fa';
import '../css/GitHubProjects.css';

const GitHubProjects = () => {
  const [favoriteRepos, setFavoriteRepos] = useState([]);
  const [allRepos, setAllRepos] = useState([]);
  const [categorizedRepos, setCategorizedRepos] = useState({});
  const [totalRepos, setTotalRepos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('fullstack'); // Default to first category

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

  // Repository categories configuration
  const REPOSITORY_CATEGORIES = {
    'fullstack': {
      title: 'Full Stack Applications',
      description: 'Complete web applications with frontend and backend integration',
      icon: FaCode,
      repos: [
        'NHS-Appointment-Optimization-',
        'UK-Grocery-Price-Comparison-App',
        'UK-Grocery-Price-Comparison-App1',
        'UK-NutriHealth-AI',
        'Sign_Gesture_Speak',
        'AIBuddy',
        'Studymate_AI',
        'car_wash_booking_system_FE',
        'python-projects',
        'Projects_Hub',
        'AI_VoiceCoach',
        'react_vapeshop_FE',
        'react_vapeshop_BE',
        'chat_react_FE',
        'chat_react_BE',
        'final_project_BE',
        'final_project_FE',
        'portfolio_FE',
        'portfolio_BE',
        'dashboard_BE',
        'dashboard_FE',
        'HelloBuddy',
        'SocialMedia_react_FE',
        'Socialmedia_react_BE',
        'IMAGE-to-RECIPE',
        'ShivaAnimix'
      ]
    },
    'replicas': {
      title: 'Application Replicas',
      description: 'Recreations of popular applications and platforms',
      icon: FaCopy,
      repos: [
        'terminal-replica',
        'netflix-replica',
        'gemini-replica',
        'instagram-replica',
        'spotify-replica',
        'Amezon_Replica'
      ]
    },
    'ui-designs': {
      title: 'Animated & UI Designs',
      description: 'Interactive designs, animations, and modern UI components',
      icon: FaPalette,
      repos: [
        'UI-Paradise',
        'Interactive-3D-WebDesigns',
        'Interactive-3D-Website-Templates',
        'Animated-Designs',
        'Animated-DesignsP1',
        'Animated-DesignsP2',
        'Animated-DesignsP3',
        'Animated-DesignsP4',
        'css-designs',
        'css-magic-collection',
        'Multiple-3D-Window',
        '404-template-designs'
      ]
    },
    'templates': {
      title: 'Templates & Resources',
      description: 'Reusable templates and developer resources',
      icon: FaFolder,
      repos: [
        'Website_Templates',
        'boilerplate-codes',
        'Boilerplate-codes-Web-App',
        'Resources-Every-Developer-Need',
        'formgenius',
        'CS-Notes-Hub',
        'JavaScript-Studio',
        'LeetCode_Company_Hub',
        'SandboxGUI',
        'PixelFlow',
        'weather-app',
        'portfolio'
      ]
    },
    'profile': {
      title: 'Personal Profile',
      description: 'GitHub profile and personal branding',
      icon: FaUser,
      repos: [
        'shivas1432'
      ]
    }
  };

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

  // Demo links for each repository - ONLY for featured repos
  const DEMO_LINKS = {
    'NHS-Appointment-Optimization': 'https://nhs-appointment-optimization.netlify.app/',
    'UK-Grocery-Price-Comparison-App': 'https://uk-grocery-price-comparison-app.netlify.app/',
    'UK-NutriHealth-AI': 'https://beamish-kashata-836ad2.netlify.app/',
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
    'AIBuddy': 'https://github.com/shivas1432/AIBuddy',
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

  // Categorize repositories
  const categorizeRepositories = (repos) => {
    const categorized = {};
    
    Object.keys(REPOSITORY_CATEGORIES).forEach(categoryKey => {
      const category = REPOSITORY_CATEGORIES[categoryKey];
      categorized[categoryKey] = repos.filter(repo => 
        category.repos.includes(repo.name)
      ).sort((a, b) => {
        // Sort by whether it's featured first, then by updated date
        const aIsFeatured = FAVORITE_REPO_NAMES.includes(a.name);
        const bIsFeatured = FAVORITE_REPO_NAMES.includes(b.name);
        
        if (aIsFeatured && !bIsFeatured) return -1;
        if (!aIsFeatured && bIsFeatured) return 1;
        
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
    });
    
    return categorized;
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

      // Enhanced repositories with demo links and favorite status
      const enhancedRepos = ownRepos.map(repo => ({
        ...repo,
        manual_created_at: FAVORITE_REPOS_WITH_DATES[repo.name] || repo.created_at,
        demo_link: DEMO_LINKS[repo.name], // Demo links only for featured repos
        is_favorite: FAVORITE_REPO_NAMES.includes(repo.name)
      }));

      setAllRepos(enhancedRepos);

      // Separate favorite repositories
      const favorites = FAVORITE_REPO_NAMES
        .map(name => enhancedRepos.find(repo => repo.name === name))
        .filter(repo => repo !== undefined);

      setFavoriteRepos(favorites);

      // Categorize all repositories
      const categorized = categorizeRepositories(enhancedRepos);
      setCategorizedRepos(categorized);

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
  const RepositoryCard = ({ repo, isFavorite = false, showFeaturedBadge = false }) => (
    <div
      key={repo.id}
      className={`repository-card ${isFavorite ? 'favorite-repo' : 'category-repo'} ${showFeaturedBadge && repo.is_favorite ? 'featured-in-category' : ''}`}
      onClick={() => handleRepoClick(repo.html_url)}
    >
      <div className="repo-header">
        <h3 className="repo-name">
          {isFavorite && <FaStar className="favorite-icon" />}
          {showFeaturedBadge && repo.is_favorite && <FaStar className="featured-badge" />}
          {repo.name}
          <FaExternalLinkAlt className="repo-external-icon" />
        </h3>
      </div>

      <p className="repo-description">
        {repo.description || 'A carefully crafted project showcasing modern development practices and innovative solutions.'}
      </p>

      <div className="repo-footer">
        <div className="repo-actions">
          {/* Show demo button only for featured repos */}
          {isFavorite && repo.demo_link && (
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
        {isFavorite && (
          <span className="repo-updated">
            Created {formatDate(repo.manual_created_at)}
          </span>
        )}
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

      {/* Categories Section */}
      <div className="repositories-section categories-section">
        <div className="repos-header">
          <div className="header-content">
            <FaFolder className="categories-icon" />
            <div className="header-text">
              <h1>Repository Categories</h1>
              <p className="repo-count">
                Browse all 75+ repositories organized by type and technology
              </p>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="category-navigation">
          {Object.keys(REPOSITORY_CATEGORIES).map(categoryKey => {
            const category = REPOSITORY_CATEGORIES[categoryKey];
            const IconComponent = category.icon;
            const repoCount = categorizedRepos[categoryKey]?.length || 0;
            
            return (
              <button
                key={categoryKey}
                className={`category-tab ${selectedCategory === categoryKey ? 'active' : ''}`}
                onClick={() => setSelectedCategory(categoryKey)}
              >
                <IconComponent className="category-icon" />
                <div className="category-info">
                  <span className="category-title">{category.title}</span>
                  <span className="category-count">{repoCount} repos</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Content */}
        {selectedCategory && categorizedRepos[selectedCategory] && (
          <div className="category-content">
            <div className="category-header">
              <div className="category-description">
                <h2>{REPOSITORY_CATEGORIES[selectedCategory].title}</h2>
                <p>{REPOSITORY_CATEGORIES[selectedCategory].description}</p>
              </div>
              <div className="category-stats">
                <span className="repo-count">
                  {categorizedRepos[selectedCategory].length} repositories
                </span>
              </div>
            </div>

            <div className="repositories-grid">
              {categorizedRepos[selectedCategory].map((repo) => (
                <RepositoryCard 
                  key={repo.id} 
                  repo={repo} 
                  isFavorite={false} 
                  showFeaturedBadge={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {selectedCategory && (!categorizedRepos[selectedCategory] || categorizedRepos[selectedCategory].length === 0) && (
          <div className="no-repos">
            <p>No repositories found in this category.</p>
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