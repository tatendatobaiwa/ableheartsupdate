
import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '/src/assets/fixed/icons/ableheartslogo.webp';
import MobileMenu from '../MobileNavigation/MobileMenu';
import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { safeWindow } from '../../utils/safeDOMAccess';

/**
 * Header component with navigation and mobile menu
 * Memoized for performance optimization
 */
const Header = memo(() => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 10; // Trigger after 10px scroll
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    // Add scroll listener
    safeWindow.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      safeWindow.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Use consistent navigation items from constants

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-container">
        <Link to="/" className="header-logo" aria-label="AbleHearts Foundation Home">
          <img src={logo} alt="AbleHearts Foundation Logo" />
        </Link>
        
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul>
            {NAVIGATION_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} aria-current={location.pathname === to ? 'page' : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className="mobile-menu-icon" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <i className="fas fa-times" aria-hidden="true"></i>
          ) : (
            <i className="fas fa-bars" aria-hidden="true"></i>
          )}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <MobileMenu 
          id="mobile-menu"
          isOpen={isMobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navigationItems={NAVIGATION_ITEMS}
        />
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
