import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ableheartslogo from '/src/assets/fixed/icons/ableheartslogo.webp';
import './Header.css';
import { useAccessibility } from '/src/context/AccessibilityContext.jsx';

const SCROLL_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 968;

const Header = () => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isGetInvolvedDropdownActive, setGetInvolvedDropdownActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSettingsDropdownActive, setIsSettingsDropdownActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  const navigate = useNavigate();
  const location = useLocation();
  const { isDyslexiaModeEnabled, toggleDyslexiaMode } = useAccessibility();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    const handleResize = () => {
      const mobileCheck = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobileCheck);
      if (!mobileCheck && isMenuActive) {
        setMenuActive(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuActive]);

  const closeAllMenus = useCallback(() => {
    setMenuActive(false);
    setGetInvolvedDropdownActive(false);
    setIsSettingsDropdownActive(false);
  }, []);

  const handleLogoClick = () => {
    closeAllMenus();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuActive(prev => !prev);
    setGetInvolvedDropdownActive(false);
    setIsSettingsDropdownActive(false);
  };

  const toggleGetInvolvedDropdown = (e) => {
    if (isMobile) return;
    e.stopPropagation();
    setGetInvolvedDropdownActive(prev => !prev);
    setIsSettingsDropdownActive(false);
  };

  const toggleSettingsDropdown = (e) => {
    if (isMobile) return;
    e.stopPropagation();
    setIsSettingsDropdownActive(prev => !prev);
    setGetInvolvedDropdownActive(false);
  };

  useEffect(() => {
    const handleMousedown = (event) => {
      if (isGetInvolvedDropdownActive && !event.target.closest('.nav-item.get-involved-dropdown')) {
        setGetInvolvedDropdownActive(false);
      }
      if (isSettingsDropdownActive && !event.target.closest('.nav-item.settings-dropdown-container')) {
        setIsSettingsDropdownActive(false);
      }
      if (isMenuActive && !event.target.closest('header nav') && !event.target.closest('.menu-toggle')) {
        if (isMobile) {
            setMenuActive(false);
        }
      }
    };
    document.addEventListener('mousedown', handleMousedown);
    return () => document.removeEventListener('mousedown', handleMousedown);
  }, [isGetInvolvedDropdownActive, isSettingsDropdownActive, isMenuActive, isMobile]);

  const handleNavLinkClick = (path) => {
    if (isMobile) {
      setMenuActive(false);
    }
    setGetInvolvedDropdownActive(false);
    setIsSettingsDropdownActive(false);
    if (path !== undefined) navigate(path);
  };

  const handleDyslexiaToggle = () => {
    toggleDyslexiaMode();
    if (isMobile) {
      setMenuActive(false);
    } else {
      setIsSettingsDropdownActive(false);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isGetInvolvedActive = () =>
    isActive('/get-involved') ||
    isActive('/ablehearts-ub') ||
    isActive('/ablehearts-biust');

  return (
    <header className={`${isScrolled ? 'scrolled' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
      <nav role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-content">
            <button onClick={handleLogoClick} className="logo-button" aria-label="Navigate to homepage">
              <img src={ableheartslogo} alt="Able Hearts Logo" className="logo" />
            </button>
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuActive}
              aria-controls="nav-links"
            >
              ☰
            </button>
            <ul id="nav-links" className={`nav-links ${isMenuActive ? 'active' : ''}`}>
              <li className="nav-item">
                <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => handleNavLinkClick('/')}>
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/programs-and-initiatives" className={isActive('/programs-and-initiatives') ? 'active' : ''} onClick={() => handleNavLinkClick('/programs-and-initiatives')}>
                  <span>Programs & Initiatives</span>
                </Link>
              </li>
              <li className={`nav-item dropdown get-involved-dropdown ${isGetInvolvedDropdownActive && !isMobile ? 'active' : ''}`}>
                {isMobile ? (
                  <Link to="/get-involved" className={isGetInvolvedActive() ? 'active' : ''} onClick={() => handleNavLinkClick('/get-involved')}>
                    <span>Get Involved</span>
                  </Link>
                ) : (
                  <button onClick={toggleGetInvolvedDropdown} className={`nav-link-button ${isGetInvolvedActive() ? 'active' : ''}`} aria-expanded={isGetInvolvedDropdownActive}>
                    <span>Get Involved</span>
                  </button>
                )}
                {!isMobile && (
                  <ul className="dropdown-menu">
                    <li><Link to="/ablehearts-ub" onClick={() => handleNavLinkClick('/ablehearts-ub')}>AbleHearts UB</Link></li>
                    <li><Link to="/ablehearts-biust" onClick={() => handleNavLinkClick('/ablehearts-biust')}>AbleHearts BIUST</Link></li>
                    <li><Link to="/get-involved" onClick={() => handleNavLinkClick('/get-involved')}>Partner with Us</Link></li>
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <Link to="/gallery" className={isActive('/gallery') ? 'active' : ''} onClick={() => handleNavLinkClick('/gallery')}>
                  <span>Gallery</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className={isActive('/shop') ? 'active' : ''} onClick={() => handleNavLinkClick('/shop')}>
                  <span>Shop</span>
                </Link>
              </li>
              {isMobile ? (
                <li className="nav-item mobile-dyslexia-toggle">
                  <button onClick={handleDyslexiaToggle} className="nav-link-button dyslexia-toggle-button">
                    <span>{isDyslexiaModeEnabled ? 'Disable Dyslexia Mode' : 'Enable Dyslexia Mode'}</span>
                  </button>
                </li>
              ) : (
                <li className={`nav-item dropdown settings-dropdown-container ${isSettingsDropdownActive ? 'active' : ''}`}>
                  <button onClick={toggleSettingsDropdown} className="settings-button nav-link-button" aria-expanded={isSettingsDropdownActive} aria-label="Accessibility Settings">
                    <span>Settings</span>
                  </button>
                  <ul className="dropdown-menu settings-dropdown-menu">
                    <li>
                      <button onClick={handleDyslexiaToggle} className="dyslexia-toggle-button">
                        {isDyslexiaModeEnabled ? 'Disable Dyslexia Mode' : 'Enable Dyslexia Mode'}
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;