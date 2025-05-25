import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaCalendarAlt, FaUser, FaCode, FaBriefcase, FaGraduationCap, FaPlus, FaTimes, FaPaperPlane, FaDatabase, FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaBrain, FaChartLine, FaUsers, FaFileAlt, FaSearch, FaLaptopCode, FaCogs, FaNetworkWired, FaSpinner } from 'react-icons/fa';
import '../css/reviews.css';

const Reviews = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState(10); // Show 10 initially
  const [newReview, setNewReview] = useState({
    reviewer_name: '',
    reviewer_role: '',
    category: '',
    rating: 5,
    review_text: ''
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        console.log('Fetching reviews from database...');
        // Updated to use Render backend URL
        const response = await fetch('https://portfolio-be-sad5.onrender.com/api/reviews');
        
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          console.log('Reviews loaded from database:', data);
        } else {
          console.error('Failed to fetch reviews from API, status:', response.status);
          setReviews({
            stack360: [],
            career360: [],
            core360: [],
            general: []
          });
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews({
          stack360: [],
          career360: [],
          core360: [],
          general: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Reset displayed reviews count when category changes
  useEffect(() => {
    setDisplayedReviews(10);
  }, [activeCategory]);

  const getAllReviews = () => {
    return Object.values(reviews).flat();
  };

  const getFilteredReviews = () => {
    if (activeCategory === 'all') {
      return getAllReviews();
    }
    return reviews[activeCategory] || [];
  };

  const getDisplayedReviews = () => {
    const filtered = getFilteredReviews();
    return filtered.slice(0, displayedReviews);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedReviews(prev => prev + 10);
      setLoadingMore(false);
    }, 500);
  };

  const categories = [
    { key: 'all', label: 'All Reviews', count: getAllReviews().length, icon: <FaStar /> },
    { key: 'stack360', label: 'Stack360', count: reviews.stack360?.length || 0, icon: <FaCode /> },
    { key: 'career360', label: 'Career360', count: reviews.career360?.length || 0, icon: <FaBriefcase /> },
    { key: 'core360', label: 'Core360', count: reviews.core360?.length || 0, icon: <FaGraduationCap /> },
    { key: 'general', label: 'Services', count: reviews.general?.length || 0, icon: <FaUser /> }
  ];

  const filteredReviews = getFilteredReviews();
  const displayedReviewsList = getDisplayedReviews();
  const hasMoreReviews = displayedReviews < filteredReviews.length;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  const getAverageRating = () => {
    const allReviews = getAllReviews();
    if (allReviews.length === 0) return "0.0";
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / allReviews.length).toFixed(1);
  };

  const generateInitials = (name) => {
    if (!name) return 'NA';
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
  };

  const handleSubmitReview = async () => {
    if (!newReview.reviewer_name || !newReview.review_text || !newReview.category) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      console.log('Submitting review:', newReview);
      // Updated to use Render backend URL
      const response = await fetch('https://portfolio-be-sad5.onrender.com/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      
      if (response.ok) {
        alert('Review submitted successfully!');
        console.log('Review submitted to database successfully');
        
        // Refresh reviews from database - Updated to use Render backend URL
        const updatedResponse = await fetch('https://portfolio-be-sad5.onrender.com/api/reviews');
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setReviews(updatedData);
          console.log('Reviews refreshed from database');
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to submit review:', errorData);
        alert(`Failed to submit review: ${errorData.message || 'Unknown error'}`);
      }

      // Reset form only if submission was successful
      if (response.ok) {
        setNewReview({
          reviewer_name: '',
          reviewer_role: '',
          category: '',
          rating: 5,
          review_text: ''
        });
        setShowAddForm(false);
      }

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please check your connection and try again.');
    }
  };

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="container1">
          <div className="reviews-hero">
            <div className="reviews-hero-content fade-up-review active">
              <h1 className="reviews-hero-title">Loading Reviews...</h1>
              <p className="reviews-hero-subtitle">Please wait while we fetch the latest testimonials from our database</p>
              <div className="loading-spinner" style={{
                width: '50px',
                height: '50px',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                borderTop: '4px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '20px auto'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      {/* Hero Section */}
      <section className="reviews-hero">
        <div className="container1">
          <div className="reviews-hero-content fade-up-review active">
            <h1 className="reviews-hero-title">Student Success Stories</h1>
            <p className="reviews-hero-subtitle">
              Real testimonials from our training programs and service clients
            </p>
            <div className="reviews-stats">
              <div className="stat-item">
                <span className="stat-number">{getAllReviews().length}</span>
                <span className="stat-label">Reviews</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{getAverageRating()}</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">580+</span>
                <span className="stat-label">Students Mentored</span>
              </div>
            </div>
            <div className="hero-actions">
              <button 
                className="add-review-btn"
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus />
                <span>Add Your Review</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="reviews-filters">
        <div className="container1">
          <div className="filter-tabs fade-in-review active">
            {categories.map(category => (
              <button
                key={category.key}
                className={`filter-tab ${activeCategory === category.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.key)}
              >
                {category.icon}
                <span>{category.label}</span>
                <span className="count">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="reviews-grid">
        <div className="container1">
          {filteredReviews.length > 0 ? (
            <div className="reviews-container">
              {/* Display Reviews */}
              {displayedReviewsList.map((review, index) => (
                <div 
                  key={review.id} 
                  className="review-card fade-up-review active"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="avatar">
                        {review.avatar}
                      </div>
                      <div className="reviewer-details">
                        <h4 className="reviewer-name">{review.name}</h4>
                        <p className="reviewer-role">{review.role}</p>
                        {review.program && (
                          <p className="program-name" style={{ fontSize: '0.85rem', color: '#4facfe', fontWeight: '600' }}>
                            {review.program}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="review-meta">
                      <div className="rating">
                        {renderStars(review.rating)}
                      </div>
                      <div className="review-date">
                        <FaCalendarAlt />
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="review-content">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="review-text">{review.review}</p>
                  </div>

                  {review.skills && review.skills.length > 0 && (
                    <div className="review-skills" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginTop: '15px'
                    }}>
                      {review.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag" style={{
                          background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Load More Button */}
              {hasMoreReviews && (
                <div className="load-more-section" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '40px 0',
                  width: '100%'
                }}>
                  <button 
                    className="load-more-btn"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    style={{
                      background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loadingMore ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.3s ease',
                      opacity: loadingMore ? 0.7 : 1,
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      if (!loadingMore) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(79, 172, 254, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loadingMore) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(79, 172, 254, 0.3)';
                      }
                    }}
                  >
                    {loadingMore ? (
                      <>
                        <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaPlus />
                        <span>Load More Reviews ({filteredReviews.length - displayedReviews} remaining)</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Reviews Summary */}
              <div className="reviews-summary" style={{
                textAlign: 'center',
                margin: '30px 0',
                padding: '20px',
                background: 'rgba(79, 172, 254, 0.1)',
                borderRadius: '15px',
                border: '1px solid rgba(79, 172, 254, 0.2)'
              }}>
                <p style={{
                  fontSize: '16px',
                  color: '#333',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Showing {displayedReviewsList.length} of {filteredReviews.length} reviews
                  {activeCategory !== 'all' && ` in ${activeCategory}`}
                </p>
              </div>
            </div>
          ) : (
            <div className="no-reviews">
              <h3>No reviews found{activeCategory !== 'all' ? ` for ${activeCategory}` : ''}</h3>
              <p>
                {getAllReviews().length === 0 
                  ? 'Be the first to add a review!' 
                  : `No reviews in this category yet. Switch to "All Reviews" to see other testimonials.`
                }
              </p>
              <button 
                className="add-review-btn"
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus />
                <span>Add Review</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add Review Modal */}
      {showAddForm && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h3>Add Your Review</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="review-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={newReview.reviewer_name}
                  onChange={(e) => setNewReview(prev => ({...prev, reviewer_name: e.target.value}))}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Your Role</label>
                <input
                  type="text"
                  id="role"
                  value={newReview.reviewer_role}
                  onChange={(e) => setNewReview(prev => ({...prev, reviewer_role: e.target.value}))}
                  placeholder="e.g., Software Engineer at Google"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  required
                  value={newReview.category}
                  onChange={(e) => setNewReview(prev => ({...prev, category: e.target.value}))}
                >
                  <option value="">Select category</option>
                  <option value="stack360">Stack360</option>
                  <option value="career360">Career360</option>
                  <option value="core360">Core360</option>
                  <option value="general">General Services</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating *</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                      key={star}
                      className={star <= newReview.rating ? 'star-active' : 'star-inactive'}
                      onClick={() => setNewReview(prev => ({...prev, rating: star}))}
                    />
                  ))}
                  <span className="rating-text">({newReview.rating} star{newReview.rating !== 1 ? 's' : ''})</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="review">Your Review *</label>
                <textarea
                  id="review"
                  required
                  rows="4"
                  value={newReview.review_text}
                  onChange={(e) => setNewReview(prev => ({...prev, review_text: e.target.value}))}
                  placeholder="Share your experience with the program or service..."
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handleSubmitReview}
                >
                  <FaPaperPlane />
                  <span>Submit Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Stats with Detailed Information */}
      <section className="program-stats">
        <div className="container1">
          <div className="program-stats-header">
            <h2 className="program-stats-title">Training Programs Overview</h2>
            <p className="program-stats-subtitle">Comprehensive courses designed to transform your tech career</p>
          </div>
          
          <div className="stats-grid fade-up-review active">
            {/* Stack360 Program */}
            <div className="program-stat">
              <div className="stat-icon">
                <FaCode />
              </div>
              <h3>Stack360</h3>
              <div className="program-versions">
                <span className="version-badge">1.0</span>
                <span className="version-badge">2.0</span>
              </div>
              <p className="stat-number">260</p>
              <p className="stat-description">Full-Stack Web Development Course</p>
              
              <div className="course-details">
                <h4>Technologies Covered:</h4>
                <div className="tech-stack">
                  <div className="tech-item">
                    <FaReact className="tech-icon" />
                    <span>React.js</span>
                  </div>
                  <div className="tech-item">
                    <FaHtml5 className="tech-icon" />
                    <span>HTML5</span>
                  </div>
                  <div className="tech-item">
                    <FaCss3Alt className="tech-icon" />
                    <span>CSS3</span>
                  </div>
                  <div className="tech-item">
                    <FaJs className="tech-icon" />
                    <span>JavaScript ES6+</span>
                  </div>
                  <div className="tech-item">
                    <FaNodeJs className="tech-icon" />
                    <span>Node.js</span>
                  </div>
                  <div className="tech-item">
                    <FaDatabase className="tech-icon" />
                    <span>MySQL</span>
                  </div>
                  <div className="tech-item">
                    <FaGitAlt className="tech-icon" />
                    <span>Git & GitHub</span>
                  </div>
                </div>
                <div className="additional-skills">
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">REST APIs</span>
                  <span className="skill-tag">Authentication</span>
                  <span className="skill-tag">Deployment</span>
                </div>
              </div>
            </div>

            {/* Career360 Program */}
            <div className="program-stat">
              <div className="stat-icon">
                <FaBriefcase />
              </div>
              <h3>Career360</h3>
              <p className="stat-number">190</p>
              <p className="stat-description">Interview Preparation & Job Placement</p>
              
              <div className="course-details">
                <h4>Program Components:</h4>
                <div className="career-modules">
                  <div className="module-item">
                    <FaBrain className="module-icon" />
                    <div className="module-content">
                      <h5>Technical Interviews</h5>
                      <p>Coding challenges, system design, problem-solving</p>
                    </div>
                  </div>
                  <div className="module-item">
                    <FaFileAlt className="module-icon" />
                    <div className="module-content">
                      <h5>Resume Building</h5>
                      <p>ATS-friendly resumes, portfolio optimization</p>
                    </div>
                  </div>
                  <div className="module-item">
                    <FaUsers className="module-icon" />
                    <div className="module-content">
                      <h5>Behavioral Interviews</h5>
                      <p>STAR method, company culture fit</p>
                    </div>
                  </div>
                  <div className="module-item">
                    <FaSearch className="module-icon" />
                    <div className="module-content">
                      <h5>Job Search Strategy</h5>
                      <p>Application process, networking, follow-ups</p>
                    </div>
                  </div>
                </div>
                <div className="additional-skills">
                  <span className="skill-tag">Mock Interviews</span>
                  <span className="skill-tag">Salary Negotiation</span>
                  <span className="skill-tag">LinkedIn Optimization</span>
                  <span className="skill-tag">Company Research</span>
                </div>
              </div>
            </div>

            {/* Core360 Program */}
            <div className="program-stat">
              <div className="stat-icon">
                <FaGraduationCap />
              </div>
              <h3>Core360</h3>
              <p className="stat-number">134</p>
              <p className="stat-description">Advanced Computer Science Fundamentals</p>
              
              <div className="course-details">
                <h4>Core Subjects:</h4>
                <div className="core-subjects">
                  <div className="subject-item">
                    <FaLaptopCode className="subject-icon" />
                    <div className="subject-content">
                      <h5>Data Structures & Algorithms</h5>
                      <p>Arrays, Trees, Graphs, Dynamic Programming, Sorting</p>
                    </div>
                  </div>
                  <div className="subject-item">
                    <FaBrain className="subject-icon" />
                    <div className="subject-content">
                      <h5>Problem Solving</h5>
                      <p>LeetCode patterns, optimization techniques</p>
                    </div>
                  </div>
                  <div className="subject-item">
                    <FaNetworkWired className="subject-icon" />
                    <div className="subject-content">
                      <h5>System Design</h5>
                      <p>Scalability, Load Balancing, Microservices</p>
                    </div>
                  </div>
                  <div className="subject-item">
                    <FaCogs className="subject-icon" />
                    <div className="subject-content">
                      <h5>CS Fundamentals</h5>
                      <p>Operating Systems, Networks, Databases</p>
                    </div>
                  </div>
                </div>
                <div className="additional-skills">
                  <span className="skill-tag">Time Complexity</span>
                  <span className="skill-tag">Space Complexity</span>
                  <span className="skill-tag">Design Patterns</span>
                  <span className="skill-tag">Architecture</span>
                </div>
              </div>
            </div>

            {/* General Services */}
            <div className="program-stat">
              <div className="stat-icon">
                <FaUser />
              </div>
              <h3>General Services</h3>
              <p className="stat-number">{reviews.general?.length || 0}</p>
              <p className="stat-description">Client Projects & Services</p>
              
              <div className="course-details">
                <h4>Services Offered:</h4>
                <div className="services-list">
                  <div className="service-item">
                    <FaCode className="service-icon" />
                    <div className="service-content">
                      <h5>Web Development</h5>
                      <p>Custom websites, web applications</p>
                    </div>
                  </div>
                  <div className="service-item">
                    <FaChartLine className="service-icon" />
                    <div className="service-content">
                      <h5>Analytics & Reporting</h5>
                      <p>Performance tracking, data insights</p>
                    </div>
                  </div>
                  <div className="service-item">
                    <FaUsers className="service-icon" />
                    <div className="service-content">
                      <h5>UI/UX Consultation</h5>
                      <p>Design optimization, user experience</p>
                    </div>
                  </div>
                </div>
                <div className="additional-skills">
                  <span className="skill-tag">E-commerce</span>
                  <span className="skill-tag">SEO Optimization</span>
                  <span className="skill-tag">Performance Tuning</span>
                  <span className="skill-tag">Maintenance</span>
                </div>
              </div>
            </div>

            {/* More Plans Coming Soon */}
            <div className="program-stat">
              <div className="stat-icon">
                <FaPlus />
              </div>
              <h3>More Plans</h3>
              <p className="stat-number">Coming Soon</p>
              <p className="stat-description">Additional training programs are being developed</p>
              
              <div className="course-details">
                <h4>Stay Tuned:</h4>
                <div className="services-list">
                  <div className="service-item">
                    <FaCode className="service-icon" />
                    <div className="service-content">
                      <h5>Advanced Specializations</h5>
                      <p>Domain-specific courses and certifications</p>
                    </div>
                  </div>
                  <div className="service-item">
                    <FaUsers className="service-icon" />
                    <div className="service-content">
                      <h5>Corporate Training</h5>
                      <p>Team-based learning and enterprise solutions</p>
                    </div>
                  </div>
                  <div className="service-item">
                    <FaGraduationCap className="service-icon" />
                    <div className="service-content">
                      <h5>Mentorship Programs</h5>
                      <p>One-on-one guidance and career coaching</p>
                    </div>
                  </div>
                </div>
                <div className="additional-skills">
                  <span className="skill-tag">AI/ML</span>
                  <span className="skill-tag">DevOps</span>
                  <span className="skill-tag">Cloud Computing</span>
                  <span className="skill-tag">Mobile Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Reviews;