'use client';
import { useState, useEffect } from 'react';

const HeroSection = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [showNameForm, setShowNameForm] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState('');
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNameForm(true);
    }, 3000);
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

  const handleSubmit = async () => {
    setErrorMessage('');
    if (!username.trim()) {
      shakeInput();
      return;
    }

    // Client-side check: only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(username)) {
      setErrorMessage('Please enter only letters. No numbers or symbols allowed.');
      shakeInput();
      return;
    }

    try {
      const res = await fetch('https://portfolio-be-sad5.onrender.com/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.errors?.[0]?.msg || 'Invalid name.');
        shakeInput();
        return;
      }

      setShowNameForm(false);
      setTimeout(() => {
        typeText(`Hi ${username} 👋`, () => {
          setTimeout(() => {
            setShowGreeting(false);
            setShowIntro(true);
          }, 1200);
        });
      }, 400);

    } catch (error) {
      console.error('Error submitting name:', error);
      setErrorMessage('Failed to connect to server. Please try again later.');
    }
  };

  const shakeInput = () => {
    const input = document.getElementById('username');
    if (input) {
      input.style.animation = 'shake 0.5s';
      setTimeout(() => (input.style.animation = ''), 500);
    }
  };

  const handleExplore = () => {
    setShowIntro(false);
    setSpinnerVisible(true);
    setTimeout(() => {
      onSuccess(username);
    }, 3000);
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
            {errorMessage && <p style={{ color: 'red', marginTop: '0.5rem' }}>{errorMessage}</p>}
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
