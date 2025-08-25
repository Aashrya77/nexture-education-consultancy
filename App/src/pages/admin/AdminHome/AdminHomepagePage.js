import React, { use, useEffect } from "react";
import "./AdminHome.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import base_url from "../../../config";
const AdminHomepagePage = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    highlight: "",
    description: "",
    images: [],
  });
  const [id, setId] = React.useState({}); // Replace with your actual ID
  const getHomepageData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/home`);
      setId(response.data.data[0]._id);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

  useEffect(() => {
    getHomepageData();
  }, []);
     

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      data.append("title", formData.title);
      data.append("highlight", formData.highlight);
      data.append("description", formData.description);

      // Append file if selected
      if (formData.heroImage) {
        data.append("images", formData.heroImage);
      }

      // Send request
      const response = await axios.put(
        `${base_url}/api/home/update/${id}`,
        data,
      );

      if (response.status === 200) {
        alert("Homepage content updated successfully!");
      }
    } catch (error) {
      console.error(
        "Error updating homepage content:",
        error.response || error
      );
      alert("Failed to update homepage content. Please try again later.");
    }

    console.log("Saving Content", formData);
  };

  return (
    <>
      <div className="edit-form-container">
        <div className="form-header">
          <h2 className="form-title">Edit Home Page</h2>
          <p className="form-subtitle">
            Customize your homepage content and appearance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="input-group">
            {/* <label className="input-label">
            Tagline
          </label>
          <input 
            type="text" 
            name="tagline" 
            placeholder="Your catchy tagline here..." 
            onChange={handleChange}
            value={formData.tagline}
            className="form-input"
          /> */}
          </div>

          <div className="input-group">
            <label className="input-label">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Main page title"
              onChange={handleChange}
              value={formData.title}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Highlight</label>
            <input
              type="text"
              name="highlight"
              placeholder="Key highlight or feature"
              onChange={handleChange}
              value={formData.highlight}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              name="description"
              placeholder="Detailed description of your services or mission..."
              onChange={handleChange}
              value={formData.description}
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Hero Image</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                name="heroImage"
                onChange={handleChange}
                className="file-input"
                accept="image/*"
                id="heroImage"
              />
              <label htmlFor="heroImage" className="file-upload-label">
                {formData.heroImage
                  ? formData.heroImage.name
                  : "Choose image file"}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminHomepagePage;
