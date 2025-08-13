import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      
      if (response.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on user role
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    const demoCredentials = {
      admin: { email: 'admin@nexture-education.com', password: 'admin123' },
      counselor: { email: 'sarah.johnson@nexture-education.com', password: 'counselor123' },
      staff: { email: 'emily.rodriguez@nexture-education.com', password: 'staff123' }
    };

    setFormData(demoCredentials[role]);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Link to="/" className="login-logo">
              <h1>Nexture Education</h1>
            </Link>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="login-error">
              <span className="login-error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="email" className="login-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="login-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="login-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-demo">
            <p className="login-demo-title">Demo Accounts (Click to auto-fill):</p>
            <div className="login-demo-buttons">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="login-demo-button admin"
              >
                👑 Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('counselor')}
                className="login-demo-button counselor"
              >
                👨‍🏫 Counselor Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('staff')}
                className="login-demo-button staff"
              >
                👩‍💼 Staff Demo
              </button>
            </div>
          </div>

          <div className="login-footer">
            <p>
              Don't have an account? 
              <Link to="/contact" className="login-link"> Contact us</Link>
            </p>
            <p>
              <Link to="/" className="login-link">← Back to Home</Link>
            </p>
          </div>
        </div>

        <div className="login-info">
          <h3>Access Your Dashboard</h3>
          <ul>
            <li>📊 View analytics and reports</li>
            <li>📧 Manage contact inquiries</li>
            <li>📅 Handle consultation bookings</li>
            <li>📝 Create and manage blog content</li>
            <li>👥 User management (Admin only)</li>
          </ul>
          
          <div className="login-credentials">
            <h4>Default Admin Credentials:</h4>
            <p><strong>Email:</strong> admin@nexture-education.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
