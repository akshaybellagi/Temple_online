import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <section className="about-header-section">
        <div className="container">
          <h2 className="section-heading">ABOUT SRS MATHA</h2>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content-grid">
            <div className="content-text">
              <h2>Our History</h2>
              <p>Our matha has a rich spiritual heritage spanning many generations. Founded with the vision of preserving ancient traditions and providing spiritual guidance to devotees.</p>
              <p>Throughout the years, we have maintained our commitment to serving the community and fostering spiritual growth.</p>
            </div>
            <div className="content-image">
              <div className="placeholder-image">Historical Image</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <h3>Spiritual Guidance</h3>
              <p>Providing authentic spiritual teachings and guidance to seekers</p>
            </div>
            <div className="mission-card">
              <h3>Community Service</h3>
              <p>Serving the community through various charitable activities</p>
            </div>
            <div className="mission-card">
              <h3>Cultural Preservation</h3>
              <p>Preserving and promoting our rich cultural and spiritual heritage</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Guru Parampara</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>First Generation</h3>
                <p>The foundation of our spiritual lineage</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>Second Generation</h3>
                <p>Expansion and growth of teachings</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>Present Day</h3>
                <p>Continuing the legacy with modern outreach</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
