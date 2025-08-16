import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../../config';

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [contactContent, setContactContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    contactInfo: {
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      phone: {
        primary: '',
        secondary: '',
        whatsapp: ''
      },
      email: {
        general: '',
        admissions: '',
        support: ''
      },
      socialMedia: {
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        youtube: ''
      }
    },
    officeHours: {
      title: '',
      weekdays: {
        days: '',
        hours: ''
      },
      saturday: {
        days: '',
        hours: ''
      },
      sunday: {
        days: '',
        hours: ''
      },
      note: ''
    },
    locations: {
      title: '',
      subtitle: '',
      offices: [
        { name: '', address: '', phone: '', email: '', hours: '', mapUrl: '' },
        { name: '', address: '', phone: '', email: '', hours: '', mapUrl: '' }
      ]
    },
    emergencyContact: {
      title: '',
      phone: '',
      email: '',
      hours: '',
      note: ''
    }
  });

  useEffect(() => {
    fetchContactContent();
  }, []);

  const fetchContactContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${base_url}/api/admin/contact-content`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data) {
        setContactContent(response.data);
      }
    } catch (error) {
      console.error('Error fetching contact content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveContactContent = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      await axios.put(`${base_url}/api/admin/contact-content`, contactContent, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setMessage('Contact information updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving contact content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (section, subsection, field, value) => {
    setContactContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const updateSimpleField = (section, field, value) => {
    setContactContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (section, field, index, itemField, value) => {
    setContactContent(prev => {
      const updated = { ...prev };
      updated[section][field][index][itemField] = value;
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading contact information...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Information Management</h1>
        <p className="text-gray-600">Update your company's contact details and office information</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Contact Page Header</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                value={contactContent.hero.title}
                onChange={(e) => updateSimpleField('hero', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Get in Touch"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={contactContent.hero.subtitle}
                onChange={(e) => updateSimpleField('hero', 'subtitle', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="We're here to help you succeed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={contactContent.hero.description}
                onChange={(e) => updateSimpleField('hero', 'description', e.target.value)}
                className="w-full p-3 border rounded-lg h-24"
                placeholder="Contact us for any questions about our services..."
              />
            </div>
          </div>
        </div>

        {/* Main Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Primary Contact Information</h2>
          
          {/* Address */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  value={contactContent.contactInfo.address.street}
                  onChange={(e) => updateNestedField('contactInfo', 'address', 'street', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={contactContent.contactInfo.address.city}
                  onChange={(e) => updateNestedField('contactInfo', 'address', 'city', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Kathmandu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State/Province</label>
                <input
                  type="text"
                  value={contactContent.contactInfo.address.state}
                  onChange={(e) => updateNestedField('contactInfo', 'address', 'state', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Bagmati"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
                <input
                  type="text"
                  value={contactContent.contactInfo.address.zipCode}
                  onChange={(e) => updateNestedField('contactInfo', 'address', 'zipCode', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="44600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  value={contactContent.contactInfo.address.country}
                  onChange={(e) => updateNestedField('contactInfo', 'address', 'country', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Nepal"
                />
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Phone Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Primary Phone</label>
                <input
                  type="tel"
                  value={contactContent.contactInfo.phone.primary}
                  onChange={(e) => updateNestedField('contactInfo', 'phone', 'primary', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="+977-1-4567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Phone</label>
                <input
                  type="tel"
                  value={contactContent.contactInfo.phone.secondary}
                  onChange={(e) => updateNestedField('contactInfo', 'phone', 'secondary', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="+977-1-4567891"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <input
                  type="tel"
                  value={contactContent.contactInfo.phone.whatsapp}
                  onChange={(e) => updateNestedField('contactInfo', 'phone', 'whatsapp', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="+977-9812345678"
                />
              </div>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Email Addresses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">General Inquiries</label>
                <input
                  type="email"
                  value={contactContent.contactInfo.email.general}
                  onChange={(e) => updateNestedField('contactInfo', 'email', 'general', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="info@nexture.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Admissions</label>
                <input
                  type="email"
                  value={contactContent.contactInfo.email.admissions}
                  onChange={(e) => updateNestedField('contactInfo', 'email', 'admissions', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="admissions@nexture.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Support</label>
                <input
                  type="email"
                  value={contactContent.contactInfo.email.support}
                  onChange={(e) => updateNestedField('contactInfo', 'email', 'support', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="support@nexture.com"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-medium mb-3">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <input
                  type="url"
                  value={contactContent.contactInfo.socialMedia.facebook}
                  onChange={(e) => updateNestedField('contactInfo', 'socialMedia', 'facebook', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://facebook.com/nexture"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <input
                  type="url"
                  value={contactContent.contactInfo.socialMedia.instagram}
                  onChange={(e) => updateNestedField('contactInfo', 'socialMedia', 'instagram', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://instagram.com/nexture"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={contactContent.contactInfo.socialMedia.linkedin}
                  onChange={(e) => updateNestedField('contactInfo', 'socialMedia', 'linkedin', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://linkedin.com/company/nexture"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <input
                  type="url"
                  value={contactContent.contactInfo.socialMedia.twitter}
                  onChange={(e) => updateNestedField('contactInfo', 'socialMedia', 'twitter', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://twitter.com/nexture"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">YouTube</label>
                <input
                  type="url"
                  value={contactContent.contactInfo.socialMedia.youtube}
                  onChange={(e) => updateNestedField('contactInfo', 'socialMedia', 'youtube', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://youtube.com/nexture"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Office Hours</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={contactContent.officeHours.title}
                onChange={(e) => updateSimpleField('officeHours', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Office Hours"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Weekdays</h3>
                <input
                  type="text"
                  value={contactContent.officeHours.weekdays.days}
                  onChange={(e) => updateNestedField('officeHours', 'weekdays', 'days', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Monday - Friday"
                />
                <input
                  type="text"
                  value={contactContent.officeHours.weekdays.hours}
                  onChange={(e) => updateNestedField('officeHours', 'weekdays', 'hours', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="9:00 AM - 6:00 PM"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Saturday</h3>
                <input
                  type="text"
                  value={contactContent.officeHours.saturday.days}
                  onChange={(e) => updateNestedField('officeHours', 'saturday', 'days', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Saturday"
                />
                <input
                  type="text"
                  value={contactContent.officeHours.saturday.hours}
                  onChange={(e) => updateNestedField('officeHours', 'saturday', 'hours', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="10:00 AM - 4:00 PM"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Sunday</h3>
                <input
                  type="text"
                  value={contactContent.officeHours.sunday.days}
                  onChange={(e) => updateNestedField('officeHours', 'sunday', 'days', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Sunday"
                />
                <input
                  type="text"
                  value={contactContent.officeHours.sunday.hours}
                  onChange={(e) => updateNestedField('officeHours', 'sunday', 'hours', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Closed"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Additional Note</label>
              <textarea
                value={contactContent.officeHours.note}
                onChange={(e) => updateSimpleField('officeHours', 'note', e.target.value)}
                className="w-full p-3 border rounded-lg h-20"
                placeholder="Holiday hours may vary. Please call ahead."
              />
            </div>
          </div>
        </div>

        {/* Multiple Locations */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Office Locations</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Title</label>
                <input
                  type="text"
                  value={contactContent.locations.title}
                  onChange={(e) => updateSimpleField('locations', 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Our Locations"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={contactContent.locations.subtitle}
                  onChange={(e) => updateSimpleField('locations', 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Visit us at any of our convenient locations"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-4">Office Locations (2 offices)</label>
              {contactContent.locations.offices.map((office, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Office {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={office.name}
                      onChange={(e) => updateArrayItem('locations', 'offices', index, 'name', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Office Name (e.g., Main Branch)"
                    />
                    <input
                      type="text"
                      value={office.phone}
                      onChange={(e) => updateArrayItem('locations', 'offices', index, 'phone', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Phone Number"
                    />
                    <input
                      type="email"
                      value={office.email}
                      onChange={(e) => updateArrayItem('locations', 'offices', index, 'email', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Office Email"
                    />
                    <input
                      type="text"
                      value={office.hours}
                      onChange={(e) => updateArrayItem('locations', 'offices', index, 'hours', e.target.value)}
                      className="p-2 border rounded"
                      placeholder="Office Hours"
                    />
                    <textarea
                      value={office.address}
                      onChange={(e) => updateArrayItem('locations', 'offices', index, 'address', e.target.value)}
                      className="p-2 border rounded h-20 md:col-span-2"
                      placeholder="Full address..."
                    />
                    <input
                      type="url"
                      value={office.mapUrl}
                      onChange={(e) => updateArrayItem('locations', 'offices', index, 'mapUrl', e.target.value)}
                      className="p-2 border rounded md:col-span-2"
                      placeholder="Google Maps URL (optional)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={contactContent.emergencyContact.title}
                onChange={(e) => updateSimpleField('emergencyContact', 'title', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Emergency Contact"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Emergency Phone</label>
                <input
                  type="tel"
                  value={contactContent.emergencyContact.phone}
                  onChange={(e) => updateSimpleField('emergencyContact', 'phone', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="+977-9812345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Emergency Email</label>
                <input
                  type="email"
                  value={contactContent.emergencyContact.email}
                  onChange={(e) => updateSimpleField('emergencyContact', 'email', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="emergency@nexture.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Emergency Hours</label>
              <input
                type="text"
                value={contactContent.emergencyContact.hours}
                onChange={(e) => updateSimpleField('emergencyContact', 'hours', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="24/7 for urgent matters"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Emergency Contact Note</label>
              <textarea
                value={contactContent.emergencyContact.note}
                onChange={(e) => updateSimpleField('emergencyContact', 'note', e.target.value)}
                className="w-full p-3 border rounded-lg h-20"
                placeholder="For urgent matters outside office hours..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={saveContactContent}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Contact Information'}
        </button>
      </div>
    </div>
  );
}
