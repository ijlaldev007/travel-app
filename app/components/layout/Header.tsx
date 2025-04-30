import React from 'react';
import { useAuthContext } from '~/contexts/AuthContext';
import { useLayout } from '~/contexts/LayoutContext';
import { Menu, X, Plus } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}

export function Header({
  title,
  subtitle,
  showCreateButton = false,
  onCreateClick,
}: HeaderProps) {
  const { user } = useAuthContext();
  const { toggleSidebar, sidebarOpen, isMobile } = useLayout();
  
  const userName = user?.displayName || 'User';
  const defaultTitle = `Welcome ${userName.split(' ')[0]}`;
  const defaultSubtitle = 'Track activity, trends, and popular destinations in real time';

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100 px-4 py-4 md:py-6">
      <div className="flex items-center justify-between">
        {/* Mobile menu toggle */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        {/* Header content */}
        <div className="flex-1 ml-4 md:ml-0">
          <div className="header">
            <article>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                {title || defaultTitle}
              </h1>
              {(subtitle || defaultSubtitle) && (
                <p className="text-sm md:text-base text-gray-500">
                  {subtitle || defaultSubtitle}
                </p>
              )}
            </article>
          </div>
        </div>
        
        {/* Create button */}
        {showCreateButton && (
          <button
            onClick={onCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Create a trip"
          >
            <Plus size={16} />
            <span className="hidden md:inline">Create a trip</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
