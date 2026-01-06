import React, { useState, useEffect } from 'react';
import '../styles/Personal.css';
import useTheme from './useTheme';

export default function BookAppointment() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [appointmentLoaded, setAppointmentLoaded] = useState(false);

  useEffect(() => {
    setAppointmentLoaded(false);
  }, [theme]);

  return (
    <section id="book-appointment" className="personal-section">
      <div className="personal-container">
        <h2 className="section-title">Book an Appointment</h2>
        <div className="appointment-calendar">
          {!appointmentLoaded && (
            <div className={`appointment-spinner-container ${isDark ? 'dark' : ''}`}>
              <div className="spinner-wrapper">
                <div className="spinner"></div>
              </div>
              <div className="loader-text">Loading Appointment...</div>
            </div>
          )}
          <iframe
            src={isDark ? "https://cal.com/muhammad-asif-tjb5z1/30min?theme=dark" : "https://cal.com/muhammad-asif-tjb5z1/30min"}
            width="100%"
            height="600"
            frameBorder="0"
            title="Book an Appointment"
            onLoad={() => setAppointmentLoaded(true)}
            style={{ display: appointmentLoaded ? 'block' : 'none' }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
