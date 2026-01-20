import { Button } from "./Button";
import { Video, Menu, X, GraduationCap, Coins, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserButton } from '@clerk/clerk-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, tokens, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-indigo-600">
              BrainBarter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/exam-mode" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  Exam Mode
                </Link>
                {user?.role === 'creator' && (
                  <Link to="/creator-dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                    Creator Studio
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin-dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                    Admin Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  How It Works
                </a>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg">
                  <Coins className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-indigo-600">
                    {user?.role === 'admin' ? 'Unlimited' : tokens}
                  </span>
                </div>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/exam-mode" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Exam Mode
                  </Link>
                  {user?.role === 'creator' && (
                    <Link to="/creator-dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Creator Studio
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link to="/admin-dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700 font-medium">{user?.name}</span>
                      <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg">
                        <Coins className="w-4 h-4 text-indigo-600" />
                        <span className="font-semibold text-indigo-600">
                          {user?.role === 'admin' ? 'Unlimited' : tokens}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 hover:text-red-700 font-medium py-2"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Features
                  </a>
                  <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                    How It Works
                  </a>
                  <div className="flex flex-col gap-2 pt-2">
                    <Link to="/login">
                      <button className="w-full text-gray-700 hover:text-indigo-600 font-medium py-2">Sign In</button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
