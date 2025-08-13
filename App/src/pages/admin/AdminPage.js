import React from 'react';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">5,000+</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Active Courses</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">25</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Success Rate</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">95%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Countries</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">50+</p>
        </div>
      </div>
    </div>
  );
}
