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

  const [isScreenReaderModeEnabled, setIsScreenReaderModeEnabled] = useState(() => {
    // Initialize from localStorage or default to false
    try {
      return JSON.parse(localStorage.getItem('screenReaderMode')) || false;
    } catch (error) {
      console.error("Failed to parse screenReaderMode from localStorage", error);
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

  useEffect(() => {
    localStorage.setItem('screenReaderMode', JSON.stringify(isScreenReaderModeEnabled));
    if (isScreenReaderModeEnabled) {
      document.body.classList.add('screen-reader-mode');
      // Potentially announce changes or focus on main content for screen readers
      // For example, you might add an aria-live region to announce the mode change.
    } else {
      document.body.classList.remove('screen-reader-mode');
    }
  }, [isScreenReaderModeEnabled]);

  const toggleDyslexiaMode = () => {
    setIsDyslexiaModeEnabled(prevMode => !prevMode);
  };

  const toggleScreenReaderMode = () => {
    setIsScreenReaderModeEnabled(prevMode => !prevMode);
  };

  return (
    <AccessibilityContext.Provider value={{
      isDyslexiaModeEnabled,
      toggleDyslexiaMode,
      isScreenReaderModeEnabled,
      toggleScreenReaderMode
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext); 