import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BrainBarter</span>
            </Link>
            <p className="text-sm text-gray-400">
              Empowering students through peer learning and AI-driven education.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/exam-mode" className="hover:text-indigo-400 transition-colors">
                  Exam Mode
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-indigo-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-indigo-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-indigo-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookie" className="hover:text-indigo-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 BrainBarter. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:support@brainbarter.com" className="hover:text-indigo-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
