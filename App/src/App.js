import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StudyAbroadPage from './pages/StudyAbroadPage';
import PreparationClassesPage from './pages/PreparationClassesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ConsultationPage from './pages/ConsultationPage';
import LoginPage from './pages/auth/LoginPage';

// Import admin pages
import AdminPage from './pages/admin/AdminPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminContactsPage from './pages/admin/AdminContactsPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminCountriesPage from './pages/admin/AdminCountriesPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';

// Import auth pages
import SignupPage from './pages/auth/SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/preparation-classes" element={<PreparationClassesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Auth routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="blog" element={<AdminBlogPage />} />
            <Route path="contacts" element={<AdminContactsPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="countries" element={<AdminCountriesPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
