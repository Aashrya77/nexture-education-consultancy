import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const departments = [
    'counseling', 'admissions', 'visa-guidance', 'test-preparation',
    'marketing', 'operations', 'management'
  ];

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/team', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setTeamMembers(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (memberId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/team/${memberId}/toggle-active`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to toggle member status');
      setTeamMembers(teamMembers.map(member => 
        member._id === memberId ? { ...member, isActive: !currentStatus } : member
      ));
    } catch (error) {
      alert('Failed to update member status');
    }
  };

  const handleToggleVisible = async (memberId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/team/${memberId}/toggle-visible`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to toggle visibility');
      setTeamMembers(teamMembers.map(member => 
        member._id === memberId ? { ...member, isVisible: !currentStatus } : member
      ));
    } catch (error) {
      alert('Failed to update visibility');
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/team/${memberId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to delete team member');
      setTeamMembers(teamMembers.filter(member => member._id !== memberId));
    } catch (error) {
      alert('Failed to delete team member');
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || member.department === filterDepartment;
    const matchesStatus = filterStatus === '' || 
                         (filterStatus === 'active' && member.isActive) ||
                         (filterStatus === 'inactive' && !member.isActive) ||
                         (filterStatus === 'visible' && member.isVisible) ||
                         (filterStatus === 'hidden' && !member.isVisible);
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const TeamMemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {member.profileImage ? (
              <img src={member.profileImage} alt={member.fullName}
                className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{member.role}</p>
            
            <div className="flex items-center space-x-4 mb-3">
              <span className={`px-2 py-1 text-xs rounded-full ${
                member.department === 'counseling' ? 'bg-blue-100 text-blue-800' :
                member.department === 'admissions' ? 'bg-green-100 text-green-800' :
                member.department === 'visa-guidance' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {member.department.replace('-', ' ')}
              </span>
              
              {member.experience?.years && (
                <span className="text-xs text-gray-500">
                  {member.experience.years} years exp.
                </span>
              )}
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                <span className="truncate">{member.email}</span>
              </div>
              {member.phone && (
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <span>{member.phone}</span>
                </div>
              )}
            </div>

            {member.shortBio && (
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">{member.shortBio}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleToggleActive(member._id, member.isActive)}
              className={`flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                member.isActive 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              {member.isActive ? 'Active' : 'Inactive'}
            </button>
            
            <button
              onClick={() => handleToggleVisible(member._id, member.isVisible)}
              className={`flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                member.isVisible 
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {member.isVisible ? (
                <><EyeIcon className="h-3 w-3 mr-1" />Visible</>
              ) : (
                <><EyeSlashIcon className="h-3 w-3 mr-1" />Hidden</>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setEditingMember(member); setShowModal(true); }}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeleteMember(member._id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage your team members and their profiles</p>
        </div>
        <button
          onClick={() => { setEditingMember(null); setShowModal(true); }}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Team Member
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Members</p>
          <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active Members</p>
          <p className="text-2xl font-bold text-green-600">
            {teamMembers.filter(m => m.isActive).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Visible Members</p>
          <p className="text-2xl font-bold text-blue-600">
            {teamMembers.filter(m => m.isVisible).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Departments</p>
          <p className="text-2xl font-bold text-purple-600">
            {new Set(teamMembers.map(m => m.department)).size}
          </p>
        </div>
      </div>

      {/* Team Members Grid */}
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading team members: {error}</p>
          <button 
            onClick={fetchTeamMembers}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <TeamMemberCard key={member._id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No team members found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterDepartment || filterStatus 
              ? 'Try adjusting your filters or search terms.'
              : 'Get started by adding your first team member.'
            }
          </p>
        </div>
      )}

      {/* Team Member Modal - Simplified for now */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <p className="text-gray-600 mb-4">
                Team member management form will be implemented here.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
