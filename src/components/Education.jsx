import React, { useState, useEffect } from 'react';
import '../styles/Education.css';

export default function Education() {
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
    <section id="education" className={`education ${isDark ? 'dark' : ''}`}>
      <div className="education-container">
        <h2 className="section-title">Education</h2>

        <div className="education-grid">
          {/* Education Card 1 */}
          <div className="education-content">
            <h3>BS in Management Information Systems (MIS)</h3>
            <p className="institution">NUST - National University of Sciences and Technology</p>
            <p className="year">Graduated 2021</p>
            <div className="education-details">
              <span className="cgpa">CGPA: 3.46</span>
            </div>
            <p className="description">
              Completed comprehensive studies in information systems management, database design, 
              and enterprise solutions. Developed strong technical foundation in software development 
              and system architecture.
            </p>
          </div>

          {/* Education Card 2 */}
          <div className="education-content">
            <h3>Team Lead - Final Year Project</h3>
            <p className="project-name">E-Dossier: Laravel & React Management System</p>
            <p className="description">
              Led a team to develop a comprehensive management system using Laravel backend and React frontend. 
              The system streamlined document management and organizational workflows with modern web technologies. 
              Demonstrated leadership, full-stack development expertise, and project management skills.
            </p>
          </div>

          {/* Education Card 3 */}
          <div className="education-content">
            <h3>Masters in Artificial Intelligence</h3>
            <p className="institution">Bahria University</p>
            <p className="year">Currently Pursuing</p>
            <p className="description">
              Advanced studies in machine learning, deep learning, natural language processing, and AI applications. 
              Developing expertise in cutting-edge AI technologies and their practical implementations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
