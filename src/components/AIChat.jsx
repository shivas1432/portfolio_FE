import React, { useState, useEffect, useRef } from 'react';
import '../css/AIChat.css';
import axios from 'axios';

function AIChat() {
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const chatBoxRef = useRef(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://portfolio-be-sad5.onrender.com';
  
  const portfolioContext = React.useMemo(() => ({
    name: "Kanugula Shivashanker",
    website: "https://shivashankerportfolio.netlify.app",
    greeting: "Hello! I'm Shivashanker's portfolio assistant. I can help you learn about his skills, experience, and projects. How can I assist you today?",
    
    // Real Personal Information
    personalInfo: {
      fullName: "Kanugula Shivashanker",
      title: "Full-Stack Web Developer",
      location: "Cardiff, UK (CF11 6JE)",
      experience: "3+ years in web development and data analysis",
      email: "shivashanker7337@gmail.com",
      phone: "07867034729",
      linkedin: "http://www.linkedin.com/in/shiva-kanugula-51a512252",
      github: "https://github.com/shivas1432",
      portfolio: "https://shivashankerportfolio.netlify.app",
      instagram: "https://www.instagram.com/ss_web_servicess"
    },
    
    // Professional Summary
    summary: "I'm a full-stack web developer who thrives on building scalable applications with React, Node.js, Express, and MySQL. My expertise lies in creating high-performance solutions that handle real-world demands, with deep experience in API integrations and authentication systems like OAuth 2.0 and JWT. I've deployed projects across various cloud platforms including GCP, AWS, Netlify, and Render, always focusing on optimal performance.",
    
    // Real Skills with accurate proficiency levels
    skills: {
      frontend: {
        expert: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js"],
        advanced: ["Bootstrap", "jQuery", "SASS", "EJS", "Responsive Design"],
        intermediate: ["UI/UX Design", "Cross-browser Compatibility"]
      },
      backend: {
        expert: ["Node.js", "Express.js", "RESTful APIs"],
        advanced: ["Python", "Django", "Flask"],
        intermediate: ["API Integration", "Server Optimization"]
      },
      database: {
        expert: ["MySQL", "MongoDB"],
        advanced: ["Database Architecture", "Query Optimization"],
        intermediate: ["PostgreSQL", "Firebase", "Cloud SQL"]
      },
      cloud: {
        expert: ["Google Cloud Platform (GCP)", "Netlify"],
        advanced: ["AWS (EC2)", "Render", "Vercel"],
        intermediate: ["Heroku", "InfinityFree", "Firebase Hosting"]
      },
      security: {
        expert: ["Passport.js", "JSON Web Tokens (JWT)", "OAuth 2.0"],
        advanced: ["bcrypt", "Authentication Systems"],
        intermediate: ["Cybersecurity Fundamentals"]
      },
      tools: {
        expert: ["Git", "GitHub", "Visual Studio Code", "NPM"],
        advanced: ["Postman", "Power BI", "Tableau"],
        intermediate: ["Excel", "SQL", "Python (Pandas, NumPy)"]
      },
      programming: {
        expert: ["JavaScript", "Python"],
        advanced: ["SQL", "VBA"],
        intermediate: ["Java", "C/C++"]
      }
    },
    
    // Real Project Portfolio
    projects: [
      {
        name: "Real-Time Car Wash Booking Web Application",
        description: "Full-stack car wash platform with manual and Google login, secure payment, and real-time booking capabilities.",
        technologies: ["React", "Node.js", "Express.js", "Firebase Hosting", "Cloud SQL", "CSS", "OAuth 2.0", "Google APIs"],
        features: [
          "Manual and Google authentication",
          "User profiles with multiple vehicle management",
          "Real-time booking system with date/time/service selection",
          "AI-powered assistance for service info and support",
          "Booking history tracking and review system",
          "Multi-channel help center",
          "Responsive UI across all devices"
        ],
        liveUrl: "Available on request",
        githubUrl: "https://github.com/shivas1432",
        status: "Completed",
        duration: "4 months",
        challenges: "Implementing real-time booking system, AI integration, secure payment processing",
        keyLearnings: "Advanced React patterns, real-time data handling, AI integration, payment systems"
      },
      {
        name: "Personal Portfolio & Interactive Resume",
        description: "Dynamic, self-updating portfolio showcasing skills and projects with real-time customization and admin dashboard.",
        technologies: ["React", "Node.js", "Express.js", "SQL", "CSS", "OAuth 2.0", "Google APIs", "News APIs", "AI Integration"],
        features: [
          "Self-updating portfolio with admin dashboard",
          "Light/dark mode and time-based greetings",
          "Live weather updates",
          "AI-powered chatbot for visitor support",
          "Google OAuth and manual registration",
          "Live news feed integration",
          "Background customization",
          "Full CRUD operations"
        ],
        liveUrl: "https://shivashankerportfolio.netlify.app",
        githubUrl: "https://github.com/shivas1432",
        status: "Live",
        duration: "3 months",
        challenges: "AI chatbot integration, real-time data updates, responsive design",
        keyLearnings: "AI integration, advanced React hooks, real-time features, API optimization"
      },
      {
        name: "Vapeshop Offlicence",
        description: "E-commerce platform for vape products with modern UI and secure payment integration.",
        technologies: ["React", "Node.js", "Express.js", "Firebase Hosting", "Render", "CSS", "OAuth 2.0", "Google APIs"],
        features: ["Product catalog", "Shopping cart", "User authentication", "Payment integration", "Order management"],
        liveUrl: "In development",
        githubUrl: "https://github.com/shivas1432",
        status: "Ongoing",
        duration: "2 months (ongoing)",
        challenges: "E-commerce functionality, payment gateway integration",
        keyLearnings: "E-commerce development, payment systems, inventory management"
      },
      {
        name: "Polyhouse Market",
        description: "Agricultural marketplace platform connecting farmers with buyers for greenhouse products.",
        technologies: ["React", "Node.js", "Express.js", "Firebase Hosting", "Render", "CSS", "OAuth 2.0", "Google APIs"],
        features: ["Marketplace functionality", "Farmer/buyer profiles", "Product listings", "Communication system"],
        liveUrl: "In development",
        githubUrl: "https://github.com/shivas1432",
        status: "Ongoing",
        duration: "2 months (ongoing)",
        challenges: "Marketplace dynamics, user matching, agricultural domain knowledge",
        keyLearnings: "Marketplace development, agricultural technology, user experience design"
      },
      {
        name: "Frontend Development Showcase",
        description: "Collection of 20+ interactive UI projects focusing on responsive design, animations, and user experience.",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "SCSS", "EJS"],
        features: [
          "20+ interactive UI projects",
          "Modern landing pages with smooth animations",
          "Cross-browser compatibility",
          "Dynamic dashboards with real-time data visualization",
          "Advanced form validation",
          "Responsive design principles"
        ],
        liveUrl: "Multiple demos available",
        githubUrl: "https://github.com/shivas1432",
        status: "Completed",
        duration: "6 months",
        challenges: "Cross-browser compatibility, animation performance, responsive design",
        keyLearnings: "Advanced CSS, JavaScript animations, responsive design patterns"
      }
    ],
    
    // Real Education
    education: {
      masters: {
        degree: "Master of Science in Advanced Computer Science",
        university: "Cardiff Metropolitan University",
        period: "Sept 2022 – Jan 2024",
        percentage: "65%",
        credits: "180/180"
      },
      bachelors: {
        degree: "Bachelor of Technology in Computer Science and Engineering",
        university: "Vaagdevi Engineering College",
        period: "Aug 2016 – Dec 2020",
        cgpa: "6.7/10"
      },
      intermediate: {
        school: "SR Junior College",
        year: "2016",
        percentage: "94%"
      },
      secondary: {
        school: "Little Soldier Concept School",
        year: "2014",
        cgpa: "9.5/10"
      }
    },
    
    // Real Professional Experience
    experience: [
      {
        company: "Infinite Tech Solutions, Pune",
        position: "Backend Developer",
        duration: "Jan 2021 – Jun 2022",
        responsibilities: [
          "Architected robust backend systems using Node.js, Express.js, and Python frameworks (Django, Flask)",
          "Implemented performance optimizations that reduced server response times by 40% and enabled 3x higher concurrent user capacity",
          "Designed and integrated RESTful APIs connecting web and mobile platforms seamlessly, driving a 25% increase in user engagement metrics",
          "Led MySQL database architecture initiatives with focus on optimization strategies, achieving 60% improvement in query performance",
          "Partnered with cross-functional teams to deliver end-to-end solutions, conducting comprehensive testing and troubleshooting that decreased system downtime by 35%"
        ]
      },
      {
        company: "Nexus Software System, Pune",
        position: "Data Analyst Intern",
        duration: "Nov 2019 – Nov 2020",
        responsibilities: [
          "Transformed complex datasets into actionable insights using Excel, SQL, and Python (Pandas, NumPy)",
          "Crafted compelling visual narratives through Power BI and Tableau dashboards",
          "Architected sophisticated SQL queries to uncover hidden patterns while building Python and VBA automation workflows",
          "Bridged the gap between technical analysis and business strategy, collaborating with cross-functional teams to deliver data-driven recommendations"
        ]
      }
    ],
    
    // Real Certifications
    certifications: [
      "Full-Stack Web Development (Udemy) – Mar 2024",
      "Cybersecurity Fundamentals & Network Defense – Cisco Certified (Jan 2023)",
      "TCS iON Career Edge - Young Professional | Tata Consultancy Services (TCS iON) – Feb 2022"
    ],
    
    // Additional Projects
    additionalProjects: [
      "Location Privacy in Mobile Cloud Computing: Developed a privacy-preserving framework for secure task allocation in mobile cloud environments",
      "Geospatial Analysis: Used Python and ArcGIS for spatial data processing to solve geographic challenges and support data-driven decisions",
      "End-User Computing Risk Management: Assessed and mitigated IT security risks, strengthening data protection in corporate environments",
      "Software Development & Project Management: Applied Agile methodologies to optimize workflows and ensure on-time project delivery"
    ],
    
    // Real Achievements
    achievements: [
      "Reduced server response times by 40% through backend optimizations",
      "Achieved 3x higher concurrent user capacity in production systems",
      "Increased user engagement metrics by 25% through API integrations",
      "Improved database query performance by 60%",
      "Decreased system downtime by 35% through comprehensive testing",
      "Built 20+ interactive UI projects with focus on responsive design",
      "Successfully deployed projects on multiple cloud platforms (GCP, AWS, Netlify, Render)"
    ]
  }), []);

  const recentChats = [
    { id: 1, title: "What are Shivashanker's key technical skills?" },
    { id: 2, title: "How many years of experience does he have in tech?" },
    { id: 3, title: "What's his experience at Infinite Tech Solutions?" },
    { id: 4, title: "How can I contact him for freelance work?" }
  ];

  // Enhanced function to check if a message is a greeting
  const isGreeting = (message) => {
    const greetingWords = ['hi', 'hey', 'hello', 'hai', 'hallo', 'hola', 'greetings', 'yo', 'sup', 'howdy', 'good morning', 'good afternoon', 'good evening'];
    const greetingPhrases = ['how are you', 'how r u', 'how r you', 'how you doing', 'how is it going', 'whats up', 'what\'s up', 'nice to meet you'];
    
    const normalizedMsg = message.trim().toLowerCase();
    
    if (greetingWords.some(word => normalizedMsg === word || normalizedMsg.startsWith(word + ' ') || normalizedMsg.includes(' ' + word + ' ') || normalizedMsg.endsWith(' ' + word))) {
      return true;
    }
    
    return greetingPhrases.some(phrase => normalizedMsg.includes(phrase));
  };
  
  // Enhanced function to check if a message is about the portfolio
  const isPortfolioRelated = (message) => {
    const portfolioKeywords = [
      // Personal
      'portfolio', 'shivashanker', 'shiva', 'resume', 'cv', 'profile', 'about',
      
      // Skills & Technologies
      'skill', 'skills', 'technology', 'tech stack', 'programming', 'coding', 'development',
      'frontend', 'backend', 'fullstack', 'full stack', 'web development',
      'react', 'javascript', 'node', 'nodejs', 'express', 'mongodb', 'mysql', 'postgresql',
      'html', 'css', 'tailwind', 'bootstrap', 'python', 'django', 'aws', 'cloud',
      
      // Projects
      'project', 'projects', 'work', 'application', 'app', 'website', 'platform',
      'weather app', 'news aggregator', 'blog platform', 'portfolio website',
      
      // Experience & Professional
      'experience', 'job', 'role', 'position', 'company', 'work history', 'career',
      'education', 'degree', 'certification', 'achievement', 'accomplishment',
      
      // Services
      'hire', 'freelance', 'consultation', 'contact', 'collaboration', 'service',
      'available', 'rates', 'cost', 'price', 'timeline', 'availability'
    ];
    
    const normalizedMsg = message.trim().toLowerCase();
    
    return portfolioKeywords.some(keyword => 
      normalizedMsg.includes(keyword) || 
      normalizedMsg.includes(keyword.replace(/\s+/g, ''))
    );
  };

  // Smart context extraction function
  const extractContext = (message) => {
    const contexts = {
      skills: ['skill', 'technology', 'tech stack', 'programming', 'coding', 'expertise', 'proficiency'],
      projects: ['project', 'work', 'application', 'app', 'website', 'platform', 'built', 'created'],
      experience: ['experience', 'job', 'role', 'position', 'company', 'work history', 'career'],
      education: ['education', 'degree', 'certification', 'learning', 'course', 'training'],
      contact: ['hire', 'contact', 'email', 'reach', 'collaboration', 'available', 'freelance'],
      specific_tech: ['react', 'javascript', 'node', 'python', 'mongodb', 'aws', 'html', 'css']
    };

    const normalizedMsg = message.toLowerCase();
    const detectedContexts = [];

    for (const [context, keywords] of Object.entries(contexts)) {
      if (keywords.some(keyword => normalizedMsg.includes(keyword))) {
        detectedContexts.push(context);
      }
    }

    return detectedContexts;
  };

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([{ 
        type: 'ai', 
        message: portfolioContext.greeting
      }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleAskSubmit = async () => {
    if (!userQuestion.trim()) {
      return;
    }
    
    setLoadingChat(true);
    setChatHistory(prev => [...prev, { type: 'user', message: userQuestion }]);
    
    try {
      if (isGreeting(userQuestion)) {
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            type: 'ai', 
            message: "Hi there! I'm Shivashanker's portfolio assistant. I can help answer questions about his skills, projects, and experience. How can I assist you today?"
          }]);
          setUserQuestion('');
          setLoadingChat(false);
        }, 500);
        return;
      }
      
      if (!isPortfolioRelated(userQuestion)) {
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            type: 'ai', 
            message: "I'm sorry, but I'm only designed to help with questions about Shivashanker's portfolio, skills, projects, and experience. I can't assist with other topics. Feel free to ask me anything about Shivashanker's work!"
          }]);
          setUserQuestion('');
          setLoadingChat(false);
        }, 500);
        return;
      }
      
      const enhancedPrompt = createEnhancedPrompt(userQuestion);
      
      const response = await axios.post(`${API_BASE_URL}/api/chat`, { 
        message: enhancedPrompt,
        isPortfolioQuestion: true
      });
      
      const aiResponse = response.data?.response || 'Invalid response structure or no response found';
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setUserQuestion('');
    } catch (error) {
      const errorMessage = error.response?.status === 429 ? 'Rate limit exceeded. Please try again later.' :
                          error.response?.status === 500 ? 'Server error. Please try again later.' :
                          error.response?.data?.error || 'Error: Unable to get a response. Please try again.';
      setChatHistory(prev => [...prev, { type: 'error', message: errorMessage }]);
    } finally {
      setLoadingChat(false);
    }
  };
  
  const createEnhancedPrompt = (userQuery) => {
    const detectedContexts = extractContext(userQuery);
    let contextualInfo = '';

    // Add relevant context based on user query
    if (detectedContexts.includes('skills') || detectedContexts.includes('specific_tech')) {
      contextualInfo += `\n\nDETAILED SKILLS INFORMATION:
Frontend Expert: ${portfolioContext.skills.frontend.expert.join(', ')}
Frontend Advanced: ${portfolioContext.skills.frontend.advanced.join(', ')}
Backend Expert: ${portfolioContext.skills.backend.expert.join(', ')}
Backend Advanced: ${portfolioContext.skills.backend.advanced.join(', ')}
Database Expert: ${portfolioContext.skills.database.expert.join(', ')}
Database Advanced: ${portfolioContext.skills.database.advanced.join(', ')}
Cloud Expert: ${portfolioContext.skills.cloud.expert.join(', ')}
Cloud Advanced: ${portfolioContext.skills.cloud.advanced.join(', ')}`;
    }

    if (detectedContexts.includes('projects')) {
      contextualInfo += `\n\nDETAILED PROJECTS INFORMATION:
${portfolioContext.projects.map(project => 
  `${project.name}: ${project.description}
  Technologies: ${project.technologies.join(', ')}
  Features: ${project.features.join(', ')}
  Status: ${project.status}
  Duration: ${project.duration}
  Live URL: ${project.liveUrl}
  GitHub: ${project.githubUrl}
  Key Challenges: ${project.challenges}
  Learnings: ${project.keyLearnings}`
).join('\n\n')}`;
    }

    if (detectedContexts.includes('experience')) {
      contextualInfo += `\n\nPROFESSIONAL EXPERIENCE:
${portfolioContext.experience.map(exp => 
  `${exp.position} at ${exp.company} (${exp.duration})
  Responsibilities: ${exp.responsibilities.join(', ')}`
).join('\n\n')}`;
    }

    if (detectedContexts.includes('education')) {
      contextualInfo += `\n\nEDUCATION & CERTIFICATIONS:
Masters: ${portfolioContext.education.masters.degree} from ${portfolioContext.education.masters.university} (${portfolioContext.education.masters.period})
Bachelors: ${portfolioContext.education.bachelors.degree} from ${portfolioContext.education.bachelors.university} (${portfolioContext.education.bachelors.period})
Certifications: ${portfolioContext.certifications.join(', ')}`;
    }

    if (detectedContexts.includes('contact')) {
      contextualInfo += `\n\nCONTACT INFORMATION:
Name: ${portfolioContext.personalInfo.fullName}
Title: ${portfolioContext.personalInfo.title}
Experience: ${portfolioContext.personalInfo.experience}
Email: ${portfolioContext.personalInfo.email}
Phone: ${portfolioContext.personalInfo.phone}
LinkedIn: ${portfolioContext.personalInfo.linkedin}
GitHub: ${portfolioContext.personalInfo.github}
Portfolio: ${portfolioContext.personalInfo.portfolio}
Location: ${portfolioContext.personalInfo.location}`;
    }

    if (!isGreeting(userQuery)) {
      return `You are Shivashanker's intelligent portfolio assistant. You have comprehensive knowledge about his professional background, skills, projects, and experience. Provide detailed, accurate, and well-formatted responses with emojis and engaging language.

CONTEXT: ${contextualInfo || 'General portfolio information available'}

CRITICAL FORMATTING RULES:
1. ALWAYS use double line breaks (\\n\\n) between major sections
2. Use **bold formatting** for ALL section headers (wrap in **text**)
3. Use single line breaks (\\n) within sections for readability
4. Start responses with engaging language like "Hey there! 👋" or "Oh awesome! 🚀"
5. Use relevant emojis throughout (🔥 for skills, 💻 for projects, 🎯 for achievements, ✨ for highlights)
6. Use bullet points with emojis for lists
7. Include conversational elements and modern expressions
8. End with enthusiastic calls-to-action using emojis

RESPONSE STRUCTURE TEMPLATE:
Hey there! 👋 [Opening with personality]

**🎯 Main Section Header:**

• **Subsection:** [Details with emojis]
• **Another Point:** [More details]

**💡 Next Section:**

[Content with proper spacing]

**🚀 Final Section:**

[Closing with call-to-action]

EXAMPLE PROPER FORMATTING:
Hey there! 👋 Shivashanker's tech skills are seriously impressive! 🔥 He's a full-stack developer who's absolutely crushing it! 🚀

**🔥 Frontend Expertise:**

• **React.js:** He's a React ninja! 🥷 Uses it extensively in projects like his portfolio website, car wash booking app, and news aggregator
• **JavaScript:** Top-notch modern JavaScript (ES6+) skills, making his code clean and super effective! ⚡
• **HTML5 & CSS3:** Crafts beautiful and responsive user interfaces using the latest web standards ✨

**💻 Backend Prowess:**

• **Node.js & Express.js:** Builds robust and scalable backend systems 💪
• **Python & Django:** Strong backend skills for versatile development 🐍

**🎯 Real Impact:** Reduced server response times by 40% and achieved 3x higher user capacity! 🤯

Want to know more about any specific area? I've got tons more details to share! 🌟

ACHIEVEMENTS TO HIGHLIGHT: ${portfolioContext.achievements.slice(0, 3).join(', ')}

User's question: "${userQuery}"

Provide a comprehensive, engaging, and properly formatted response with clear sections and bold headers.`;
    }
    
    return `Hey there! 👋 I'm Shivashanker's portfolio assistant and I'm totally excited to help you learn about his amazing work! 🚀 Whether you want to know about his killer projects, impressive skills, or professional experience - I've got you covered! ✨ What would you like to explore first? 🤔`;
  };
  
  const handlePresetQuestionClick = (questionText) => {
    setUserQuestion(questionText);
    setTimeout(() => {
      handleAskSubmit();
    }, 100);
  };

  // Function to format text with markdown-style formatting
  const formatMessage = (text) => {
    // Convert **text** to <strong>text</strong> (be more specific with regex)
    let formattedText = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Convert remaining single *text* to <em>text</em> (but not double asterisks)
    formattedText = formattedText.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
    
    // Convert double line breaks to paragraph breaks
    formattedText = formattedText.replace(/\n\n/g, '</p><p>');
    
    // Convert single line breaks to <br> tags
    formattedText = formattedText.replace(/\n/g, '<br>');
    
    // Wrap the entire text in paragraphs
    formattedText = '<p>' + formattedText + '</p>';
    
    // Clean up empty paragraphs
    formattedText = formattedText.replace(/<p><\/p>/g, '');
    formattedText = formattedText.replace(/<p><br><\/p>/g, '<br>');
    
    return formattedText;
  };

  // Function to get the correct avatar image
  const getAvatarImage = (messageType) => {
    switch (messageType) {
      case 'user':
        return '/images/user.avif';
      case 'ai':
        return '/images/avatar.png';
      case 'error':
        return '/images/avatar.png';
      default:
        return '/images/avatar.png';
    }
  };

  const hasMessages = chatHistory.length > 1; // More than just the initial greeting

  return (
    <div className="aivo-app-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="logo-icon">
            <img 
              src="/ai.png" 
              alt="AI Assistant Logo" 
              className="logo-image"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '🤖';
                e.target.parentElement.style.fontSize = '24px';
                e.target.parentElement.style.display = 'flex';
                e.target.parentElement.style.alignItems = 'center';
                e.target.parentElement.style.justifyContent = 'center';
              }}
            />
          </div>
          <div className="header-title">
            <h3>SHIVA'S Portfolio Assistant</h3>
            <p>General assistance and conversation</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      {!hasMessages ? (
        <div className="main-content">
          <div className="welcome-content">
            <h1>What can I help you with today?</h1>
            <p>I'm Shivashanker's portfolio assistant. Ask me anything about his skills, projects, and experience.</p>
            
            <div className="quick-actions">
              {recentChats.slice(0, 4).map(chat => (
                <button 
                  key={chat.id}
                  className="quick-action-btn"
                  onClick={() => handlePresetQuestionClick(chat.title)}
                >
                  {chat.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="ai-chat-history" ref={chatBoxRef} aria-live="polite">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`ai-chat-message ${chat.type}`}>
              <div className="ai-chat-avatar">
                <img 
                  src={getAvatarImage(chat.type)}
                  alt={chat.type} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = chat.type === 'user' ? '👤' : '🤖';
                    e.target.parentElement.style.display = 'flex';
                    e.target.parentElement.style.alignItems = 'center';
                    e.target.parentElement.style.justifyContent = 'center';
                    e.target.parentElement.style.fontSize = '20px';
                  }}
                />
              </div>
              <div className="chat-message-content">
                <div 
                  className="ai-chat-text"
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(chat.message)
                  }}
                />
                <div className="message-timestamp">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          {loadingChat && 
            <div className="ai-chat-loading">
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
              Thinking...
            </div>
          }
        </div>
      )}
      
      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-container">
          <textarea 
            className="ai-chat-textarea" 
            value={userQuestion} 
            onChange={(e) => setUserQuestion(e.target.value)} 
            placeholder="Ask me about Shiva's skills, projects, or experience!" 
            rows={1} 
            disabled={loadingChat}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAskSubmit();
              }
            }}
          />
          <div className="input-buttons">
            <button 
              className={`send-button ${userQuestion.trim() ? 'active' : ''}`} 
              onClick={handleAskSubmit} 
              disabled={loadingChat || !userQuestion.trim()}
            >
              {loadingChat ? 
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 
                <i className="send-icon">↗</i>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;