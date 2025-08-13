import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PreparationClassesPage.css';

export default function PreparationClassesPage() {
  const [selectedTest, setSelectedTest] = useState(null);

  const tests = [
    {
      name: 'IELTS',
      fullName: 'International English Language Testing System',
      icon: '🇬🇧',
      duration: '8-12 weeks',
      price: '$299',
      rating: 4.9,
      students: 1250,
      description: 'Comprehensive IELTS preparation for all four skills: Listening, Reading, Writing, and Speaking.',
      targetScore: '7.0 - 8.5 bands',
      format: 'Academic & General Training',
      validFor: 'UK, Australia, Canada, New Zealand',
      sections: ['Listening (30 min)', 'Reading (60 min)', 'Writing (60 min)', 'Speaking (11-14 min)'],
      features: [
        'Expert trainers with 10+ years experience',
        'Mock tests every week',
        'Individual speaking practice sessions',
        'Writing task feedback and correction',
        'Flexible batch timings',
        'Study materials included'
      ],
      schedule: {
        weekdays: 'Mon-Fri: 6:00 AM - 8:00 AM, 6:00 PM - 8:00 PM',
        weekends: 'Sat-Sun: 9:00 AM - 12:00 PM, 2:00 PM - 5:00 PM'
      }
    },
    {
      name: 'TOEFL',
      fullName: 'Test of English as a Foreign Language',
      icon: '🇺🇸',
      duration: '8-10 weeks',
      price: '$349',
      rating: 4.8,
      students: 980,
      description: 'Complete TOEFL iBT preparation focusing on academic English skills for university admission.',
      targetScore: '90 - 110 points',
      format: 'Internet-based Test (iBT)',
      validFor: 'USA, Canada, and 130+ countries',
      sections: ['Reading (54-72 min)', 'Listening (41-57 min)', 'Speaking (17 min)', 'Writing (50 min)'],
      features: [
        'Computer-based test simulation',
        'Academic vocabulary building',
        'Note-taking strategies',
        'Integrated task practice',
        'Time management techniques',
        'Official ETS materials'
      ],
      schedule: {
        weekdays: 'Mon-Fri: 7:00 AM - 9:00 AM, 7:00 PM - 9:00 PM',
        weekends: 'Sat-Sun: 10:00 AM - 1:00 PM, 3:00 PM - 6:00 PM'
      }
    },
    {
      name: 'GRE',
      fullName: 'Graduate Record Examinations',
      icon: '🎓',
      duration: '10-12 weeks',
      price: '$449',
      rating: 4.9,
      students: 750,
      description: 'Intensive GRE preparation for graduate school admissions with focus on quantitative and verbal reasoning.',
      targetScore: '310 - 330 points',
      format: 'Computer-delivered Test',
      validFor: 'Graduate programs worldwide',
      sections: ['Verbal Reasoning (60 min)', 'Quantitative Reasoning (70 min)', 'Analytical Writing (60 min)'],
      features: [
        'Advanced vocabulary building',
        'Quantitative problem-solving strategies',
        'Analytical writing workshops',
        'Adaptive test practice',
        'Personalized study plans',
        'Official ETS PowerPrep materials'
      ],
      schedule: {
        weekdays: 'Mon-Fri: 6:30 AM - 8:30 AM, 6:30 PM - 8:30 PM',
        weekends: 'Sat-Sun: 9:00 AM - 12:30 PM, 2:00 PM - 5:30 PM'
      }
    },
    {
      name: 'GMAT',
      fullName: 'Graduate Management Admission Test',
      icon: '💼',
      duration: '10-14 weeks',
      price: '$499',
      rating: 4.8,
      students: 650,
      description: 'Comprehensive GMAT preparation for MBA and business school admissions with expert guidance.',
      targetScore: '650 - 750 points',
      format: 'Computer Adaptive Test',
      validFor: 'MBA and business programs',
      sections: ['Quantitative (62 min)', 'Verbal (65 min)', 'Integrated Reasoning (30 min)', 'Analytical Writing (30 min)'],
      features: [
        'Business-focused content',
        'Data sufficiency mastery',
        'Critical reasoning techniques',
        'Sentence correction expertise',
        'Integrated reasoning practice',
        'Official GMAC materials'
      ],
      schedule: {
        weekdays: 'Mon-Fri: 6:00 AM - 8:00 AM, 7:00 PM - 9:00 PM',
        weekends: 'Sat-Sun: 9:30 AM - 1:00 PM, 2:30 PM - 6:00 PM'
      }
    },
    {
      name: 'SAT',
      fullName: 'Scholastic Assessment Test',
      icon: '📚',
      duration: '8-10 weeks',
      price: '$399',
      rating: 4.7,
      students: 850,
      description: 'Complete SAT preparation for undergraduate admissions with focus on critical reading and mathematics.',
      targetScore: '1400 - 1550 points',
      format: 'Paper and Digital Test',
      validFor: 'US undergraduate programs',
      sections: ['Reading (65 min)', 'Writing & Language (35 min)', 'Math (80 min)', 'Essay (50 min - optional)'],
      features: [
        'College-level reading comprehension',
        'Advanced mathematics concepts',
        'Grammar and usage mastery',
        'Essay writing techniques',
        'Test-taking strategies',
        'College Board official materials'
      ],
      schedule: {
        weekdays: 'Mon-Fri: 5:30 AM - 7:30 AM, 5:30 PM - 7:30 PM',
        weekends: 'Sat-Sun: 8:00 AM - 11:30 AM, 1:00 PM - 4:30 PM'
      }
    },
    {
      name: 'PTE',
      fullName: 'Pearson Test of English',
      icon: '🖥️',
      duration: '6-8 weeks',
      price: '$279',
      rating: 4.6,
      students: 550,
      description: 'Computer-based English proficiency test preparation with AI-powered scoring system.',
      targetScore: '65 - 85 points',
      format: 'Computer-based Test',
      validFor: 'Australia, UK, Canada, New Zealand',
      sections: ['Speaking & Writing (77-93 min)', 'Reading (32-41 min)', 'Listening (45-57 min)'],
      features: [
        'Computer-based test simulation',
        'AI scoring system practice',
        'Integrated skills training',
        'Real-time feedback',
        'Flexible test scheduling',
        'Pearson official materials'
      ],
      schedule: {
        weekdays: 'Mon-Fri: 7:30 AM - 9:30 AM, 7:30 PM - 9:30 PM',
        weekends: 'Sat-Sun: 10:30 AM - 1:30 PM, 3:30 PM - 6:30 PM'
      }
    }
  ];

  const features = [
    {
      title: 'Expert Instructors',
      description: 'Learn from certified trainers with 10+ years of experience and proven track records.',
      icon: '👨‍🏫',
      highlight: '95% of our instructors are certified'
    },
    {
      title: 'Personalized Learning',
      description: 'Customized study plans and individual attention based on your strengths and weaknesses.',
      icon: '🎯',
      highlight: 'Individual progress tracking'
    },
    {
      title: 'Mock Tests',
      description: 'Regular practice tests in real exam conditions with detailed performance analysis.',
      icon: '📊',
      highlight: 'Weekly mock tests included'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Multiple batch timings including early morning, evening, and weekend options.',
      icon: '⏰',
      highlight: '6 different time slots available'
    }
  ];

  const successStats = [
    { number: '4,500+', label: 'Students Trained', icon: '🎓' },
    { number: '92%', label: 'Score Improvement', icon: '📈' },
    { number: '4.8/5', label: 'Average Rating', icon: '⭐' },
    { number: '15+', label: 'Years Experience', icon: '🏆' }
  ];

  return (
    <div className="prep-page">
      <Header />
      
      {/* Hero Section */}
      <section className="prep-hero">
        <div className="prep-hero-container">
          <div className="prep-hero-content">
            <div className="prep-hero-badge">
              🎯 Achieve Your Target Score
            </div>
            <h1 className="prep-hero-title">
              Master Your 
              <span className="prep-hero-highlight">Test Preparation</span>
            </h1>
            <p className="prep-hero-subtitle">
              Expert coaching for IELTS, TOEFL, GRE, GMAT, SAT, and PTE with proven strategies, 
              personalized guidance, and comprehensive study materials to achieve your target scores.
            </p>
            <div className="prep-hero-stats">
              {successStats.map((stat, index) => (
                <div key={index} className="prep-hero-stat">
                  <span className="prep-hero-stat-icon">{stat.icon}</span>
                  <span className="prep-hero-stat-number">{stat.number}</span>
                  <span className="prep-hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="prep-hero-actions">
              <Link to="/consultation" className="prep-hero-button prep-hero-primary">
                📞 Book Free Demo Class
              </Link>
              <Link to="/contact" className="prep-hero-button prep-hero-secondary">
                💬 Get Course Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Section */}
      <section className="prep-tests">
        <div className="prep-tests-container">
          <div className="prep-tests-header">
            <h2 className="prep-tests-title">Our Test Preparation Courses</h2>
            <p className="prep-tests-subtitle">
              Comprehensive preparation programs for all major standardized tests
            </p>
          </div>
          <div className="prep-tests-grid">
            {tests.map((test, index) => (
              <div 
                key={index} 
                className={`prep-test-card ${selectedTest === index ? 'active' : ''}`}
                onClick={() => setSelectedTest(selectedTest === index ? null : index)}
              >
                <div className="prep-test-header">
                  <div className="prep-test-icon">{test.icon}</div>
                  <div className="prep-test-info">
                    <h3 className="prep-test-name">{test.name}</h3>
                    <p className="prep-test-fullname">{test.fullName}</p>
                  </div>
                  <div className="prep-test-meta">
                    <div className="prep-test-price">{test.price}</div>
                    <div className="prep-test-rating">
                      ⭐ {test.rating} ({test.students})
                    </div>
                  </div>
                </div>
                
                <div className="prep-test-summary">
                  <p className="prep-test-description">{test.description}</p>
                  <div className="prep-test-quick-info">
                    <span className="prep-test-duration">⏱️ {test.duration}</span>
                    <span className="prep-test-target">🎯 {test.targetScore}</span>
                  </div>
                </div>

                {selectedTest === index && (
                  <div className="prep-test-details">
                    <div className="prep-test-detail-section">
                      <h4>📋 Test Format</h4>
                      <p><strong>Format:</strong> {test.format}</p>
                      <p><strong>Valid For:</strong> {test.validFor}</p>
                      <div className="prep-test-sections">
                        <strong>Test Sections:</strong>
                        <ul>
                          {test.sections.map((section, idx) => (
                            <li key={idx}>{section}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="prep-test-detail-section">
                      <h4>✨ Course Features</h4>
                      <ul className="prep-test-features">
                        {test.features.map((feature, idx) => (
                          <li key={idx}>✓ {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="prep-test-detail-section">
                      <h4>📅 Class Schedule</h4>
                      <p><strong>Weekdays:</strong> {test.schedule.weekdays}</p>
                      <p><strong>Weekends:</strong> {test.schedule.weekends}</p>
                    </div>
                    
                    <div className="prep-test-actions">
                      <Link to="/consultation" className="prep-test-enroll">
                        Enroll Now - {test.price}
                      </Link>
                      <Link to="/contact" className="prep-test-demo">
                        Free Demo Class
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="prep-features">
        <div className="prep-features-container">
          <div className="prep-features-header">
            <h2 className="prep-features-title">Why Choose Our Test Prep Programs?</h2>
            <p className="prep-features-subtitle">
              Proven methodologies and expert guidance to maximize your test scores
            </p>
          </div>
          <div className="prep-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="prep-feature-card">
                <div className="prep-feature-icon">{feature.icon}</div>
                <h3 className="prep-feature-title">{feature.title}</h3>
                <p className="prep-feature-description">{feature.description}</p>
                <div className="prep-feature-highlight">{feature.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="prep-cta">
        <div className="prep-cta-container">
          <div className="prep-cta-content">
            <h2 className="prep-cta-title">Ready to Achieve Your Target Score?</h2>
            <p className="prep-cta-subtitle">
              Join thousands of successful students who have achieved their dream scores with our expert guidance. 
              Start your test preparation journey today!
            </p>
            <div className="prep-cta-actions">
              <Link to="/consultation" className="prep-cta-button prep-cta-primary">
                📞 Book Free Demo Class
              </Link>
              <Link to="/study-abroad" className="prep-cta-button prep-cta-secondary">
                🌍 Explore Study Abroad
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
