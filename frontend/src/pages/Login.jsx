import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { GraduationCap } from 'lucide-react';

export function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-indigo-600">BrainBarter</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue learning</p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Don't have an account? <a href="/signup" className="font-semibold underline hover:text-blue-900">Sign up here</a>
            </p>
          </div>
        </div>

        {/* Clerk Sign In Component */}
        <div className="flex justify-center">
          <SignIn 
            routing="path"
            path="/login"
            signUpUrl="/signup"
            fallbackRedirectUrl="/select-role"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-xl rounded-2xl",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

