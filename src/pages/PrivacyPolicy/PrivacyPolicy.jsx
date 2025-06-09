import React from 'react';
import './PrivacyPolicy.css';
import Footer from '../../components/Footer/Footer';

const blobImages = [
  '/src/assets/fixed/icons/blob1.webp',
  '/src/assets/fixed/icons/blob3.webp',
  '/src/assets/fixed/icons/blob4.webp',
  '/src/assets/fixed/icons/blob2.webp',
];

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page-wrapper">
      <div className="privacy-background-blobs">
        {blobImages.map((blob, index) => (
          <img
            key={index}
            src={blob}
            alt={`Decorative blob ${index + 1}`}
            className={`privacy-blobg blob-${index + 1}`}
            loading="lazy"
            width="600"
            height="600"
          />
        ))}
      </div>
      <div className="legal-container">
        <header className="legal-header">
          <h1>Privacy Policy</h1>
          <p>Last Updated: October 26, 2023</p>
        </header>

        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Able Hearts Foundation (“we,” “us,” or “our”) is committed to protecting the privacy of our volunteers and website users. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you apply to our campus clubs at BIUST and UB or otherwise interact with our website.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <p>
            When you apply to become a volunteer, we collect personal information that you voluntarily provide to us. This may include:
          </p>
          <ul>
            <li>Your full name and contact information (email address, phone number).</li>
            <li>Your university affiliation (BIUST or UB) and student ID number.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <p>Your information is used exclusively for internal purposes related to managing our volunteer programs. These purposes include:</p>
          <ul>
            <li>Processing your volunteer application.</li>
            <li>Coordinating campus club activities and events.</li>
            <li>Communicating with you about volunteer opportunities, program updates, and other relevant news.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Data Protection and Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored in a secure database, and access is restricted to authorized personnel who need the information to perform their duties. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Your Data Rights</h2>
          <p>As a user, you have certain rights regarding your personal information:</p>
          <ul>
            <li><strong>Right to Access:</strong> You can request a copy of the personal information we hold about you.</li>
            <li><strong>Right to Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li>
            <li><strong>Right to Deletion:</strong> You can request that we delete your personal information from our records, particularly if you are no longer a volunteer.</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>

        <section className="legal-section">
          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
            <a href="mailto:ableheartsfoundation@gmail.com" className="legal-link"> ableheartsfoundation@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;