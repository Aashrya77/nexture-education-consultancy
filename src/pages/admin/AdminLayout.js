import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            <div className="px-6 py-2">
              <Link to="/admin" className="block text-gray-700 hover:text-purple-600 py-2">
                Dashboard
              </Link>
              <Link to="/admin/content" className="block text-gray-700 hover:text-purple-600 py-2">
                Content
              </Link>
              <Link to="/admin/blog" className="block text-gray-700 hover:text-purple-600 py-2">
                Blog
              </Link>
              <Link to="/admin/testimonials" className="block text-gray-700 hover:text-purple-600 py-2">
                Testimonials
              </Link>
              <Link to="/admin/contacts" className="block text-gray-700 hover:text-purple-600 py-2">
                Contacts
              </Link>
              <Link to="/admin/settings" className="block text-gray-700 hover:text-purple-600 py-2">
                Settings
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
