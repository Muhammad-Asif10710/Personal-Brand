
import React, { useState, useEffect } from 'react';
import useTheme from './useTheme';
import '../styles/Hero.css';
import asifImage from '../assets/images/asif.png';
import asif1Image from '../assets/images/asif1.png';
import resumePDF from '../assets/RESUME PDF-1.pdf';

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showShirtless, setShowShirtless] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
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

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
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
            <form className="contact-form">
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
                <a
                  href="mailto:npam10710@gmail.com?subject=Contact from Portfolio&body=Hello, I would like to get in touch."
                  className="btn-mail"
                  onClick={(e) => {
                    // Close popup after mailto link is triggered
                    setTimeout(() => {
                      handleClosePopup();
                    }, 100);
                  }}
                >
                  Send Mail
                </a>
                <button type="button" className="btn-cancel" onClick={handleClosePopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
