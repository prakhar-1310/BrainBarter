import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { userAPI } from '../services/api';
import { GraduationCap, Video, Shield } from 'lucide-react';

export function RoleSelection() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Admin email check
  const adminEmail = 'prakharshahi9935@gmail.com';
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdminEmail = userEmail === adminEmail;

  // Redirect if user is already onboarded
  React.useEffect(() => {
    if (user?.publicMetadata?.onboarded) {
      const role = user.publicMetadata?.role || 'student';
      if (role === 'creator') {
        navigate('/creator-dashboard', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/student-dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  // If user is admin, auto-select admin role
  React.useEffect(() => {
    if (isAdminEmail && !selectedRole) {
      setSelectedRole('admin');
    }
  }, [isAdminEmail, selectedRole]);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Browse content, purchase with tokens, get AI exam predictions',
      features: ['Access premium content', 'AI exam predictions', 'Token wallet', 'Track your learning']
    },
    {
      id: 'creator',
      title: 'Creator',
      icon: Video,
      description: 'Upload content and earn 60% from each sale',
      features: ['Upload videos & notes', 'Earn tokens (60%)', 'Track analytics', 'Build your audience']
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Shield,
      description: 'Full platform control and management capabilities',
      features: ['Manage all users', 'Monitor platform', 'Content moderation', 'System analytics']
    }
  ];

  // Show admin role only for admin email
  const availableRoles = isAdminEmail ? roles : roles.filter(role => role.id !== 'admin');

  const handleRoleSelect = async (roleOverride = null) => {
    const roleToSet = roleOverride || selectedRole;
    
    if (!roleToSet) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting to set role:', roleToSet);
      console.log('User email:', user?.primaryEmailAddress?.emailAddress);
      
      // Update role via backend API (backend updates Clerk metadata)
      const response = await userAPI.onboard({ role: roleToSet });
      console.log('Backend response:', response);
      
      // Reload user to get fresh metadata from Clerk
      await user.reload();
      console.log('User reloaded, new metadata:', user.publicMetadata);

      // Redirect based on role
      if (roleToSet === 'creator') {
        navigate('/creator-dashboard');
      } else if (roleToSet === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      console.error('Role selection error:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Failed to set role. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BrainBarter!</h1>
          <p className="text-gray-600">Choose your role to get started</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className={`grid gap-6 mb-8 ${availableRoles.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {availableRoles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-purple-500' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-500 flex items-center">
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        isSelected ? 'bg-purple-500' : 'bg-gray-400'
                      }`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <span className="text-sm font-semibold text-purple-600">Selected ✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => handleRoleSelect()}
            disabled={loading || !selectedRole}
            className={`px-8 py-3 rounded-lg font-semibold text-white transition-all ${
              loading || !selectedRole
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? 'Setting up...' : 'Continue'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          You can always change your role later in settings
        </p>
      </div>
    </div>
  );
}
