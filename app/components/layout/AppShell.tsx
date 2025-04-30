import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutProvider } from '~/contexts/LayoutContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  showHeader?: boolean;
  showSidebar?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}

export function AppShell({
  showHeader = true,
  showSidebar = true,
  headerTitle,
  headerSubtitle,
  showCreateButton = false,
  onCreateClick,
}: AppShellProps) {
  return (
    <LayoutProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}
        
        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          {showHeader && (
            <Header 
              title={headerTitle}
              subtitle={headerSubtitle}
              showCreateButton={showCreateButton}
              onCreateClick={onCreateClick}
            />
          )}
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
          
          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 px-6">
            <div className="footer-container">
              <a href="/" className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-semibold text-gray-900">
                  © {new Date().getFullYear()} Raahi
                </h1>
              </a>
              <div className="flex items-center gap-4">
                <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </a>
                <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LayoutProvider>
  );
}

export default AppShell;
