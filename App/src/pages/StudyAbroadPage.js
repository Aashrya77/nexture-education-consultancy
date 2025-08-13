import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './StudyAbroadPage.css';

export default function StudyAbroadPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = [
    {
      name: 'United States',
      flag: '🇺🇸',
      universities: 150,
      averageCost: '$25,000 - $55,000',
      duration: '4 years (Bachelor), 2 years (Master)',
      popularCities: ['New York', 'Los Angeles', 'Boston', 'Chicago'],
      topUniversities: ['Harvard', 'MIT', 'Stanford', 'Yale'],
      requirements: ['TOEFL/IELTS', 'SAT/GRE/GMAT', 'SOP', 'LOR'],
      intakeSeasons: ['Fall (Sep)', 'Spring (Jan)', 'Summer (May)'],
      workRights: 'F-1 visa allows part-time work on campus',
      description: 'Home to world-renowned universities and diverse academic programs across all fields.'
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      universities: 95,
      averageCost: 'CAD 15,000 - 35,000',
      duration: '4 years (Bachelor), 1-2 years (Master)',
      popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
      topUniversities: ['University of Toronto', 'UBC', 'McGill', 'Waterloo'],
      requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['Fall (Sep)', 'Winter (Jan)', 'Summer (May)'],
      workRights: 'Study permit allows 20 hours/week work',
      description: 'Known for high-quality education, multicultural environment, and post-graduation work opportunities.'
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      universities: 130,
      averageCost: '£15,000 - £35,000',
      duration: '3 years (Bachelor), 1 year (Master)',
      popularCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham'],
      topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'LSE'],
      requirements: ['IELTS/TOEFL', 'A-levels/GRE', 'Personal Statement', 'References'],
      intakeSeasons: ['September', 'January (limited)'],
      workRights: 'Student visa allows 20 hours/week work',
      description: 'Rich academic tradition with shorter degree durations and globally recognized qualifications.'
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      universities: 85,
      averageCost: 'AUD 20,000 - 45,000',
      duration: '3-4 years (Bachelor), 1.5-2 years (Master)',
      popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
      topUniversities: ['ANU', 'University of Melbourne', 'UNSW', 'University of Sydney'],
      requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['February', 'July'],
      workRights: 'Student visa allows 48 hours/fortnight work',
      description: 'High-quality education with excellent research opportunities and post-study work visas.'
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      universities: 75,
      averageCost: '€0 - €20,000 (Many public universities are tuition-free)',
      duration: '3-4 years (Bachelor), 1-2 years (Master)',
      popularCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
      topUniversities: ['TU Munich', 'Heidelberg', 'LMU Munich', 'KIT'],
      requirements: ['IELTS/TOEFL/German', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['Winter (Oct)', 'Summer (Apr)'],
      workRights: 'Student visa allows 120 full days or 240 half days work',
      description: 'Excellent engineering and research programs with affordable education and strong economy.'
    },
    {
      name: 'New Zealand',
      flag: '🇳🇿',
      universities: 45,
      averageCost: 'NZD 22,000 - 35,000',
      duration: '3-4 years (Bachelor), 1-2 years (Master)',
      popularCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
      topUniversities: ['University of Auckland', 'University of Otago', 'Victoria University', 'AUT'],
      requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['February', 'July'],
      workRights: 'Student visa allows 20 hours/week work',
      description: 'Safe, welcoming environment with high-quality education and beautiful natural landscapes.'
    }
  ];

  const services = [
    {
      title: 'University Selection',
      description: 'Expert guidance to choose the right university and program based on your profile and goals.',
      icon: '🎯',
      features: ['Profile Assessment', 'University Matching', 'Program Comparison', 'Ranking Analysis']
    },
    {
      title: 'Application Assistance',
      description: 'Complete support throughout the application process from documentation to submission.',
      icon: '📝',
      features: ['Document Preparation', 'SOP Writing', 'LOR Guidance', 'Application Review']
    },
    {
      title: 'Visa Support',
      description: 'Comprehensive visa guidance and interview preparation for successful visa approval.',
      icon: '✈️',
      features: ['Visa Documentation', 'Interview Prep', 'Financial Planning', 'Travel Guidance']
    },
    {
      title: 'Scholarship Guidance',
      description: 'Identify and apply for scholarships and financial aid opportunities.',
      icon: '💰',
      features: ['Scholarship Search', 'Application Support', 'Merit Assessment', 'Financial Planning']
    }
  ];

  const steps = [
    { step: 1, title: 'Initial Consultation', description: 'Free consultation to understand your goals and assess your profile' },
    { step: 2, title: 'Country & University Selection', description: 'Choose the best destinations and universities based on your preferences' },
    { step: 3, title: 'Test Preparation', description: 'Prepare for required standardized tests (IELTS, TOEFL, GRE, etc.)' },
    { step: 4, title: 'Application Process', description: 'Complete university applications with expert guidance' },
    { step: 5, title: 'Visa Application', description: 'Apply for student visa with comprehensive documentation support' },
    { step: 6, title: 'Pre-Departure', description: 'Final preparations including accommodation, travel, and orientation' }
  ];

  return (
    <div className="study-abroad-page">
      <Header />
      
      {/* Hero Section */}
      <section className="study-hero">
        <div className="study-hero-container">
          <div className="study-hero-content">
            <div className="study-hero-badge">
              🌍 Your Gateway to Global Education
            </div>
            <h1 className="study-hero-title">
              Study Abroad with 
              <span className="study-hero-highlight">Expert Guidance</span>
            </h1>
            <p className="study-hero-subtitle">
              Transform your future with world-class international education. We've helped over 2,500 students 
              achieve their dreams across 25+ countries with our comprehensive study abroad services.
            </p>
            <div className="study-hero-stats">
              <div className="study-hero-stat">
                <span className="study-hero-stat-number">2,500+</span>
                <span className="study-hero-stat-label">Students Placed</span>
              </div>
              <div className="study-hero-stat">
                <span className="study-hero-stat-number">25+</span>
                <span className="study-hero-stat-label">Countries</span>
              </div>
              <div className="study-hero-stat">
                <span className="study-hero-stat-number">98%</span>
                <span className="study-hero-stat-label">Visa Success</span>
              </div>
            </div>
            <div className="study-hero-actions">
              <Link to="/consultation" className="study-hero-button study-hero-primary">
                📞 Book Free Consultation
              </Link>
              <Link to="/contact" className="study-hero-button study-hero-secondary">
                💬 Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="study-countries">
        <div className="study-countries-container">
          <div className="study-countries-header">
            <h2 className="study-countries-title">Popular Study Destinations</h2>
            <p className="study-countries-subtitle">
              Explore top destinations for international education with detailed information about each country
            </p>
          </div>
          <div className="study-countries-grid">
            {countries.map((country, index) => (
              <div 
                key={index} 
                className={`study-country-card ${selectedCountry === index ? 'active' : ''}`}
                onClick={() => setSelectedCountry(selectedCountry === index ? null : index)}
              >
                <div className="study-country-header">
                  <span className="study-country-flag">{country.flag}</span>
                  <div className="study-country-info">
                    <h3 className="study-country-name">{country.name}</h3>
                    <p className="study-country-universities">{country.universities}+ Universities</p>
                  </div>
                  <span className="study-country-toggle">
                    {selectedCountry === index ? '−' : '+'}
                  </span>
                </div>
                <p className="study-country-description">{country.description}</p>
                
                {selectedCountry === index && (
                  <div className="study-country-details">
                    <div className="study-country-detail-grid">
                      <div className="study-country-detail">
                        <h4>💰 Average Cost</h4>
                        <p>{country.averageCost}</p>
                      </div>
                      <div className="study-country-detail">
                        <h4>⏱️ Duration</h4>
                        <p>{country.duration}</p>
                      </div>
                      <div className="study-country-detail">
                        <h4>🏙️ Popular Cities</h4>
                        <p>{country.popularCities.join(', ')}</p>
                      </div>
                      <div className="study-country-detail">
                        <h4>🏛️ Top Universities</h4>
                        <p>{country.topUniversities.join(', ')}</p>
                      </div>
                      <div className="study-country-detail">
                        <h4>📋 Requirements</h4>
                        <p>{country.requirements.join(', ')}</p>
                      </div>
                      <div className="study-country-detail">
                        <h4>📅 Intake Seasons</h4>
                        <p>{country.intakeSeasons.join(', ')}</p>
                      </div>
                      <div className="study-country-detail">
                        <h4>💼 Work Rights</h4>
                        <p>{country.workRights}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="study-services">
        <div className="study-services-container">
          <div className="study-services-header">
            <h2 className="study-services-title">Our Study Abroad Services</h2>
            <p className="study-services-subtitle">
              Comprehensive support throughout your entire study abroad journey
            </p>
          </div>
          <div className="study-services-grid">
            {services.map((service, index) => (
              <div key={index} className="study-service-card">
                <div className="study-service-icon">{service.icon}</div>
                <h3 className="study-service-title">{service.title}</h3>
                <p className="study-service-description">{service.description}</p>
                <ul className="study-service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="study-service-feature">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="study-process">
        <div className="study-process-container">
          <div className="study-process-header">
            <h2 className="study-process-title">Your Study Abroad Journey</h2>
            <p className="study-process-subtitle">
              Our proven 6-step process ensures your success from consultation to departure
            </p>
          </div>
          <div className="study-process-steps">
            {steps.map((step, index) => (
              <div key={index} className="study-process-step">
                <div className="study-process-step-number">{step.step}</div>
                <div className="study-process-step-content">
                  <h3 className="study-process-step-title">{step.title}</h3>
                  <p className="study-process-step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="study-cta">
        <div className="study-cta-container">
          <div className="study-cta-content">
            <h2 className="study-cta-title">Ready to Begin Your Study Abroad Journey?</h2>
            <p className="study-cta-subtitle">
              Take the first step towards your international education goals. Our expert counselors are ready to guide you.
            </p>
            <div className="study-cta-actions">
              <Link to="/consultation" className="study-cta-button study-cta-primary">
                📞 Book Free Consultation
              </Link>
              <Link to="/preparation-classes" className="study-cta-button study-cta-secondary">
                📚 Explore Test Prep
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
