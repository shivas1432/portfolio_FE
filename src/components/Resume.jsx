import React from 'react';
import '../css/Resume.css'; // Import CSS for styling

const Resume = () => {
  return (
    <div className="resume">
      <h1>Resume</h1>
      <p>
        Download my resume 
        <a href="/cv.pdf" download>
          here
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v16M5 13l7 7 7-7" />
          </svg>
        </a>
      </p>
    </div>
  );
};

export default Resume;
