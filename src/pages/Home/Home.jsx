import React, { useEffect, useState } from 'react';
import './Home.css';
import NewsletterSignup from "../../components/NewsLetterSignup.jsx";

import landingPageImage from '/src/assets/fixed/landingpageimage.webp';
import whiteLogo from '/src/assets/fixed/icons/whiteablehearts.webp';
import lephoi from '/src/assets/fixed/lephoi/carousel1lephoi.webp';
import kedia from '/src/assets/fixed/kedia/carousel2kedia.webp';
import tsogang from '/src/assets/fixed/tsogangtrust/carousel3tsogang.webp';
import mochudi from '/src/assets/fixed/mochudi/carousel4mochudi.webp';
import blob2 from '/src/assets/fixed/icons/blob2.webp';
import blob3 from '/src/assets/fixed/icons/blob3.webp';
import blob4 from '/src/assets/fixed/icons/blob4.webp';
import newsletterImageFile from '/src/assets/fixed/newspaper/newsletterimage.webp'; // Renamed to avoid conflict
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

const CAROUSEL_INTERVAL = 5000;
const TRANSITION_DURATION = 800;

const collaboratorLogosList = [
  'india', 'minjex', 'nortex', 'trans', 'tropicana', 'sennfoods',
  'francistownelectronics', 'valentines', 'bush', 'strub', 'bms',
];
const duplicatedCollaboratorLogos = [...collaboratorLogosList, ...collaboratorLogosList];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const imageMap = {
    landingPageImage, lephoi, kedia, tsogang, mochudi,
    blob2, blob3, blob4, newsletter: newsletterImageFile, scribble,
    india, minjex, nortex, trans, tropicana, sennfoods,
    francistownelectronics, valentines, bush, strub, bms,
  };

  const slides = [
    { image: 'landingPageImage', logo: whiteLogo, title: 'Dynamic Talent Show', date: 'August 20, 2023' },
    { image: 'lephoi', logo: whiteLogo, title: 'Lephoi Centre for the Visually Impaired', date: 'August 15, 2020' },
    { image: 'kedia', logo: whiteLogo, title: 'Kedia Primary School', date: 'July 6, 2024' },
    { image: 'tsogang', logo: whiteLogo, title: 'Tsogang Trust', date: 'October 27, 2022' },
    { image: 'mochudi', logo: whiteLogo, title: 'Mochudi Resource Center', date: 'April 22, 2021' },
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

    Object.values(imageMap).forEach(imgSrc => {
      if (typeof imgSrc === 'string') { // Ensure it's a path
        const img = new Image();
        img.src = imgSrc;
      }
    });

    return () => observer.disconnect();
  }, [imageMap]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(interval);
  }, [slides.length]);

  const changeSlide = (newIndexOrUpdater) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndexOrUpdater);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  };

  const handleNextSlide = () => {
    changeSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    changeSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleIndicatorClick = (index) => {
    if (index === currentSlide) return;
    changeSlide(index);
  };

  const getImageUrl = (key) => imageMap[key] || placeholder;

  const handleImageError = (e) => {
    e.target.src = placeholder;
  };

  return (
    <div className="page-wrapper">
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
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              role="group"
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
                      width={100}
                      height={100}
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
            ‹
          </button>
          <button className="next-button" onClick={handleNextSlide} aria-label="Next Slide">
            ›
          </button>
        </div>

        <div className="mission-container pre-animate">
          <div className="home-background-blobs">
            <img src={getImageUrl('blob2')} alt="" className="home-blobg blob-1" loading="lazy" width={480} height={556} onError={handleImageError} />
            <img src={getImageUrl('blob3')} alt="" className="home-blobg blob-2" loading="lazy" width={516} height={556} onError={handleImageError} />
            <img src={getImageUrl('blob4')} alt="" className="home-blobg blob-3" loading="lazy" width={516} height={596} onError={handleImageError} />
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
              alt="Scribble background"
              onError={handleImageError}
              loading="lazy"
              className="lazy-image"
              width="1000"
              height="1280"
            />
          </div>
          <NewsletterSignup />
          <div className="newsletter-image">
            <img
              src={getImageUrl('newsletter')}
              alt="Newsletter visual"
              onError={handleImageError}
              width="400"
              height="400"
              loading="lazy"
              className="lazy-image"
            />
          </div>
        </div>

        <div className="collaborators-container pre-animate">
          <h3>Our Valued Collaborators</h3>
          <div className="logo-bar">
            <div className="logo-slider">
              {duplicatedCollaboratorLogos.map((logoKey, index) => (
                <img
                  key={index}
                  src={getImageUrl(logoKey)}
                  className="collaborator-logo"
                  alt={`${logoKey} logo`}
                  height={100}
                  data-imagename={logoKey}
                  width={150}
                  onError={handleImageError}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;