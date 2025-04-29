import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/References.css';

const References = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    company: '',
    relationship: '',
    aboutMe: '',
    image: null,
    signature: null,
    lor: null,
  });

  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) setFormData((prevData) => ({ ...prevData, [fileType]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    
    // Add form submitting class for loading animation
    document.querySelector('.reference-form').classList.add('submitting');
    
    const formDataToSend = new FormData();
    for (const key in formData) formDataToSend.append(key, formData[key]);

    try {
      const response = await fetch('https://portfolio-be-sad5.onrender.com/api/references', {
        method: 'POST',
        body: formDataToSend,
      });

      // Remove submitting class
      document.querySelector('.reference-form').classList.remove('submitting');

      if (!response.ok) throw new Error('Network response was not ok');
      setStatus('Reference submitted successfully! A confirmation email has been sent.');
      setFormData({
        name: '',
        email: '',
        jobTitle: '',
        company: '',
        relationship: '',
        aboutMe: '',
        image: null,
        signature: null,
        lor: null,
      });
      
      // Optional: redirect after successful submission (with delay)
      setTimeout(() => navigate('/references'), 2000);
    } catch (error) {
      // Remove submitting class
      document.querySelector('.reference-form').classList.remove('submitting');
      console.error('Error submitting reference:', error);
      setStatus('Failed to submit reference. Please try again later.');
    }
  };

  // File upload labels
  const uploadLabels = {
    image: 'Profile Photo',
    signature: 'Digital Signature',
    lor: 'Letter of Recommendation'
  };

  return (
    <div className="references">
      <button onClick={() => navigate('/references')} className="back-button">Back to References</button>
      <h1>Add Reference</h1>
      
      <form onSubmit={handleSubmit} className="reference-form">
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Reference Name" 
          required 
        />
        
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Reference Email" 
          required 
        />
        
        <input 
          type="text" 
          name="jobTitle" 
          value={formData.jobTitle} 
          onChange={handleChange} 
          placeholder="Job Title" 
          required 
        />
        
        <input 
          type="text" 
          name="company" 
          value={formData.company} 
          onChange={handleChange} 
          placeholder="Company Name" 
          required 
        />
        
        <input 
          type="text" 
          name="relationship" 
          value={formData.relationship} 
          onChange={handleChange} 
          placeholder="Relationship (e.g., Manager, Colleague)" 
          required 
        />
        
        <textarea 
          name="aboutMe" 
          value={formData.aboutMe} 
          onChange={handleChange} 
          placeholder="Details about your work together" 
          required 
        />

        {Object.keys(uploadLabels).map((field) => (
          <div className="upload-container" key={field}>
            <input 
              type="file" 
              accept={field === 'lor' ? "application/pdf,.doc,.docx" : "image/*"} 
              onChange={(e) => handleFileChange(e, field)} 
              className="upload-input" 
              id={`${field}-upload`} 
            />
            <label htmlFor={`${field}-upload`} className="upload-label">
              Upload {uploadLabels[field]} (Optional)
            </label>
          </div>
        ))}

        <button type="submit" className="submit-button">Submit Reference</button>
      </form>
      
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default References;