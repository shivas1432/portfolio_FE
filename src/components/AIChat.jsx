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
    name: "Shivashanker",
    website: "https://shivashanker.com",
    greeting: "Hello! I'm Shivashanker's portfolio assistant. I can help you learn about his skills, experience, and projects. How can I assist you today?",
    skills: [
      "Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS",
      "Backend: Node.js, Express.js, Python, Django",
      "Database: MongoDB, MySQL, PostgreSQL",
      "Cloud: AWS, Netlify, Render",
      "Other: Git, REST APIs, Responsive Design, AI Integrations"
    ],
    projects: [
      {
        name: "Portfolio Website",
        description: "Personal portfolio website with AI assistance for visitors to showcase skills and projects",
        technologies: "React, Node.js, Express, Gemini API, Netlify"
      },
      {
        name: "Weather App",
        description: "Real-time weather application with location-based forecasts and interactive maps",
        technologies: "React, Weather API, JavaScript, CSS3"
      },
      {
        name: "News Aggregator",
        description: "Personalized news platform that collects and categorizes articles from various sources",
        technologies: "React, Node.js, News API, MongoDB"
      },
      {
        name: "Blog Platform",
        description: "Content management system for creating and publishing blog posts with user authentication",
        technologies: "React, Express, MongoDB, JWT Authentication"
      }
    ]
  }), []);

  // Enhanced function to check if a message is a greeting
  const isGreeting = (message) => {
    const greetingWords = ['hi', 'hey', 'hello', 'hai', 'hallo', 'hola', 'greetings', 'yo', 'sup', 'howdy'];
    const greetingPhrases = ['how are you', 'how r u', 'how r you', 'how you doing', 'how is it going', 'whats up', 'what\'s up'];
    
    const normalizedMsg = message.trim().toLowerCase();
    
    // Check for exact matches with greetings
    if (greetingWords.some(word => normalizedMsg === word || normalizedMsg.startsWith(word + ' '))) {
      return true;
    }
    
    // Check for greeting phrases
    return greetingPhrases.some(phrase => normalizedMsg.includes(phrase));
  };
  
  // Function to check if a message is about the portfolio
  const isPortfolioRelated = (message) => {
    const portfolioKeywords = [
      'portfolio', 'project', 'skill', 'experience', 'resume', 'work', 'shivashanker', 'shiva', 
      'technology', 'tech stack', 'frontend', 'backend', 'database', 'react', 'node', 'javascript',
      'python', 'django', 'mongodb', 'mysql', 'postgresql', 'aws', 'netlify', 'render', 'git',
      'weather app', 'news aggregator', 'blog platform', 'education', 'contact', 'job', 'role'
    ];
    
    const normalizedMsg = message.trim().toLowerCase();
    
    return portfolioKeywords.some(keyword => normalizedMsg.includes(keyword));
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
      // Handle greetings directly in the frontend
      if (isGreeting(userQuestion)) {
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            type: 'ai', 
            message: "Hi there! I'm Shivashanker's portfolio assistant. I can help answer questions about his skills, projects, and experience. How can I assist you today?"
          }]);
          setUserQuestion('');
          setLoadingChat(false);
        }, 500); // Small delay to make it feel natural
        return;
      }
      
      // Check if the question is not portfolio-related
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
      
      // Only send portfolio-related messages to the backend
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
    // If the query is not a greeting but about specific skills/projects, enhance the prompt
    if (!isGreeting(userQuery)) {
      return `You are an AI assistant for Shivashanker's portfolio website (${portfolioContext.website}). 
      You help visitors learn about Shivashanker's skills, experience, and projects.
      
      IMPORTANT RULES:
      1. Provide detailed information about Shivashanker's portfolio, resume, skills, and experience
      2. For general greetings, respond politely but briefly
      3. If you don't have specific information about Shivashanker, provide what you know and suggest visiting his website
      4. Include specific details from his portfolio when available
      5. Always include the portfolio website link with your answers
      6. IF THE QUERY IS NOT ABOUT SHIVASHANKER'S PORTFOLIO, SKILLS, PROJECTS, OR EXPERIENCE, politely explain you can only answer questions about Shivashanker's work and portfolio
      
      User's question: ${userQuery}`;
    }
    
    // For greetings, return a simple prompt that won't trigger detailed portfolio info
    return `This is a casual greeting from the user: "${userQuery}". Respond conversationally without listing portfolio details.`;
  };
  
  const handlePresetQuestionClick = (questionText) => {
    setUserQuestion(questionText);
    setTimeout(() => {
      handleAskSubmit();
    }, 100);
  };
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  const recentChats = [
    { id: 1, title: "Show me Shivashanker's recent projects" },
    { id: 2, title: "What tech stack does he specialize in?" },
    { id: 3, title: "Tell me about the AI assistance in his portfolio" },
    { id: 4, title: "What backend technologies has he used?" },
    { id: 5, title: "Does he have any experience with cloud platforms?" },
    { id: 6, title: "Give a quick overview of Shivashanker's skills" },
    { id: 7, title: "What kind of frontend frameworks has he worked with?" }
  ];

  return (
    <div className="aivo-app-container">
      <div className="mobile-chat-toggle" onClick={toggleChat}>
        <i className="chat-icon">💬</i>
      </div>
      
      <div className={`dashboard-view ${showChat ? 'hidden-mobile' : ''}`}>
        <div className="user-greeting">
          <div className="greeting-text">
            <span className="greeting">Hi there! 👋</span>
            <h2>This is Shiva's Portfolio Assistant</h2>
            <p>How can I assist you today?</p>
          </div>
        </div>
        
        <div className="recent-chats-section">
          <div className="section-header">
            <h3>Frequent questions</h3>
          </div>
          
          <div className="chats-list">
            {recentChats.map(chat => (
              <div 
                key={chat.id} 
                className="chat-item" 
                onClick={() => handlePresetQuestionClick(chat.title)}
              >
                <div className="chat-icon">✨</div>
                <div className="chat-title">{chat.title}</div>
              </div>
            ))}
          </div>
          <div className="features-section">
            <div className="feature-card power-up">
              <div className="feature-content">
                <div className="sparkle-icon">✨</div>
                <h4>Power Up Your AI Conversations</h4>
              </div>
            </div>
            
            <div className="features-options">
              <a href="/contact" className="feature-option">
                <div className="option-icon image-icon">👋</div>
                <div className="option-text">
                  <p><strong>Say Hello to Shiva — One Touch Away!</strong></p>
                </div>
                <div className="option-arrow">→</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`chat-view ${!showChat ? 'hidden-mobile' : ''}`}>
        <div className="chat-header">
          <div className="back-button" onClick={toggleChat}>
            <i className="back-icon">←</i>
          </div>
          <div className="chat-title">
            <h3>Resume and Portfolio Assistant</h3>
          </div>
        </div>
        
        <div className="ai-chat-history" ref={chatBoxRef} aria-live="polite">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`ai-chat-message ${chat.type}`}>
              <div className="ai-chat-avatar">
                <img 
                  src={`/images/${chat.type === 'user' ? 'user' : chat.type === 'ai' ? 'ai' : 'error'}-avatar.png`} 
                  alt={chat.type} 
                />
              </div>
              <div className="chat-message-content">
                <div className="ai-chat-text">{chat.message}</div>
                <div className="message-timestamp">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
            </div>
          ))}
          {loadingChat && 
            <div className="ai-chat-loading">
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Thinking...
            </div>
          }
        </div>
        
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
                  <i className="send-icon">➤</i>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;