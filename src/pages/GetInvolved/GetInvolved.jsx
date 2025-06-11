import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import scribble from '/src/assets/fixed/icons/scribblebackground.webp';
import DonationForm from '/src/components/DonationForm.jsx';
// import Footer from '../../components/Footer/Footer'; // Assuming Footer will be added later or is part of a layout component

const SCROLL_THRESHOLD_TOP_BTN = 300;
const INTERSECTION_THRESHOLD = 0.1; // For earlier animation trigger

const blobImagePaths = [
  '/src/assets/fixed/icons/blob1.webp',
  '/src/assets/fixed/icons/blob3.webp',
  '/src/assets/fixed/icons/blob4.webp',
  '/src/assets/fixed/icons/blob2.webp',
];

const chapterData = [
  {
    id: 'ub',
    title: 'AbleHearts UB',
    description: 'Our AbleHearts chapter at UB fosters a vibrant community of students working together to make a difference in the lives of people with disabilities. Get involved to create a more inclusive world.',
    imageSrc: '/src/assets/fixed/ubvolunteers.webp',
    imageAlt: 'AbleHearts UB Volunteers',
    buttonText: 'Become a Member',
    navigateTo: '/ablehearts-ub',
  },
  {
    id: 'biust',
    title: 'AbleHearts BIUST',
    description: 'At BIUST, our AbleHearts chapter champions inclusion and innovation to support individuals with disabilities. Join us in transforming campus life through collaboration and compassion.',
    imageSrc: '/src/assets/fixed/biustvolunteers.webp',
    imageAlt: 'AbleHearts BIUST Volunteers',
    buttonText: 'Become a Member',
    navigateTo: '/ablehearts-biust',
  },
];

const GetInvolved = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > SCROLL_THRESHOLD_TOP_BTN);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.pre-animate');
    if (elementsToAnimate.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    elementsToAnimate.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const memoizedBlobImages = useMemo(() => blobImagePaths.map((blob, index) => (
    <img
      key={`blob-${index}`}
      src={blob}
      alt=""
      className={`get-involved-blobg blob-${index + 1}`}
      loading="lazy"
      width="800"
      height="800"
      aria-hidden="true"
    />
  )), []);

  return (
    <div className="page-wrapper get-involved-page">
      <div className="get-involved-container">
        <div className="get-involved-background-blobs" aria-hidden="true">
          {memoizedBlobImages}
        </div>

        <section className="hero-section pre-animate">
          <div className="content-layout">
            <div className="text-content card-style">
              <h1>Get Involved</h1>
              <p>
                Join us in making a difference. Volunteer, donate, or partner with us to create meaningful change.
              </p>
            </div>
            <div className="media-content">
              <div className="video-wrapper">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/ableheartsfoundation/videos/1023655192465414"
                  width="100%"
                  height="100%" // Will be controlled by CSS aspect-ratio
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Able Hearts Foundation Video" // Added title for accessibility
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section className="donation-form-section pre-animate">
          <DonationForm />
        </section>

        <section className="chapters-section pre-animate">
          {chapterData.map((chapter, index) => (
            <div key={chapter.id} className={`content-layout chapter-layout ${index % 2 !== 0 ? 'media-first' : ''}`}>
              <div className="text-content card-style">
                <h2>{chapter.title}</h2>
                <p>{chapter.description}</p>
                <button
                  type="button"
                  className="cta-button primary"
                  onClick={() => navigate(chapter.navigateTo)}
                >
                  {chapter.buttonText}
                </button>
              </div>
              <div className="media-content">
                <img
                  src={chapter.imageSrc}
                  alt={chapter.imageAlt}
                  className="content-image"
                  loading="lazy"
                  width="500"
                  height="300"
                />
              </div>
            </div>
          ))}
        </section>

        <section className="partnerships-section pre-animate">
          <div className="contour-overlay" aria-hidden="true">
            <img src={scribble} alt="" loading="lazy" width="1000" height="1280" />
          </div>
          <div className="content-layout">
            <div className="text-content">
              <h2>Partnerships</h2>
              <p>
                Partner with us to amplify our efforts. Together, we can create impactful initiatives that empower
                individuals with disabilities and drive community change.
              </p>
              <button
                type="button"
                className="cta-button secondary"
                onClick={() => (window.location.href = 'mailto:ableheartsfoundation@gmail.com?subject=Partnership Inquiry')}
              >
                Send Us an Email
              </button>
            </div>
            <div className="media-content">
              <img
                src="/src/assets/fixed/partner.webp"
                alt="Partnership collaboration"
                className="content-image no-border-radius"
                loading="lazy"
                width="500"
                height="300"
              />
            </div>
          </div>
        </section>

        {showScrollToTop && (
          <button type="button" className="scroll-to-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            ↑
          </button>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default GetInvolved;