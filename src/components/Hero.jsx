
import React, { useState, useEffect } from 'react';
import useTheme from './useTheme';
import '../styles/Hero.css';
import asifImage from '../assets/images/asif.png';
import asif1Image from '../assets/images/asif1.png';
import resumePDF from '../assets/RESUME PDF-1.pdf';
import emailjs from '@emailjs/browser';

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showShirtless, setShowShirtless] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Preload the second image for lazy loading
  useEffect(() => {
    const img = new Image();
    img.src = asif1Image;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  const handleImageToggle = () => {
    if (!imageLoaded) return;
    setShowShirtless(!showShirtless);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Muhammad_Asif_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactPopup = () => {
    setShowContactPopup(true);
  };

  const handleClosePopup = () => {
    setShowContactPopup(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const jsonPayload = JSON.stringify(contactForm, null, 2);

    const templateParams = {
      to_email: 'npam10710@gmail.com',
      from_name: contactForm.name,
      from_email: contactForm.email,
      message: jsonPayload,
    };

    console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log('Email sent successfully!', result.text);
        handleClosePopup();
        setShowSuccessPopup(true);
      }, (error) => {
        console.error('Failed to send email:', error.text);
        alert('Failed to send email. Please try again.');
      });
  };



  return (
    <section key={theme} className={`hero ${isDark ? 'dark' : ''}`}>
      <div className="hero-container">
        <div className="hero-image">
          <img
            src={asifImage}
            alt=" Asif"
            className={`hero-img-base ${showShirtless ? 'fade-out' : 'fade-in'}`}
            loading="eager"
          />
          <img 
            src={asif1Image} 
            alt="Muhammad Asif" 
            className={`hero-img-overlay ${showShirtless ? 'fade-in' : 'fade-out'}`}
            loading="lazy"
          />
        </div>
        <div className="hero-content">
          <h1 className="flirty">Hey! I'm Asif.</h1>
          <p className="hero-subtitle">A Full Stack Developer & AI/ML Engineer </p>
          <p className="hero-description"> I create intelligent 
            solutions that solve real-world problems. 
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={handleDownloadCV}>Download Resume</button>
            <button className="btn btn-secondary" onClick={handleContactPopup}>Get in Touch</button>
           {/* <button 
              className="btn btn-special" 
              onClick={handleImageToggle}
              disabled={!imageLoaded}
            >
              {showShirtless ? "Cutie it's cold here Click me again 😂" : "Click me to see me shirtless 😈"}
            </button>*/}
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      {showContactPopup && (
        <div className="contact-popup-overlay" onClick={handleClosePopup}>
          <div className="contact-popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>Get in Touch</h3>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  rows="4"
                  required
                />
              </div>
              <div className="popup-buttons">
                <button type="submit" className="btn-mail">
                  Send Mail
                </button>
                <button type="button" className="btn-cancel" onClick={handleClosePopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="contact-popup-overlay" onClick={handleCloseSuccessPopup}>
          <div className="contact-popup-card success-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Email Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <div className="popup-buttons">
              <button className="btn btn-primary" onClick={handleCloseSuccessPopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
