import React, { useState, useEffect } from 'react';
import '../styles/Personal.css';
import useTheme from './useTheme';
import frame1 from '../assets/images/1.png';
import frame2 from '../assets/images/2.png';
import frame3 from '../assets/images/3.png';
import frame4 from '../assets/images/4.png';
import frame5 from '../assets/images/5.png';

export default function Personal() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentFrame, setCurrentFrame] = useState(frame1);
  const frames = [frame1, frame2, frame3, frame4, frame5, frame4, frame3, frame2, frame1];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const totalFrames = frames.length - 1;
      const frameIndex = Math.round(scrollPercent * totalFrames);
      setCurrentFrame(frames[frameIndex]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [frames]);

  return (
    <div className={`personal-page ${isDark ? 'dark' : ''}`}>
      <div className="scroll-animation">
        <img src={currentFrame} alt="Scroll Animation" className="scroll-frame" />
      </div>
      <section id="travel" className="personal-section">
        <div className="personal-container">
          <h2 className="section-title">Travel</h2>
          <div className="travel-cards">
            <div className="travel-card">
              <h3>Swat</h3>
              <p className="travel-description">
                I loved the breathtaking mountains of Swat. The serene valleys, crystal-clear rivers, and lush greenery made it an unforgettable experience.
              </p>
            </div>
            <div className="travel-card">
              <h3>Qalam</h3>
              <p className="travel-description">
                Another gem in the Swat valley, Qalam offered stunning landscapes and a peaceful retreat amidst nature's beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="book-reviews" className="personal-section">
        <div className="personal-container">
          <h2 className="section-title">Book Reviews</h2>
          <div className="personal-content">
            <p>Book reviews coming soon...</p>
          </div>
        </div>
      </section>

      <section id="gym" className="personal-section">
        <div className="personal-container">
          <h2 className="section-title">Gym</h2>
          <div className="personal-content">
            <p>Gym content coming soon...</p>
          </div>
        </div>
      </section>
    </div>
  );
}


