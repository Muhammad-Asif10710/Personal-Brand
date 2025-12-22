import React, { useState, useEffect } from 'react';
import useTheme from './useTheme';
import '../styles/Hero.css';
import asifImage from '../assets/images/asif.png';
import asif1Image from '../assets/images/asif1.png';

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showShirtless, setShowShirtless] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
          <h1 className="flirty">Hi Cutie 💖</h1>
          <p className="hero-subtitle">A Full Stack Developer, AI/ML Engineer & Part-time Lover Boy here</p>
          <p className="hero-description"> I create intelligent 
            solutions that solve real-world problems. Let's build something amazing together.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary">Download CV</button>
            <button className="btn btn-secondary">Get in Touch</button>
            <button 
              className="btn btn-special" 
              onClick={handleImageToggle}
              disabled={!imageLoaded}
            >
              {showShirtless ? "Cutie it's cold here Click me again 😂" : "Click me to see me shirtless 😈"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
