import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import ubLogo from '/src/assets/fixed/icons/ub.webp';
import biustLogo from '/src/assets/fixed/icons/biust.webp';
import Footer from '../../components/Footer/Footer';

const ubTeam = [
  { name: 'Keya Paymaster', role: 'President', image: '/src/assets/fixed/team/ub/keya.webp' },
  { name: 'Sharon Kenanao', role: 'Vice President', image: '/src/assets/fixed/team/ub/sharon.webp' },
  { name: 'Mothusi Bleb', role: 'Treasurer', image: '/src/assets/fixed/team/ub/mothusi.webp' },
  { name: 'Tlotlo Upendo', role: 'Secretary', image: '/src/assets/fixed/team/ub/tlotlo.webp' },
];

const biustTeam = [
  { name: 'Katlego Dijeng', role: 'Chairperson', image: '/src/assets/fixed/team/biust/katlego.webp' },
  { name: 'Tinotenda Watatenda', role: 'Vice Chairperson', image: '/src/assets/fixed/team/biust/tino.webp' },
  { name: 'Masedi Kgopolo', role: 'Treasurer', image: '/src/assets/fixed/team/biust/masedi.webp' },
  { name: 'Natasha Marumolo', role: 'Secretary', image: '/src/assets/fixed/team/biust/natasha.webp' },
];

const AboutUs = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      { threshold: 0.1 }
    );
  
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="about-container">
      <header className="about-header pre-animate">
        <h1 className="about-main-title">About Able Hearts Foundation</h1>
        <p className="about-subtitle">
          Dedicated to creating a world where every individual has the opportunity to thrive.
        </p>
      </header>
      
      <section className="about-section pre-animate">
        <div className="vision-mission-grid">
          <div className="vision-card">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-description">
              To build a world where every individual, regardless of their abilities or circumstances, has the opportunity to thrive and reach their full potential.
            </p>
          </div>
          <div className="mission-card">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-description">
              To bridge gaps in society by providing support, resources, and opportunities to underserved communities, fostering a more equitable world.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section founder-section pre-animate">
        <h2 className="section-title">Meet Our Founder</h2>
        <div className="founder-card">
          <div className="founder-image-wrapper">
            <img
              src="/src/assets/fixed/thefounderphoto.webp" 
              alt="Sakshi Bhargava, Founder of Able Hearts Foundation"
              className="founder-image"
            />
          </div>
          <div className="founder-details">
            <h3 className="founder-name">Sakshi Bhargava</h3>
            <p className="founder-bio">
              Sakshi Bhargava is a visionary leader and passionate philanthropist dedicated to making a positive impact in communities across Botswana. With a background in pageantry and a heart for service, she established the Able Hearts Foundation to create meaningful change in the lives of those who need it most.
            </p>
            <div className="founder-achievements">
              <h4 className="achievements-title">Key Roles & Achievements</h4>
              <ul>
                <li>Founder of Able Hearts Foundation</li>
                <li>Miss Global Botswana 2021</li>
                <li>Junior Miss Botswana 2nd Princess '16</li>
                <li>Brand Ambassador for multiple local brands</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section impact-section pre-animate">
        <h2 className="section-title">Our Impact</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <h3>1000+</h3>
            <p>Lives Touched</p>
          </div>
          <div className="impact-card">
            <h3>7</h3>
            <p>Active Programs</p>
          </div>
          <div className="impact-card">
            <h3>8+</h3>
            <p>Years of Service</p>
          </div>
        </div>
      </section>

      <section className="about-section values-section pre-animate">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          {[
            { title: 'Empowerment', description: 'Enabling individuals to become self-sufficient and confident.' },
            { title: 'Inclusivity', description: 'Celebrating diversity and creating spaces where everyone belongs.' },
            { title: 'Innovation', description: 'Seeking creative solutions to community challenges.' },
            { title: 'Sustainability', description: 'Developing programs that create lasting positive change.' }
          ].map((value) => (
            <div className="value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="about-section team-section pre-animate">
        <h2 className="section-title">Meet Our Teams</h2>
        <div className="team-branch">
          <img src={ubLogo} alt="UB Logo" className="branch-logo"/>
          <h3 className="branch-title">University of Botswana Branch</h3>
          <div className="team-grid">
            {ubTeam.map(member => (
              <div className="team-member-card" key={member.name}>
                <div className="team-member-image-placeholder"></div>
                <h4 className="team-member-name">{member.name}</h4>
                <p className="team-member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="team-branch">
          <img src={biustLogo} alt="BIUST Logo" className="branch-logo"/>
          <h3 className="branch-title">BIUST Branch</h3>
          <div className="team-grid">
            {biustTeam.map(member => (
              <div className="team-member-card" key={member.name}>
                <div className="team-member-image-placeholder"></div>
                <h4 className="team-member-name">{member.name}</h4>
                <p className="team-member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isScrolled && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default AboutUs;