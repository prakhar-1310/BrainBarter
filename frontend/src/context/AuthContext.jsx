import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [tokens, setTokens] = useState(100);

  // Initialize tokens from localStorage based on user ID
  useEffect(() => {
    if (isSignedIn && user) {
      // Check if admin email
      const adminEmail = 'prakharshahi9935@gmail.com';
      const userEmail = user.primaryEmailAddress?.emailAddress;
      const isAdmin = userEmail === adminEmail;
      
      if (isAdmin) {
        setTokens(999999999); // Unlimited tokens for admin
      } else {
        const savedTokens = localStorage.getItem(`tokens_${user.id}`);
        if (savedTokens) {
          setTokens(parseInt(savedTokens));
        } else {
          setTokens(100); // Default starting tokens
          localStorage.setItem(`tokens_${user.id}`, '100');
        }
      }
    }
  }, [isSignedIn, user]);

  const spendTokens = (amount) => {
    if (tokens >= amount && user) {
      const newTokens = tokens - amount;
      setTokens(newTokens);
      localStorage.setItem(`tokens_${user.id}`, newTokens.toString());
      return true;
    }
    return false;
  };

  const earnTokens = (amount) => {
    if (user) {
      const newTokens = tokens + amount;
      setTokens(newTokens);
      localStorage.setItem(`tokens_${user.id}`, newTokens.toString());
    }
  };

  const updateTokens = (newAmount) => {
    if (user) {
      setTokens(newAmount);
      localStorage.setItem(`tokens_${user.id}`, newAmount.toString());
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setTokens(0);
  };

  // Get user role from Clerk's public metadata or check if admin email
  const adminEmail = 'prakharshahi9935@gmail.com';
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdminEmail = userEmail === adminEmail;
  
  const userRole = isAdminEmail ? 'admin' : (user?.publicMetadata?.role || 'student');

  return (
    <AuthContext.Provider value={{
      user: isSignedIn ? {
        id: user.id,
        name: user.fullName || user.firstName || 'User',
        email: user.primaryEmailAddress?.emailAddress,
        role: userRole,
        avatar: user.imageUrl,
      } : null,
      isAuthenticated: isSignedIn,
      loading: !isLoaded,
      tokens,
      spendTokens,
      earnTokens,
      updateTokens,
      logout: handleSignOut,
      isCreator: userRole === 'creator',
      isStudent: userRole === 'student',
      isAdmin: userRole === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
};
