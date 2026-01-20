import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Coins, Upload, Brain, TrendingUp, Play, Clock, 
  Star, BookOpen, FileText, Target, Zap, ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';

export function StudentDashboard() {
  const { user, tokens } = useAuth();
  const navigate = useNavigate();
  const [syllabusUploaded, setSyllabusUploaded] = useState(false);

  // Mock recommended content
  const recommendations = [
    {
      id: 1,
      title: "Data Structures Deep Dive - Arrays & Linked Lists",
      creator: "Priya Sharma",
      rating: 4.8,
      views: 2340,
      cost: 10,
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400",
      duration: "45 min",
      topic: "Data Structures"
    },
    {
      id: 2,
      title: "DBMS Normalization - Complete Guide",
      creator: "Rahul Kumar",
      rating: 4.9,
      views: 1890,
      cost: 15,
      thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400",
      duration: "30 min",
      topic: "Database"
    },
    {
      id: 3,
      title: "Operating Systems - Process Management",
      creator: "Ankit Verma",
      rating: 4.7,
      views: 3120,
      cost: 12,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
      duration: "38 min",
      topic: "Operating Systems"
    }
  ];

  const continueWatching = [
    {
      id: 1,
      title: "Machine Learning Basics",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 mt-1">{user?.college} • {user?.course}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 px-6 py-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-indigo-600" />
                  <span className="text-xl font-bold text-indigo-600">
                    {user?.role === 'admin' ? 'Unlimited' : tokens}
                  </span>
                  <span className="text-gray-600">tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        {!syllabusUploaded && (
          <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">🚀 Get Started with Zero-Search Learning</h2>
                <p className="text-indigo-100 mb-4">
                  Upload your syllabus and past papers to get AI-powered exam predictions
                </p>
                <div className="flex gap-4">
                  <Link to="/exam-mode">
                    <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Materials
                    </Button>
                  </Link>
                </div>
              </div>
              <Brain className="w-24 h-24 opacity-20" />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Play className="w-8 h-8 text-indigo-600" />
                <span className="text-sm text-gray-500">This Week</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">12</div>
              <div className="text-gray-600 text-sm">Videos Watched</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-green-600" />
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">24h</div>
              <div className="text-gray-600 text-sm">Learning Time</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-purple-600" />
                <span className="text-sm text-gray-500">Progress</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">78%</div>
              <div className="text-gray-600 text-sm">Course Completion</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                <span className="text-sm text-gray-500">Streak</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">7 🔥</div>
              <div className="text-gray-600 text-sm">Days Learning</div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Watching</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {continueWatching.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <div className="w-40 h-24 bg-gray-200 rounded-l-xl overflow-hidden flex-shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="py-4 pr-4 flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600">{item.progress}% complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
              <p className="text-gray-600">Personalized content based on your syllabus</p>
            </div>
            <Link to="/browse">
              <Button variant="outline">
                Browse All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((content) => (
              <Card key={content.id} className="hover:shadow-xl transition-all group">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                      {content.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        {content.topic}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{content.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">by {content.creator}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-indigo-600" />
                        <span className="font-bold text-indigo-600">{content.cost} tokens</span>
                      </div>
                      <Link to={`/content/${content.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
