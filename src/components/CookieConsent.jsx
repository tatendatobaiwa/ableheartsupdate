import { useState, useEffect, memo } from 'react';
import { useSecurity } from '../context/SecurityContext';
import './CookieConsent.css';

/**
 * Cookie Consent Component
 * GDPR/CCPA compliant cookie consent management
 */
const CookieConsent = memo(() => {
  const { cookieConsent, setCookieConsent } = useSecurity();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: true
  });

  // Check if consent banner should be shown
  useEffect(() => {
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, [cookieConsent]);

  // Handle accept all cookies
  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now()
    };
    
    setCookieConsent(consent);
    setShowBanner(false);
  };

  // Handle reject non-essential cookies
  const handleRejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: true,
      timestamp: Date.now()
    };
    
    setCookieConsent(consent);
    setShowBanner(false);
  };

  // Handle save preferences
  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: Date.now()
    };
    
    setCookieConsent(consent);
    setShowBanner(false);
    setShowDetails(false);
  };

  // Handle preference change
  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        {!showDetails ? (
          // Simple banner view
          <div className="cookie-banner-simple">
            <div className="cookie-banner-content">
              <h3>We value your privacy</h3>
              <p>
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
              <div className="cookie-banner-actions">
                <button 
                  className="cookie-btn cookie-btn-accept"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
                <button 
                  className="cookie-btn cookie-btn-reject"
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
                <button 
                  className="cookie-btn cookie-btn-customize"
                  onClick={() => setShowDetails(true)}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Detailed preferences view
          <div className="cookie-banner-detailed">
            <div className="cookie-banner-header">
              <h3>Cookie Preferences</h3>
              <button 
                className="cookie-close-btn"
                onClick={() => setShowDetails(false)}
                aria-label="Close cookie preferences"
              >
                ×
              </button>
            </div>
            
            <div className="cookie-banner-content">
              <p>
                Choose which cookies you want to accept. You can change these settings at any time.
              </p>
              
              <div className="cookie-categories">
                {/* Necessary Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <h4>Necessary Cookies</h4>
                    <label className="cookie-toggle">
                      <input 
                        type="checkbox" 
                        checked={true}
                        disabled={true}
                      />
                      <span className="cookie-slider disabled"></span>
                    </label>
                  </div>
                  <p>
                    These cookies are essential for the website to function properly. 
                    They cannot be disabled.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <h4>Functional Cookies</h4>
                    <label className="cookie-toggle">
                      <input 
                        type="checkbox" 
                        checked={preferences.functional}
                        onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                      />
                      <span className="cookie-slider"></span>
                    </label>
                  </div>
                  <p>
                    These cookies enable enhanced functionality and personalization, 
                    such as accessibility features and user preferences.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <h4>Analytics Cookies</h4>
                    <label className="cookie-toggle">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      />
                      <span className="cookie-slider"></span>
                    </label>
                  </div>
                  <p>
                    These cookies help us understand how visitors interact with our website 
                    by collecting and reporting information anonymously.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <h4>Marketing Cookies</h4>
                    <label className="cookie-toggle">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing}
                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      />
                      <span className="cookie-slider"></span>
                    </label>
                  </div>
                  <p>
                    These cookies are used to deliver advertisements more relevant to you 
                    and your interests.
                  </p>
                </div>
              </div>

              <div className="cookie-banner-actions">
                <button 
                  className="cookie-btn cookie-btn-save"
                  onClick={handleSavePreferences}
                >
                  Save Preferences
                </button>
                <button 
                  className="cookie-btn cookie-btn-accept"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
              </div>

              <div className="cookie-banner-links">
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CookieConsent.displayName = 'CookieConsent';

export default CookieConsent;