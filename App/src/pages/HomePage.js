"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./HomePage.css"
import axios from "axios"
import  base_url  from "../config"

export default function HomePage() {
  const [content, setContent] = useState(null || [])
  const [loading, setLoading] = useState(true)

  // Fetch homepage content from API

  // Fallback content in case API fail
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
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose Nexture Education?</h2>
            <p className="features-subtitle">
              We provide comprehensive support for your international education journey
            </p>
          </div>

          <div className="features-grid">
           
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
          
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
