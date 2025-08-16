import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../../config';

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [aboutContent, setAboutContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    mission: {
      title: '',
      content: ''
    },
    vision: {
      title: '',
      content: ''
    },
    values: {
      title: '',
      items: [
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' },
        { title: '', description: '', icon: '' }
      ]
    },
    story: {
      title: '',
      content: '',
      foundedYear: new Date().getFullYear(),
      founderName: ''
    },
    achievements: {
      title: '',
      items: [
        { metric: '', value: '', description: '' },
        { metric: '', value: '', description: '' },
        { metric: '', value: '', description: '' },
        { metric: '', value: '', description: '' }
      ]
    }
  });

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/admin/about-content`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data) {
        setAboutContent(response.data);
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveAboutContent = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.put(`${base_url}/api/admin/about-content`, aboutContent, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setMessage('About page content updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving about content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (section, field, value) => {
    setAboutContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (section, field, index, itemField, value) => {
    setAboutContent(prev => {
      const updated = { ...prev };
      updated[section][field][index][itemField] = value;
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading about page content...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Page Content Management</h1>
        <p className="text-gray-600">Update the content that appears on your website's about page</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">About Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                value={aboutContent.hero.title}
                onChange={(e) => updateNestedField('hero', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="About Nexture Education"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={aboutContent.hero.subtitle}
                onChange={(e) => updateNestedField('hero', 'subtitle', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Your trusted partner in education"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={aboutContent.hero.description}
                onChange={(e) => updateNestedField('hero', 'description', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Brief introduction about your company..."
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Mission</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mission Title</label>
              <input
                type="text"
                value={aboutContent.mission.title}
                onChange={(e) => updateNestedField('mission', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Our Mission"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mission Statement</label>
              <textarea
                value={aboutContent.mission.content}
                onChange={(e) => updateNestedField('mission', 'content', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Describe your company's mission and purpose..."
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Vision</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vision Title</label>
              <input
                type="text"
                value={aboutContent.vision.title}
                onChange={(e) => updateNestedField('vision', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Our Vision"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vision Statement</label>
              <textarea
                value={aboutContent.vision.content}
                onChange={(e) => updateNestedField('vision', 'content', e.target.value)}
                className="w-full p-3 border rounded-lg h-32"
                placeholder="Describe your company's vision for the future..."
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Core Values</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Values Section Title</label>
              <input
                type="text"
                value={aboutContent.values.title}
                onChange={(e) => updateNestedField('values', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Our Core Values"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Values (4 items)</label>
              {aboutContent.values.items.map((value, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Value {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => updateArrayItem('values', 'items', index, 'title', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Value Title"
                    />
                    <input
                      type="text"
                      value={value.icon}
                      onChange={(e) => updateArrayItem('values', 'items', index, 'icon', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Icon (emoji or class)"
                    />
                    <textarea
                      value={value.description}
                      onChange={(e) => updateArrayItem('values', 'items', index, 'description', e.target.value)}
                      className="p-2 border rounded h-20 md:col-span-3"
                      placeholder="Value description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Story Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Company Story</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Story Title</label>
              <input
                type="text"
                value={aboutContent.story.title}
                onChange={(e) => updateNestedField('story', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Our Story"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Founded Year</label>
                <input
                  type="number"
                  value={aboutContent.story.foundedYear}
                  onChange={(e) => updateNestedField('story', 'foundedYear', parseInt(e.target.value) || new Date().getFullYear())}
                  className="w-full p-3 border rounded-lg"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Founder Name</label>
                <input
                  type="text"
                  value={aboutContent.story.founderName}
                  onChange={(e) => updateNestedField('story', 'founderName', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Founder's Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company Story</label>
              <textarea
                value={aboutContent.story.content}
                onChange={(e) => updateNestedField('story', 'content', e.target.value)}
                className="w-full p-3 border rounded-lg h-40"
                placeholder="Tell the story of how your company was founded and has grown..."
              />
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Key Achievements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Achievements Section Title</label>
              <input
                type="text"
                value={aboutContent.achievements.title}
                onChange={(e) => updateNestedField('achievements', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Our Achievements"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Achievement Metrics (4 items)</label>
              {aboutContent.achievements.items.map((achievement, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Achievement {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={achievement.metric}
                      onChange={(e) => updateArrayItem('achievements', 'items', index, 'metric', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Metric Name"
                    />
                    <input
                      type="text"
                      value={achievement.value}
                      onChange={(e) => updateArrayItem('achievements', 'items', index, 'value', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Value (e.g., 500+, 95%)"
                    />
                    <input
                      type="text"
                      value={achievement.description}
                      onChange={(e) => updateArrayItem('achievements', 'items', index, 'description', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Description"
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
          onClick={saveAboutContent}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save About Page Content'}
        </button>
      </div>
    </div>
  );
}
