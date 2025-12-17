import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';

export default function Projects() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Shonenshop',
      description: 'An Ecommerce Platform that sells anime merchandise. A Shonen Shop is a retail store specializing in anime merchandise, particularly focusing on items from popular shonen anime and manga series.',
      techStack: 'Laravel, React, Stripe, MySQL, CPanel',
      type: 'linkedin',
      link: 'https://www.linkedin.com/posts/muhammad-asif-zahoor_fullstackdeveloper-laravel-react-activity-7237205144705130496-UkoU',
      icon: '🛒'
    },
    {
      title: 'WebSocket Chat Application',
      description: 'A cutting-edge chat beam prototype with secure subscriptions from Stripe and seamless SMS/MMS integration from Twilio. Collaboration project that elevates real-time communication functionality.',
      techStack: 'Laravel, Stripe, Twilio',
      type: 'linkedin',
      link: 'https://www.linkedin.com/posts/muhammad-asif-zahoor_laravel-fullstackdeveloper-innovation-activity-7145146061370671104-E0qJ',
      icon: '💬'
    },
    {
      title: 'Housing Scheme Management System',
      description: 'A comprehensive online platform for managing residential properties including tenant and lease management, rent payments and invoicing, maintenance requests and tracking.',
      techStack: 'Laravel 8, React',
      type: 'linkedin',
      link: 'https://www.linkedin.com/posts/muhammad-asif-zahoor_webdevelopment-housingmanagement-propertytech-activity-7223934405403152384-EMBZ',
      icon: '🏠'
    },
    {
      title: 'Fine-tuned AI Models',
      description: 'Diving deep into the fine-tuning process of DeepSeek-R1-Distill-Qwen-1.5B, a powerful AI model. Working with advanced AI/ML techniques for custom model training.',
      techStack: 'Python, DeepSeek, Fine-tuning, AI/ML',
      type: 'github',
      links: [
        { url: 'https://github.com/Muhammad-Asif10710/Fine-Tuning-Deepseek.git', label: 'Fine-Tuning-Deepseek' },
        { url: 'https://github.com/Muhammad-Asif10710/Gen-AI.git', label: 'Gen-AI' }
      ],
      icon: '🤖'
    }
  ];

  return (
    <section id="projects" className={`projects ${isDark ? 'dark' : ''}`}>
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-icon">
                {project.icon}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-tech">{project.techStack}</p>
              <p className="project-description">{project.description}</p>
              
              <div className="project-media">
                {project.type === 'linkedin' ? (
                  <div className="linkedin-embed">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span className="link-icon">▶️</span>
                      Watch Project Video on LinkedIn
                      <span className="external-icon">↗</span>
                    </a>
                  </div>
                ) : (
                  <div className="github-links">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        <span className="github-icon">📦</span>
                        {link.label}
                        <span className="external-icon">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

