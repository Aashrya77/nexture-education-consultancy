"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./HomePage.css"
import axios from "axios"
import  base_url  from "../../config"

export default function HomePage() {
  const [content, setContent] = useState(null || [])
  const [loading, setLoading] = useState(true)

  // Fetch homepage content from API

  // Fallback content in case API fail

  const services = [
    {
      id: 1,
      icon: '🌐',
      iconClass: 'icon-purple',
      title: 'Study Abroad Consulting',
      description: 'Expert guidance for university selection, application process, and visa assistance',
      buttonText: 'Learn More'
    },
    {
      id: 2,
      icon: '📖',
      iconClass: 'icon-blue',
      title: 'Test Preparation',
      description: 'Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests',
      buttonText: 'Learn More'
    },
    {
      id: 3,
      icon: '👥',
      iconClass: 'icon-green',
      title: 'Career Counseling',
      description: 'Personalized career guidance and mentorship for your academic journey',
      buttonText: 'Learn More'
    }
  ];

   const destinations = [
    {
      id: 1,
      flag: '🇺🇸',
      country: 'United States',
      universities: '500+ Universities'
    },
    {
      id: 2,
      flag: '🇨🇦',
      country: 'Canada',
      universities: '200+ Universities'
    },
    {
      id: 3,
      flag: '🇬🇧',
      country: 'United Kingdom',
      universities: '150+ Universities'
    },
    {
      id: 4,
      flag: '🇦🇺',
      country: 'Australia',
      universities: '100+ Universities'
    }
  ];

  const courses = [
    {
      id: 1,
      testName: 'IELTS',
      category: 'English Proficiency',
      duration: '8 weeks',
      price: '₹15,000'
    },
    {
      id: 2,
      testName: 'TOEFL',
      category: 'English Proficiency',
      duration: '10 weeks',
      price: '₹18,000'
    },
    {
      id: 3,
      testName: 'GRE',
      category: 'Graduate Admission',
      duration: '12 weeks',
      price: '₹25,000'
    },
    {
      id: 4,
      testName: 'GMAT',
      category: 'Business School',
      duration: '10 weeks',
      price: '₹22,000'
    }
  ];

 const stories = [
    {
      id: 1,
      rating: 5,
      testimonial: "Nexture Education made my dream of studying in Canada a reality. Their guidance was invaluable throughout the entire process.",
      studentName: "Sarah Johnson"
    },
    {
      id: 2,
      rating: 5,
      testimonial: "The GMAT preparation course helped me achieve a score of 750. I couldn't have done it without their expert coaching.",
      studentName: "Michael Chen"
    }
  ];

  const renderStars = (rating) => {
    return Array(rating).fill(0).map((_, index) => (
      <span key={index} className="star">★</span>
    ));
  };

  const getContent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/home")
      if (response.statusText === "OK") {
        setContent(response.data.data)
      } else {
        setContent(getDefaultContent())
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching home content:", error)
      setContent(getDefaultContent())
      setLoading(false)
      
    }
  }

  useEffect(() => {
    getContent()
  }, [])



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



  return (
    <div className="homepage">

      {/* Modern Hero Section */}
      <section className="modern-hero-section">
        <div className="modern-hero-container">
          {content ? content.map((content) => {
            const { title, description, images, _id, highlight } = content
         
            return (
               <div className="hero-content-wrapper" key={_id}>
            <div className="hero-left" >
              <div className="hero-badge">Your Trusted Education Partner</div>
              <h1 className="modern-hero-title">
               {title}
                <span className="hero-highlight">{highlight}</span>
              </h1>
              <p className="modern-hero-subtitle">{description}</p>
              <div className="hero-cta-wrapper">
                <Link to="/consultation" className="btn-modern-primary">
                 Get Free Consultation
                  <span className="btn-arrow">→</span>
                </Link>
                <Link to="/study-abroad" className="btn-modern-secondary">
                 Explore Destinations
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="hero-right">
              <img
                src={images && images.length > 0 ? `${base_url}/` + images[0] : "https://via.placeholder.com/600x400"}
                alt="Hero"
                className="hero-image"
              />
            </div>
          </div>
            )
          }): 
          (
            <div className="hero-content-wrapper">
              <div className="hero-left">
                <div className="hero-badge">Your Trusted Education Partner</div>
                <h1 className="modern-hero-title">
                  Your Next Step to a Bright Future
                  <span className="hero-highlight">Nexture Education</span>
                </h1>
                <p className="modern-hero-subtitle">
                  Expert guidance for study abroad and test preparation. We help students achieve their dreams of international education with personalized coaching and comprehensive support.
                </p>
                <div className="hero-cta-wrapper">
                  <Link to="/consultation" className="btn-modern-primary">
                    Get Free Consultation
                    <span className="btn-arrow">→</span>
                  </Link>
                  <Link to="/study-abroad" className="btn-modern-secondary">
                    Explore Destinations
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
              <div className="hero-right">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Hero"
                  className="hero-image"
                />
              </div>
            </div>
          )
          
          }
         
        </div>
      </section>

  

      {/* Features Section */}
   <div className="services-container">
      <div className="services-header">
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">
          Comprehensive education services to help you achieve your international study goals
        </p>
      </div>
      
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-content">
              <div className={`icon-container ${service.iconClass}`}>
                {service.icon}
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              
              <p className="service-description">{service.description}</p>
            </div>
            
            <button className="learn-more-button">
              {service.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>

      {/* Study Destinations */}
      <div className="destinations-container">
      <div className="destinations-header">
        <h2 className="destinations-title">Popular Study Destinations</h2>
        <p className="destinations-subtitle">
          Explore top countries for international education
        </p>
      </div>
      
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <div className="flag-container">
              <span className="flag-icon">{destination.flag}</span>
            </div>
            
            <h3 className="destination-title">{destination.country}</h3>
            
            <p className="destination-universities">{destination.universities}</p>
          </div>
        ))}
      </div>
      
      <div className="destinations-footer">
        <button className="view-all-button">
          View All Destinations
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>

      {/* Test Prep Courses */}
         <div className="test-prep-container">
      <div className="test-prep-header">
        <h2 className="test-prep-title">Test Preparation Courses</h2>
        <p className="test-prep-subtitle">
          Expert coaching for all major standardized tests
        </p>
      </div>
      
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <div className="course-test-name">{course.testName}</div>
              <div className="course-category">{course.category}</div>
            </div>
            
            <div className="course-details">
              <div className="course-detail">
                <span className="check-icon">✓</span>
                <span className="detail-text">Duration: {course.duration}</span>
              </div>
              
              <div className="course-detail">
                <span className="check-icon">✓</span>
                <span className="detail-text">Starting from {course.price}</span>
              </div>
            </div>
            
            <button className="learn-more-btn">
              Learn More
            </button>
          </div>
        ))}
      </div>
      
      <div className="test-prep-footer">
        <button className="view-all-courses-btn">
          View All Courses
          <span className="arrow-icon">→</span>
        </button>
      </div>
    </div>

      {/* Testimonials */}
       <div className="success-stories-container">
      <div className="success-stories-header">
        <h2 className="success-stories-title">Student Success Stories</h2>
        <p className="success-stories-subtitle">
          Hear from our successful students
        </p>
      </div>
      
      <div className="stories-grid">
        {stories.map((story) => (
          <div key={story.id} className="story-card">
            <div className="rating-container">
              {renderStars(story.rating)}
            </div>
            
            <blockquote className="testimonial">
              "{story.testimonial}"
            </blockquote>
            
            <div className="student-name">
              {story.studentName}
            </div>
          </div>
        ))}
      </div>
      
      <div className="success-stories-footer">
        <button className="read-more-btn">
          Read More Success Stories
        </button>
      </div>
    </div>

      <Footer />
    </div>
  )
}
