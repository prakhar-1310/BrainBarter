import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Lock, Star, ThumbsUp, ThumbsDown, Clock, Eye, BookOpen, ChevronRight, Coins } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { contentAPI } from '../services/api';

export function ContentViewer() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const { user, tokens, spendTokens } = useAuth();
  const [content, setContent] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  // Mock content data
  const mockContent = {
    id: contentId || '1',
    title: 'Dynamic Programming Fundamentals - Complete Guide',
    type: 'video',
    description: 'Comprehensive guide to Dynamic Programming with real-world examples and problem-solving techniques. Perfect for exam preparation.',
    videoUrl: 'https://www.youtube.com/embed/oBt53YbR9Kk',
    duration: '1:24:30',
    subject: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming',
    difficulty: 'Intermediate',
    cost: 15,
    views: 2847,
    rating: 4.8,
    totalRatings: 342,
    uploadDate: '2025-01-15',
    creator: {
      name: 'Rajesh Kumar',
      avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar',
      college: 'IIT Delhi',
      totalContent: 23,
      rating: 4.7,
      earnings: 12450
    },
    syllabus: ['Fibonacci Series', 'Knapsack Problem', '0/1 Knapsack', 'Longest Common Subsequence', 'Matrix Chain Multiplication'],
    relatedContent: [
      {
        id: '2',
        title: 'Advanced DP - Optimization Techniques',
        creator: 'Priya Sharma',
        rating: 4.6,
        cost: 12,
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400'
      },
      {
        id: '3',
        title: 'Graph Algorithms Masterclass',
        creator: 'Amit Singh',
        rating: 4.9,
        cost: 18,
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400'
      },
      {
        id: '4',
        title: 'Greedy vs Dynamic Programming',
        creator: 'Sarah Williams',
        rating: 4.5,
        cost: 10,
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setContent(mockContent);
    // Check if user has already unlocked this content
    const unlocked = localStorage.getItem(`content_unlocked_${contentId}`);
    setIsUnlocked(!!unlocked);
  }, [contentId]);

  const handleUnlock = () => {
    if (tokens >= content.cost) {
      spendTokens(content.cost);
      setIsUnlocked(true);
      localStorage.setItem(`content_unlocked_${contentId}`, 'true');
      setShowUnlockModal(false);
    }
  };

  const handleRate = (rating) => {
    if (!hasRated) {
      setHasRated(true);
      // API call would go here
      console.log('Rating:', rating);
    }
  };

  if (!content) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading content...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Video Player Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto">
          {isUnlocked ? (
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={content.videoUrl}
                title={content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center relative bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 text-center px-4">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Premium Content</h3>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Unlock this video to access high-quality peer-created content
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={() => setShowUnlockModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    Unlock for {content.cost} Tokens
                  </Button>
                  <div className="text-white text-sm">
                    Your balance: <span className="font-bold text-yellow-400">{tokens} tokens</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {content.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {content.views.toLocaleString()} views
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {content.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{content.rating}</span>
                    <span className="text-sm text-gray-600">({content.totalRatings})</span>
                  </div>
                </div>

                {/* Rating System */}
                <div className="flex items-center gap-4 py-4 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Rate this content:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRate(rating)}
                        disabled={hasRated}
                        className={`${
                          hasRated
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:scale-110 transition-transform'
                        }`}
                      >
                        <Star className={`w-6 h-6 ${hasRated ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                      </button>
                    ))}
                  </div>
                  {hasRated && (
                    <span className="text-sm text-green-600 font-medium">✓ Thanks for rating!</span>
                  )}
                </div>

                {/* Feedback Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Not Helpful
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About this Content</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{content.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subject</p>
                    <p className="font-semibold text-gray-900">{content.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Topic</p>
                    <p className="font-semibold text-gray-900">{content.topic}</p>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-3">What you'll learn:</h3>
                <ul className="space-y-2">
                  {content.syllabus.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <ChevronRight className="w-4 h-4 text-indigo-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Creator</h2>
                <div className="flex items-start gap-4">
                  <img
                    src={content.creator.avatar}
                    alt={content.creator.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{content.creator.name}</h3>
                    <p className="text-gray-600 mb-3">{content.creator.college}</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-indigo-600">{content.creator.totalContent}</p>
                        <p className="text-xs text-gray-600">Content</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-indigo-600">{content.creator.rating}</p>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-indigo-600">₹{content.creator.earnings}</p>
                        <p className="text-xs text-gray-600">Earned</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Related Content */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related Content</h2>
                <div className="space-y-4">
                  {content.relatedContent.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/content/${item.id}`)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-2">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{item.creator}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {item.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm mt-1">
                        <Coins className="w-4 h-4" />
                        {item.cost} tokens
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlock Content</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to unlock this content for {content.cost} tokens?
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Balance</span>
                    <span className="font-bold text-gray-900">{tokens} tokens</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Cost</span>
                    <span className="font-bold text-red-600">-{content.cost} tokens</span>
                  </div>
                  <div className="h-px bg-gray-300 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">New Balance</span>
                    <span className="font-bold text-indigo-600">{tokens - content.cost} tokens</span>
                  </div>
                </div>

                {tokens < content.cost && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-red-700">
                      Insufficient tokens. You need {content.cost - tokens} more tokens.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowUnlockModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUnlock}
                    disabled={tokens < content.cost}
                    className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                  >
                    Unlock Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
