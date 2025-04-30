import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '~/contexts/AuthContext';
import { AppShell } from './AppShell';

interface AuthenticatedLayoutProps {
  headerTitle?: string;
  headerSubtitle?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  requireAdmin?: boolean;
}

export function AuthenticatedLayout({
  headerTitle,
  headerSubtitle,
  showCreateButton = false,
  onCreateClick,
  requireAdmin = false,
}: AuthenticatedLayoutProps) {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    
    // If admin is required and user is not an admin, redirect to dashboard
    // Note: This is a placeholder. You'll need to implement admin role checking based on your auth system
    if (requireAdmin && user && user.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [user, loading, navigate, requireAdmin]);
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }
  
  return (
    <AppShell
      headerTitle={headerTitle}
      headerSubtitle={headerSubtitle}
      showCreateButton={showCreateButton}
      onCreateClick={onCreateClick}
    />
  );
}

export default AuthenticatedLayout;
