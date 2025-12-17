import { useState } from 'react'
import Navbar from './components/Navbar'
import PersonalNavbar from './components/PersonalNavbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Education from './components/Education'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Personal from './components/Personal'
import useTheme from './components/useTheme'


function App() {
  const [currentPage, setCurrentPage] = useState('main');
  useTheme(); // Initialize theme on app load

  const isDark = document.documentElement.classList.contains('dark');

  const handleNavigateToPersonal = () => {
    setCurrentPage('personal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'personal') {
    return (
      <div>
        <PersonalNavbar onBackToMain={handleBackToMain} />
        <Personal />
      </div>
    );
  }

  return (
    <div>
      <Navbar onNavigateToPersonal={handleNavigateToPersonal} />
      <Hero />
      <Education />
      <TechStack />
      <Experience />
      <Projects />
    </div>
  );
}

export default App;
