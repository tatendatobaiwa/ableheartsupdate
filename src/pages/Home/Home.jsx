import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import NewsletterSignup from '/src/components/NewsLetterSignup.jsx';  
import { useAccessibility } from '/src/context/AccessibilityContext.jsx';

import landingPageImage from '/src/assets/fixed/landingpageimage.webp';
import whiteLogo from '/src/assets/fixed/icons/whiteablehearts.webp';
import lephoi from '/src/assets/fixed/lephoi/carousel1lephoi.webp';
import kedia from '/src/assets/fixed/kedia/carousel2kedia.webp';
import tsogang from '/src/assets/fixed/tsogangtrust/carousel3tsogang.webp';
import mochudi from '/src/assets/fixed/mochudi/carousel4mochudi.webp';
import blob2 from '/src/assets/fixed/icons/blob2.webp';
import blob3 from '/src/assets/fixed/icons/blob3.webp';
import blob4 from '/src/assets/fixed/icons/blob4.webp';
import newsletter from '/src/assets/fixed/newspaper/newsletterimage.webp';
import scribble from '/src/assets/fixed/icons/scribblebackground.webp';
import india from '/src/assets/fixed/icons/india.webp';
import minjex from '/src/assets/fixed/icons/minjex.webp';
import nortex from '/src/assets/fixed/icons/nortex.webp';
import trans from '/src/assets/fixed/icons/trans.webp';
import tropicana from '/src/assets/fixed/icons/tropicana.webp';
import sennfoods from '/src/assets/fixed/icons/sennfoods.webp';
import francistownelectronics from '/src/assets/fixed/icons/francistownelectronics.webp';
import valentines from '/src/assets/fixed/icons/valentinessports.webp';
import bush from '/src/assets/fixed/icons/busht.webp';
import strub from '/src/assets/fixed/icons/strub.webp';
import bms from '/src/assets/fixed/icons/bms.webp';
import placeholder from '/src/assets/fixed/placeholder.webp';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState({});
  const location = useLocation();
  const { isDyslexiaModeEnabled, toggleDyslexiaMode } = useAccessibility();

  const imageMap = {
    landingPageImage, lephoi, kedia, tsogang, mochudi,
    blob2, blob3, blob4, newsletter, scribble,
    india, minjex, nortex, trans, tropicana, sennfoods,
    francistownelectronics, valentines, bush, strub, bms,
  };

  const slides = [
    {
      image: 'landingPageImage',
      logo: whiteLogo,
      title: 'Dynamic Talent Show',
      date: 'August 20, 2023',
    },
    {
      image: 'lephoi',
      logo: whiteLogo,
      title: 'Lephoi Centre for the Visually Impaired',
      date: 'August 15, 2020',
    },
    {
      image: 'kedia',
      logo: whiteLogo,
      title: 'Kedia Primary School',
      date: 'July 6, 2024',
    },
    {
      image: 'tsogang',
      logo: whiteLogo,
      title: 'Tsogang Trust',
      date: 'October 27, 2022',
    },
    {
      image: 'mochudi',
      logo: whiteLogo,
      title: 'Mochudi Resource Center',
      date: 'April 22, 2021',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.pre-animate, .collaborator-logo, .mission-container').forEach(element => observer.observe(element));

    // Preload initial images (no longer using loadImage function for these)
    Object.values(imageMap).forEach(imgSrc => {
      const img = new Image();
      img.src = imgSrc;
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Preload next slide image if needed (though now all are directly imported)
    const nextSlideImageKey = slides[currentSlide].image;
    // Since images are now directly imported, no explicit preload needed here unless for very large images.
    // The browser's preload scanner handles direct imports efficiently.
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleIndicatorClick = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const getImageUrl = (key) => imageMap[key];

  const handleImageError = (e) => {
    e.target.src = placeholder; // Path to your fallback image
  };  

  return (
    <div className="home-container">
      <div 
        className="carousel-container pre-animate"
        role="region" 
        aria-label="Image Carousel"
        aria-live="polite"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}            role="group"
            aria-roledescription="slide"
            style={{ backgroundImage: `url(${getImageUrl(slide.image)})` }}
          >
            <div className="slide-content">
              <div className="event-details">
                <div className="event-details-row">
                  <img 
                    src={slide.logo} 
                    alt="Event Logo" 
                    className="event-logo event-logo-slide"
                    loading="lazy" 
                    onError={handleImageError}
                    width={200}
                    height="auto"
                  />
                  <div className="event-text">
                    <h2>{slide.title}</h2>
                    <p>{slide.date}</p>
                  </div>
                </div>
              </div>
              <div className="carousel-indicators">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`indicator ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => handleIndicatorClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    {...(currentSlide === idx && { 'aria-current': 'true' })}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
        <button className="prev-button" onClick={handlePrevSlide} aria-label="Previous Slide">
          &#8249;
        </button>
        <button className="next-button" onClick={handleNextSlide} aria-label="Next Slide">
          &#8250;
        </button>
      </div>
      <div className="mission-container pre-animate">
        {/* Background blobs */}
        <div className="mission-blobs">
          <img
            src={getImageUrl('blob2')}
            alt=""
            className="blob blob2"
            loading="lazy"
            width={480}
            height={556}
          />
          <img
            src={getImageUrl('blob3')}
            alt=""
            className="blob blob3"
            loading="lazy"
            width={516}
            height={556}
          />
          <img
            src={getImageUrl('blob4')}
            alt=""
            className="blob blob4"
            loading="lazy"
            width={516}
            height={596}
          />
        </div>
        <h2>Our Mission</h2>
        <p>
          At Able Hearts, our mission is to break barriers, challenge stigma, and
          empower individuals with disabilities to embrace their full potential.
          Guided by our belief that{' '}
          <span className="highlight">
            "We are all equal in the fact that we are all different,"
          </span>{' '}
          we are committed to fostering inclusivity, celebrating diversity, and
          driving meaningful change in communities. Together, we strive to create
          a future where compassion and equality thrive.
        </p>
      </div>
      <div className="newsletter-container pre-animate">
      <div className="contour-overlay">
        <img
          src={getImageUrl('scribble')}
          alt="Scribblebackground"
          onError={handleImageError}
          loading="lazy"
          className="lazy-image" // Add this class
          data-image-key="scribble" // Add this data attribute
        />
      </div>
      <NewsletterSignup />
      <div className="newsletter-image">
        <img
          src={getImageUrl('newsletter')}
          alt="Newsletter"
          onError={handleImageError}
          width="100%"
          height="auto"
          loading="lazy"
          className="lazy-image" // Add this class
          data-image-key="newsletter" // Add this data attribute
        />
      </div>
    </div>
      <div className="collaborators-container pre-animate">
        <h3>Our Valued Collaborators</h3>
        <div className="logo-bar">
          <div className="logo-slider">
            {[
              'india', 'minjex', 'nortex', 'trans', 'tropicana', 'sennfoods',
              'francistownelectronics', 'valentines', 'bush', 'strub', 'bms',
              'india', 'minjex', 'nortex', 'trans', 'tropicana', 'sennfoods',
              'francistownelectronics', 'valentines', 'bush', 'strub', 'bms'
            ].map((logo, index) => (
              <img
                key={index}
                src={getImageUrl(logo)}
                className="collaborator-logo"
                alt={`${logo} logo`}
                height={100}
                data-imagename={logo}
                width={150}
                onError={handleImageError}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
