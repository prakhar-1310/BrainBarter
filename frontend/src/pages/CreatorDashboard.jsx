import React, { useState } from 'react';
import { Upload, TrendingUp, Eye, Coins, Star, Plus, Video, FileText, BarChart3, DollarSign, Users, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export function CreatorDashboard() {
  const { user } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    topic: '',
    difficulty: 'Beginner',
    description: '',
    cost: 10,
    type: 'video',
    file: null
  });

  // Mock creator stats
  const stats = {
    totalEarnings: 12450,
    thisMonthEarnings: 3240,
    totalViews: 45632,
    totalContent: 23,
    avgRating: 4.7,
    totalRatings: 892,
    engagement: 87
  };

  // Mock content list
  const myContent = [
    {
      id: '1',
      title: 'Dynamic Programming Fundamentals',
      type: 'video',
      subject: 'Data Structures',
      uploadDate: '2025-01-15',
      views: 2847,
      earnings: 640,
      rating: 4.8,
      status: 'published'
    },
    {
      id: '2',
      title: 'Graph Algorithms Complete Guide',
      type: 'video',
      subject: 'Algorithms',
      uploadDate: '2025-01-10',
      views: 3421,
      earnings: 820,
      rating: 4.9,
      status: 'published'
    },
    {
      id: '3',
      title: 'Binary Search Trees Explained',
      type: 'video',
      subject: 'Data Structures',
      uploadDate: '2025-01-05',
      views: 1923,
      earnings: 450,
      rating: 4.6,
      status: 'published'
    },
    {
      id: '4',
      title: 'Advanced SQL Queries',
      type: 'notes',
      subject: 'Database Systems',
      uploadDate: '2025-01-20',
      views: 856,
      earnings: 180,
      rating: 4.5,
      status: 'under_review'
    }
  ];

  // Mock earnings history
  const earningsHistory = [
    { month: 'Jan', earnings: 3240, views: 12543 },
    { month: 'Dec', earnings: 2890, views: 11234 },
    { month: 'Nov', earnings: 2150, views: 9876 },
    { month: 'Oct', earnings: 1980, views: 8765 },
    { month: 'Sep', earnings: 2190, views: 10234 }
  ];

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log('Upload submitted:', uploadForm);
    setShowUploadModal(false);
    // Reset form
    setUploadForm({
      title: '',
      subject: '',
      topic: '',
      difficulty: 'Beginner',
      description: '',
      cost: 10,
      type: 'video',
      file: null
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm({ ...uploadForm, file });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
              <p className="text-indigo-100">Welcome back, {user?.name || 'Creator'}! 🎨</p>
            </div>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="bg-white text-indigo-600 hover:bg-indigo-50"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Upload Content
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">Total Earnings</p>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+₹{stats.thisMonthEarnings} this month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">Total Views</p>
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{stats.totalContent} content pieces</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">Avg Rating</p>
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
              <p className="text-sm text-gray-500 mt-1">{stats.totalRatings} ratings</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600 text-sm">Engagement</p>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.engagement}%</p>
              <p className="text-sm text-gray-500 mt-1">Above average</p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Earnings Overview</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                  <span className="text-gray-600">Earnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-400 rounded"></div>
                  <span className="text-gray-600">Views</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4">
              {earningsHistory.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end gap-1 mb-2" style={{ height: '200px' }}>
                    <div
                      className="flex-1 bg-indigo-600 rounded-t transition-all hover:bg-indigo-700"
                      style={{ height: `${(item.earnings / 4000) * 100}%` }}
                      title={`₹${item.earnings}`}
                    ></div>
                    <div
                      className="flex-1 bg-purple-400 rounded-t transition-all hover:bg-purple-500"
                      style={{ height: `${(item.views / 15000) * 100}%` }}
                      title={`${item.views} views`}
                    ></div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{item.month}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Split Info */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Revenue Split</h3>
                <p className="text-gray-700 mb-4">Your earning breakdown per content unlock</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-600 text-sm">Creator (You)</p>
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-3xl font-bold text-indigo-600">60%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-600 text-sm mb-2">Platform</p>
                    <p className="text-2xl font-bold text-gray-700">15%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-600 text-sm mb-2">AI R&D</p>
                    <p className="text-2xl font-bold text-gray-700">25%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Content */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Content</h2>
            <div className="space-y-4">
              {myContent.map((content) => (
                <div
                  key={content.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    content.type === 'video' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {content.type === 'video' ? (
                      <Video className={`w-6 h-6 ${content.type === 'video' ? 'text-red-600' : 'text-blue-600'}`} />
                    ) : (
                      <FileText className="w-6 h-6 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{content.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        content.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {content.status === 'published' ? 'Published' : 'Under Review'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{content.subject}</span>
                      <span>•</span>
                      <span>Uploaded {content.uploadDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <div className="flex items-center gap-1 text-gray-900 font-semibold mb-1">
                        <Eye className="w-4 h-4" />
                        {content.views.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-green-600 font-semibold mb-1">
                        <DollarSign className="w-4 h-4" />
                        {content.earnings}
                      </div>
                      <p className="text-xs text-gray-500">Earned</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-yellow-600 font-semibold mb-1">
                        <Star className="w-4 h-4" />
                        {content.rating}
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Analytics
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-screen pt-20 pb-8 px-4 flex items-center justify-center">
            <Card className="max-w-2xl w-full my-8">
              <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Upload New Content</h2>
              <form onSubmit={handleUploadSubmit} className="space-y-6">
                {/* Content Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content Type
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setUploadForm({ ...uploadForm, type: 'video' })}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        uploadForm.type === 'video'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Video className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <p className="font-semibold">Video</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadForm({ ...uploadForm, type: 'notes' })}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        uploadForm.type === 'notes'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <p className="font-semibold">Notes</p>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    placeholder="e.g., Dynamic Programming Fundamentals"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                {/* Subject and Topic */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadForm.subject}
                      onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                      placeholder="e.g., Data Structures"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Topic *
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadForm.topic}
                      onChange={(e) => setUploadForm({ ...uploadForm, topic: e.target.value })}
                      placeholder="e.g., Dynamic Programming"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Difficulty and Cost */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={uploadForm.difficulty}
                      onChange={(e) => setUploadForm({ ...uploadForm, difficulty: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Token Cost *
                    </label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="50"
                      value={uploadForm.cost}
                      onChange={(e) => setUploadForm({ ...uploadForm, cost: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">You'll earn 60% (₹{(uploadForm.cost * 0.6).toFixed(1)})</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Describe what students will learn..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  ></textarea>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload File *
                  </label>
                  <label className="block">
                    <input
                      type="file"
                      accept={uploadForm.type === 'video' ? 'video/*' : '.pdf'}
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 cursor-pointer transition-colors">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-700 font-medium mb-1">
                        {uploadForm.file ? uploadForm.file.name : `Click to upload ${uploadForm.type}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {uploadForm.type === 'video' ? 'MP4, AVI, MOV up to 500MB' : 'PDF up to 10MB'}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Content
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          </div>
        </div>
      )}
    </div>
  );
}
