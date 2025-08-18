// frontend/src/components/PortfolioAssistant.jsx
// UPDATED: Added hunger system integration while preserving all existing features

import React, { useState, useRef, useEffect } from 'react';
import { assistantMessages } from './assistantMessages';
import FoodIcon from './FoodIcon';
import { 
  getHungerLevel, 
  getHungerState, 
  getHungerMessage, 
  getCelebrationMessage,
  getCollectionGuidanceMessage,
  checkAutoReset,
  getHungerStatus
} from './hungerSystem';

const PortfolioAssistant = ({ currentPage = 'portfolio' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get current page content or default to portfolio
  const currentPageContent = assistantMessages[currentPage] || assistantMessages.portfolio;
  
  const [messages, setMessages] = useState([
    { type: 'ai', content: currentPageContent.initialMessage, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // EXISTING Voice-related state (preserved)
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // EXISTING Mouse tracking state (preserved)
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isMouseInArea, setIsMouseInArea] = useState(false);
  
  // EXISTING Greeting bubble state (preserved)
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState('');
  
  // NEW: Hunger system state
  const [hungerLevel, setHungerLevel] = useState(0);
  const [hungerState, setHungerState] = useState('starving');
  const [showLoveHearts, setShowLoveHearts] = useState(false);
  const [showHungerMessage, setShowHungerMessage] = useState(false);
  const [botFeeding, setBotFeeding] = useState(false);
  const [hasCollectedAnyFood, setHasCollectedAnyFood] = useState(false);
  
  // EXISTING Refs for voice functionality and mouse tracking (preserved)
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const messagesEndRef = useRef(null);
  const botRef = useRef(null);
  const trackingAreaRef = useRef(null);

  // NEW: Initialize hunger system
  useEffect(() => {
    checkAutoReset(); // Check if we need to reset after 24 hours
    const currentHunger = getHungerLevel();
    const currentState = getHungerState(currentHunger);
    const status = getHungerStatus();
    setHungerLevel(currentHunger);
    setHungerState(currentState);
    setHasCollectedAnyFood(status.collectedFoods.length > 0);
    // Show love hearts from first food collection
    setShowLoveHearts(status.collectedFoods.length > 0);
  }, []);

  // EXISTING: Initialize speech recognition and synthesis (preserved exactly)
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
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech result:', transcript);
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      // Initialize speech synthesis
      synthRef.current = speechSynthesis;
    }
    
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // UPDATED: Greeting animation effect with hunger awareness
  useEffect(() => {
    // Clear any existing greeting state when page changes
    setShowGreeting(false);
    setGreetingText('');
    
    // Clear any existing timers
    let greetingTimer, hungerTimer, typeWriter;
    
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
            
            // NEW: Show hunger message after greeting (only on homepage if no food collected)
            if (currentPage === 'portfolio' && !hasCollectedAnyFood) {
              setTimeout(() => {
                setShowHungerMessage(true);
                // Hide hunger message after 8 seconds
                setTimeout(() => {
                  setShowHungerMessage(false);
                }, 8000);
              }, 2000);
            }
          }, 6000);
        }
      }, 60);
    }, 1500); // Initial delay

    // Cleanup function to clear timers when page changes
    return () => {
      if (greetingTimer) clearTimeout(greetingTimer);
      if (hungerTimer) clearTimeout(hungerTimer);
      if (typeWriter) clearInterval(typeWriter);
      setShowGreeting(false);
      setGreetingText('');
      setShowHungerMessage(false);
    };
  }, [currentPageContent.greeting, currentPage, hasCollectedAnyFood]);

  // EXISTING: Update messages when page changes (preserved exactly)
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

  // EXISTING: Mouse tracking effect (preserved exactly)
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

  // NEW: Handle food collection
  const handleFoodCollected = (result) => {
    if (result.success) {
      // Update hunger state
      setHungerLevel(result.newHungerLevel);
      const newState = getHungerState(result.newHungerLevel);
      setHungerState(newState);
      setHasCollectedAnyFood(true);

      // Show feeding animation
      setBotFeeding(true);
      setTimeout(() => setBotFeeding(false), 1000);

      // Show love hearts from first food collection
      setShowLoveHearts(true);

      // Add celebration message to chat
      const celebrationMsg = getCelebrationMessage(result.food, result.newHungerLevel);
      const aiMessage = {
        type: 'ai',
        content: celebrationMsg,
        timestamp: new Date(),
        isHungerMessage: true
      };
      setMessages(prev => [...prev, aiMessage]);

      // Add guidance message after 2 seconds
      setTimeout(() => {
        const guidanceMsg = getCollectionGuidanceMessage(currentPage, result.totalCollected);
        const guidanceMessage = {
          type: 'ai',
          content: guidanceMsg,
          timestamp: new Date(),
          isHungerMessage: true
        };
        setMessages(prev => [...prev, guidanceMessage]);

        // Speak guidance if voice enabled
        if (voiceEnabled) {
          setTimeout(() => speakMessage(guidanceMsg), 100);
        }
      }, 2000);

      // Speak celebration if voice enabled
      if (voiceEnabled) {
        setTimeout(() => speakMessage(celebrationMsg), 100);
      }
    }
  };

  // EXISTING: Voice input function (preserved exactly)
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        // Set listening state immediately for visual feedback
        setIsListening(true);
        
        // Add timeout fallback in case recognition doesn't start
        const timeoutId = setTimeout(() => {
          if (isListening) {
            console.log('Speech recognition timeout - resetting state');
            setIsListening(false);
          }
        }, 10000); // 10 second timeout
        
        recognitionRef.current.start();
        
        // Clear timeout if recognition starts successfully
        recognitionRef.current.onstart = () => {
          clearTimeout(timeoutId);
          console.log('Speech recognition started');
          setIsListening(true);
        };
        
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        // Reset state if error occurs
        setIsListening(false);
      }
    }
  };

  // EXISTING: Voice output function (preserved exactly)
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

  // EXISTING: Stop speaking (preserved exactly)
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // UPDATED: Handle send message (CLEAN VERSION - NO DEBUG)
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { type: 'user', content: inputValue.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';
      const requestUrl = `${API_BASE_URL}/api/chatbot`;

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage.content, 
          context: currentPage,
          pageInfo: currentPageContent
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
        content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
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

  // EXISTING: Handle suggestion clicks (preserved exactly)
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Auto-send the suggestion
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // NEW: Get eye class based on hunger state
  const getEyeClass = () => {
    if (hungerState === 'full') return 'fed';
    if (hungerState === 'starving' || hungerState === 'hungry') return 'hungry';
    return '';
  };
  return (
    <div className={`portfolio-assistant ${isOpen ? 'open' : 'closed'}`}>
      {/* EXISTING: Mouse tracking area (preserved) */}
      <div 
        ref={trackingAreaRef}
        className="mouse-tracking-area"
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '1100px',
          height: '1100px',
          pointerEvents: 'none',
          zIndex: 998,
        }}
      />

      {/* NEW: Food Icon Component */}
      <FoodIcon currentPage={currentPage} onFoodCollected={handleFoodCollected} />

      {/* UPDATED: Interactive Bot Face Toggle with hunger system */}
      <div className="container-ai-input" style={{ position: 'relative', width: '120px', height: '120px' }}>
        <label 
          ref={botRef}
          className={`container-wrap ${isMouseInArea ? 'mouse-tracking' : ''} ${botFeeding ? 'bot-feeding' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* NEW: Hunger Progress Bar */}
          <div className="hunger-progress-container">
            <div className="hunger-progress-bar">
              <div 
                className="hunger-progress-fill" 
                style={{ width: `${hungerLevel}%` }}
              ></div>
            </div>
            <div className="hunger-percentage">{hungerLevel}% 🍽️</div>
          </div>

          {/* NEW: Love Hearts for Full State */}
          {showLoveHearts && (
            <div className="love-hearts-container">
              <div className="love-heart">💖</div>
              <div className="love-heart">💕</div>
              <div className="love-heart">💗</div>
              <div className="love-heart">💝</div>
              <div className="love-heart">💘</div>
            </div>
          )}

          {/* EXISTING: Greeting Bubble (preserved) */}
          {showGreeting && !isOpen && (
            <div className={`greeting-bubble ${currentPage}-page`}>
              <div className="greeting-content">
                <div className="greeting-text">{greetingText}</div>
                <div className="greeting-cursor">|</div>
              </div>
              <div className="greeting-tail"></div>
            </div>
          )}

          {/* NEW: Hunger Message Bubble */}
          {showHungerMessage && !isOpen && (
            <div className={`greeting-bubble hunger-message ${hungerState}`}>
              <div className="greeting-content">
                <div className="greeting-text">{getHungerMessage(currentPage)}</div>
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
                {/* UPDATED: Eyes with hunger state */}
                <div className={`eyes ${getEyeClass()}`}>
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
                {/* EXISTING: Happy eyes (preserved) */}
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

      {/* EXISTING: Chat Window (preserved exactly) */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="assistant-info">
              <div className="avatar" style={{ 
                backgroundColor: 'transparent',
                backgroundImage: 'url(/ai.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%'
              }}>
              </div>
              <div className="info">
                <h3>Shiva's Assistant</h3>
                <p>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Helper</p>
              </div>
            </div>
            
            {/* EXISTING: Voice controls (preserved) */}
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
                  
          {/* EXISTING: Messages container (preserved) */}
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className={`message-content ${message.isHungerMessage ? 'hunger-status-message' : ''}`}>
                  {message.content}
                </div>
                {message.type === 'ai' && voiceEnabled && (
                  <button 
                    className="speak-button"
                    onClick={() => speakMessage(message.content)}
                    disabled={isSpeaking}
                    title="Speak this message"
                    style={{
                      backgroundImage: 'url(/sound.png)',
                      backgroundSize: '12px 12px',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  >
                  </button>
                )}
              </div>
            ))}
            {isLoading && <div className="message ai">
              <div style={{
                backgroundImage: 'url(/ai.png)',
                backgroundSize: '16px 16px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                paddingLeft: '24px',
                display: 'inline-block'
              }}>
                Thinking...
              </div>
            </div>}
            <div ref={messagesEndRef} />
          </div>

          {/* EXISTING: Suggestion Pills (preserved) */}
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

          {/* EXISTING: Input container (preserved) */}
          <div className="input-container">
            <div className="input-wrapper">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask about Shiva's ${currentPage}...`}
              />
              
              {/* EXISTING: Beautiful Voice Input with Spectrum Animation (preserved) */}
              {speechSupported && (
                <div 
                  className={`voice-input-container ${isListening ? 'listening' : ''}`}
                  data-listening={isListening}
                >
                  <div className={`card ${isListening ? 'recording' : ''}`}>
                    <input
                      className="input"
                      hidden=""
                      type="checkbox"
                      aria-label="audio-command"
                      name="audio-command"
                      id="audio-command"
                      checked={isListening}
                      readOnly
                    />
                    <div className="inner-card">
                      <div className={`trigger-wrap ${isListening ? 'active' : ''}`}>
                        <button 
                          className="trigger" 
                          onClick={startListening}
                          disabled={isListening}
                          style={{ 
                            cursor: isListening ? 'not-allowed' : 'pointer',
                            background: 'transparent',
                            border: 'none',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                          }}
                          title={isListening ? 'Listening...' : 'Click to start voice input'}
                        />
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`mic ${isListening ? 'recording' : ''}`}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          stroke="currentColor"
                          fill="none"
                          style={{ pointerEvents: 'none' }}
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
                        <div className={`spectrum ${isListening ? 'active' : ''}`} style={{ pointerEvents: 'none' }}>
                          {[...Array(12)].map((_, index) => (
                            <b key={index} style={{ '--index': index }}></b>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* EXISTING: Send button (preserved) */}
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
            
            {/* EXISTING: Voice not supported message (preserved) */}
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