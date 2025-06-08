import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ableheartslogo from '/src/assets/fixed/icons/ableheartslogo.webp';
import './Header.css';
import { useAccessibility } from '/src/context/AccessibilityContext.jsx';

const Header = () => {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isDropdownActive, setDropdownActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSettingsDropdownActive, setIsSettingsDropdownActive] = useState(false);

  // Scroll event listener (moved to top-level)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navigate = useNavigate();
  const location = useLocation();
  const { isDyslexiaModeEnabled, toggleDyslexiaMode } = useAccessibility();

  const handleLogoClick = () => {
    navigate('');
  };

  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!isDropdownActive);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownActive(!isSettingsDropdownActive);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleMousedown = (event) => {
      // Check if the click is outside the dropdown menu and the dropdown toggle link
      if (isDropdownActive && !event.target.closest('.nav-item.dropdown')) {
        setDropdownActive(false);
      }
      // Close settings dropdown when clicking outside
      if (isSettingsDropdownActive && !event.target.closest('.settings-dropdown-container')) {
        setIsSettingsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleMousedown);
    return () => document.removeEventListener('mousedown', handleMousedown);
  }, [isDropdownActive, isSettingsDropdownActive]);


  const isActive = (path) => location.pathname === path;

  return (
    <header className={isScrolled ? 'transparent-header' : ''}>
      <nav role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-content">
            <div>
              <button
                onClick={handleLogoClick}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <img src={ableheartslogo} alt="ScheduleMaster Logo" className="logo" />
              </button>
            </div>
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
              <li className={`nav-item ${isMenuActive ? 'visible' : ''}`}>
 <Link to="/" className={isActive('/') ? 'active' : ''} prefetch="intent">
 <span>Home</span>
 </Link>
              </li>
              <li
                className={`nav-item dropdown ${isDropdownActive ? 'active' : ''}`} // Keep active class for CSS
              >
 <Link to="/programs-and-initiatives" className={isActive('/programs-and-initiatives') ? 'active' : ''} prefetch="intent">
 <span>Programs & Initiatives</span>
 </Link>
              </li>
              <li
 className={`nav-item dropdown ${isDropdownActive ? 'active' : ''}`} // Keep active class for CSS
 >
 <Link to="/get-involved" className={isActive('/get-involved') ? 'active' : ''} prefetch="intent">
 <span>Get Involved</span>
 </Link>
                <ul className="dropdown-menu">
                  <li>
 <Link to="/ablehearts-ub">AbleHearts UB</Link>
                  </li>
                  <li>
 <Link to="/ablehearts-biust" prefetch="intent">AbleHearts BIUST</Link>
                  </li>
                  <li>
 <Link to="/get-involved" prefetch="intent">Partner with Us</Link>
                  </li>
                </ul>
              </li>
              <li className={`nav-item ${isMenuActive ? 'visible' : ''}`}>
 <Link to="/gallery" className={isActive('/gallery') ? 'active' : ''} prefetch="intent"><span>Gallery</span></Link>
              </li>
              <li className={`nav-item ${isMenuActive ? 'visible' : ''}`}>
                <Link to="/shop" className={isActive('/shop') ? 'active' : ''} prefetch="intent">
                  <span>Shop</span>
                </Link>
              </li>
              <li className={`nav-item settings-dropdown-container ${isSettingsDropdownActive ? 'active' : ''}`}>
                <button onClick={toggleSettingsDropdown} className="settings-button">
                  <span>Settings</span>
                </button>
                <ul className="dropdown-menu settings-dropdown-menu">
                  <li>
                    <button onClick={toggleDyslexiaMode} className="dyslexia-toggle-button">
                      {isDyslexiaModeEnabled ? 'Disable Dyslexia Mode' : 'Enable Dyslexia Mode'}
                    </button>
                  </li>
                  {/* Add other settings options here */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
