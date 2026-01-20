import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, FileText, BarChart3, Settings } from 'lucide-react';

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        {/* Admin Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">567</p>
              </div>
              <FileText className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8,901</p>
              </div>
              <BarChart3 className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Health</p>
                <p className="text-2xl font-bold text-green-600 mt-1">99.9%</p>
              </div>
              <Settings className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <Users className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage all users</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <FileText className="w-6 h-6 text-green-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Review Content</h3>
              <p className="text-sm text-gray-600">Approve pending content</p>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <Settings className="w-6 h-6 text-purple-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Platform Settings</h3>
              <p className="text-sm text-gray-600">Configure system settings</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { type: 'user', action: 'New user registered', time: '2 mins ago' },
              { type: 'content', action: 'Content uploaded by Creator', time: '15 mins ago' },
              { type: 'transaction', action: 'Purchase completed', time: '1 hour ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-700' :
                  activity.type === 'content' ? 'bg-green-100 text-green-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
