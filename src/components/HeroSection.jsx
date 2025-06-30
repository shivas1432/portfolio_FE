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
    }, 2000);
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
            // Auto redirect after showing intro
            setTimeout(() => {
              setShowIntro(false);
              setSpinnerVisible(true);
              setTimeout(() => {
                onSuccess(username);
              }, 2000);
            }, 3000); // Show intro for 3 seconds then auto redirect
          }, 1200);
        });
      }, 400);

    } catch (error) {
      console.error('Error submitting name:', error);
      setErrorMessage('Failed to connect to server. Please try again later.');
    }
  };

  const shakeInput = () => {
    const input = document.getElementById('username1');
    if (input) {
      input.style.animation = 'shake 0.5s';
      setTimeout(() => (input.style.animation = ''), 500);
    }
  };

  return (
    <div className={`intro-overlay ${spinnerVisible ? 'hidden' : ''}`}>
      <style jsx>{`
        .intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .intro-overlay.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: scale(0.95);
        }

        .content-wrapper {
          text-align: center;
          padding: 40px;
          max-width: 500px;
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .greeting {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 40px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          letter-spacing: -0.02em;
        }

        .emoji {
          display: inline-block;
          animation: wave 2.5s ease-in-out infinite;
          transform-origin: 70% 70%;
          margin-left: 8px;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
        }

        .dots::after {
          content: '';
          animation: typing-dots 1.8s infinite;
        }

        @keyframes typing-dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }

        .name-form {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .name-form.active {
          opacity: 1;
          transform: translateY(0);
        }

        .form-label {
          display: block;
          font-size: 1.3rem;
          margin-bottom: 24px;
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          position: relative;
          z-index: 1;
        }

        .name-input {
          width: 100%;
          padding: 18px 24px;
          font-size: 1.1rem;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          outline: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'Inter', sans-serif;
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 2;
          margin-top: 8px;
        }

        .name-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .name-input:focus {
          border-color: #60a5fa;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
          transform: translateY(-2px);
        }

        .submit-button {
          width: 100%;
          padding: 18px;
          margin-top: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          z-index: 2;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }

        .submit-button:active {
          transform: translateY(-1px);
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        .intro {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .intro.active {
          opacity: 1;
          transform: translateY(0);
        }

        .intro-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }

        .intro-name {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 24px 0;
          letter-spacing: -0.02em;
          animation: gradient-shift 4s ease infinite;
          font-family: 'Inter', sans-serif;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .role-wrapper {
          margin: 24px 0;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role {
          font-weight: 500;
          color: #60a5fa;
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-left: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 50px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          color: #ef4444;
          margin-top: 12px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 32px 24px;
            margin: 20px;
            border-radius: 20px;
          }
          
          .greeting {
            font-size: 2.2rem;
            margin-bottom: 32px;
          }
          
          .form-label {
            font-size: 1.2rem;
            margin-bottom: 24px;
          }
          
          .name-input, .submit-button {
            padding: 16px 20px;
            font-size: 1rem;
          }
          
          .intro-name {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 24px 20px;
            margin: 16px;
          }
          
          .greeting {
            font-size: 2rem;
            margin-bottom: 28px;
          }
          
          .intro-name {
            font-size: 2.2rem;
          }
          
          .name-input, .submit-button {
            padding: 14px 18px;
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="content-wrapper">
        {showGreeting && (
          <div className="greeting">
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
              <>Hi<span className="dots"></span></>
            )}
          </div>
        )}

        {showNameForm && (
          <div className={`name-form ${showNameForm ? 'active' : ''}`}>
            <label className="form-label">What should I call you?</label>
            <input
              type="text"
              id="username1"
              className="name-input"
              placeholder="Type your name"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button className="submit-button" onClick={handleSubmit}>
              Continue
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}

        {showIntro && (
          <div className={`intro ${showIntro ? 'active' : ''}`}>
            <p className="intro-subtitle">Welcome to MyPortfolio</p>
            <h1 className="intro-name">Shivashanker Kanugula</h1>
            <div className="role-wrapper">
              <p className="intro-subtitle">I'm a <span className="role">Full-Stack Developer</span></p>
            </div>
            <p className="intro-subtitle" style={{marginTop: '20px', fontSize: '1rem', opacity: '0.8'}}>
              Redirecting to portfolio...
            </p>
          </div>
        )}

        {spinnerVisible && (
          <div className="spinner"></div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;