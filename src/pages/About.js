import './About.css';
import { FaOm, FaHandsHelping, FaBook, FaHeart, FaUsers, FaPray } from 'react-icons/fa';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="hero-overlay">
          <div className="container">
            <h1>About Sri Raghavendra Swamy Matha</h1>
            <p>A Sacred Journey of Devotion, Service, and Spiritual Enlightenment</p>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-icon">
              <FaOm />
            </div>
            <h2>Welcome to Our Sacred Abode</h2>
            <p className="intro-text">
              Sri Raghavendra Swamy Matha stands as a beacon of spiritual light, dedicated to preserving ancient Vedic traditions 
              while serving the modern devotee community. Our matha has been a center of divine grace, spiritual learning, 
              and selfless service for generations.
            </p>
          </div>
        </div>
      </section>

      <section className="section history-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-image">
              <div className="image-placeholder">
                <FaPray className="placeholder-icon" />
              </div>
            </div>
            <div className="content-text">
              <h2>Our Heritage</h2>
              <p>
                Founded with the divine blessings of Sri Raghavendra Swamy, our matha has been a pilgrimage destination 
                for devotees seeking spiritual solace and divine intervention. The sacred presence of our revered saint 
                continues to bless all who visit with an open heart.
              </p>
              <p>
                Through decades of dedicated service, we have maintained the sanctity of our traditions while embracing 
                devotees from all walks of life. Our doors remain open to all seekers of truth and spiritual wisdom.
              </p>
              <div className="stats-row">
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Years of Service</p>
                </div>
                <div className="stat-item">
                  <h3>50K+</h3>
                  <p>Annual Visitors</p>
                </div>
                <div className="stat-item">
                  <h3>365</h3>
                  <p>Days of Worship</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mission-section">
        <div className="container">
          <h2 className="section-title">Our Mission & Values</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="card-icon">
                <FaBook />
              </div>
              <h3>Spiritual Education</h3>
              <p>Imparting authentic Vedic knowledge and spiritual teachings to guide seekers on their path to enlightenment</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">
                <FaHandsHelping />
              </div>
              <h3>Community Service</h3>
              <p>Serving humanity through charitable activities, food distribution, and support for the underprivileged</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">
                <FaHeart />
              </div>
              <h3>Devotional Practice</h3>
              <p>Fostering deep devotion through daily rituals, festivals, and spiritual programs throughout the year</p>
            </div>
            <div className="mission-card">
              <div className="card-icon">
                <FaUsers />
              </div>
              <h3>Cultural Heritage</h3>
              <p>Preserving and promoting our rich cultural traditions, music, and arts for future generations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <h2 className="section-title">Guru Parampara</h2>
          <p className="section-subtitle">Our Sacred Lineage of Spiritual Masters</p>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Sri Raghavendra Swamy</h3>
                <span className="timeline-date">1595 - 1671</span>
                <p>The divine incarnation who established the foundation of our spiritual lineage with his miraculous deeds and profound teachings</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Successive Pontiffs</h3>
                <span className="timeline-date">17th - 19th Century</span>
                <p>Generations of enlightened masters who carried forward the sacred traditions and expanded the reach of divine grace</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Modern Era</h3>
                <span className="timeline-date">20th Century - Present</span>
                <p>Continuing the legacy with contemporary outreach while maintaining the purity of ancient spiritual practices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Experience Divine Blessings</h2>
            <p>Visit us to experience the sacred atmosphere and receive the blessings of Sri Raghavendra Swamy</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Plan Your Visit</a>
              <a href="/services" className="btn btn-secondary">Our Services</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
