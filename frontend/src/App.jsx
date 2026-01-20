import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Homepage } from './pages/HomePage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { StudentDashboard } from './pages/StudentDashboard';
import { ExamMode } from './pages/ExamMode';
import { ContentViewer } from './pages/ContentViewer';
import { CreatorDashboard } from './pages/CreatorDashboard';
import { RoleSelection } from './pages/RoleSelection';
import { AdminDashboard } from './pages/AdminDashboard';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Protected Route Component that checks for role
function ProtectedRoute({ children }) {
  const { user } = useUser();
  
  return (
    <>
      <SignedIn>
        {user?.publicMetadata?.onboarded ? children : <Navigate to="/select-role" replace />}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

// Homepage wrapper to redirect logged-in users
function HomeRoute() {
  const { user } = useUser();
  
  if (user) {
    // User is logged in, redirect to appropriate dashboard
    if (!user.publicMetadata?.onboarded) {
      return <Navigate to="/select-role" replace />;
    }
    
    const role = user.publicMetadata?.role || 'student';
    if (role === 'creator') {
      return <Navigate to="/creator-dashboard" replace />;
    } else if (role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }
  
  return (
    <>
      <Navbar />
      <Homepage />
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomeRoute />} />
      
      <Route path="/login" element={
        <SignedOut>
          <Login />
        </SignedOut>
      } />
      
      <Route path="/signup" element={
        <SignedOut>
          <Signup />
        </SignedOut>
      } />
      
      <Route path="/select-role" element={
        <SignedIn>
          <RoleSelection />
        </SignedIn>
      } />

      {/* Protected Routes */}
      <Route path="/student-dashboard" element={
        <ProtectedRoute>
          <Navbar />
          <StudentDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navbar />
          <StudentDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/exam-mode" element={
        <ProtectedRoute>
          <Navbar />
          <ExamMode />
        </ProtectedRoute>
      } />
      
      <Route path="/content/:contentId" element={
        <ProtectedRoute>
          <Navbar />
          <ContentViewer />
        </ProtectedRoute>
      } />
      
      <Route path="/creator-dashboard" element={
        <ProtectedRoute>
          <Navbar />
          <CreatorDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin-dashboard" element={
        <ProtectedRoute>
          <Navbar />
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ClerkProvider>
  );
};

export default App;