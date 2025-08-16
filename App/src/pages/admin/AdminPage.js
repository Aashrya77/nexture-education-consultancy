"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function AdminHomepagePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const [homepageContent, setHomepageContent] = useState({
    hero: {
      title: "",
      subtitle: "",
      description: "",
      primaryButtonText: "",
      secondaryButtonText: "",
    },
    stats: [
      { number: "", label: "", icon: "" },
      { number: "", label: "", icon: "" },
      { number: "", label: "", icon: "" },
      { number: "", label: "", icon: "" },
    ],
    features: [],
    testimonials: [],
    destinations: [],
    courses: [],
  })

  useEffect(() => {
    fetchHomepageContent()
  }, [])

  const fetchHomepageContent = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await axios.get("/api/homepage-content", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data) {
        setHomepageContent(response.data)
      }
    } catch (error) {
      console.error("Error fetching homepage content:", error)
      setMessage("Error loading content")
      loadDefaultContent()
    } finally {
      setLoading(false)
    }
  }

  const loadDefaultContent = () => {
    setHomepageContent({
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
          description: "Get personalized guidance from our experienced education consultants.",
          icon: "🎯",
          highlights: ["One-on-one sessions", "Career guidance", "University selection"],
        },
        {
          title: "Global University Network",
          description: "Access our extensive network of top-ranked universities worldwide.",
          icon: "🌐",
          highlights: ["150+ partner universities", "Direct admissions", "Scholarship opportunities"],
        },
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          university: "Harvard University",
          course: "MBA",
          country: "🇺🇸 USA",
          quote: "Nexture Education made my dream of studying at Harvard a reality.",
          rating: 5,
        },
      ],
      destinations: [
        { name: "United States", flag: "🇺🇸", universities: "500+", popular: "MIT, Harvard, Stanford" },
        { name: "United Kingdom", flag: "🇬🇧", universities: "200+", popular: "Oxford, Cambridge, LSE" },
      ],
      courses: [
        { name: "IELTS", duration: "8 weeks", price: "₹15,000", rating: 4.8, students: "500+" },
        { name: "TOEFL", duration: "10 weeks", price: "₹18,000", rating: 4.9, students: "300+" },
      ],
    })
  }

  const saveHomepageContent = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem("token")
      await axios.put("/api/homepage-content", homepageContent, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setMessage("Homepage content updated successfully!")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      console.error("Error saving homepage content:", error)
      setMessage("Error saving content")
    } finally {
      setSaving(false)
    }
  }

  const updateHeroField = (field, value) => {
    setHomepageContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }))
  }

  const updateStatField = (index, field, value) => {
    setHomepageContent((prev) => {
      const newStats = [...prev.stats]
      newStats[index] = { ...newStats[index], [field]: value }
      return { ...prev, stats: newStats }
    })
  }

  const updateFeatureField = (index, field, value) => {
    setHomepageContent((prev) => {
      const newFeatures = [...prev.features]
      if (field === "highlights") {
        newFeatures[index] = { ...newFeatures[index], [field]: value.split(",").map((h) => h.trim()) }
      } else {
        newFeatures[index] = { ...newFeatures[index], [field]: value }
      }
      return { ...prev, features: newFeatures }
    })
  }

  const addFeature = () => {
    setHomepageContent((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        {
          title: "",
          description: "",
          icon: "",
          highlights: [],
        },
      ],
    }))
  }

  const removeFeature = (index) => {
    setHomepageContent((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading homepage content...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Homepage Content Management</h1>
        <p className="text-gray-600">Update the content that appears on your website's homepage</p>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
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
                onChange={(e) => updateHeroField("title", e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Your Next Step to a Bright Future"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={homepageContent.hero.subtitle}
                onChange={(e) => updateHeroField("subtitle", e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Your Trusted Education Partner"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={homepageContent.hero.description}
                onChange={(e) => updateHeroField("description", e.target.value)}
                className="w-full p-3 border rounded-lg h-24"
                placeholder="Expert guidance for study abroad and test preparation..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Button Text</label>
              <input
                type="text"
                value={homepageContent.hero.primaryButtonText}
                onChange={(e) => updateHeroField("primaryButtonText", e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Get Free Consultation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
              <input
                type="text"
                value={homepageContent.hero.secondaryButtonText}
                onChange={(e) => updateHeroField("secondaryButtonText", e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Explore Destinations"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homepageContent.stats.map((stat, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h4 className="font-medium mb-2">Stat {index + 1}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => updateStatField(index, "number", e.target.value)}
                    className="p-2 border rounded"
                    placeholder="5000+"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStatField(index, "label", e.target.value)}
                    className="p-2 border rounded"
                    placeholder="Students Placed"
                  />
                  <input
                    type="text"
                    value={stat.icon}
                    onChange={(e) => updateStatField(index, "icon", e.target.value)}
                    className="p-2 border rounded"
                    placeholder="🎓"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Features</h2>
            <button onClick={addFeature} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Feature
            </button>
          </div>

          {homepageContent.features.map((feature, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Feature {index + 1}</h4>
                <button onClick={() => removeFeature(index)} className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeatureField(index, "title", e.target.value)}
                  className="p-2 border rounded"
                  placeholder="Feature Title"
                />
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => updateFeatureField(index, "icon", e.target.value)}
                  className="p-2 border rounded"
                  placeholder="🎯"
                />
                <input
                  type="text"
                  value={feature.highlights ? feature.highlights.join(", ") : ""}
                  onChange={(e) => updateFeatureField(index, "highlights", e.target.value)}
                  className="p-2 border rounded"
                  placeholder="Highlight 1, Highlight 2, Highlight 3"
                />
              </div>
              <textarea
                value={feature.description}
                onChange={(e) => updateFeatureField(index, "description", e.target.value)}
                className="w-full p-2 border rounded h-20"
                placeholder="Feature description..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={saveHomepageContent}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Homepage Content"}
        </button>
      </div>
    </div>
  )
}
