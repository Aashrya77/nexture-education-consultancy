import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      const response = await authAPI.register(registrationData);
      
      if (response.success) {
        setSuccess('Registration successful! Please check your email for verification.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <Link to="/" className="register-logo">
              <h1>Nexture Education</h1>
            </Link>
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join thousands of students achieving their dreams</p>
          </div>

          {error && (
            <div className="register-error">
              <span className="register-error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="register-success">
              <span className="register-success-icon">✅</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-row">
              <div className="register-field">
                <label htmlFor="firstName" className="register-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="register-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="lastName" className="register-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="register-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="email" className="register-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="register-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="phone" className="register-label">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="register-input"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="register-form-row">
              <div className="register-field">
                <label htmlFor="password" className="register-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="register-input"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="register-input"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="register-button"
            >
              {isLoading ? (
                <>
                  <span className="register-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account? 
              <Link to="/login" className="register-link"> Sign in here</Link>
            </p>
            <p>
              <Link to="/" className="register-link">← Back to Home</Link>
            </p>
          </div>
        </div>

        <div className="register-info">
          <h3>Why Join Nexture Education?</h3>
          <ul>
            <li>🎯 Personalized education counseling</li>
            <li>🌍 Access to 150+ partner universities</li>
            <li>📚 Comprehensive test preparation</li>
            <li>💼 Career guidance and support</li>
            <li>🏆 98% success rate</li>
            <li>📧 Priority consultation booking</li>
          </ul>
          
          <div className="register-testimonial">
            <blockquote>
              "Nexture Education helped me get into my dream university. 
              The personalized guidance was invaluable!"
            </blockquote>
            <cite>- Sarah Johnson, Harvard University</cite>
          </div>
        </div>
      </div>
    </div>
  );
}
