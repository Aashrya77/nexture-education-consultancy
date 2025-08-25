import React from 'react'
import "./BlogPage.css"
const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      author: 'Nexture Education',
      date: '1/15/2024',
      title: 'Top 10 Universities in Canada for International Students',
      excerpt: 'Discover the best Canadian universities offering world-class education and excellent opportunities for international students.',
      tags: ['Canada', 'Universities'],
      readMore: 'Read More'
    },
    {
      id: 2,
      image: null, // This will show placeholder
      author: 'Nexture Education',
      date: '1/5/2024',
      title: 'Scholarship Opportunities for Indian Students Abroad',
      excerpt: 'Explore various scholarship programs available for Indian students planning to study abroad.',
      tags: ['Scholarships', 'Financial Aid'],
      readMore: 'Read More'
    }
  ];

  return (
    <>
    <div className="education-blog-container">
      <div className="education-blog-content">
        <h2 className="education-blog-title">Education Blog</h2>
        <p className="education-blog-subtitle">
          Stay updated with the latest insights, tips, and guides for your international education journey
        </p>
      </div>
    </div> 



     <div className="blog-posts-container">
      <h1 className="section-title">Latest Articles</h1>
      <p className="section-subtitle">Insights and tips for your international education journey</p>
      <div className="blog-posts-grid">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-post-card">
            <div className="blog-post-image">
              {post.image ? (
                <img src={post.image} alt={post.title} />
              ) : (
                <div className="image-placeholder">
                  <span className="placeholder-icon">🖼️</span>
                </div>
              )}
            </div>
            
            <div className="blog-post-content">
              <div className="blog-post-meta">
                <span className="author">
                  <span className="author-icon">👤</span>
                  {post.author}
                </span>
                <span className="date">
                  <span className="date-icon">📅</span>
                  {post.date}
                </span>
              </div>
              
              <h3 className="blog-post-title">{post.title}</h3>
              
              <p className="blog-post-excerpt">{post.excerpt}</p>
              
              <div className="blog-post-footer">
                <div className="tags-container">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                <a href="#" className="read-more-link">
                  {post.readMore}
                  <span className="arrow-icon">→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
    </>
  )
}

export default BlogPage