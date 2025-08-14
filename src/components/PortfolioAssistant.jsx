import React, { useState, useRef, useEffect } from 'react';
import { assistantMessages } from './assistantMessages'; // Import the messages

const PortfolioAssistant = ({ currentPage = 'portfolio' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current page content or default to portfolio
  const currentPageContent = assistantMessages[currentPage] || assistantMessages.portfolio;
  
  const [messages, setMessages] = useState([
    { type: 'ai', content: currentPageContent.initialMessage, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice-related state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // Mouse tracking state
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isMouseInArea, setIsMouseInArea] = useState(false);
  
  // Greeting bubble state
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState('');
  
  // Refs for voice functionality and mouse tracking
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const messagesEndRef = useRef(null);
  const botRef = useRef(null);
  const trackingAreaRef = useRef(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setSpeechSupported(true);
      
      // Initialize speech recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      // Initialize speech synthesis
      synthRef.current = speechSynthesis;
    }
    
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Greeting animation effect
  useEffect(() => {
    // Clear any existing greeting state when page changes
    setShowGreeting(false);
    setGreetingText('');
    
    // Clear any existing timers
    let greetingTimer, typeWriter;
    
    // Show greeting after a short delay when component mounts or page changes
    greetingTimer = setTimeout(() => {
      setShowGreeting(true);
      
      // Typewriter effect for greeting text - use page-specific greeting
      const fullText = currentPageContent.greeting;
      let currentText = '';
      let charIndex = 0;
      
      typeWriter = setInterval(() => {
        if (charIndex < fullText.length) {
          currentText += fullText[charIndex];
          setGreetingText(currentText);
          charIndex++;
        } else {
          clearInterval(typeWriter);
          
          // Hide greeting after showing complete message for 6 seconds
          setTimeout(() => {
            setShowGreeting(false);
            setGreetingText('');
          }, 6000);
        }
      }, 60);
    }, 1500); // Initial delay

    // Cleanup function to clear timers when page changes
    return () => {
      if (greetingTimer) clearTimeout(greetingTimer);
      if (typeWriter) clearInterval(typeWriter);
      setShowGreeting(false);
      setGreetingText('');
    };
  }, [currentPageContent.greeting]); // Re-run when page changes

  // Update messages when page changes
  useEffect(() => {
    // Immediately reset messages for new page
    setMessages([
      { type: 'ai', content: currentPageContent.initialMessage, timestamp: new Date() }
    ]);
    
    // Close chat window when page changes to avoid confusion
    setIsOpen(false);
    
    // Stop any ongoing speech when page changes
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [currentPage, currentPageContent.initialMessage]);

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!botRef.current || !trackingAreaRef.current) return;
      
      const trackingArea = trackingAreaRef.current.getBoundingClientRect();
      const bot = botRef.current.getBoundingClientRect();
      
      // Check if mouse is in tracking area
      const isInArea = (
        e.clientX >= trackingArea.left &&
        e.clientX <= trackingArea.right &&
        e.clientY >= trackingArea.top &&
        e.clientY <= trackingArea.bottom
      );
      
      setIsMouseInArea(isInArea);
      
      if (isInArea) {
        // Calculate bot center
        const botCenterX = bot.left + bot.width / 2;
        const botCenterY = bot.top + bot.height / 2;
        
        // Calculate angle from bot center to mouse
        const deltaX = e.clientX - botCenterX;
        const deltaY = e.clientY - botCenterY;
        
        // Calculate distance for eye movement limitation
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 200; // Maximum distance for full eye movement
        const intensity = Math.min(distance / maxDistance, 1);
        
        // Calculate eye position (limited range)
        const maxEyeMovement = 8; // Maximum pixels the eyes can move
        const eyeX = (deltaX / distance) * intensity * maxEyeMovement;
        const eyeY = (deltaY / distance) * intensity * maxEyeMovement;
        
        setEyePosition({ 
          x: isNaN(eyeX) ? 0 : eyeX, 
          y: isNaN(eyeY) ? 0 : eyeY 
        });
      } else {
        // Reset eye position when mouse leaves area
        setEyePosition({ x: 0, y: 0 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Voice input function
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Voice output function
  const speakMessage = (text) => {
    if (synthRef.current && voiceEnabled) {
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.2;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Try to use a pleasant voice
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { type: 'user', content: inputValue.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8081/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.content, 
          context: currentPage,
          pageInfo: currentPageContent // Send page context to backend
        }),
      });

      const data = await response.json();
      if (data.success) {
        const aiMessage = { type: 'ai', content: data.response, timestamp: new Date() };
        setMessages(prev => [...prev, aiMessage]);
        
        // Speak the AI response if voice is enabled
        if (voiceEnabled) {
          setTimeout(() => speakMessage(data.response), 100);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      const errorMessage = {
        type: 'ai',
        content: "I'm having technical difficulties. Please make sure backend is running on port 8081!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      if (voiceEnabled) {
        setTimeout(() => speakMessage(errorMessage.content), 100);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className={`portfolio-assistant ${isOpen ? 'open' : 'closed'}`}>
      {/* Mouse tracking area - invisible overlay */}
      <div 
        ref={trackingAreaRef}
        className="mouse-tracking-area"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '300px',
          height: '300px',
          pointerEvents: 'none',
          zIndex: 998,
        }}
      />

      {/* Interactive Bot Face Toggle - FIXED: Removed full-screen blocking areas */}
      <div className="container-ai-input" style={{ position: 'relative', width: '120px', height: '120px' }}>
        <label 
          ref={botRef}
          className={`container-wrap ${isMouseInArea ? 'mouse-tracking' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Greeting Bubble */}
          {showGreeting && !isOpen && (
            <div className={`greeting-bubble ${currentPage}-page`}>
              <div className="greeting-content">
                <div className="greeting-text">{greetingText}</div>
                <div className="greeting-cursor">|</div>
              </div>
              <div className="greeting-tail"></div>
            </div>
          )}
          
          <div className="card">
            <div className="background-blur-balls">
              <div className="balls">
                <span className="ball rosa"></span>
                <span className="ball violet"></span>
                <span className="ball green"></span>
                <span className="ball cyan"></span>
              </div>
            </div>
            <div className="content-card">
              <div className="background-blur-card">
                <div className="eyes">
                  <span 
                    className="eye"
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      transition: isMouseInArea ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
                    }}
                  ></span>
                  <span 
                    className="eye"
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      transition: isMouseInArea ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
                    }}
                  ></span>
                </div>
                <div className="eyes happy">
                  <svg fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                    ></path>
                  </svg>
                  <svg fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="assistant-info">
              <div className="avatar">🤖</div>
              <div className="info">
                <h3>Shiva's Assistant</h3>
                <p>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Helper</p>
              </div>
            </div>
            
            {/* Voice controls */}
            {speechSupported && (
              <div className="voice-controls">
                <button 
                  className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? 'Disable voice output' : 'Enable voice output'}
                >
                  {voiceEnabled ? '🔊' : '🔇'}
                </button>
                
                {isSpeaking && (
                  <button 
                    className="stop-speaking"
                    onClick={stopSpeaking}
                    title="Stop speaking"
                  >
                    ⏹️
                  </button>
                )}
              </div>
            )}
            
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
                  
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">{message.content}</div>
                {message.type === 'ai' && voiceEnabled && (
                  <button 
                    className="speak-button"
                    onClick={() => speakMessage(message.content)}
                    disabled={isSpeaking}
                    title="Speak this message"
                  >
                    🔊
                  </button>
                )}
              </div>
            ))}
            {isLoading && <div className="message ai">🤖 Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Pills */}
          {messages.length === 1 && !isLoading && (
            <div className="suggestions-container">
              <div className="suggestions-title">💡 Try asking:</div>
              <div className="suggestions-grid">
                {currentPageContent.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestion-pill"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="input-container">
            <div className="input-wrapper">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask about Shiva's ${currentPage}...`}
              />
              
              {/* Beautiful Voice Input with Spectrum Animation */}
              {speechSupported && (
                <div className={`voice-input-container ${isListening ? 'listening' : ''}`}>
                  <div className="card">
                    <input
                      className="input"
                      hidden=""
                      type="checkbox"
                      aria-label="audio-command"
                      name="audio-command"
                      id="audio-command"
                      checked={isListening}
                      onChange={() => {}} // Controlled by startListening function
                    />
                    <div className="inner-card">
                      <div className="trigger-wrap">
                        <label 
                          className="trigger" 
                          htmlFor="audio-command"
                          onClick={startListening}
                          style={{ cursor: 'pointer' }}
                        ></label>
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mic"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          fill="none"
                        >
                          <path d="m19.5,10.89c0,4.44-3.36,8.04-7.5,8.04s-7.5-3.6-7.5-8.04"></path>
                          <line x1="12" y1="22.42" x2="12" y2="18.93"></line>
                          <rect
                            x="8.38"
                            y="1.81"
                            width="7.23"
                            height="13.25"
                            rx="3.62"
                            ry="3.62"
                          ></rect>
                        </svg>
                        <div className="spectrum">
                          {[...Array(12)].map((_, index) => (
                            <b key={index} style={{ '--index': index }}></b>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                className="btn btn--primary send-btn"
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isLoading}
              >
                <span className="btn-inner">
                  <span className="btn-label">
                    {isLoading ? '⏳' : 'send'}
                  </span>
                </span>
              </button>
            </div>
            
            {!speechSupported && (
              <div className="voice-not-supported">
                <small>⚠️ Voice features not supported in this browser</small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioAssistant;