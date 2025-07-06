import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...', 
  showText = true,
  className = '' 
}) => {
  return (
    <div className={`loading-spinner-container ${size} ${className}`} role="status" aria-label={text}>
      <div className={`loading-spinner ${color}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {showText && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;