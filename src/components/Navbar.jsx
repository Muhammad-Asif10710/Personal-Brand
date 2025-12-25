import React, { useState, useEffect, useRef } from 'react';
import useTheme from './useTheme';
import './Navbar.css';

export default function Navbar({ onNavigateToPersonal }) {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { theme, toggleTheme } = useTheme();
  const lastClickedRef = useRef('');
  const isScrollingRef = useRef(false);
  const hasNavigatedToPersonalRef = useRef(false);

  const links = [
    { id: 'education', label: 'Education' },
    { id: 'tech-stack', label: 'Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // If clicking the same link again, scroll to top
      if (lastClickedRef.current === sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveLink('');
        lastClickedRef.current = '';
        isScrollingRef.current = false;
        return;
      }

      // Set scrolling flag and active link immediately
      isScrollingRef.current = true;
      setActiveLink(sectionId);
      lastClickedRef.current = sectionId;

      // Scroll to section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset scrolling flag after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // Update active link based on scroll position
  useEffect(() => {
    const sectionIds = ['education', 'tech-stack', 'experience', 'projects'];
    
    const handleScroll = () => {
      // Don't update active link if we're programmatically scrolling
      if (isScrollingRef.current) {
        return;
      }

      const sections = sectionIds.map(id => {
        const el = document.getElementById(id);
        return el ? { id, element: el } : null;
      }).filter(Boolean);

      const viewportTop = window.scrollY + 100; // Offset for navbar

      // Find the section that's currently most visible in viewport
      let activeSection = '';
      let maxVisible = 0;

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(elementTop, viewportTop);
        const visibleBottom = Math.min(elementBottom, window.scrollY + window.innerHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // If this section has more visible area and is near the top of viewport
        if (visibleHeight > maxVisible && rect.top <= 200) {
          maxVisible = visibleHeight;
          activeSection = section.id;
        }
      }

      // Fallback: find section by scroll position
      if (!activeSection) {
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].element.offsetTop <= viewportTop) {
            activeSection = sections[i].id;
            break;
          }
        }
      }

      if (activeSection) {
        setActiveLink(activeSection);
        lastClickedRef.current = activeSection;
      }

      // If at top, clear active link
      if (window.scrollY < 100) {
        setActiveLink('');
        lastClickedRef.current = '';
      }

      // Check if scrolled past projects section to navigate to personal
      const projectsElement = document.getElementById('projects');
      if (projectsElement && !hasNavigatedToPersonalRef.current) {
        const projectsBottom = projectsElement.offsetTop + projectsElement.offsetHeight;
        if (window.scrollY + window.innerHeight > projectsBottom + 100) { // 100px buffer
          hasNavigatedToPersonalRef.current = true;
          if (onNavigateToPersonal) {
            onNavigateToPersonal();
          }
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveLink('');
                lastClickedRef.current = '';
              }}
            >
              Asif
            </a>
          </div>
          <div className="navbar-mobile-nav">
            <a
              href="#"
              className={`${theme === 'dark' ? 'dark' : ''} personal-link`}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPersonal) {
                  onNavigateToPersonal();
                }
              }}
            >
              Personal
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
              className={`${theme === 'dark' ? 'dark' : ''} personal-link`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                if (onNavigateToPersonal) {
                  onNavigateToPersonal();
                }
              }}
            >
              Personal
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
            className={`${theme === 'dark' ? 'dark' : ''} personal-link`}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              if (onNavigateToPersonal) {
                onNavigateToPersonal();
              }
            }}
          >
            Personal
          </a>
        </div>
      </div>
    </header>
  );
}