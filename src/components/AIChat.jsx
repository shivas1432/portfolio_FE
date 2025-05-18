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
    website: "https://shivashankerportfolio.netlify.app/",
    greeting: "Hello! I'm Shivashanker's portfolio assistant. I can help you learn about his skills, experience, and projects. How can I assist you today?",
  }), []);
  
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
    return `You are an AI assistant for Shivashanker's portfolio website (${portfolioContext.website}). 
    You help visitors learn about Shivashanker's skills, experience, and projects.
    
    IMPORTANT RULES:
    1. Provide detailed information about Shivashanker's portfolio, resume, skills, and experience
    2. For general greetings, respond politely but briefly
    3. If you don't have specific information about Shivashanker, provide what you know and suggest visiting his website
    4. Include specific details from his portfolio when available
    5. Always include the portfolio website link with your answers
    
    User's question: ${userQuery}`;
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