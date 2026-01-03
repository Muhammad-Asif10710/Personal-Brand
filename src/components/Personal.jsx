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
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frames = [frame1, frame2, frame3, frame4, frame5, frame4, frame3, frame2, frame1];

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = frames.map((frame) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = frame;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to preload images:', error);
        setImagesLoaded(true); // Still set to true to show the animation
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const totalFrames = frames.length - 1;
      const frameIndex = Math.round(scrollPercent * totalFrames);
      setCurrentFrameIndex(frameIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`personal-page ${isDark ? 'dark' : ''}`}>
      <div className="scroll-animation">
        {imagesLoaded && (
          <img src={frames[currentFrameIndex]} alt="Scroll Animation" className="scroll-frame" />
        )}
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
              <h3>Kalam</h3>
              <p className="travel-description">
                Another gem in the Swat valley, Kalam offered stunning landscapes and a peaceful retreat amidst nature's beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="book-reviews" className="personal-section">
        <div className="personal-container">
          <h2 className="section-title">Book Reviews</h2>
          <div className="book-cards">
            <div className="book-card">
              <h3>The Trial by Kafka</h3>
              <p className="book-description">
               The Trial - by Franz Kafka is a haunting exploration of how absurd, opaque systems erode the human mind. Josef K.’s arrest without explanation plunges him into a maze of illogical rules, faceless authorities, and shifting accusations. The terror does not come from physical violence but from not understanding the laws without clarity, guilt without crime, and judgment without reason. Kafka shows how uncertainty breeds anxiety, self-doubt, and eventual submission. The more Josef K. tries to rationalize the system, the deeper he is trapped. The novel mirrors modern bureaucracies, revealing how meaningless procedures, when unquestioned, can psychologically crush individuals.

              </p>
            </div>
            <div className="book-card">
              <h3>Metamorphosis</h3>
              <p className="book-description">
                The Metamorphosis - by Franz Kafka exposes the brutal absurdity of a world where self-worth is measured only by utility. Gregor Samsa’s transformation into an insect merely makes visible what was already true: everyone around him is primarily concerned with themselves. His family’s care lasts only as long as he remains useful. Kafka suggests that sacrificing oneself endlessly for others in such a world is a form of self-betrayal. The true horror is not Gregor’s body, but his quiet acceptance of neglect. The novel warns that in an absurd, indifferent society, failing to prioritize oneself is a profound dishonesty to one’s own existence.

              </p>
            </div>
            <div className="book-card">
              <h3>Zen:Zest, Zip, Zap and Yen by Osho</h3>
              <p className="book-description">
                Zen, Zest, Zip, Zap and Zen - by Osho is a playful yet piercing invitation to awaken through laughter, paradox, and spontaneity. Osho blends Zen stories, jokes, and sharp observations to dismantle seriousness around spirituality. The book argues that truth is not found through discipline or suffering, but through awareness infused with joy and liveliness. “Zest” and “zip” symbolize living fully in the present, while “zap” represents sudden insight that shatters conditioning. Osho challenges the ego, religious rigidity, and borrowed beliefs, urging readers to experience life directly. The text feels chaotic at times, but intentionally so—mirroring Zen’s method of jolting the mind into clarity.

              </p>
            </div>
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


