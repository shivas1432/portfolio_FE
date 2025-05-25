import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaInstagram, FaUser, FaCalendarAlt, FaCode, FaGraduationCap, FaBriefcase, FaPlus, FaTimes, FaPaperPlane } from 'react-icons/fa';
import '../css/reviews.css';

const Reviews = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [animationsActive, setAnimationsActive] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewer_name: '',
    reviewer_role: '',
    program_id: '',
    category: '',
    rating: 5,
    review_text: '',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');

  const programs = [
    { id: 1, name: 'Stack360 1.0', category: 'stack360' },
    { id: 2, name: 'Stack360 2.0', category: 'stack360' },
    { id: 3, name: 'Career360', category: 'career360' },
    { id: 4, name: 'Core360', category: 'core360' }
  ];

  useEffect(() => {
    // Static default reviews data inside useEffect to avoid dependency issues
    const defaultReviewsData = {
      stack360: [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Frontend Developer at Meta",
          program: "Stack360 1.0",
          rating: 5,
          date: "March 2024",
          review: "Shiva's mentorship transformed my understanding of full-stack development. His ability to explain complex concepts clearly and his patience with beginners made all the difference in my learning journey. I secured a frontend role at Meta within 2 months!",
          avatar: "SJ",
          skills: ["React", "Node.js", "MongoDB"]
        },
        {
          id: 2,
          name: "Ahmed Hassan",
          role: "Full Stack Developer at Spotify",
          program: "Stack360 2.0",
          rating: 5,
          date: "January 2024",
          review: "The personalized feedback on my code changed everything. Shiva could immediately identify patterns that were hindering my progress and suggest elegant solutions. Best investment I ever made!",
          avatar: "AH",
          skills: ["JavaScript", "Express.js", "PostgreSQL"]
        },
        {
          id: 3,
          name: "Maria Rodriguez",
          role: "Software Engineer at Netflix",
          program: "Stack360 1.0",
          rating: 5,
          date: "October 2023",
          review: "What sets Shiva apart is how he builds confidence alongside technical skills. His mentorship helped me secure a developer role that I previously thought was beyond my capabilities.",
          avatar: "MR",
          skills: ["React", "AWS", "Docker"]
        },
        {
          id: 4,
          name: "David Chen",
          role: "Backend Developer at Uber",
          program: "Stack360 2.0",
          rating: 5,
          date: "February 2024",
          review: "The 90-day intensive was challenging but incredibly rewarding. Shiva's expertise in backend architecture and his real-world examples helped me land my dream job at Uber!",
          avatar: "DC",
          skills: ["Node.js", "Microservices", "Docker"]
        }
      ],
      career360: [
        {
          id: 5,
          name: "Lisa Thompson",
          role: "Junior Developer at Google",
          program: "Career360",
          rating: 5,
          date: "May 2024",
          review: "The career preparation was exactly what I needed. Shiva's interview prep sessions and portfolio guidance helped me ace my Google interview. His networking tips were invaluable!",
          avatar: "LT",
          skills: ["Interview Prep", "Portfolio", "Networking"]
        },
        {
          id: 6,
          name: "Robert Kim",
          role: "React Developer at Airbnb",
          program: "Career360",
          rating: 5,
          date: "April 2024",
          review: "From resume to GitHub profile optimization, every aspect was covered thoroughly. Shiva's personal branding strategies helped me stand out. Got 3 job offers within a month!",
          avatar: "RK",
          skills: ["Personal Branding", "GitHub", "Technical Writing"]
        },
        {
          id: 7,
          name: "Emily Watson",
          role: "Frontend Developer at Tesla",
          program: "Career360",
          rating: 5,
          date: "March 2024",
          review: "The 50-day program was intense but worth every moment. Shiva's approach to technical interviews and mock sessions gave me the confidence to ace my Tesla interview!",
          avatar: "EW",
          skills: ["Interview Skills", "Problem Solving", "Communication"]
        },
        {
          id: 8,
          name: "Carlos Martinez",
          role: "Software Engineer at Amazon",
          program: "Career360",
          rating: 5,
          date: "June 2024",
          review: "Career360 completely changed my job search approach. The systematic preparation and Shiva's guidance resulted in multiple offers from top tech companies!",
          avatar: "CM",
          skills: ["System Design", "Algorithms", "Behavioral Interviews"]
        }
      ],
      core360: [
        {
          id: 9,
          name: "Michael Brown",
          role: "Senior Developer at Microsoft",
          program: "Core360",
          rating: 5,
          date: "December 2023",
          review: "The most comprehensive technical program I've ever attended. Shiva's deep dive into system architecture and microservices prepared me for senior-level challenges!",
          avatar: "MB",
          skills: ["System Architecture", "Microservices", "Security"]
        },
        {
          id: 10,
          name: "Jennifer Lee",
          role: "Tech Lead at Amazon",
          program: "Core360",
          rating: 5,
          date: "November 2023",
          review: "Advanced JavaScript patterns and optimization techniques - Shiva knows it all! His 100-day program pushed me beyond my comfort zone and prepared me for leadership roles.",
          avatar: "JL",
          skills: ["JavaScript", "Performance", "Leadership"]
        },
        {
          id: 11,
          name: "Alex Turner",
          role: "DevOps Engineer at Shopify",
          program: "Core360",
          rating: 5,
          date: "January 2024",
          review: "The capstone project was incredibly challenging but rewarding. Shiva's mentorship in testing methodologies and quality assurance changed how I approach development. Best technical mentor ever!",
          avatar: "AT",
          skills: ["Testing", "QA", "DevOps"]
        },
        {
          id: 12,
          name: "Priya Sharma",
          role: "Full Stack Architect at PayPal",
          program: "Core360",
          rating: 5,
          date: "February 2024",
          review: "Core360 elevated my technical skills to architect level. Shiva's insights into scalable systems and performance optimization are unmatched in the industry!",
          avatar: "PS",
          skills: ["Architecture", "Scalability", "Performance"]
        }
      ],
      instagram: [
        {
          id: 13,
          name: "@sarah_codes",
          platform: "Instagram",
          rating: 5,
          date: "2 days ago",
          review: "Just finished @shivashanker's Stack360 program! 🚀 From zero to full-stack developer in 90 days. His teaching style is incredible and the projects we built are now in my portfolio! #WebDeveloper #FullStack",
          avatar: "SC",
          isInstagram: true,
          likes: 347,
          comments: 28
        },
        {
          id: 14,
          name: "@tech_with_ahmed",
          platform: "Instagram",
          rating: 5,
          date: "1 week ago",
          review: "Shoutout to @shivashanker for the amazing Career360 program! 💼 His interview prep sessions helped me land my dream job at a FAANG company. Best investment ever! #TechCareer #Mentorship",
          avatar: "TA",
          isInstagram: true,
          likes: 289,
          comments: 35
        },
        {
          id: 15,
          name: "@maria_dev_journey",
          platform: "Instagram",
          rating: 5,
          date: "3 days ago",
          review: "Core360 was intense but so worth it! 💪 @shivashanker's advanced JavaScript sessions blew my mind. Now I'm confident tackling senior-level challenges. Thank you! #JavaScript #WebDev",
          avatar: "MD",
          isInstagram: true,
          likes: 156,
          comments: 19
        },
        {
          id: 16,
          name: "@dev_lisa_codes",
          platform: "Instagram",
          rating: 5,
          date: "5 days ago",
          review: "Career transformation complete! 🎉 Thanks to @shivashanker's mentorship, I went from junior to senior developer in 8 months. Stack360 + Core360 combo is unbeatable! #CareerGrowth",
          avatar: "DL",
          isInstagram: true,
          likes: 423,
          comments: 41
        }
      ],
      general: [
        {
          id: 17,
          name: "James Wilson",
          role: "Freelance Developer",
          rating: 5,
          date: "June 2024",
          review: "Shiva's UI/UX design consultation transformed my portfolio website. His attention to detail and understanding of user experience principles helped me increase my client conversion rate by 300%!",
          avatar: "JW",
          skills: ["UI/UX", "Portfolio", "Design"]
        },
        {
          id: 18,
          name: "Anna Foster",
          role: "E-commerce Owner",
          rating: 5,
          date: "May 2024",
          review: "The e-commerce website Shiva built for my business exceeded all expectations. Secure payment integration, inventory management, and beautiful design - everything was perfect. Sales increased by 150%!",
          avatar: "AF",
          skills: ["E-commerce", "Payment Integration", "Business Growth"]
        },
        {
          id: 19,
          name: "Kevin Martinez",
          role: "Startup Founder",
          rating: 5,
          date: "April 2024",
          review: "Shiva's web analytics and reporting setup gave us insights we never had before. His custom dashboard helps us make data-driven decisions daily. ROI tracking has never been this clear!",
          avatar: "KM",
          skills: ["Analytics", "Reporting", "Data Insights"]
        },
        {
          id: 20,
          name: "Rachel Green",
          role: "Marketing Manager",
          rating: 5,
          date: "July 2024",
          review: "The responsive website Shiva created for our agency is stunning! Our bounce rate decreased by 40% and lead generation increased by 200%. Professional and results-driven!",
          avatar: "RG",
          skills: ["Responsive Design", "Lead Generation", "SEO"]
        }
      ]
    };

   // Replace the API calls in your Reviews component with these updated versions:

// In the fetchReviews function (around line 245):
const fetchReviews = async () => {
  try {
    setLoading(true);
    
    // Try to fetch from API first - Updated URL
    try {
      const response = await fetch('http://localhost:8081/api/reviews');
      if (response.ok) {
        const data = await response.json();
        console.log('API Data received:', data);
        setReviews(data);
        setLoading(false);
        // Activate animations after data is loaded
        setTimeout(() => setAnimationsActive(true), 100);
        return;
      }
    } catch (apiError) {
      console.log('API not available, using default data');
    }
    
    // Use default data if API fails
    console.log('Loading default reviews data...');
    setTimeout(() => {
      setReviews(defaultReviewsData);
      setLoading(false);
      console.log('Default reviews loaded:', defaultReviewsData);
      // Activate animations after data is loaded
      setTimeout(() => setAnimationsActive(true), 100);
    }, 500);
    
  } catch (error) {
    console.log('Error loading reviews, using default data:', error);
    setReviews(defaultReviewsData);
    setLoading(false);
    // Activate animations after data is loaded
    setTimeout(() => setAnimationsActive(true), 100);
  }
};

// In the handleSubmitReview function (around line 415):
const handleSubmitReview = async (e) => {
  e.preventDefault();
  
  if (!newReview.reviewer_name || !newReview.review_text || !newReview.category) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    // Try to submit to API - Updated URL
    try {
      const response = await fetch('http://localhost:8081/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      
      if (response.ok) {
        alert('Review submitted successfully to database!');
        // Refresh reviews from API - Updated URL
        const updatedResponse = await fetch('http://localhost:8081/api/reviews');
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setReviews(updatedData);
        }
      } else {
        throw new Error('API submission failed');
      }
    } catch (apiError) {
      // Fallback: add to local state
      console.log('Adding review locally:', apiError);
      const reviewToAdd = {
        ...newReview,
        id: Date.now(),
        date: 'Just now',
        avatar: generateInitials(newReview.reviewer_name),
        program: programs.find(p => p.id === parseInt(newReview.program_id))?.name || 'General Service'
      };

      setReviews(prev => ({
        ...prev,
        [newReview.category]: [...(prev[newReview.category] || []), reviewToAdd]
      }));
      alert('Review added locally! (API not available)');
    }

    // Reset form
    setNewReview({
      reviewer_name: '',
      reviewer_role: '',
      program_id: '',
      category: '',
      rating: 5,
      review_text: '',
      skills: []
    });
    setShowAddReview(false);

  } catch (error) {
    console.error('Error submitting review:', error);
    alert('Error submitting review. Please try again.');
  }
};

    fetchReviews();
  }, []); // Empty dependency array - all data is defined inside useEffect

  // Separate useEffect for intersection observer to avoid conflicts
  useEffect(() => {
    if (!animationsActive) return;

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    const timer = setTimeout(() => {
      const elementsToAnimate = document.querySelectorAll('.fade-up-review, .fade-in-review');
      console.log('Elements to animate:', elementsToAnimate.length);
      elementsToAnimate.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [animationsActive, activeCategory]); 

  const getAllReviews = () => {
    if (!reviews || Object.keys(reviews).length === 0) return [];
    const allReviews = Object.values(reviews).flat();
    console.log('All reviews count:', allReviews.length);
    return allReviews;
  };

  const getFilteredReviews = () => {
    if (activeCategory === 'all') {
      return getAllReviews();
    }
    const categoryReviews = reviews[activeCategory] || [];
    console.log(`${activeCategory} reviews:`, categoryReviews.length);
    return categoryReviews;
  };

  const categories = [
    { key: 'all', label: 'All Reviews', count: getAllReviews().length, icon: <FaStar /> },
    { key: 'stack360', label: 'Stack360', count: reviews.stack360?.length || 0, icon: <FaCode /> },
    { key: 'career360', label: 'Career360', count: reviews.career360?.length || 0, icon: <FaBriefcase /> },
    { key: 'core360', label: 'Core360', count: reviews.core360?.length || 0, icon: <FaGraduationCap /> },
    { key: 'instagram', label: 'Instagram', count: reviews.instagram?.length || 0, icon: <FaInstagram /> },
    { key: 'general', label: 'Services', count: reviews.general?.length || 0, icon: <FaUser /> }
  ];

  const filteredReviews = getFilteredReviews();
  const displayedReviews = filteredReviews.slice(0, visibleReviews);

  const loadMore = () => {
    setVisibleReviews(prev => prev + 6);
  };

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
    if (allReviews.length === 0) return "5.0";
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / allReviews.length).toFixed(1);
  };

  const generateInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
  };

  const addSkill = () => {
    if (skillInput.trim() && !newReview.skills.includes(skillInput.trim())) {
      setNewReview(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setNewReview(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!newReview.reviewer_name || !newReview.review_text || !newReview.category) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Try to submit to API
      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview)
        });
        
        if (response.ok) {
          alert('Review submitted successfully to database!');
          // Refresh reviews from API
          const updatedResponse = await fetch('/api/reviews');
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            setReviews(updatedData);
          }
        } else {
          throw new Error('API submission failed');
        }
      } catch (apiError) {
        // Fallback: add to local state
        console.log('Adding review locally:', apiError);
        const reviewToAdd = {
          ...newReview,
          id: Date.now(),
          date: 'Just now',
          avatar: generateInitials(newReview.reviewer_name),
          program: programs.find(p => p.id === parseInt(newReview.program_id))?.name || 'General Service'
        };

        setReviews(prev => ({
          ...prev,
          [newReview.category]: [...(prev[newReview.category] || []), reviewToAdd]
        }));
        alert('Review added locally! (API not available)');
      }

      // Reset form
      setNewReview({
        reviewer_name: '',
        reviewer_role: '',
        program_id: '',
        category: '',
        rating: 5,
        review_text: '',
        skills: []
      });
      setShowAddReview(false);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
  };

  // Debug logging
  console.log('Current reviews state:', reviews);
  console.log('Filtered reviews count:', filteredReviews.length);
  console.log('Displayed reviews count:', displayedReviews.length);
  console.log('Animations active:', animationsActive);

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="container">
          <div className="reviews-hero">
            <div className="reviews-hero-content fade-up-review active">
              <h1 className="reviews-hero-title">Loading Reviews...</h1>
              <p className="reviews-hero-subtitle">Please wait while we fetch the latest testimonials</p>
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
        <div className="container">
          <div className={`reviews-hero-content fade-up-review ${animationsActive ? 'active' : ''}`}>
            <h1 className="reviews-hero-title">Student Success Stories</h1>
            <p className="reviews-hero-subtitle">
              Real testimonials from our training programs and service clients
            </p>
            <div className="reviews-stats">
              <div className="stat-item">
                <span className="stat-number">{getAllReviews().length}+</span>
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
                onClick={() => setShowAddReview(true)}
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
        <div className="container">
          <div className={`filter-tabs fade-in-review ${animationsActive ? 'active' : ''}`}>
            {categories.map(category => (
              <button
                key={category.key}
                className={`filter-tab ${activeCategory === category.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category.key);
                  setVisibleReviews(6);
                }}
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
        <div className="container">
          {displayedReviews.length > 0 ? (
            <>
              <div className="reviews-container">
                {displayedReviews.map((review, index) => (
                  <div 
                    key={review.id} 
                    className={`review-card fade-up-review ${review.isInstagram ? 'instagram-card' : ''} ${animationsActive ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="avatar">
                          {review.isInstagram ? <FaInstagram /> : review.avatar}
                        </div>
                        <div className="reviewer-details">
                          <h4 className="reviewer-name">{review.name}</h4>
                          {review.role && <p className="reviewer-role">{review.role}</p>}
                          {review.program && <p className="program-name">{review.program}</p>}
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
                      <div className="review-skills">
                        {review.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    )}

                    {review.isInstagram && (
                      <div className="instagram-stats">
                        <span className="likes">❤️ {review.likes}</span>
                        <span className="comments">💬 {review.comments}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {visibleReviews < filteredReviews.length && (
                <div className="load-more-container">
                  <button className="load-more-btn" onClick={loadMore}>
                    Load More Reviews
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-reviews">
              <h3>No reviews found for this category</h3>
              <p>Be the first to add a review for this category!</p>
              <button 
                className="add-review-btn"
                onClick={() => setShowAddReview(true)}
              >
                <FaPlus />
                <span>Add Review</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add Review Modal */}
      {showAddReview && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h3>Add Your Review</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddReview(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-row">
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="program">Training Program</label>
                  <select
                    id="program"
                    value={newReview.program_id}
                    onChange={(e) => {
                      const programId = e.target.value;
                      const program = programs.find(p => p.id === parseInt(programId));
                      setNewReview(prev => ({
                        ...prev, 
                        program_id: programId,
                        category: program ? program.category : 'general'
                      }));
                    }}
                  >
                    <option value="">Select a program (optional)</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
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

              <div className="form-group">
                <label htmlFor="skills">Skills Learned (Optional)</label>
                <div className="skills-input">
                  <input
                    type="text"
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Enter a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <button type="button" onClick={addSkill} className="add-skill-btn">
                    Add
                  </button>
                </div>
                {newReview.skills.length > 0 && (
                  <div className="skills-list">
                    {newReview.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(skill)}
                          className="remove-skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddReview(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <FaPaperPlane />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program Stats */}
      <section className="program-stats">
        <div className="container">
          <div className={`stats-grid fade-up-review ${animationsActive ? 'active' : ''}`}>
            <div className="program-stat">
              <div className="stat-icon">
                <FaCode />
              </div>
              <h3>Stack360</h3>
              <p className="stat-number">215</p>
              <p className="stat-description">Participants trained in full-stack development</p>
            </div>
            <div className="program-stat">
              <div className="stat-icon">
                <FaBriefcase />
              </div>
              <h3>Career360</h3>
              <p className="stat-number">145</p>
              <p className="stat-description">Professionals prepared for tech careers</p>
            </div>
            <div className="program-stat">
              <div className="stat-icon">
                <FaGraduationCap />
              </div>
              <h3>Core360</h3>
              <p className="stat-number">220</p>
              <p className="stat-description">Advanced developers enhanced their skills</p>
            </div>
            <div className="program-stat">
              <div className="stat-icon">
                <FaUser />
              </div>
              <h3>General Services</h3>
              <p className="stat-number">95%</p>
              <p className="stat-description">Client satisfaction rate for web services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="reviews-cta">
        <div className="container">
          <div className={`cta-content fade-up-review ${animationsActive ? 'active' : ''}`}>
            <h2>Ready to Start Your Journey?</h2>
            <p>Join hundreds of successful developers who transformed their careers with our programs</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                View Programs
              </button>
              <button 
                className="cta-btn secondary"
                onClick={() => setShowAddReview(true)}
              >
                <FaPlus />
                <span>Share Your Experience</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;