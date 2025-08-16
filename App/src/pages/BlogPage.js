import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BlogPage.css';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Study Abroad', 'Test Prep', 'University Guide', 'Visa Tips', 'Student Life'];

  const blogPosts = [
    {
      id: 1,
      title: 'Complete Guide to IELTS Preparation: Tips from Experts',
      excerpt: 'Master the IELTS exam with proven strategies, practice techniques, and insider tips from our expert instructors who have helped thousands of students achieve their target scores.',
      category: 'Test Prep',
      author: 'Michael Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '📚',
      tags: ['IELTS', 'English Test', 'Study Tips'],
      featured: true
    },
    {
      id: 2,
      title: 'Top 10 Universities in Canada for International Students',
      excerpt: 'Discover the best Canadian universities offering world-class education, research opportunities, and excellent post-graduation work prospects for international students.',
      category: 'Study Abroad',
      author: 'Priya Patel',
      date: '2024-01-12',
      readTime: '12 min read',
      image: '🇨🇦',
      tags: ['Canada', 'Universities', 'International Students'],
      featured: true
    },
    {
      id: 3,
      title: 'Student Visa Interview: Common Questions and How to Answer',
      excerpt: 'Prepare for your student visa interview with confidence. Learn about the most frequently asked questions and expert-approved answers that increase your approval chances.',
      category: 'Visa Tips',
      author: 'James Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '✈️',
      tags: ['Visa', 'Interview', 'Immigration'],
      featured: false
    },
    {
      id: 4,
      title: 'GRE vs GMAT: Which Test Should You Take for Graduate School?',
      excerpt: 'Confused between GRE and GMAT? This comprehensive comparison helps you choose the right test based on your career goals, target programs, and personal strengths.',
      category: 'Test Prep',
      author: 'Dr. Sarah Williams',
      date: '2024-01-08',
      readTime: '10 min read',
      image: '🎓',
      tags: ['GRE', 'GMAT', 'Graduate School'],
      featured: false
    },
    {
      id: 5,
      title: 'Scholarship Opportunities for Indian Students in the USA',
      excerpt: 'Explore various scholarship programs, grants, and financial aid options available for Indian students pursuing higher education in American universities.',
      category: 'Study Abroad',
      author: 'Priya Patel',
      date: '2024-01-05',
      readTime: '15 min read',
      image: '🇺🇸',
      tags: ['USA', 'Scholarships', 'Financial Aid'],
      featured: false
    },
    {
      id: 6,
      title: 'Living in Australia: A Complete Guide for International Students',
      excerpt: 'Everything you need to know about student life in Australia - from accommodation and part-time work to healthcare and cultural adaptation tips.',
      category: 'Student Life',
      author: 'Michael Chen',
      date: '2024-01-03',
      readTime: '11 min read',
      image: '🇦🇺',
      tags: ['Australia', 'Student Life', 'Living Guide'],
      featured: false
    },
    {
      id: 7,
      title: 'How to Write a Winning Statement of Purpose (SOP)',
      excerpt: 'Master the art of writing compelling SOPs that stand out to admissions committees. Includes templates, examples, and common mistakes to avoid.',
      category: 'University Guide',
      author: 'Dr. Sarah Williams',
      date: '2024-01-01',
      readTime: '9 min read',
      image: '📝',
      tags: ['SOP', 'Application', 'Writing Tips'],
      featured: false
    },
    {
      id: 8,
      title: 'TOEFL vs IELTS: Which English Test is Right for You?',
      excerpt: 'Compare TOEFL and IELTS tests in detail - format, scoring, difficulty, and university preferences to help you make the best choice for your goals.',
      category: 'Test Prep',
      author: 'Michael Chen',
      date: '2023-12-28',
      readTime: '7 min read',
      image: '🗣️',
      tags: ['TOEFL', 'IELTS', 'English Test'],
      featured: false
    },
    {
      id: 9,
      title: 'UK Student Visa Requirements: Complete Checklist for 2024',
      excerpt: 'Stay updated with the latest UK student visa requirements, documentation checklist, and application process changes for international students in 2024.',
      category: 'Visa Tips',
      author: 'James Rodriguez',
      date: '2023-12-25',
      readTime: '13 min read',
      image: '🇬🇧',
      tags: ['UK', 'Student Visa', '2024 Updates'],
      featured: false
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const recentPosts = [
    { title: '5 Common IELTS Speaking Mistakes to Avoid', date: '2024-01-18' },
    { title: 'Best Engineering Programs in Germany', date: '2024-01-16' },
    { title: 'Part-time Jobs for Students in Canada', date: '2024-01-14' },
    { title: 'MBA Application Deadlines 2024', date: '2024-01-11' },
    { title: 'Health Insurance for International Students', date: '2024-01-09' }
  ];

  const popularTags = [
    'IELTS', 'Study Abroad', 'USA', 'Canada', 'UK', 'Australia', 'Visa', 'Scholarships',
    'TOEFL', 'GRE', 'GMAT', 'University Application', 'Student Life', 'Test Prep'
  ];

  return (
    <div className="blog-page">
      
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-container">
          <div className="blog-hero-content">
            <div className="blog-hero-badge">
              📖 Education Insights & Expert Advice
            </div>
            <h1 className="blog-hero-title">
              Stay Informed with Our 
              <span className="blog-hero-highlight">Education Blog</span>
            </h1>
            <p className="blog-hero-subtitle">
              Get the latest insights, tips, and expert advice on study abroad, test preparation, 
              university applications, and student life from our experienced counselors and industry experts.
            </p>
            <div className="blog-hero-search">
              <input
                type="text"
                placeholder="Search articles, tips, guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="blog-search-input"
              />
              <button className="blog-search-button">
                🔍
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-content">
        <div className="blog-container">
          <div className="blog-main">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="blog-featured">
                <h2 className="blog-section-title">Featured Articles</h2>
                <div className="blog-featured-grid">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="blog-featured-card">
                      <div className="blog-featured-image">
                        <span className="blog-featured-emoji">{post.image}</span>
                        <div className="blog-featured-category">{post.category}</div>
                      </div>
                      <div className="blog-featured-content">
                        <h3 className="blog-featured-title">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="blog-featured-excerpt">{post.excerpt}</p>
                        <div className="blog-featured-meta">
                          <div className="blog-featured-author">
                            <span className="blog-author-avatar">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </span>
                            <div>
                              <div className="blog-author-name">{post.author}</div>
                              <div className="blog-post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            </div>
                          </div>
                          <div className="blog-read-time">{post.readTime}</div>
                        </div>
                        <div className="blog-featured-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="blog-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Category Filter */}
            <section className="blog-filter">
              <h2 className="blog-section-title">All Articles</h2>
              <div className="blog-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`blog-category-btn ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Regular Posts */}
            <section className="blog-posts">
              <div className="blog-posts-grid">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="blog-post-card">
                    <div className="blog-post-image">
                      <span className="blog-post-emoji">{post.image}</span>
                      <div className="blog-post-category">{post.category}</div>
                    </div>
                    <div className="blog-post-content">
                      <h3 className="blog-post-title">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="blog-post-excerpt">{post.excerpt}</p>
                      <div className="blog-post-meta">
                        <div className="blog-post-author">
                          <span className="blog-author-avatar">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                          <div>
                            <div className="blog-author-name">{post.author}</div>
                            <div className="blog-post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                          </div>
                        </div>
                        <div className="blog-read-time">{post.readTime}</div>
                      </div>
                      <div className="blog-post-tags">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="blog-no-results">
                  <div className="blog-no-results-icon">🔍</div>
                  <h3>No articles found</h3>
                  <p>Try adjusting your search terms or category filter.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            {/* Recent Posts */}
            <div className="blog-sidebar-section">
              <h3 className="blog-sidebar-title">Recent Posts</h3>
              <div className="blog-recent-posts">
                {recentPosts.map((post, index) => (
                  <div key={index} className="blog-recent-post">
                    <h4 className="blog-recent-title">
                      <Link to={`/blog/${index + 10}`}>{post.title}</Link>
                    </h4>
                    <div className="blog-recent-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="blog-sidebar-section">
              <h3 className="blog-sidebar-title">Popular Tags</h3>
              <div className="blog-tags-cloud">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(tag)}
                    className="blog-tag-cloud"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="blog-sidebar-section blog-newsletter">
              <h3 className="blog-sidebar-title">Stay Updated</h3>
              <p className="blog-newsletter-text">
                Get the latest education insights and tips delivered to your inbox.
              </p>
              <div className="blog-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="blog-newsletter-input"
                />
                <button className="blog-newsletter-button">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="blog-cta">
        <div className="blog-cta-container">
          <div className="blog-cta-content">
            <h2 className="blog-cta-title">Ready to Start Your Journey?</h2>
            <p className="blog-cta-subtitle">
              Get personalized guidance from our expert counselors and turn your study abroad dreams into reality.
            </p>
            <div className="blog-cta-actions">
              <Link to="/consultation" className="blog-cta-button blog-cta-primary">
                📞 Book Free Consultation
              </Link>
              <Link to="/preparation-classes" className="blog-cta-button blog-cta-secondary">
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
