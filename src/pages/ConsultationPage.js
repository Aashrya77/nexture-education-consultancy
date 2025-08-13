import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { consultationAPI } from '../services/api';
import './ConsultationPage.css';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    currentEducation: '',
    interestedCountries: [],
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    communicationMode: 'video',
    currentStatus: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const totalSteps = 4;

  const consultationBenefits = [
    {
      icon: '🎯',
      title: 'Personalized Guidance',
      description: 'Get tailored advice based on your academic background, goals, and preferences.'
    },
    {
      icon: '🌍',
      title: 'Country & University Selection',
      description: 'Discover the best destinations and institutions that match your profile.'
    },
    {
      icon: '📋',
      title: 'Application Strategy',
      description: 'Learn about application requirements, deadlines, and success strategies.'
    },
    {
      icon: '💰',
      title: 'Scholarship Opportunities',
      description: 'Explore funding options and scholarship programs available to you.'
    }
  ];

  const consultationTypes = [
    {
      type: 'study-abroad',
      title: 'Study Abroad Counseling',
      duration: '60 minutes',
      description: 'Comprehensive guidance for international education planning',
      features: ['University selection', 'Application strategy', 'Visa guidance', 'Timeline planning']
    },
    {
      type: 'test-prep',
      title: 'Test Preparation Consultation',
      duration: '45 minutes',
      description: 'Strategic planning for IELTS, TOEFL, GRE, GMAT, and other tests',
      features: ['Test selection', 'Study plan', 'Score targets', 'Preparation timeline']
    },
    {
      type: 'visa-assistance',
      title: 'Visa & Immigration Guidance',
      duration: '45 minutes',
      description: 'Expert advice on visa applications and immigration processes',
      features: ['Visa requirements', 'Documentation', 'Interview prep', 'Success tips']
    },
    {
      type: 'career-counseling',
      title: 'Career Counseling',
      duration: '50 minutes',
      description: 'Professional guidance for career planning and development',
      features: ['Career assessment', 'Industry insights', 'Skill development', 'Job market analysis']
    }
  ];

  const availableCountries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'New Zealand',
    'Netherlands', 'France', 'Ireland', 'Switzerland', 'Sweden', 'Denmark'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'interestedCountries') {
      setFormData(prev => ({
        ...prev,
        interestedCountries: checked 
          ? [...prev.interestedCountries, value]
          : prev.interestedCountries.filter(country => country !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await consultationAPI.bookConsultation(formData);
      
      if (response.success) {
        setSubmitMessage('Your consultation has been booked successfully! We\'ll send you a confirmation email with meeting details shortly.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          currentEducation: '',
          interestedCountries: [],
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          communicationMode: 'video',
          currentStatus: '',
          budget: '',
          timeline: '',
          message: ''
        });
        setCurrentStep(1);
      } else {
        setSubmitMessage('There was an error booking your consultation. Please try again.');
      }
    } catch (error) {
      console.error('Consultation booking error:', error);
      setSubmitMessage('There was an error booking your consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="consultation-step">
            <h3 className="consultation-step-title">Personal Information</h3>
            <p className="consultation-step-subtitle">Let's start with your basic details</p>
            
            <div className="consultation-form-grid">
              <div className="consultation-form-field">
                <label className="consultation-form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="consultation-form-input"
                  required
                />
              </div>
              <div className="consultation-form-field">
                <label className="consultation-form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="consultation-form-input"
                  required
                />
              </div>
              <div className="consultation-form-field">
                <label className="consultation-form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="consultation-form-input"
                  required
                />
              </div>
              <div className="consultation-form-field">
                <label className="consultation-form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="consultation-form-input"
                  required
                />
              </div>
              <div className="consultation-form-field consultation-form-field-full">
                <label className="consultation-form-label">Current Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="consultation-form-input"
                  placeholder="e.g., India, Nepal, Bangladesh"
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="consultation-step">
            <h3 className="consultation-step-title">Educational Background & Goals</h3>
            <p className="consultation-step-subtitle">Tell us about your academic journey and aspirations</p>
            
            <div className="consultation-form-grid">
              <div className="consultation-form-field consultation-form-field-full">
                <label className="consultation-form-label">Current Education Level *</label>
                <select
                  name="currentEducation"
                  value={formData.currentEducation}
                  onChange={handleInputChange}
                  className="consultation-form-select"
                  required
                >
                  <option value="">Select your current level</option>
                  <option value="high-school">High School (12th Grade)</option>
                  <option value="bachelors-pursuing">Bachelor's Degree (Pursuing)</option>
                  <option value="bachelors-completed">Bachelor's Degree (Completed)</option>
                  <option value="masters-pursuing">Master's Degree (Pursuing)</option>
                  <option value="masters-completed">Master's Degree (Completed)</option>
                  <option value="phd">PhD or Doctoral Studies</option>
                  <option value="working-professional">Working Professional</option>
                </select>
              </div>
              
              <div className="consultation-form-field consultation-form-field-full">
                <label className="consultation-form-label">Interested Countries *</label>
                <div className="consultation-checkbox-grid">
                  {availableCountries.map((country) => (
                    <label key={country} className="consultation-checkbox-label">
                      <input
                        type="checkbox"
                        name="interestedCountries"
                        value={country}
                        checked={formData.interestedCountries.includes(country)}
                        onChange={handleInputChange}
                      />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="consultation-form-field">
                <label className="consultation-form-label">Study Timeline *</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="consultation-form-select"
                  required
                >
                  <option value="">When do you plan to start?</option>
                  <option value="immediate">Within 3 months</option>
                  <option value="6months">In 6 months</option>
                  <option value="1year">In 1 year</option>
                  <option value="2years">In 2 years</option>
                  <option value="flexible">Flexible timeline</option>
                </select>
              </div>
              
              <div className="consultation-form-field">
                <label className="consultation-form-label">Budget Range (USD)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="consultation-form-select"
                >
                  <option value="">Select budget range</option>
                  <option value="under-20k">Under $20,000</option>
                  <option value="20k-40k">$20,000 - $40,000</option>
                  <option value="40k-60k">$40,000 - $60,000</option>
                  <option value="60k-80k">$60,000 - $80,000</option>
                  <option value="above-80k">Above $80,000</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="consultation-step">
            <h3 className="consultation-step-title">Consultation Preferences</h3>
            <p className="consultation-step-subtitle">Choose your preferred consultation type and schedule</p>
            
            <div className="consultation-service-types">
              {consultationTypes.map((service) => (
                <label key={service.type} className="consultation-service-card">
                  <input
                    type="radio"
                    name="serviceType"
                    value={service.type}
                    checked={formData.serviceType === service.type}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="consultation-service-content">
                    <h4 className="consultation-service-title">{service.title}</h4>
                    <p className="consultation-service-duration">{service.duration}</p>
                    <p className="consultation-service-description">{service.description}</p>
                    <ul className="consultation-service-features">
                      {service.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="consultation-form-grid">
              <div className="consultation-form-field">
                <label className="consultation-form-label">Preferred Date *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="consultation-form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="consultation-form-field">
                <label className="consultation-form-label">Preferred Time *</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="consultation-form-select"
                  required
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="consultation-form-field consultation-form-field-full">
                <label className="consultation-form-label">Communication Mode *</label>
                <div className="consultation-radio-group">
                  <label className="consultation-radio-label">
                    <input
                      type="radio"
                      name="communicationMode"
                      value="video"
                      checked={formData.communicationMode === 'video'}
                      onChange={handleInputChange}
                    />
                    <span>📹 Video Call (Recommended)</span>
                  </label>
                  <label className="consultation-radio-label">
                    <input
                      type="radio"
                      name="communicationMode"
                      value="phone"
                      checked={formData.communicationMode === 'phone'}
                      onChange={handleInputChange}
                    />
                    <span>📞 Phone Call</span>
                  </label>
                  <label className="consultation-radio-label">
                    <input
                      type="radio"
                      name="communicationMode"
                      value="in-person"
                      checked={formData.communicationMode === 'in-person'}
                      onChange={handleInputChange}
                    />
                    <span>🏢 In-Person (If available)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="consultation-step">
            <h3 className="consultation-step-title">Additional Information</h3>
            <p className="consultation-step-subtitle">Help us prepare for your consultation</p>
            
            <div className="consultation-form-grid">
              <div className="consultation-form-field consultation-form-field-full">
                <label className="consultation-form-label">Current Status</label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  className="consultation-form-select"
                >
                  <option value="">Select your current status</option>
                  <option value="just-starting">Just starting to explore options</option>
                  <option value="researching">Actively researching universities</option>
                  <option value="preparing-tests">Preparing for standardized tests</option>
                  <option value="ready-apply">Ready to start applications</option>
                  <option value="applied">Already applied to some universities</option>
                  <option value="admitted">Received admissions</option>
                </select>
              </div>
              
              <div className="consultation-form-field consultation-form-field-full">
                <label className="consultation-form-label">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="consultation-form-textarea"
                  placeholder="Tell us about your specific goals, concerns, or any questions you'd like to discuss during the consultation..."
                ></textarea>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="consultation-page">
      <Header />
      
      {/* Hero Section */}
      <section className="consultation-hero">
        <div className="consultation-hero-container">
          <div className="consultation-hero-content">
            <div className="consultation-hero-badge">
              🆓 Completely Free - No Hidden Charges
            </div>
            <h1 className="consultation-hero-title">
              Book Your Free 
              <span className="consultation-hero-highlight">Expert Consultation</span>
            </h1>
            <p className="consultation-hero-subtitle">
              Get personalized guidance from our experienced counselors and take the first step 
              towards achieving your international education goals. No commitment required.
            </p>
            <div className="consultation-hero-features">
              <div className="consultation-hero-feature">
                <span className="consultation-hero-feature-icon">⏰</span>
                <span>45-60 Minutes</span>
              </div>
              <div className="consultation-hero-feature">
                <span className="consultation-hero-feature-icon">🎯</span>
                <span>Personalized Advice</span>
              </div>
              <div className="consultation-hero-feature">
                <span className="consultation-hero-feature-icon">💯</span>
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="consultation-benefits">
        <div className="consultation-benefits-container">
          <div className="consultation-benefits-header">
            <h2 className="consultation-benefits-title">What You'll Get From Your Consultation</h2>
            <p className="consultation-benefits-subtitle">
              Our expert counselors will provide comprehensive guidance tailored to your unique situation
            </p>
          </div>
          <div className="consultation-benefits-grid">
            {consultationBenefits.map((benefit, index) => (
              <div key={index} className="consultation-benefit-card">
                <div className="consultation-benefit-icon">{benefit.icon}</div>
                <h3 className="consultation-benefit-title">{benefit.title}</h3>
                <p className="consultation-benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="consultation-booking">
        <div className="consultation-booking-container">
          <div className="consultation-booking-wrapper">
            <div className="consultation-booking-header">
              <h2 className="consultation-booking-title">Book Your Free Consultation</h2>
              <div className="consultation-progress">
                <div className="consultation-progress-bar">
                  <div 
                    className="consultation-progress-fill"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <span className="consultation-progress-text">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>
            
            {submitMessage ? (
              <div className="consultation-success">
                <div className="consultation-success-icon">🎉</div>
                <h3 className="consultation-success-title">Consultation Booked Successfully!</h3>
                <p className="consultation-success-message">{submitMessage}</p>
                <div className="consultation-success-actions">
                  <Link to="/" className="consultation-success-button">
                    Return to Home
                  </Link>
                  <Link to="/contact" className="consultation-success-button-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="consultation-form">
                {renderStepContent()}
                
                <div className="consultation-form-navigation">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="consultation-nav-button consultation-nav-previous"
                    >
                      ← Previous
                    </button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="consultation-nav-button consultation-nav-next"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="consultation-submit-button"
                    >
                      {isSubmitting ? '📅 Booking...' : '📅 Book Free Consultation'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
