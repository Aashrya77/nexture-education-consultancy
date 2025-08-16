import React from 'react';
import './Uni.css'; // Assuming you have a CSS file for styling
const Uni = () => {
  return (
    <div className="study-australia-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="clouds-decoration">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="australia-text">Australia</span>
          </h1>
        </div>
        
        <div className="skyline">
          <div className="building building-1"></div>
          <div className="building building-2"></div>
          <div className="building building-3"></div>
          <div className="building building-4"></div>
          <div className="building building-5"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-title">
            Australia has a reputation for<br />
            an <span className="highlight">innovative and research-<br />
            intensive culture</span>
          </h2>
          <p className="about-description">
            If you are interested in studying in Australia then you are taking one step closer towards choosing a 
            truly fruitful academic experience. Australia is a fully developed, growing economy with a safe, 
            tolerant and multicultural society. Students will find studying in Australia a relaxed, welcoming and 
            engaging environment that is unique in the native English speaking world.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">Australia</span>
            </h2>
            <p className="reasons-description">
              of state-of-the-art laboratories and classrooms, outstanding libraries 
              and modern technology. Institutions deliver practical and career-
              orientated training so graduates can be confident that they have the 
              skills expected by employers. Academic staff is recruited from 
              around the world and often are leading experts in their field. 
              Australian teachers are experienced in supervising both domestic 
              and international students from a variety of different countries.
            </p>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-number">1.</div>
              <h3 className="reason-title">Quality in Education</h3>
              <p className="reason-description">
                Australia's commitment to education excellence, innovative teaching, and 
                cutting-edge research fosters high-quality learning, preparing students for 
                future success.
              </p>
            </div>
            
            <div className="reason-card">
              <div className="reason-number">2.</div>
              <h3 className="reason-title">Good Potential For Employment After Course Completion.</h3>
              <p className="reason-description">
                These courses open doors to diverse job opportunities. Skills gained lead to 
                promising career prospects in various industries.
              </p>
            </div>
            
            <div className="reason-card">
              <div className="reason-number">3.</div>
              <h3 className="reason-title">English as a Second Language (ESL) Programs</h3>
              <p className="reason-description">
                Australian ESL programs offer personalized language learning. 
                Qualified instructors and immersive environments nurture language skills.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Uni;