# Raahi Layout Components

This directory contains the layout components used throughout the Raahi travel app. These components provide the structural foundation for the application's user interface.

## Components

### AppShell

The `AppShell` is the main layout component that wraps the entire application. It includes:

- Header
- Sidebar
- Main content area
- Footer

**Usage:**

```tsx
import { AppShell } from '~/components/layout';

// Basic usage
<AppShell>
  {children}
</AppShell>

// With custom header
<AppShell
  headerTitle="Dashboard"
  headerSubtitle="View your travel statistics"
  showCreateButton={true}
  onCreateClick={() => console.log('Create button clicked')}
>
  {children}
</AppShell>
```

### Header

The `Header` component displays at the top of the application and includes:

- Welcome message with user name
- Subtitle text
- Optional create button
- Mobile menu toggle for the sidebar

**Usage:**

```tsx
import { Header } from '~/components/layout';

<Header
  title="Welcome John"
  subtitle="Track your travel activity"
  showCreateButton={true}
  onCreateClick={() => console.log('Create button clicked')}
/>
```

### Sidebar

The `Sidebar` component provides navigation for the application and includes:

- App logo
- Navigation links with active state highlighting
- User profile section at the bottom

**Usage:**

```tsx
import { Sidebar } from '~/components/layout';

<Sidebar />
```

### AuthenticatedLayout

The `AuthenticatedLayout` is a wrapper component that ensures the user is authenticated before rendering the content. It redirects to the login page if the user is not authenticated.

**Usage:**

```tsx
import { AuthenticatedLayout } from '~/components/layout';

<AuthenticatedLayout
  headerTitle="Dashboard"
  headerSubtitle="View your travel statistics"
  showCreateButton={true}
  onCreateClick={() => console.log('Create button clicked')}
  requireAdmin={false} // Set to true to require admin role
/>
```

## Layout Context

The layout components use the `LayoutContext` to manage the state of the sidebar and responsive behavior. This context provides:

- `sidebarOpen`: Boolean indicating if the sidebar is open
- `toggleSidebar`: Function to toggle the sidebar open/closed
- `closeSidebar`: Function to close the sidebar
- `isMobile`: Boolean indicating if the current viewport is mobile-sized

**Usage:**

```tsx
import { useLayout } from '~/contexts/LayoutContext';

function MyComponent() {
  const { sidebarOpen, toggleSidebar, closeSidebar, isMobile } = useLayout();
  
  return (
    <div>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
    </div>
  );
}
```

## Accessibility

All layout components are built with accessibility in mind:

- Proper ARIA attributes for navigation elements
- Keyboard navigation support
- Focus management for interactive elements
- Screen reader-friendly markup

## Responsive Design

The layout components are fully responsive and adapt to different screen sizes:

- On mobile devices, the sidebar is hidden by default and can be toggled
- The header adapts to smaller screens with appropriate spacing and font sizes
- The footer maintains readability on all device sizes
