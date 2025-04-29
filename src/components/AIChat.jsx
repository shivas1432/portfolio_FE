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
  
  const handleAskSubmit = async () => {
    if (!userQuestion.trim() || userQuestion.trim().length > 500) {
      setChatHistory(prev => [...prev, { type: 'error', message: 'Message too long. Please limit to 500 characters.' }]);
      return;
    }
    
    setLoadingChat(true);
    setChatHistory(prev => [...prev, { type: 'user', message: userQuestion }]);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, { message: userQuestion });
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
  
  const recentChats = [
    { id: 1, title: "Show me Shivashanker's recent projects" },
    { id: 2, title: "What tech stack does he specialize in?" },
    { id: 3, title: "Tell me about the AI assistance in his portfolio" },
    { id: 4, title: "What backend technologies has he used?" },
    { id: 5, title: "Does he have any experience with cloud platforms?" },
    { id: 6, title: "Give a quick overview of Shivashanker's skills" },
    { id: 7, title: "What kind of frontend frameworks has he worked with?" }
  ];
  

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chatHistory]);

  // Function to toggle chat display on mobile
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="aivo-app-container">
      {/* Mobile chat toggle button */}
      <div className="mobile-chat-toggle" onClick={toggleChat}>
        <i className="chat-icon">💬</i>
      </div>
      
      {/* Dashboard view (left side in desktop) */}
      <div className={`dashboard-view ${showChat ? 'hidden-mobile' : ''}`}>
        <div className="user-greeting">
          <div className="greeting-text">
            <span className="greeting">Hi</span>
            <h2>This is shiva's portfolio Assistant</h2>
            <p>How can I assist you today?</p>
          </div>
        </div>
        
        <div className="recent-chats-section">
          <div className="section-header">
            <h3>Frequent questions</h3>
            
          </div>
          
          <div className="chats-list">
            {recentChats.map(chat => (
              <div key={chat.id} className="chat-item">
                <div className="chat-icon">🔆</div>
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
            
            <div className="feature-options">
  <a href="/contact" className="feature-option" style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="option-icon image-icon">🖼️</div>
    <div className="option-text">
      <p><strong>Say Hello to Shiva — One Touch Away!</strong></p>
    </div>
    <div className="option-arrow">→</div>
  </a>
</div>

          </div>
     
        </div>
      </div>
      
      {/* Chat view (right side in desktop) */}
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
              <div className="ai-chat-text">{chat.message}</div>
              <div className="message-timestamp">12:18 AM</div>
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
              placeholder="Ask me about my skills, projects, or anything else!" 
              rows={1} 
              disabled={loadingChat} 
            />
            <div className="input-buttons">
             
              <button 
                className={`send-button ${userQuestion.trim() ? 'active' : ''}`} 
                onClick={handleAskSubmit} 
                disabled={loadingChat || !userQuestion.trim()}
              >
                {loadingChat ? 
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 
                  <i className="send-icon">send</i>
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
