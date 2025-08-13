import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './HomePage.css';

export default function HomePage() {
  // Enhanced content with more details
  const stats = [
    { number: '2,500+', label: 'Students Placed', icon: '🎓' },
    { number: '150+', label: 'Partner Universities', icon: '🏛️' },
    { number: '25+', label: 'Countries', icon: '🌍' },
    { number: '98%', label: 'Success Rate', icon: '⭐' },
  ];

  const features = [
    {
      title: 'Expert Counseling',
      description: 'Get personalized guidance from our experienced education consultants who have helped thousands of students achieve their dreams.',
      icon: '🎯',
      highlights: ['One-on-one sessions', 'Career guidance', 'University selection']
    },
    {
      title: 'Global University Network',
      description: 'Access our extensive network of top-ranked universities and colleges across 25+ countries worldwide.',
      icon: '🌐',
      highlights: ['150+ partner universities', 'Direct admissions', 'Scholarship opportunities']
    },
    {
      title: 'Test Preparation Excellence',
      description: 'Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, SAT, and other standardized tests with proven results.',
      icon: '📈',
      highlights: ['Expert instructors', 'Mock tests', '98% success rate']
    },
    {
      title: 'Visa & Documentation',
      description: 'Complete assistance with visa applications, documentation, and pre-departure guidance for a smooth transition.',
      icon: '📋',
      highlights: ['Visa guidance', 'Document prep', 'Pre-departure support']
    },
    {
      title: 'Scholarship Assistance',
      description: 'Maximize your chances of securing scholarships and financial aid with our expert application strategies.',
      icon: '💰',
      highlights: ['Scholarship search', 'Application help', 'Financial planning']
    },
    {
      title: 'Career Support',
      description: 'Ongoing career guidance and networking opportunities to help you succeed in your chosen field.',
      icon: '🚀',
      highlights: ['Career counseling', 'Industry connections', 'Job placement']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      university: 'Harvard University',
      course: 'MBA',
      country: '🇺🇸 USA',
      quote: 'Nexture Education made my dream of studying at Harvard a reality. Their guidance was invaluable throughout the entire process.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      university: 'Oxford University',
      course: 'Computer Science',
      country: '🇬🇧 UK',
      quote: 'The test preparation and application support helped me secure admission to my dream university with a scholarship.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      university: 'University of Toronto',
      course: 'Engineering',
      country: '🇨🇦 Canada',
      quote: 'From IELTS preparation to visa guidance, Nexture Education supported me every step of the way.',
      rating: 5
    }
  ];

  const destinations = [
    { name: 'United States', flag: '🇺🇸', universities: '500+', popular: 'MIT, Harvard, Stanford' },
    { name: 'United Kingdom', flag: '🇬🇧', universities: '200+', popular: 'Oxford, Cambridge, LSE' },
    { name: 'Canada', flag: '🇨🇦', universities: '150+', popular: 'UofT, UBC, McGill' },
    { name: 'Australia', flag: '🇦🇺', universities: '100+', popular: 'ANU, Melbourne, Sydney' },
    { name: 'Germany', flag: '🇩🇪', universities: '80+', popular: 'TUM, Heidelberg, Berlin' },
    { name: 'Netherlands', flag: '🇳🇱', universities: '50+', popular: 'Delft, Amsterdam, Leiden' }
  ];

  const courses = [
    { name: 'IELTS', duration: '8 weeks', price: '₹15,000', rating: 4.8, students: '500+' },
    { name: 'TOEFL', duration: '10 weeks', price: '₹18,000', rating: 4.9, students: '300+' },
    { name: 'GRE', duration: '12 weeks', price: '₹25,000', rating: 4.7, students: '400+' },
    { name: 'GMAT', duration: '10 weeks', price: '₹22,000', rating: 4.8, students: '250+' }
  ];



  return (
    <div className="homepage">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              🌟 Trusted by 2,500+ Students Worldwide
            </div>
            <h1 className="hero-title">
              Transform Your Future with 
              <span className="hero-highlight">World-Class Education</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of successful students who achieved their dreams of studying abroad. Get expert guidance, test preparation, and comprehensive support for your international education journey.
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="hero-feature-icon">✅</span>
                <span>98% Success Rate</span>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">🏆</span>
                <span>Award-Winning Counselors</span>
              </div>
              <div className="hero-feature">
                <span className="hero-feature-icon">🌍</span>
                <span>25+ Countries</span>
              </div>
            </div>
            <div className="hero-cta">
              <Link to="/consultation" className="btn btn-hero-primary">
                Get Free Consultation
              </Link>
              <Link to="/study-abroad" className="btn btn-hero-secondary">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <h2>Our Impact in Numbers</h2>
            <p>Trusted by thousands of students worldwide</p>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Why Choose Nexture Education?
            </h2>
            <p className="features-subtitle">
              We provide comprehensive support for your international education journey
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-highlights">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
                <div className="feature-cta">
                  <Link to="/contact" className="feature-link">Learn More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Study Destinations */}
      <section className="destinations-section">
        <div className="destinations-container">
          <div className="destinations-header">
            <h2 className="destinations-title">Popular Study Destinations</h2>
            <p className="destinations-subtitle">Explore top countries for your international education</p>
          </div>
          <div className="destinations-grid">
            {destinations.map((destination, index) => (
              <div key={index} className="destination-card">
                <div className="destination-flag">{destination.flag}</div>
                <h3 className="destination-name">{destination.name}</h3>
                <div className="destination-stats">
                  <span className="destination-universities">{destination.universities} Universities</span>
                </div>
                <p className="destination-popular">Popular: {destination.popular}</p>
                <Link to="/study-abroad" className="destination-link">Explore →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Prep Courses */}
      <section className="courses-section">
        <div className="courses-container">
          <div className="courses-header">
            <h2 className="courses-title">Test Preparation Courses</h2>
            <p className="courses-subtitle">Expert coaching for standardized tests with proven results</p>
          </div>
          <div className="courses-grid">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-header">
                  <h3 className="course-name">{course.name}</h3>
                  <div className="course-rating">
                    <span className="course-stars">⭐⭐⭐⭐⭐</span>
                    <span className="course-rating-number">{course.rating}</span>
                  </div>
                </div>
                <div className="course-details">
                  <div className="course-detail">
                    <span className="course-detail-label">Duration:</span>
                    <span className="course-detail-value">{course.duration}</span>
                  </div>
                  <div className="course-detail">
                    <span className="course-detail-label">Students:</span>
                    <span className="course-detail-value">{course.students}</span>
                  </div>
                  <div className="course-detail">
                    <span className="course-detail-label">Price:</span>
                    <span className="course-detail-value">{course.price}</span>
                  </div>
                </div>
                <Link to="/preparation-classes" className="course-cta">Enroll Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">Success Stories</h2>
            <p className="testimonials-subtitle">Hear from our successful students around the world</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} className="testimonial-star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-course">{testimonial.course}</p>
                    <p className="testimonial-university">{testimonial.university}</p>
                    <p className="testimonial-country">{testimonial.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
