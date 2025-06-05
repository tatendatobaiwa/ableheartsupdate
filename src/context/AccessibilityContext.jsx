import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isDyslexiaModeEnabled, setIsDyslexiaModeEnabled] = useState(() => {
    // Initialize from localStorage or default to false
    try {
      return JSON.parse(localStorage.getItem('dyslexiaMode')) || false;
    } catch (error) {
      console.error("Failed to parse dyslexiaMode from localStorage", error);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('dyslexiaMode', JSON.stringify(isDyslexiaModeEnabled));
    if (isDyslexiaModeEnabled) {
      document.body.classList.add('dyslexia-mode');
    } else {
      document.body.classList.remove('dyslexia-mode');
    }
  }, [isDyslexiaModeEnabled]);

  const toggleDyslexiaMode = () => {
    setIsDyslexiaModeEnabled(prevMode => !prevMode);
  };

  return (
    <AccessibilityContext.Provider value={{ isDyslexiaModeEnabled, toggleDyslexiaMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext); 