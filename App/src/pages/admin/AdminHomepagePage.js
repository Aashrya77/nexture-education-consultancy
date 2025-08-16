import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../../config';

export default function AdminHomepagePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [homepageContent, setHomepageContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: '',
      primaryButtonText: '',
      secondaryButtonText: '',
      backgroundImage: ''
    },
    about: {
      title: '',
      description: '',
      features: ['', '', '']
    },
    services: {
      title: '',
      subtitle: '',
      featured: [
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' }
      ]
    },
    testimonials: {
      title: '',
      subtitle: '',
      featured: [
        { name: '', role: '', content: '', rating: 5 },
        { name: '', role: '', content: '', rating: 5 },
        { name: '', role: '', content: '', rating: 5 }
      ]
    },
    stats: {
      studentsHelped: 0,
      successRate: 0,
      countriesServed: 0,
      yearsExperience: 0
    }
  });

  useEffect(() => {
    fetchHomepageContent();
  }, []);

  const fetchHomepageContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/admin/homepage-content`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data) {
        setHomepageContent(response.data);
      }
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveHomepageContent = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.put(`${base_url}/api/admin/homepage-content`, homepageContent, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setMessage('Homepage content updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving homepage content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (section, field, value, index = null) => {
    setHomepageContent(prev => {
      const updated = { ...prev };
      if (index !== null) {
        updated[section][field][index] = value;
      } else {
        updated[section][field] = value;
      }
      return updated;
    });
  };

  const updateObjectField = (section, index, field, value) => {
    setHomepageContent(prev => {
      const updated = { ...prev };
      updated[section][index][field] = value;
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading homepage content...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Homepage Content Management</h1>
        <p className="text-gray-600">Update the content that appears on your website's homepage</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Main Title</label>
              <input
                type="text"
                value={homepageContent.hero.title}
                onChange={(e) => updateNestedField('hero', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Your Future Starts Here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={homepageContent.hero.subtitle}
                onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Expert Education Consultancy"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={homepageContent.hero.description}
                onChange={(e) => updateNestedField('hero', 'description', e.target.value)}
                className="w-full p-3 border rounded-lg h-24"
                placeholder="Transform your educational dreams into reality with our expert guidance..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Button Text</label>
              <input
                type="text"
                value={homepageContent.hero.primaryButtonText}
                onChange={(e) => updateNestedField('hero', 'primaryButtonText', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Get Started"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
              <input
                type="text"
                value={homepageContent.hero.secondaryButtonText}
                onChange={(e) => updateNestedField('hero', 'secondaryButtonText', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Learn More"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">About Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={homepageContent.about.title}
                onChange={(e) => updateNestedField('about', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Why Choose Nexture Education?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={homepageContent.about.description}
                onChange={(e) => updateNestedField('about', 'description', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="We are dedicated to helping students achieve their educational goals..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Key Features (3 items)</label>
              {homepageContent.about.features.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  value={feature}
                  onChange={(e) => updateNestedField('about', 'features', e.target.value, index)}
                  className="w-full p-3 border rounded-lg mb-2"
                  placeholder={`Feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Featured Services</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={homepageContent.services.title}
                  onChange={(e) => updateNestedField('services', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Our Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={homepageContent.services.subtitle}
                  onChange={(e) => updateNestedField('services', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Comprehensive education solutions"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Featured Services (3 items)</label>
              {homepageContent.services.featured.map((service, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Service {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateObjectField('services', 'featured', index, 'title', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Service Title"
                    />
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) => updateObjectField('services', 'featured', index, 'icon', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Icon (emoji or class)"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => updateObjectField('services', 'featured', index, 'description', e.target.value)}
                      className="p-2 border rounded h-20 md:col-span-3"
                      placeholder="Service description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Students Helped</label>
              <input
                type="number"
                value={homepageContent.stats.studentsHelped}
                onChange={(e) => updateNestedField('stats', 'studentsHelped', parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Success Rate (%)</label>
              <input
                type="number"
                value={homepageContent.stats.successRate}
                onChange={(e) => updateNestedField('stats', 'successRate', parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded-lg"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Countries Served</label>
              <input
                type="number"
                value={homepageContent.stats.countriesServed}
                onChange={(e) => updateNestedField('stats', 'countriesServed', parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Years Experience</label>
              <input
                type="number"
                value={homepageContent.stats.yearsExperience}
                onChange={(e) => updateNestedField('stats', 'yearsExperience', parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Testimonials</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={homepageContent.testimonials.title}
                  onChange={(e) => updateNestedField('testimonials', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="What Our Students Say"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={homepageContent.testimonials.subtitle}
                  onChange={(e) => updateNestedField('testimonials', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Success stories from our students"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Featured Testimonials (3 items)</label>
              {homepageContent.testimonials.featured.map((testimonial, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Testimonial {index + 1}</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => updateObjectField('testimonials', 'featured', index, 'name', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Student Name"
                      />
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => updateObjectField('testimonials', 'featured', index, 'role', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Student Role/University"
                      />
                    </div>
                    <textarea
                      value={testimonial.content}
                      onChange={(e) => updateObjectField('testimonials', 'featured', index, 'content', e.target.value)}
                      className="w-full p-2 border rounded h-24"
                      placeholder="Testimonial content..."
                    />
                    <div>
                      <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                      <select
                        value={testimonial.rating}
                        onChange={(e) => updateObjectField('testimonials', 'featured', index, 'rating', parseInt(e.target.value))}
                        className="p-2 border rounded"
                      >
                        {[1, 2, 3, 4, 5].map(rating => (
                          <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={saveHomepageContent}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Homepage Content'}
        </button>
      </div>
    </div>
  );
}
