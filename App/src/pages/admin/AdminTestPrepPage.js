import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../../config';

export default function AdminTestPrepPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [testPrepContent, setTestPrepContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    overview: {
      title: '',
      content: '',
      whyChooseUs: ['', '', '', '']
    },
    tests: {
      title: '',
      subtitle: '',
      featured: [
        { name: '', description: '', duration: '', features: ['', '', ''], price: '' },
        { name: '', description: '', duration: '', features: ['', '', ''], price: '' },
        { name: '', description: '', duration: '', features: ['', '', ''], price: '' },
        { name: '', description: '', duration: '', features: ['', '', ''], price: '' }
      ]
    },
    methodology: {
      title: '',
      subtitle: '',
      approaches: [
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' }
      ]
    },
    schedule: {
      title: '',
      subtitle: '',
      formats: [
        { type: '', description: '', duration: '', schedule: '' },
        { type: '', description: '', duration: '', schedule: '' },
        { type: '', description: '', duration: '', schedule: '' }
      ]
    },
    success: {
      title: '',
      subtitle: '',
      stats: {
        averageScoreImprovement: 0,
        successRate: 0,
        studentsEnrolled: 0,
        experienceYears: 0
      },
      testimonials: [
        { name: '', score: '', improvement: '', content: '' },
        { name: '', score: '', improvement: '', content: '' },
        { name: '', score: '', improvement: '', content: '' }
      ]
    }
  });

  useEffect(() => {
    fetchTestPrepContent();
  }, []);

  const fetchTestPrepContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/admin/test-prep-content`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data) {
        setTestPrepContent(response.data);
      }
    } catch (error) {
      console.error('Error fetching test prep content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveTestPrepContent = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.put(`${base_url}/api/admin/test-prep-content`, testPrepContent, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setMessage('Test Preparation content updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving test prep content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (section, field, value, index = null) => {
    setTestPrepContent(prev => {
      const updated = { ...prev };
      if (index !== null) {
        updated[section][field][index] = value;
      } else {
        updated[section][field] = value;
      }
      return updated;
    });
  };

  const updateArrayItem = (section, field, index, itemField, value, subIndex = null) => {
    setTestPrepContent(prev => {
      const updated = { ...prev };
      if (subIndex !== null) {
        updated[section][field][index][itemField][subIndex] = value;
      } else {
        updated[section][field][index][itemField] = value;
      }
      return updated;
    });
  };

  const updateStatsField = (field, value) => {
    setTestPrepContent(prev => ({
      ...prev,
      success: {
        ...prev.success,
        stats: {
          ...prev.success.stats,
          [field]: value
        }
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading test preparation content...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Preparation Content Management</h1>
        <p className="text-gray-600">Update the content for the Test Preparation page</p>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                value={testPrepContent.hero.title}
                onChange={(e) => updateNestedField('hero', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Test Preparation Classes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={testPrepContent.hero.subtitle}
                onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Achieve your target scores"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={testPrepContent.hero.description}
                onChange={(e) => updateNestedField('hero', 'description', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Comprehensive test preparation for IELTS, TOEFL, SAT, GRE and more..."
              />
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={testPrepContent.overview.title}
                onChange={(e) => updateNestedField('overview', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Expert Test Preparation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={testPrepContent.overview.content}
                onChange={(e) => updateNestedField('overview', 'content', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Detailed overview of your test preparation services..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Why Choose Us (4 reasons)</label>
              {testPrepContent.overview.whyChooseUs.map((reason, index) => (
                <input
                  key={index}
                  type="text"
                  value={reason}
                  onChange={(e) => updateNestedField('overview', 'whyChooseUs', e.target.value, index)}
                  className="w-full p-3 border rounded-lg mb-2"
                  placeholder={`Reason ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tests Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Available Tests</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={testPrepContent.tests.title}
                  onChange={(e) => updateNestedField('tests', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Available Test Preparations"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={testPrepContent.tests.subtitle}
                  onChange={(e) => updateNestedField('tests', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Choose your test"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Featured Tests (4 tests)</label>
              {testPrepContent.tests.featured.map((test, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Test {index + 1}</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => updateArrayItem('tests', 'featured', index, 'name', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Test Name (e.g., IELTS)"
                      />
                      <input
                        type="text"
                        value={test.duration}
                        onChange={(e) => updateArrayItem('tests', 'featured', index, 'duration', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Duration (e.g., 8 weeks)"
                      />
                      <input
                        type="text"
                        value={test.price}
                        onChange={(e) => updateArrayItem('tests', 'featured', index, 'price', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Price (e.g., $299)"
                      />
                    </div>
                    <textarea
                      value={test.description}
                      onChange={(e) => updateArrayItem('tests', 'featured', index, 'description', e.target.value)}
                      className="w-full p-2 border rounded h-20"
                      placeholder="Test description..."
                    />
                    <div>
                      <label className="block text-sm font-medium mb-2">Key Features (3 items)</label>
                      {test.features.map((feature, fIndex) => (
                        <input
                          key={fIndex}
                          type="text"
                          value={feature}
                          onChange={(e) => updateArrayItem('tests', 'featured', index, 'features', e.target.value, fIndex)}
                          className="w-full p-2 border rounded mb-1"
                          placeholder={`Feature ${fIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Teaching Methodology</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={testPrepContent.methodology.title}
                  onChange={(e) => updateNestedField('methodology', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Our Teaching Approach"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={testPrepContent.methodology.subtitle}
                  onChange={(e) => updateNestedField('methodology', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Proven methods for success"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Teaching Approaches (4 approaches)</label>
              {testPrepContent.methodology.approaches.map((approach, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Approach {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={approach.title}
                      onChange={(e) => updateArrayItem('methodology', 'approaches', index, 'title', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Approach Title"
                    />
                    <input
                      type="text"
                      value={approach.icon}
                      onChange={(e) => updateArrayItem('methodology', 'approaches', index, 'icon', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Icon (emoji or class)"
                    />
                    <textarea
                      value={approach.description}
                      onChange={(e) => updateArrayItem('methodology', 'approaches', index, 'description', e.target.value)}
                      className="p-2 border rounded h-20 md:col-span-3"
                      placeholder="Approach description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Class Formats & Schedule</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={testPrepContent.schedule.title}
                  onChange={(e) => updateNestedField('schedule', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Flexible Class Options"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={testPrepContent.schedule.subtitle}
                  onChange={(e) => updateNestedField('schedule', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Choose what works for you"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Class Formats (3 formats)</label>
              {testPrepContent.schedule.formats.map((format, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Format {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={format.type}
                      onChange={(e) => updateArrayItem('schedule', 'formats', index, 'type', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Format Type (e.g., Online, In-Person)"
                    />
                    <input
                      type="text"
                      value={format.duration}
                      onChange={(e) => updateArrayItem('schedule', 'formats', index, 'duration', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Duration (e.g., 2 hours/day)"
                    />
                    <input
                      type="text"
                      value={format.schedule}
                      onChange={(e) => updateArrayItem('schedule', 'formats', index, 'schedule', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Schedule (e.g., Mon-Fri 6-8 PM)"
                    />
                    <textarea
                      value={format.description}
                      onChange={(e) => updateArrayItem('schedule', 'formats', index, 'description', e.target.value)}
                      className="p-2 border rounded h-20"
                      placeholder="Format description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Success Stories & Statistics</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={testPrepContent.success.title}
                  onChange={(e) => updateNestedField('success', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Our Success Record"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={testPrepContent.success.subtitle}
                  onChange={(e) => updateNestedField('success', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Proven results speak for themselves"
                />
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-lg font-medium mb-4">Key Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Avg Score Improvement</label>
                  <input
                    type="number"
                    value={testPrepContent.success.stats.averageScoreImprovement}
                    onChange={(e) => updateStatsField('averageScoreImprovement', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Success Rate (%)</label>
                  <input
                    type="number"
                    value={testPrepContent.success.stats.successRate}
                    onChange={(e) => updateStatsField('successRate', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border rounded-lg"
                    max="100"
                    placeholder="95"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Students Enrolled</label>
                  <input
                    type="number"
                    value={testPrepContent.success.stats.studentsEnrolled}
                    onChange={(e) => updateStatsField('studentsEnrolled', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years Experience</label>
                  <input
                    type="number"
                    value={testPrepContent.success.stats.experienceYears}
                    onChange={(e) => updateStatsField('experienceYears', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>

            {/* Success Testimonials */}
            <div>
              <label className="block text-sm font-medium mb-4">Success Testimonials (3 items)</label>
              {testPrepContent.success.testimonials.map((testimonial, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Testimonial {index + 1}</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => updateArrayItem('success', 'testimonials', index, 'name', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Student Name"
                      />
                      <input
                        type="text"
                        value={testimonial.score}
                        onChange={(e) => updateArrayItem('success', 'testimonials', index, 'score', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Final Score (e.g., 7.5)"
                      />
                      <input
                        type="text"
                        value={testimonial.improvement}
                        onChange={(e) => updateArrayItem('success', 'testimonials', index, 'improvement', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Improvement (e.g., +1.5)"
                      />
                    </div>
                    <textarea
                      value={testimonial.content}
                      onChange={(e) => updateArrayItem('success', 'testimonials', index, 'content', e.target.value)}
                      className="w-full p-2 border rounded h-20"
                      placeholder="Testimonial content..."
                    />
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
          onClick={saveTestPrepContent}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Test Preparation Content'}
        </button>
      </div>
    </div>
  );
}
