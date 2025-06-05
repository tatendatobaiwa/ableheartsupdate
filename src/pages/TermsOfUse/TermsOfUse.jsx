import React from 'react';
import { Link } from 'react-router-dom';
import './TermsOfUse.css';

const blobImages = [
  '/src/assets/fixed/icons/blob1.webp',
  '/src/assets/fixed/icons/blob3.webp',
  '/src/assets/fixed/icons/blob4.webp',
  '/src/assets/fixed/icons/blob2.webp',
];

const TermsOfUse = () => {
  return (
    <div className="legal-container">
      <header className="legal-header">
        <h1>Terms of Use</h1>
        <p>Last Updated: October 26, 2023</p>
      </header>

      <section className="legal-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to Able Hearts Foundation (“we,” “us,” or “our”). By accessing or using our website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use our website.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Use of Website Content</h2>
        <p>
          All content on this website, including text, graphics, logos, images, and software, is the property of Able Hearts Foundation or its content suppliers and is protected by international copyright laws. You may use the content for personal, non-commercial purposes only.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. User Conduct</h2>
        <p>You agree not to use the website for any unlawful purpose or in any way that could damage, disable, or impair the website. Prohibited activities include, but are not limited to:</p>
        <ul>
          <li>Harassing or harming another person.</li>
          <li>Uploading or transmitting viruses or other malicious code.</li>
          <li>Attempting to gain unauthorized access to our computer systems.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Disclaimers and Limitation of Liability</h2>
        <p>
          The information on our website is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information. To the fullest extent permitted by law, Able Hearts Foundation disclaims all liability for any damages arising out of your use of, or inability to use, the website.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Links to Third-Party Websites</h2>
        <p>
          Our website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse or assume any responsibility for the content or practices of these third-party sites.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Privacy Policy</h2>
        <p>
          Your privacy is important to us. Our <Link to="/privacy-policy" className="legal-link">Privacy Policy</Link> explains how we collect, use, and protect your personal information. Please review it to understand our practices.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Changes to These Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of the website after any such changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at:
          <a href="mailto:ableheartsfoundation@gmail.com" className="legal-link"> ableheartsfoundation@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
