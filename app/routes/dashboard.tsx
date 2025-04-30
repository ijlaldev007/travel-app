/**
 * Dashboard page
 */

import type { Route } from '@/+types/route';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthenticatedLayout } from '~/components/layout';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Dashboard | Raahi' },
    { name: 'description', content: 'Raahi Dashboard' },
  ];
};

export function Component() {
  const { user } = useAuthContext();

  const handleCreateTrip = () => {
    console.log('Create trip button clicked');
    // Navigate to trip creation page or open modal
  };

  return (
    <div className="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="stats-card">
          <h3 className="text-lg font-semibold">Total Trips</h3>
          <div className="content">
            <p className="text-3xl font-bold">0</p>
            <div className="p-2 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3 className="text-lg font-semibold">Countries Visited</h3>
          <div className="content">
            <p className="text-3xl font-bold">0</p>
            <div className="p-2 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3 className="text-lg font-semibold">Upcoming Trips</h3>
          <div className="content">
            <p className="text-3xl font-bold">0</p>
            <div className="p-2 bg-purple-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h3 className="text-lg font-semibold">Total Spent</h3>
          <div className="content">
            <p className="text-3xl font-bold">$0</p>
            <div className="p-2 bg-yellow-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trips Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Trips</h2>
          <button
            onClick={handleCreateTrip}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't created any trips yet.</p>
          <button
            onClick={handleCreateTrip}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Your First Trip
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{user?.displayName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Use the AuthenticatedLayout as the layout for this route
Component.layout = AuthenticatedLayout;

// Export the component as default
export default function DashboardPage() {
  return (
    <AuthenticatedLayout
      headerTitle="Dashboard"
      headerSubtitle="Track activity, trends, and popular destinations in real time"
      showCreateButton={true}
      onCreateClick={() => console.log('Create trip button clicked')}
    >
      <Component />
    </AuthenticatedLayout>
  );
}
