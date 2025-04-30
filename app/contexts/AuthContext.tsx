/**
 * Authentication Context
 *
 * This file provides a React context for authentication state and methods.
 */

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';

import { useAuthState, useAuth } from '@/hooks/useAuth';

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resetError: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authStateLoading, error: authStateError } = useAuthState();
  const {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    loading: authOperationLoading,
    error: authOperationError,
    resetError,
  } = useAuth();

  // Combine loading and error states
  const loading = authStateLoading || authOperationLoading;
  const error = authStateError || authOperationError;

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    resetError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;
