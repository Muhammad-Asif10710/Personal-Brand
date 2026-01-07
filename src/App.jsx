import { useState, useEffect } from 'react'
import './App.css'
import './styles/Loading.css' // Import your new CSS
import Navbar from './components/Navbar'
import PersonalNavbar from './components/PersonalNavbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Education from './components/Education'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Personal from './components/Personal'
import BookAppointment from './components/BookAppointment'
import Chat from './components/Chat'
import useTheme from './components/useTheme'
import asifImage from './assets/images/asif.png'

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // This waits for all images, scripts, and links to finish loading
    const handleLoad = () => {
      // Small timeout ensures the loader is visible for at least a moment
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleNavigateToPersonal = () => {
    setCurrentPage('personal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loader-text">LOADING...</p>
      </div>
    );
  }

  // 2. Personal Page State
  if (currentPage === 'personal') {
    return (
      <div >
        <PersonalNavbar onBackToMain={handleBackToMain} />
        <Personal onBackToMain={handleBackToMain} />
        {/* Chat Icon */}
        <div className="chat-icon">
          <button
            onClick={() => setIsChatOpen(true)}
            className="chat-button"
          >
            💬
          </button>
        </div>
        {/* Chat Modal */}
        {isChatOpen && (
          <div className="chat-modal-overlay">
            <div className="chat-modal">
              <Chat onClose={() => setIsChatOpen(false)} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. Main Page State
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Navbar onNavigateToPersonal={handleNavigateToPersonal} />
      <Hero />
      <Education />
      <TechStack />
      <Experience />
      <Projects />
      <BookAppointment />
      <div className="pagination">
        <button onClick={handleNavigateToPersonal} className="pagination-button">Next: Personal Page →</button>
      </div>
      {/* Chat Icon */}
      <div className="chat-icon">
        <button
          onClick={() => setIsChatOpen(true)}
          className="chat-button"
        >
          💬
        </button>
      </div>
      {/* Chat Modal */}
      {isChatOpen && (
        <div className="chat-modal-overlay">
          <div className="chat-modal">
            <Chat onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
