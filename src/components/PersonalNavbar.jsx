import React, { useState } from 'react';
import useTheme from './useTheme';
import './Navbar.css';

export default function PersonalNavbar({ onBackToMain }) {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { theme, toggleTheme } = useTheme();

  const links = [
    { id: 'travel', label: 'Travel' },
    { id: 'book-reviews', label: 'Book Reviews' },
    { id: 'gym', label: 'Gym' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveLink(sectionId);
    }
  };

  return (
    <header className={`navbar-header ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <a
              href="#"
              className={theme === 'dark' ? 'dark' : ''}
              onClick={(e) => {
                e.preventDefault();
                onBackToMain();
              }}
            >
              Muhammad Asif
            </a>
          </div>
          <div className="navbar-mobile-nav">
            <a
              href="#"
              className={`${theme === 'dark' ? 'dark' : ''} professional-link`}
              onClick={(e) => {
                e.preventDefault();
                onBackToMain();
              }}
            >
              Professional
            </a>
          </div>

          <nav className="navbar-nav">
            {links.map(l => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`${theme === 'dark' ? 'dark' : ''} ${activeLink === l.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  scrollToSection(l.id);
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#"
              className={`${theme === 'dark' ? 'dark' : ''} professional-link`}
              onClick={(e) => {
                e.preventDefault();
                onBackToMain();
              }}
            >
              Professional
            </a>

            <div className={`theme-toggle-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
                  <path d="M21.64 15.89h-.03a.5.5 0 0 0-.3-.86 8.05 8.05 0 0 1-7.18-4.32 8.12 8.12 0 0 1 .22-8.59.5.5 0 0 0-.73-.61A9.13 9.13 0 0 0 7.38 16.5a9.12 9.12 0 0 0 13.22 1.08.5.5 0 0 0 .04-.69z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
                  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.071 6.05 5.657 7.464 3.515 5.329zM16.9 17.9l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414zM1 11v2h3v-2H1zm19 0v2h3v-2h-3zM4.929 16.485l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm12.656-12.656l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414z"/>
                </svg>
              )}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
              />
            </div>
          </nav>

          <div className="navbar-mobile">
            <div className={`theme-toggle-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
                  <path d="M21.64 15.89h-.03a.5.5 0 0 0-.3-.86 8.05 8.05 0 0 1-7.18-4.32 8.12 8.12 0 0 1 .22-8.59.5.5 0 0 0-.73-.61A9.13 9.13 0 0 0 7.38 16.5a9.12 9.12 0 0 0 13.22 1.08.5.5 0 0 0 .04-.69z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toggle-icon">
                  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.071 6.05 5.657 7.464 3.515 5.329zM16.9 17.9l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414zM1 11v2h3v-2H1zm19 0v2h3v-2h-3zM4.929 16.485l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm12.656-12.656l1.414-1.414 1.414 1.414-1.414 1.414-1.414-1.414z"/>
                </svg>
              )}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`theme-toggle ${theme === 'dark' ? 'dark' : ''}`}
              />
            </div>

            <button
              onClick={() => setOpen(!open)}
              className={`hamburger-btn ${theme === 'dark' ? 'dark' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`navbar-dropdown ${open ? 'open' : ''} ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="navbar-dropdown-menu">
          {links.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`${theme === 'dark' ? 'dark' : ''} ${activeLink === l.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToSection(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className={`${theme === 'dark' ? 'dark' : ''} professional-link`}
            onClick={(e) => {
              e.preventDefault();
              onBackToMain();
              setOpen(false);
            }}
          >
            Professional
          </a>
        </div>
      </div>
    </header>
  );
}

