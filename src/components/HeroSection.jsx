'use client';
import { useState, useEffect } from 'react';


const HeroSection = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [showNameForm, setShowNameForm] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNameForm(true);
    }, 3000); // After 3 seconds show name form

    return () => clearTimeout(timer);
  }, []);

  const typeText = (text, callback) => {
    setTypedGreeting('');
    let index = 0;

    function typeChar() {
      if (index < text.length) {
        const char = text.charAt(index);
        setTypedGreeting(prev => prev + char);
        index++;
        setTimeout(typeChar, 70);
      } else if (callback) {
        callback();
      }
    }

    typeChar();
  };

  const handleSubmit = () => {
    if (username.trim()) {
      setShowNameForm(false);
      setTimeout(() => {
        typeText(`Hi ${username} 👋`, () => {
          setTimeout(() => {
            setShowGreeting(false);
            setShowIntro(true);
          }, 1200);
        });
      }, 400);
    } else {
      // Shake animation - add/remove a CSS class
      const input = document.getElementById('username');
      if (input) {
        input.style.animation = 'shake 1s';
        setTimeout(() => (input.style.animation = ''), 500);
      }
    }
  };

  const handleExplore = () => {
    setShowIntro(false);
    setSpinnerVisible(true);

    setTimeout(() => {
      // Final transition
      onSuccess(username);
    }, 3000); // 2s spinner + 1s fade
  };

  return (
    <div id="introOverlay" className={spinnerVisible ? 'hidden' : ''}>
      <div className="content-wrapper">

        {showGreeting && (
          <div className="greeting" id="greeting">
            {typedGreeting.length > 0 ? (
              <>
                {typedGreeting.split('').map((char, idx) =>
                  char === '👋' ? (
                    <span key={idx} className="emoji">{char}</span>
                  ) : (
                    <span key={idx}>{char}</span>
                  )
                )}
              </>
            ) : (
              <>Hi<span className="dots"></span><span id="emoji"></span></>
            )}
          </div>
        )}

        {showNameForm && (
          <div className="name-form active" id="nameForm">
            <label className="form-label1">What should I call you?</label>
            <input
              type="text"
              id="username"
              placeholder="Type your name"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button id="submitBtn" onClick={handleSubmit}>Continue</button>
          </div>
        )}

        {showIntro && (
          <div className="intro active" id="introText">
            <p className="intro-subtitle">Welcome to MyPortfolio</p>
           
            <h1 className="intro-name">Shivashanker Kanugula</h1>
            <div className="role-wrapper">
              <p className="intro-subtitle">I'm a <span className="role"></span></p>
            </div>
            <button className="scroll-button" id="exploreBtn" onClick={handleExplore}>
              Explore Portfolio
            </button>
          </div>
        )}

        {spinnerVisible && (
          <div className="spinner" id="spinner"></div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
