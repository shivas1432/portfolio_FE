import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network error');
      }
      
      const data = await response.json();
      setStatus(data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-background">
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
      </div>
      
      <div className="contact-content">
        <h1 className="contact-title">Get In Touch</h1>
        
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-intro">Feel free to reach out to me through any of these channels or the form below.</p>
            
            <div className="icons-grid1">
              <a href="tel:+447867034729" className="icon-item1">
                <div className="icon-wrapper">
                  <FaPhoneAlt />
                  <span className="icon-tooltip">Call Me</span>
                </div>
              </a>
              <a href="https://wa.me/+447867034729" className="icon-item1" target="_blank" rel="noopener noreferrer">
                <div className="icon-wrapper">
                  <FaWhatsapp />
                  <span className="icon-tooltip">WhatsApp</span>
                </div>
              </a>
              <a href="mailto:shivashanker7337@gmail.com" className="icon-item1">
                <div className="icon-wrapper">
                  <FaEnvelope />
                  <span className="icon-tooltip">Email Me</span>
                </div>
              </a>
              <a href="https://github.com/shivas1432" className="icon-item1" target="_blank" rel="noopener noreferrer">
                <div className="icon-wrapper">
                  <FaGithub />
                  <span className="icon-tooltip">GitHub</span>
                </div>
              </a>
              <a href="www.linkedin.com/in/shiva-kanugula-51a512252" className="icon-item1" target="_blank" rel="noopener noreferrer">
                <div className="icon-wrapper">
                  <FaLinkedin />
                  <span className="icon-tooltip">LinkedIn</span>
                </div>
              </a>
              <a href="https://www.instagram.com/ss_web_services" className="icon-item1" target="_blank" rel="noopener noreferrer">
                <div className="icon-wrapper">
                  <FaInstagram />
                  <span className="icon-tooltip">Instagram</span>
                </div>
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className={`contact-form ${isSubmitting ? 'submitting' : ''}`}>
              <div className={`form-group ${activeField === 'name' ? 'active' : ''}`}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className="form-input"
                  id="name-input"
                />
                <label htmlFor="name-input" className="form-label">Your Name</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className={`form-group ${activeField === 'email' ? 'active' : ''}`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className="form-input"
                  id="email-input"
                />
                <label htmlFor="email-input" className="form-label">Your Email</label>
                <div className="input-highlight"></div>
              </div>
              
              <div className={`form-group ${activeField === 'message' ? 'active' : ''}`}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  className="form-textarea"
                  id="message-input"
                />
                <label htmlFor="message-input" className="form-label">Your Message</label>
                <div className="input-highlight"></div>
              </div>
              
              <button type="submit" className="form-button" disabled={isSubmitting}>
                <span className="button-text">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <span className="button-icon">→</span>
              </button>
            </form>
            
            {status && (
              <div className={`form-status ${status.includes('success') ? 'success' : 'error'}`}>
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;