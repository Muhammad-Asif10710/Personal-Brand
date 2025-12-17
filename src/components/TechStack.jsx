import { useState, useEffect } from 'react';
import useTheme from './useTheme.js';
import '../styles/TechStack.css';

const TechStack = () => {
  const [isDark, setIsDark] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [theme]);

  const techStacks = [
    {
      name: 'React',
      icon: '⚛️',
      description: 'JavaScript library for building user interfaces with components',
    },
    {
      name: 'Laravel',
      icon: 'https://files.svgcdn.io/simple-icons/laravel.svg',
      description: 'PHP framework for building robust backend applications',
      isSvg: true,
    },
    {
      name: 'Next.js',
      icon: 'https://files.svgcdn.io/cib/next-js.svg',
      description: 'React framework for production with SSR and static generation',
      isSvg: true,
    },
    {
      name: 'Nest.js',
      icon: 'https://files.svgcdn.io/simple-icons/nestjs.svg',
      description: 'Progressive Node.js framework for scalable server-side applications',
      isSvg: true,
    },
    {
      name: 'Model Fine-tuning',
      icon: '🤖',
      description: 'Custom training of AI models for specific use cases',
    },
    {
      name: 'n8n',
      icon: 'https://files.svgcdn.io/simple-icons/n8n.svg',
      description: 'Open-source workflow automation tool for integrations',
      isSvg: true,
    },
    {
      name: 'Langchain',
      icon: '🔀',
      description: 'Framework for developing applications with language models',
    },
    {
      name: 'RAG',
      icon: '📚',
      description: 'Retrieval-Augmented Generation for custom AI solutions',
    },
  ];

  return (
    <section id="tech-stack" className={`tech-stack ${isDark ? 'dark' : ''}`}>
      <div className="tech-stack-container">
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-grid">
          {techStacks.map((tech, index) => (
            <div key={index} className="tech-card">
              <div className="tech-icon">
                {tech.isSvg ? (
                  <img src={tech.icon} alt={tech.name} className="tech-svg-icon" />
                ) : (
                  tech.icon
                )}
              </div>
              <h3 className="tech-name">{tech.name}</h3>
              <p className="tech-description">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
