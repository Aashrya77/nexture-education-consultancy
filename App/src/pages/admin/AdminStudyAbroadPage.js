import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../../config';

export default function AdminStudyAbroadPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [studyAbroadContent, setStudyAbroadContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: '',
      backgroundImage: ''
    },
    overview: {
      title: '',
      content: '',
      benefits: ['', '', '', '']
    },
    destinations: {
      title: '',
      subtitle: '',
      featured: [
        { country: '', description: '', highlights: ['', '', ''], image: '' },
        { country: '', description: '', highlights: ['', '', ''], image: '' },
        { country: '', description: '', highlights: ['', '', ''], image: '' },
        { country: '', description: '', highlights: ['', '', ''], image: '' }
      ]
    },
    process: {
      title: '',
      subtitle: '',
      steps: [
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' }
      ]
    },
    requirements: {
      title: '',
      general: ['', '', '', ''],
      documents: ['', '', '', '', '']
    },
    faq: {
      title: '',
      items: [
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' },
        { question: '', answer: '' }
      ]
    }
  });

  useEffect(() => {
    fetchStudyAbroadContent();
  }, []);

  const fetchStudyAbroadContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/admin/study-abroad-content`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data) {
        setStudyAbroadContent(response.data);
      }
    } catch (error) {
      console.error('Error fetching study abroad content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveStudyAbroadContent = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.put(`${base_url}/api/admin/study-abroad-content`, studyAbroadContent, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setMessage('Study Abroad content updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving study abroad content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (section, field, value, index = null) => {
    setStudyAbroadContent(prev => {
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
    setStudyAbroadContent(prev => {
      const updated = { ...prev };
      if (subIndex !== null) {
        updated[section][field][index][itemField][subIndex] = value;
      } else {
        updated[section][field][index][itemField] = value;
      }
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading study abroad content...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Abroad Content Management</h1>
        <p className="text-gray-600">Update the content for the Study Abroad page</p>
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
                value={studyAbroadContent.hero.title}
                onChange={(e) => updateNestedField('hero', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Study Abroad with Confidence"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={studyAbroadContent.hero.subtitle}
                onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Your gateway to global education"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={studyAbroadContent.hero.description}
                onChange={(e) => updateNestedField('hero', 'description', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Compelling description about study abroad opportunities..."
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
                value={studyAbroadContent.overview.title}
                onChange={(e) => updateNestedField('overview', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Why Study Abroad?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={studyAbroadContent.overview.content}
                onChange={(e) => updateNestedField('overview', 'content', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Detailed overview of study abroad benefits and opportunities..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Key Benefits (4 items)</label>
              {studyAbroadContent.overview.benefits.map((benefit, index) => (
                <input
                  key={index}
                  type="text"
                  value={benefit}
                  onChange={(e) => updateNestedField('overview', 'benefits', e.target.value, index)}
                  className="w-full p-3 border rounded-lg mb-2"
                  placeholder={`Benefit ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={studyAbroadContent.destinations.title}
                  onChange={(e) => updateNestedField('destinations', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Popular Study Destinations"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={studyAbroadContent.destinations.subtitle}
                  onChange={(e) => updateNestedField('destinations', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Choose your ideal destination"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Featured Destinations (4 countries)</label>
              {studyAbroadContent.destinations.featured.map((destination, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Destination {index + 1}</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={destination.country}
                        onChange={(e) => updateArrayItem('destinations', 'featured', index, 'country', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Country Name"
                      />
                      <input
                        type="text"
                        value={destination.image}
                        onChange={(e) => updateArrayItem('destinations', 'featured', index, 'image', e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Image URL"
                      />
                    </div>
                    <textarea
                      value={destination.description}
                      onChange={(e) => updateArrayItem('destinations', 'featured', index, 'description', e.target.value)}
                      className="w-full p-2 border rounded h-20"
                      placeholder="Country description..."
                    />
                    <div>
                      <label className="block text-sm font-medium mb-2">Key Highlights (3 items)</label>
                      {destination.highlights.map((highlight, hIndex) => (
                        <input
                          key={hIndex}
                          type="text"
                          value={highlight}
                          onChange={(e) => updateArrayItem('destinations', 'featured', index, 'highlights', e.target.value, hIndex)}
                          className="w-full p-2 border rounded mb-1"
                          placeholder={`Highlight ${hIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Application Process</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={studyAbroadContent.process.title}
                  onChange={(e) => updateNestedField('process', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Our Process"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={studyAbroadContent.process.subtitle}
                  onChange={(e) => updateNestedField('process', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Step-by-step guidance"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Process Steps (5 steps)</label>
              {studyAbroadContent.process.steps.map((step, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Step {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateArrayItem('process', 'steps', index, 'title', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Step Title"
                    />
                    <input
                      type="text"
                      value={step.icon}
                      onChange={(e) => updateArrayItem('process', 'steps', index, 'icon', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Icon (emoji or class)"
                    />
                    <textarea
                      value={step.description}
                      onChange={(e) => updateArrayItem('process', 'steps', index, 'description', e.target.value)}
                      className="p-2 border rounded h-20 md:col-span-3"
                      placeholder="Step description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={studyAbroadContent.requirements.title}
                onChange={(e) => updateNestedField('requirements', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="General Requirements"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">General Requirements (4 items)</label>
              {studyAbroadContent.requirements.general.map((req, index) => (
                <input
                  key={index}
                  type="text"
                  value={req}
                  onChange={(e) => updateNestedField('requirements', 'general', e.target.value, index)}
                  className="w-full p-3 border rounded-lg mb-2"
                  placeholder={`Requirement ${index + 1}`}
                />
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Required Documents (5 items)</label>
              {studyAbroadContent.requirements.documents.map((doc, index) => (
                <input
                  key={index}
                  type="text"
                  value={doc}
                  onChange={(e) => updateNestedField('requirements', 'documents', e.target.value, index)}
                  className="w-full p-3 border rounded-lg mb-2"
                  placeholder={`Document ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">FAQ Section Title</label>
              <input
                type="text"
                value={studyAbroadContent.faq.title}
                onChange={(e) => updateNestedField('faq', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Frequently Asked Questions"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">FAQ Items (5 questions)</label>
              {studyAbroadContent.faq.items.map((faq, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">FAQ {index + 1}</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateArrayItem('faq', 'items', index, 'question', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Question"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateArrayItem('faq', 'items', index, 'answer', e.target.value)}
                      className="w-full p-2 border rounded h-20"
                      placeholder="Answer..."
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
          onClick={saveStudyAbroadContent}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Study Abroad Content'}
        </button>
      </div>
    </div>
  );
}
