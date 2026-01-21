import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { GraduationCap } from 'lucide-react';

export function Signup() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join BrainBarter</h1>
          <p className="text-gray-600">Start your learning journey today</p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp 
            signInUrl="/login"
            redirectUrl="/select-role"
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
