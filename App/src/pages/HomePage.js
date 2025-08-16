"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./HomePage.css"

export default function HomePage() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomepageContent()
  }, [])

  const fetchHomepageContent = async () => {
    try {
      const response = await fetch("/api/homepage-content")
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      } else {
        // Fallback to default content if API fails
        setContent(getDefaultContent())
      }
    } catch (error) {
      console.error("Error fetching homepage content:", error)
      // Fallback to default content
      setContent(getDefaultContent())
    } finally {
      setLoading(false)
    }
  }

  const getDefaultContent = () => ({
    hero: {
      title: "Your Next Step to a Bright Future",
      subtitle: "Your Trusted Education Partner",
      description:
        "Expert guidance for study abroad and test preparation. We help students achieve their dreams of international education with personalized coaching and comprehensive support.",
      primaryButtonText: "Get Free Consultation",
      secondaryButtonText: "Explore Destinations",
    },
    stats: [
      { number: "5000+", label: "Students Placed", icon: "🎓" },
      { number: "50+", label: "Partner Universities", icon: "🏛️" },
      { number: "95%", label: "Success Rate", icon: "⭐" },
      { number: "10+", label: "Years Experience", icon: "🏆" },
    ],
    features: [
      {
        title: "Expert Counseling",
        description:
          "Get personalized guidance from our experienced education consultants who have helped thousands of students achieve their dreams.",
        icon: "🎯",
        highlights: ["One-on-one sessions", "Career guidance", "University selection"],
      },
      {
        title: "Global University Network",
        description:
          "Access our extensive network of top-ranked universities and colleges across 25+ countries worldwide.",
        icon: "🌐",
        highlights: ["150+ partner universities", "Direct admissions", "Scholarship opportunities"],
      },
      {
        title: "Test Preparation Excellence",
        description:
          "Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, SAT, and other standardized tests with proven results.",
        icon: "📈",
        highlights: ["Expert instructors", "Mock tests", "98% success rate"],
      },
      {
        title: "Visa & Documentation",
        description:
          "Complete assistance with visa applications, documentation, and pre-departure guidance for a smooth transition.",
        icon: "📋",
        highlights: ["Visa guidance", "Document prep", "Pre-departure support"],
      },
      {
        title: "Scholarship Assistance",
        description:
          "Maximize your chances of securing scholarships and financial aid with our expert application strategies.",
        icon: "💰",
        highlights: ["Scholarship search", "Application help", "Financial planning"],
      },
      {
        title: "Career Support",
        description: "Ongoing career guidance and networking opportunities to help you succeed in your chosen field.",
        icon: "🚀",
        highlights: ["Career counseling", "Industry connections", "Job placement"],
      },
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        university: "Harvard University",
        course: "MBA",
        country: "🇺🇸 USA",
        quote:
          "Nexture Education made my dream of studying at Harvard a reality. Their guidance was invaluable throughout the entire process.",
        rating: 5,
      },
      {
        name: "Michael Chen",
        university: "Oxford University",
        course: "Computer Science",
        country: "🇬🇧 UK",
        quote:
          "The test preparation and application support helped me secure admission to my dream university with a scholarship.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        university: "University of Toronto",
        course: "Engineering",
        country: "🇨🇦 Canada",
        quote: "From IELTS preparation to visa guidance, Nexture Education supported me every step of the way.",
        rating: 5,
      },
    ],
    destinations: [
      { name: "United States", flag: "🇺🇸", universities: "500+", popular: "MIT, Harvard, Stanford" },
      { name: "United Kingdom", flag: "🇬🇧", universities: "200+", popular: "Oxford, Cambridge, LSE" },
      { name: "Canada", flag: "🇨🇦", universities: "150+", popular: "UofT, UBC, McGill" },
      { name: "Australia", flag: "🇦🇺", universities: "100+", popular: "ANU, Melbourne, Sydney" },
      { name: "Germany", flag: "🇩🇪", universities: "80+", popular: "TUM, Heidelberg, Berlin" },
      { name: "Netherlands", flag: "🇳🇱", universities: "50+", popular: "Delft, Amsterdam, Leiden" },
    ],
    courses: [
      { name: "IELTS", duration: "8 weeks", price: "₹15,000", rating: 4.8, students: "500+" },
      { name: "TOEFL", duration: "10 weeks", price: "₹18,000", rating: 4.9, students: "300+" },
    ],
  })

  if (loading) {
    return (
      <div className="homepage">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  const { hero, stats, features, testimonials, destinations, courses } = content

  return (
    <div className="homepage">

      {/* Modern Hero Section */}
      <section className="modern-hero-section">
        <div className="modern-hero-container">
          <div className="hero-content-wrapper">
            <div className="hero-left">
              <div className="hero-badge">{hero.subtitle}</div>
              <h1 className="modern-hero-title">
                {hero.title.split(" ").slice(0, -3).join(" ")}
                <span className="hero-highlight"> {hero.title.split(" ").slice(-3).join(" ")}</span>
              </h1>
              <p className="modern-hero-subtitle">{hero.description}</p>
              <div className="hero-cta-wrapper">
                <Link to="/consultation" className="btn-modern-primary">
                  {hero.primaryButtonText}
                  <span className="btn-arrow">→</span>
                </Link>
                <Link to="/study-abroad" className="btn-modern-secondary">
                  {hero.secondaryButtonText}
                </Link>
              </div>
            </div>

            <div className="hero-right">
              <div className="stats-panel">
                <div className="stats-header">
                  <h3>Quick Stats</h3>
                </div>
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose Nexture Education?</h2>
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
                  <Link to="/contact" className="feature-link">
                    Learn More →
                  </Link>
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
                <Link to="/study-abroad" className="destination-link">
                  Explore →
                </Link>
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
                <Link to="/preparation-classes" className="course-cta">
                  Enroll Now
                </Link>
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
                    <span key={i} className="testimonial-star">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.name.charAt(0)}</div>
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
  )
}
