import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Import pages
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import StudyAbroadPage from './pages/StudyAbroadPage';
import PreparationClassesPage from './pages/PreparationClassesPage';
import BlogPage from './pages/Blogs/BlogPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ConsultationPage from './pages/ConsultationPage';
import LoginPage from './pages/Auth/Login/LoginPage';
import RegisterPage from './pages/Auth/Register/RegisterPage';
import Uni from './pages/Country/Uni';

// Import admin pages
import AdminPage from './pages/admin/AdminPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminTeamPage from './pages/admin/AdminTeamPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AdminContactsPage from './pages/admin/AdminContactsPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminCountriesPage from './pages/admin/AdminCountriesPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import AdminHomepagePage from './pages/admin/AdminHome/AdminHomepagePage';

// Import layout
import PublicLayout from './components/PublicLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes wrapped with PublicLayout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="study-abroad" element={<StudyAbroadPage />} />
            <Route path="preparation-classes" element={<PreparationClassesPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="consultation" element={<ConsultationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="uni/:country" element={<Uni />} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="homepage" element={<AdminHomepagePage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="team" element={<AdminTeamPage />} />
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
