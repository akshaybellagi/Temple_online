import React, { useState, useEffect } from 'react';
import './Home.css';
import { GiTempleGate, GiPrayer } from 'react-icons/gi';
import { FaHome, FaDonate, FaChurch, FaBuilding, FaTv, FaNewspaper, FaBook, FaLaptop, FaUsers, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { MdRestaurant } from 'react-icons/md';
import { GiCow, GiMusicalNotes } from 'react-icons/gi';
import { IoLibrary } from 'react-icons/io5';
import { BiMusic } from 'react-icons/bi';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  const heroSlides = [
    {
      title: "Welcome to Divine Blessings",
      subtitle: "Experience spiritual serenity and divine grace",
      icon: GiTempleGate
    },
    {
      title: "Book Your Stay",
      subtitle: "Comfortable rooms for pilgrims and devotees",
      icon: FaHome
    },
    {
      title: "Join Our Community",
      subtitle: "Be part of our spiritual journey",
      icon: GiPrayer
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.querySelector('.stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setStatsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-content">
                <div className="hero-icon"><slide.icon /></div>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <a href="/booking" className="hero-cta">Book Now</a>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className={`stat-card ${statsVisible ? 'visible' : ''}`}>
              <div className="stat-icon"><FaUsers /></div>
              <div className="stat-info">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Happy Devotees</div>
              </div>
            </div>
            <div className={`stat-card ${statsVisible ? 'visible' : ''}`}>
              <div className="stat-icon"><FaHome /></div>
              <div className="stat-info">
                <div className="stat-number">50+</div>
                <div className="stat-label">Rooms Available</div>
              </div>
            </div>
            <div className={`stat-card ${statsVisible ? 'visible' : ''}`}>
              <div className="stat-icon"><FaStar /></div>
              <div className="stat-info">
                <div className="stat-number">4.8/5</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
            <div className={`stat-card ${statsVisible ? 'visible' : ''}`}>
              <div className="stat-icon"><FaCalendarAlt /></div>
              <div className="stat-info">
                <div className="stat-number">365</div>
                <div className="stat-label">Days Open</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-heading">ONLINE BOOKING SERVICES</h2>
          
          <div className="service-grid">
            <a href="/booking" className="service-btn">
              <span className="icon"><FaHome /></span>
              <span>ROOM BOOKING</span>
            </a>
            <a href="/services" className="service-btn">
              <span className="icon"><FaDonate /></span>
              <span>E-HUNDI</span>
            </a>
            <a href="/booking" className="service-btn">
              <span className="icon"><FaChurch /></span>
              <span>MARRIAGE HALL</span>
            </a>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-heading">OTHER SERVICES</h2>
          
          <div className="service-grid">
            <a href="/rooms-donor" className="service-btn">
              <span className="icon"><FaBuilding /></span>
              <span>ROOMS DONOR</span>
            </a>
            <a href="/live-status" className="service-btn">
              <span className="icon"><FaTv /></span>
              <span>LIVE STATUS</span>
            </a>
            <a href="/latest-news" className="service-btn">
              <span className="icon"><FaNewspaper /></span>
              <span>LATEST NEWS</span>
            </a>
            <a href="/panchanga" className="service-btn">
              <span className="icon"><MdRestaurant /></span>
              <span>PANCHANGA</span>
            </a>
            <a href="/my-history" className="service-btn">
              <span className="icon"><FaBook /></span>
              <span>MY HISTORY</span>
            </a>
            <a href="/contact" className="service-btn">
              <span className="icon"><FaLaptop /></span>
              <span>TECH SUPPORT</span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2 className="section-heading">PROJECTS</h2>
          <div className="projects-grid">
            <button className="project-btn">
              <span className="icon"><GiCow /></span>
              <span>GOSHALA</span>
            </button>
            <button className="project-btn">
              <span className="icon"><IoLibrary /></span>
              <span>VIDYAPEETHA</span>
            </button>
            <button className="project-btn">
              <span className="icon"><GiMusicalNotes /></span>
              <span>DASASAHITYA MUSEUM</span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-heading">WHAT DEVOTEES SAY</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="testimonial-text">
                "A truly divine experience. The facilities are excellent and the staff is very helpful."
              </p>
              <div className="testimonial-author">- Rajesh Kumar</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="testimonial-text">
                "Peaceful atmosphere and well-maintained rooms. Perfect for spiritual retreat."
              </p>
              <div className="testimonial-author">- Priya Sharma</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p className="testimonial-text">
                "The online booking system is very convenient. Highly recommended!"
              </p>
              <div className="testimonial-author">- Amit Patel</div>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Section */}
      <section className="audio-section">
        <div className="container">
          <h2 className="section-heading">AUDIO JUKEBOX</h2>
          <div className="audio-grid">
            <button className="audio-btn">
              <span className="audio-icon"><GiMusicalNotes /></span>
              STOTRAS
            </button>
            <button className="audio-btn">
              <span className="audio-icon"><BiMusic /></span>
              BHAJANS
            </button>
            <button className="audio-btn">
              <span className="audio-icon"><GiTempleGate /></span>
              MANTRAS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
