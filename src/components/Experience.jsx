import React, { useState, useEffect } from 'react';
import '../styles/Experience.css';
import experienceImage from '../assets/images/experience.png';

export default function Experience() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'Government Sector',
      period: '2021 - Present',
      company: '',
      description: 'Started working in the Government sector in 2021 and am currently working there. Worked on multiple full stack projects during my tenure.',
      icon: '🏛️'
    },
    {
      title: 'AI/ML Engineer - Vital Analytics',
      period: 'March 2025 - Present',
      company: 'Remote US Company',
      description: 'Working as an AI/ML Engineer where I fine-tuned AI models and used n8n, Langchain, and RAG to build custom AI solutions. Currently continuing in this role.',
      icon: '🤖'
    },
    {
      title: 'Masters Weekend Program - MS (Artificial Intelligence)',
      period: 'Currently Pursuing',
      company: '',
      description: 'Currently pursuing Masters in a weekend program alongside my professional commitments.',
      icon: '🎓'
    }
  ];

  return (
    <section id="experience" className={`experience ${isDark ? 'dark' : ''}`}>
      <div className="experience-container">
        <div className="section-title-container">
          <h2 className="section-title">Experience</h2>
          <img src={experienceImage} alt="Experience" className="section-title-image" />
        </div>
        
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-icon">
                {exp.icon}
              </div>
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-period">{exp.period}</p>
              {exp.company && <p className="experience-company">{exp.company}</p>}
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

