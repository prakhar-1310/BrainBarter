import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Link } from 'react-router-dom';
import { 
  Play, 
  Sparkles, 
  Brain, 
  Video, 
  TrendingUp,
  Users,
  Zap,
  Target,
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Youtube,
  Search,
  Coins
} from "lucide-react";

const problems = [
  {
    icon: Youtube,
    title: "YouTube is Too Generic",
    description: "Hours wasted searching through irrelevant content that doesn't match your syllabus"
  },
  {
    icon: Search,
    title: "No Exam Focus",
    description: "Generic tutorials that don't prioritize what's actually coming in your exams"
  },
  {
    icon: Users,
    title: "Missing Peer Validation",
    description: "No way to know if the content is from students who actually aced your course"
  }
];

const solutions = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Smart algorithms connect you with exactly the content you need for your syllabus",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Target,
    title: "Exam Prediction",
    description: "Upload past papers and get AI predictions on high-probability topics",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Award,
    title: "Peer Validation",
    description: "Learn from students who recently scored high in your exact course",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Coins,
    title: "Earn While You Learn",
    description: "Top students can monetize their knowledge and help peers succeed",
    gradient: "from-green-500 to-teal-500"
  }
];

export function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 md:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/30 shadow-xl hover:bg-white/30 transition-all duration-300 animate-fade-in">
              <Sparkles className="w-4 h-4 animate-spin" style={{animationDuration: '3s'}} />
              <span className="text-sm font-semibold">AI-Powered Peer Learning Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight animate-fade-in" style={{animationDelay: '0.2s'}}>
              Learn. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-300">Earn.</span> Teach.
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
              India's first AI-powered peer learning marketplace where <span className="font-bold text-yellow-300">students teach students</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Link to="/signup" className="inline-block">
                <button className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                  <Play className="w-5 h-5 group-hover:animate-pulse" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/login" className="inline-block">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl shadow-xl hover:bg-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.8s'}}>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">10K+</div>
                <div className="text-white/80 font-medium">Active Students</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-200 to-emerald-300 bg-clip-text text-transparent">5K+</div>
                <div className="text-white/80 font-medium">Video Lessons</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-cyan-300 bg-clip-text text-transparent">95%</div>
                <div className="text-white/80 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-700 mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Students Struggle Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Traditional learning platforms aren't built for exam preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card key={index} className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-red-200 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-red-600 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{problem.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 mb-4">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-semibold">The Solution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How BrainBarter Solves It
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge AI meets peer-validated content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border-2 hover:border-indigo-300 group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${solution.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{solution.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 mb-4">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Upload Your Details",
                description: "Share your syllabus and past papers with our AI",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "AI Predicts Topics",
                description: "Get personalized content recommendations based on exam patterns",
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Learn & Ace Exams",
                description: "Study verified peer content and score higher",
                icon: Award,
                color: "from-orange-500 to-red-500"
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Connector Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-gray-300 to-transparent -translate-x-1/2 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-300 mb-4">{step.step}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-0 right-0 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 left-0 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Sparkles className="w-16 h-16 mx-auto mb-6 animate-spin" style={{animationDuration: '3s'}} />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Join 10,000+ students who are learning smarter with AI-powered peer content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="inline-block">
              <button className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-xl shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Free Trial
              </button>
            </Link>
            <Link to="/exam-mode" className="inline-block">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl shadow-xl hover:bg-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Try Exam Prediction
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
