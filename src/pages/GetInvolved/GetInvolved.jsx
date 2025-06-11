import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scribble from '/src/assets/fixed/icons/scribblebackground.webp';
import DonationForm from '/src/components/DonationForm.jsx';
// import Footer from '../../components/Footer/Footer'; // Assuming Footer is used elsewhere or will be added

import './GetInvolved.css';

const blobImages = [
  '/src/assets/fixed/icons/blob1.webp',
  '/src/assets/fixed/icons/blob3.webp',
  '/src/assets/fixed/icons/blob4.webp',
  '/src/assets/fixed/icons/blob2.webp',
];

const GetInvolved = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Intersection Observer for animations
  useEffect(() => {
    const elements = document.querySelectorAll('.pre-animate');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Adjusted threshold slightly for earlier trigger if needed
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => { // Ensure to unobserve all elements
        if (element) {
            observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, []); // Rerun if component structure changes significantly, but usually fine

  return (
    <div className="page-wrapper">
      <div className="get-involved-container">
        {/* Background blobs */}
        <div className="get-involved-background-blobs">
          {blobImages.map((blob, index) => (
            <img
              key={index}
              src={blob}
              alt={`Decorative blob ${index + 1}`}
              className={`get-involved-blobg blob-${index + 1}`}
              loading="lazy"
              width="800"
              height="800"
            />
          ))}
        </div>

        {/* New Get Involved Header */}
        <header className="get-involved-page-header pre-animate">
          <h1>Get Involved</h1>
          <p>
            Join us in making a difference. Volunteer, donate, or partner with us to create meaningful change.
          </p>
        </header>

        {/* Donation Form Section */}
        <div className="donation-form-section pre-animate">
          <DonationForm />
        </div>

        {/* AbleHearts UB, BIUST, and Partnerships Sections */}
        <div className="additional-section pre-animate"> {/* This div can also have pre-animate if you want the whole block to fade in */}
          {/* AbleHearts UB Section */}
          <div className="content-container pre-animate"> {/* Apply pre-animate to individual sections for staggered effect */}
            <div className="left-content card">
              <h2>AbleHearts UB</h2>
              <p>
                Our AbleHearts chapter at UB fosters a vibrant community of students working together to make a difference
                in the lives of people with disabilities. Get involved to create a more inclusive world.
              </p>
              <button
                className="find-out-more-button"
                onClick={() => navigate('/ablehearts-ub')}
              >
                Become a Member
              </button>
            </div>
            <div className="right-content">
              <img
                src="/src/assets/fixed/ubvolunteers.webp"
                alt="AbleHearts UB"
                className="placeholder-image"
                loading="lazy"
                width="500"
                height="300"
              />
            </div>
          </div>

          {/* AbleHearts BIUST Section */}
          <div className="content-container pre-animate">
            <div className="left-content card">
              <h2>AbleHearts BIUST</h2>
              <p>
                At BIUST, our AbleHearts chapter champions inclusion and innovation to support individuals with
                disabilities. Join us in transforming campus life through collaboration and compassion.
              </p>
              <button
                className="find-out-more-button"
                onClick={() => navigate('/ablehearts-biust')}
              >
                Become a Member
              </button>
            </div>
            <div className="right-content">
              <img
                src="/src/assets/fixed/biustvolunteers.webp"
                alt="AbleHearts BIUST"
                className="placeholder-image"
                loading="lazy"
                width="500"
                height="300"
              />
            </div>
          </div>

          {/* Partnerships Section */}
          <div className="content-container1 pre-animate" style={{ backgroundColor: '#0066cc', marginBottom: '0' }}>
            <div className="contour-overlay">
              <img src={scribble} alt="Scribblebackground"
                loading="lazy" width="1000"
                height="1280"
              />
            </div>
            <div className="partnership-left-content">
              <h2 style={{ color: 'white' }}>Partnerships</h2>
              <p style={{ color: 'white' }}>
                Partner with us to amplify our efforts. Together, we can create impactful initiatives that empower
                individuals with disabilities and drive community change.
              </p>
              <button
                className="email-button"
                onClick={() =>
                  (window.location.href = 'mailto:ableheartsfoundation@gmail.com?subject=Partnership Inquiry')
                }
              >
                Send Us an Email
              </button>
            </div>
            <div className="right-content" style={{ padding: '0' }}>
              <img
                src="/src/assets/fixed/partner.webp"
                alt="Partnerships"
                className="placeholder-image"
                style={{ borderRadius: '0' }}
                loading="lazy"
                width="500"
                height="300"
              />
            </div>
          </div>
        </div>
        {isScrolled && (
          <button className="scroll-to-top-btn" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
      {/* <Footer /> */} {/* If you have a Footer component, it would typically go outside .get-involved-container or at the end of .page-wrapper */}
    </div>
  );
};

export default GetInvolved;