/**
 * Authentication layout
 */

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import type { Route } from '@/+types/route';

import { useAuthContext } from '@/contexts/AuthContext';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Authentication | Raahi' },
    { name: 'description', content: 'Sign in or create an account for Raahi' },
  ];
};

export default function AuthLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

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

  return <Outlet />;
}
