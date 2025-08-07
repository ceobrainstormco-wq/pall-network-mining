# Overview

This is a Progressive Web App (PWA) called "Pall Network" - a crypto mining simulation game built with React and Express. Players can mine PALL tokens by clicking a button every 24 hours, with their progress and coins stored in browser localStorage. The application features a modern dark-themed UI built with Tailwind CSS and shadcn/ui components, complete with PWA capabilities including service worker, manifest, and offline functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server with HMR support
- **Wouter** for lightweight client-side routing (single page app with home and 404 pages)
- **TanStack Query** for server state management and API interactions
- **React Hook Form** with Zod validation for form handling
- **Custom hooks** pattern for game logic (`useMining`, `useMobile`, `useToast`)

## UI Framework
- **Tailwind CSS** for styling with custom dark theme configuration
- **shadcn/ui** component library built on Radix UI primitives
- **Lucide React** for consistent iconography
- **CSS variables** for theming with dark mode support
- **Inter font** from Google Fonts for typography

## Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **In-memory storage** using Map-based storage interface with CRUD operations
- **Session-based architecture** prepared but not fully implemented
- **Modular route registration** system for API endpoints
- **Custom error handling** middleware for consistent error responses

## Data Storage
- **Browser localStorage** for client-side game state persistence (coins, last mine time)
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Database abstraction layer** with IStorage interface supporting both memory and database backends
- **Migration system** ready for database schema changes

## PWA Features
- **Service Worker** for offline caching and background sync
- **Web App Manifest** with proper icons and metadata using custom PALL Network branding
- **Custom App Icons** generated from user's PALL Network logo (favicon.ico, icon-192.png, icon-512.png)
- **Responsive design** optimized for mobile devices
- **Offline-first approach** with localStorage fallback

## Development Tools
- **TypeScript** for type safety across frontend and backend
- **ESLint** and **Prettier** implied for code quality
- **Path aliases** configured for clean imports (@/, @shared/)
- **Hot module replacement** in development mode

## Build and Deployment
- **Dual build process** - Vite for frontend, esbuild for backend
- **Static asset serving** from Express in production
- **Environment-specific configurations** for development vs production

# External Dependencies

## Core Frameworks
- **React ecosystem**: react, react-dom, @vitejs/plugin-react
- **Express.js**: express with TypeScript support
- **Vite**: Modern build tool with plugins for development

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with PostCSS
- **Radix UI**: Unstyled, accessible UI primitives (@radix-ui/react-*)
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management
- **clsx/tailwind-merge**: Conditional CSS classes

## State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with @hookform/resolvers
- **Zod**: Runtime type validation and schema definition

## Database and Storage
- **Drizzle ORM**: TypeScript ORM with drizzle-kit for migrations
- **Drizzle Zod**: Integration between Drizzle and Zod for validation
- **@neondatabase/serverless**: PostgreSQL client for serverless environments
- **connect-pg-simple**: PostgreSQL session store (configured but unused)

## Utilities and Tools
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **wouter**: Lightweight React router
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component

## Development Dependencies
- **TypeScript**: Type system for JavaScript
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools
- **Various @types packages**: TypeScript definitions for dependencies

## PWA and Web APIs
- **Service Worker API**: For offline functionality and caching
- **Web App Manifest**: PWA configuration and installation
- **LocalStorage API**: Client-side data persistence
- **Intersection Observer**: For potential future scroll-based features (via Radix components)