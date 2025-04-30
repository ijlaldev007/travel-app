import React from 'react';

export function SkeletonLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Skeleton Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          {/* Skeleton Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-200">
            <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          {/* Skeleton Navigation */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </nav>
            
            {/* Skeleton User Profile */}
            <div className="px-4 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="ml-3 w-full">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Skeleton Header */}
        <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Skeleton Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Skeleton Title */}
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            
            {/* Skeleton Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Skeleton Table */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Skeleton Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SkeletonLayout;
