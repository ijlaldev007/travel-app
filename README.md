# Travel App

A modern, full-stack travel planning and booking application built with React Router 7 and TypeScript.

## Project Overview

This travel app allows users to explore travel destinations, create itineraries, and manage bookings. The application features a responsive design with a focus on user experience and performance.

## Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router 7
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn UI (planned)

## Features

- 🌍 Destination exploration with detailed information
- 📅 Trip planning and itinerary creation
- 💰 Budget management for trips
- 👥 User profiles and preferences
- 📊 Analytics and statistics (for admins)
- 🎨 Responsive design for all devices
- 🔒 TypeScript for type safety
- 🚀 Server-side rendering for improved SEO and performance

## Project Structure

```
travel-app/
├── app/                    # Main application code
│   ├── constants/          # Application constants
│   ├── routes/             # Route components
│   ├── app.css             # Main CSS file
│   ├── index.d.ts          # TypeScript declarations
│   ├── root.tsx            # Root component
│   └── routes.ts           # Route configuration
├── public/                 # Static assets
│   └── assets/             # Images and icons
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Data Models

The application uses several key data models:

- **User**: User profiles and authentication data
- **Trip**: Travel itineraries with destinations, activities, and pricing
- **Location**: Geographical data for destinations
- **Activity**: Things to do at destinations
- **DayPlan**: Daily itinerary for trips

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## UI Components

We're transitioning from Syncfusion to Shadcn UI for our component needs. Based on our Figma designs and screenshots, we'll need to implement the following reusable components:

### Authentication Components
- **AuthCard**: A centered card container for authentication forms with rounded corners and drop shadow
- **Logo**: The Tourvisto logo component that can be reused across the app
- **SocialButton**: Button for social authentication (Google Sign-in)
- **AuthBackground**: Full-screen background with travel-themed illustration

### Common UI Components
- **Button**: Customizable button component with different variants (primary, outline, ghost)
  - Primary action button (blue - "Create a trip", "Add new user", "Generate a trip")
  - Secondary action buttons (View, Details, etc.)
- **Card**: Reusable card container with customizable padding and border radius
  - Used for stat cards, trip cards, and data tables
- **Input**: Form input fields with labels and validation
  - Text inputs with placeholder text (e.g., "Enter number of days (e.g., 5, 12)")
  - Dropdown selectors with custom styling
- **Select/Dropdown**: Dropdown selection components
  - Country selector with flag icons
  - Group type, travel style, interests, and budget preference selectors
- **Typography**: Text components for headings, paragraphs, and captions
  - Section headings ("Trips", "User Growth", "Trip Trends", "Manage Users", "Add new Trips")
  - Trip titles with duration prefix (e.g., "5-Day Japan Highlights: Culture, Food and Adventure")
  - Itinerary day titles (e.g., "Day 1: Arrival in Tokyo & Welcome Dinner")
  - Itinerary activity descriptions with detailed text
  - Metric values with different sizes and weights
  - Percentage indicators with colors (green for positive, red for negative)
  - Descriptive text ("Filter, sort, and access detailed user profiles", "View and generate AI travel plans")
  - Form labels ("Country", "Duration", "Group Type", "Travel style", "Interests", "Budget Estimate")
  - Breadcrumb navigation text ("Trips > Trip")
- **Avatar**: User profile images with fallback initials
  - Used in user lists and profile sections
  - Fallback to initials when no image is available (e.g., "MD" for Mark Davis)
- **Badge**: Status indicators and tags
  - User status badges (User in green, Admin in blue)
  - Trip category tags (Mountains, City, Solo travel, Budget)
  - Trend indicators (up/down arrows with percentages)
- **Icons**: Common icon components used throughout the application
  - Navigation icons (Dashboard, All Users, All Trips)
  - Action icons (delete/edit, pagination arrows)
  - Trend indicators (up/down arrows)
- **Map**: Interactive map component for location selection
  - Map/Satellite view toggle
  - Zoom controls
  - Location marker

### Layout Components
- **AppShell**: Main application layout with sidebar and content area
- **Sidebar**: Navigation sidebar with:
  - Logo at the top (Tourvisto with globe icon)
  - Active state highlighting for current section (blue background)
  - Icon + text navigation items (Dashboard, All Users, All Trips)
  - User profile section at bottom with avatar and notification indicator
- **Header**: Top navigation bar with:
  - Welcome message with user name ("Welcome Adrian")
  - Subtitle text ("Track activity, trends, and popular destinations in real time")
  - Create button ("Create a trip") with plus icon
- **DashboardGrid**: Grid layout system for organizing dashboard widgets
- **Footer**: Application footer with links and copyright

### Data Display Components
- **DataTable**: For displaying user data and bookings
  - **UserTable**: Shows user information with:
    - Column headers (Name, Email Address, Date Joined, Itinerary Created, Status)
    - User rows with avatar, name, email, join date, activity count, and status badge
    - Status badges (User in green, Admin in blue)
    - Action column with delete/edit icon
    - Pagination controls at the bottom
  - **BookingTable**: Shows trip bookings with trip thumbnails, names, and dates
    - Column headers with alignment options
    - Booking rows with trip thumbnail, name, and date range
- **Charts**: For analytics and statistics visualization
  - **LineChart**: For trend visualization with data points and smooth curves
    - User Growth chart with monthly data points and interactive tooltips
    - Trend lines with gradient fills below the line
  - **BarChart**: For category comparison (Trip Trends by destination type)
    - Category bars with different heights
    - Value tooltips (e.g., "40%" tooltip for Culinary category)
    - Y-axis grid lines
- **Stat Card**: Cards displaying key metrics with labels, values, and trend indicators
  - Large number display (e.g., "12,450" for Total Users)
  - Colored trend indicators (green for positive, red for negative)
  - Percentage change with comparison text (e.g., "12% vs last month")
  - Mini trend graph showing historical data
- **TripCard**: Card displaying trip information with:
  - Scenic illustration of the destination as the card background
  - Price tag in the top-right corner (e.g., "$300", "$790", "$870", "$604")
  - Trip name (e.g., "Thornridge Cir. Shiloh", "Roraima Tepui", "Socotra Island")
  - Location with pin icon (e.g., "St George's Ln Singapore", "Canaima Park, Venezuela", "Yemen")
  - Category tags with colored backgrounds (e.g., "Mountains", "City", "Solo travel", "Budget", "Luxury", "Beach", "Sports", "Adventurous")
- **TripGrid**: Grid layout for displaying multiple trip cards
  - Responsive grid with 4 cards per row on desktop
  - Pagination controls at the bottom

### Page-Specific Components
- **UserManagement**: Components for the user management page
  - **UserHeader**: Header with "Manage Users" title, description, and "Add new user" button
  - **UserTable**: Table with user data, status badges, and action buttons
  - **UserPagination**: Pagination controls with page numbers and next/previous buttons
- **TripManagement**: Components for the trip management page
  - **TripCreationForm**: Form for creating new trips with:
    - Country selector with flag icon
    - Duration input field with placeholder text
    - Group type dropdown selector
    - Travel style dropdown selector
    - Interests dropdown selector
    - Budget estimate dropdown selector
    - Interactive map location selector with Map/Satellite toggle
    - "Generate a trip" primary action button
  - **TripHeader**: Header with "Add new Trips" title and descriptive text
  - **TripsListHeader**: Header with "Trips" title, description, and "Create a trip" button
  - **TripsPagination**: Pagination controls with numbered pages and previous/next buttons
  - **TripDetailView**: Detailed view of a specific trip with:
    - Breadcrumb navigation ("Trips > Trip")
    - Trip title with duration (e.g., "5-Day Japan Highlights: Culture, Food and Adventure")
    - Trip subtitle with location and category
    - Trip gallery with main image and thumbnails
    - Rating display with stars and review count
    - Price display with "Book" button
    - Detailed itinerary with day-by-day breakdown
      - Day headers with titles
      - Activity descriptions with times
      - Location details
    - Trip map showing the route
    - Location details section with coordinates
    - Similar Itineraries section with related trip cards
- **Dashboard**: Components specific to the dashboard page

### Adding Shadcn UI Components

```bash
# Initialize Shadcn UI
npx shadcn-ui init

# Add core components
npx shadcn-ui add button
npx shadcn-ui add card
npx shadcn-ui add input
npx shadcn-ui add avatar
npx shadcn-ui add badge

# Add layout components
npx shadcn-ui add sheet # For sidebar
npx shadcn-ui add separator
npx shadcn-ui add tabs # For dashboard sections

# Add data display components
npx shadcn-ui add table
npx shadcn-ui add chart

# Add dashboard-specific components
npx shadcn-ui add progress # For progress indicators
npx shadcn-ui add hover-card # For tooltips on hover
npx shadcn-ui add dropdown-menu # For action menus
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t travel-app .

# Run the container
docker run -p 3000:3000 travel-app
```

The containerized application can be deployed to any platform that supports Docker.

## Recent Changes

- Removed Syncfusion dependencies
- Planning to implement Shadcn UI components for charts, grids, and tables
- Updated styling to use Tailwind CSS exclusively
- Added detailed UI component documentation based on design screenshots

---

Built with ❤️ using React Router.
