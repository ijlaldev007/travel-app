import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '~/contexts/AuthContext';
import { useLayout } from '~/contexts/LayoutContext';
import { sidebarItems } from '~/constants';
import { SITE_NAME } from '~/constants';
import { Globe, Bell } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuthContext();
  const { sidebarOpen, closeSidebar, isMobile } = useLayout();
  
  // If sidebar is closed on mobile, don't render anything
  if (isMobile && !sidebarOpen) {
    return null;
  }
  
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm
        transform transition-transform duration-200 ease-in-out
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        ${isMobile ? 'lg:relative' : ''}
      `}
      aria-label="Sidebar"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          onClick={() => isMobile && closeSidebar()}
        >
          <Globe className="h-6 w-6 text-blue-600" aria-hidden="true" />
          <span className="text-xl font-bold text-gray-900">{SITE_NAME}</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 nav-items">
        <div className="container">
          <nav aria-label="Main Navigation">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={() => isMobile && closeSidebar()}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-center justify-center w-6 h-6 mr-3">
                    {/* We'll use a placeholder icon if the SVG path doesn't exist */}
                    {item.icon.includes('.svg') ? (
                      <img 
                        src={item.icon} 
                        alt="" 
                        className="w-5 h-5" 
                        aria-hidden="true" 
                      />
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded-full" aria-hidden="true" />
                    )}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          {/* User profile at bottom */}
          {user && (
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center px-4 py-3">
                <div className="flex-shrink-0 relative">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="" 
                      className="w-10 h-10 rounded-full" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  
                  {/* Notification indicator */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <Bell size={16} className="text-blue-600" />
                  </span>
                </div>
                
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
