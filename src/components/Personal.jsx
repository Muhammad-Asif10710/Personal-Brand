import React, { useState, useEffect } from 'react';
import '../styles/Personal.css';

export default function Personal() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`personal-page ${isDark ? 'dark' : ''}`}>
      <section id="travel" className="personal-section">
        <div className="personal-container">
          <h2 className="section-title">Travel</h2>
          <div className="personal-content">
            <p>Travel content coming soon...</p>
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

