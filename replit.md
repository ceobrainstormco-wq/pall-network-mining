# Overview

This is a Progressive Web App (PWA) called "Pall Network" - a crypto mining simulation game built with React and Express. Players can mine PALL tokens by clicking a button every 24 hours, with their progress and coins stored in browser localStorage. The application features a modern dark-themed UI built with Tailwind CSS and shadcn/ui components, complete with PWA capabilities including service worker, manifest, and offline functionality.

# Current Status (August 9, 2025)

## Deployment Status
- **DEPLOYED SUCCESSFULLY**: https://coin-mine-ceopallnetwork.replit.app
- **Server Status**: Running on Autoscale deployment (4 vCPU / 8 GiB RAM)
- **Environment**: Production ready with all Firebase secrets configured

## Firebase Authentication Status
- **FIXED**: All environment variables properly configured
- **API Key**: Valid and working (AIzaSyDAWM_IEJI6kHo4Ov-8DyRXOvZcEn3mLg8)
- **Project ID**: pall-network-mining
- **App ID**: 1:912242352810:web:8873d57f25d1a7412466d3
- **Authorized Domains**: coin-mine-ceopallnetwork.replit.app added to Firebase console

## Known Issues Resolved
- ✅ Firebase API key invalid error - FIXED with correct environment variables
- ✅ Authentication domain authorization - FIXED with proper domains in Firebase console
- ✅ Development URL access warning - FIXED with proper deployment
- ✅ Environment variables swap issue - FIXED with correct PROJECT_ID and APP_ID mapping

## Recent Updates (August 9, 2025)
- ✅ **NEW UPGRADE SYSTEM**: Completely redesigned with Bronze ($3), Silver ($14), Golden ($55), Diamond ($100) packages
- ✅ **REFERRAL COMMISSIONS**: F1 (5%) and F2 (2.5%) commission system with instant USDT payouts
- ✅ **WALLET INTEGRATION**: Added Web3 MetaMask wallet connection for USDT payments on BNB Smart Chain
- ✅ **WALLET PAGE**: New wallet page with PALL balance, USDT commissions, and transaction history
- ✅ **MENU REDESIGN**: Moved hamburger menu to left, added Home and Wallet options
- ✅ **PROFILE ENHANCEMENT**: Profile picture upload functionality and enhanced user settings
- ✅ **DATABASE SCHEMA**: Extended with referrals, commissions, and wallet tables
- ✅ **FINAL PALL LOGO**: Updated to professional 3D blue circular logo with "P" symbol design  
- ✅ **CONTINUOUS MINING SYSTEM**: Implemented 24-hour continuous mining with real-time progress tracking
- ✅ **CUMULATIVE TOKEN STORAGE**: Fixed mining system to accumulate tokens instead of resetting after each cycle
- ✅ **WALLET-MINING SYNC**: Real-time synchronization between wallet PALL balance and mining total coins
- ✅ **DATABASE-DRIVEN UI**: Both Home and Wallet pages now fetch live data from PostgreSQL database
- ✅ **Custom Domain Setup**: pallnetworkcommerce.com configured with Replit (A record: 34.111.179.208)

## Current Status Update (August 9, 2025, 12:20 PM)
- **CUMULATIVE TOKEN SYSTEM**: Implemented complete database-driven token accumulation system
- **WALLET INTEGRATION**: Real-time wallet data fetching with PALL balance sync from mining data
- **DATABASE SYNC**: Mining tokens now properly accumulate instead of resetting after each 24-hour cycle
- **API ENDPOINTS**: Added `/api/wallet/:userId` endpoint with automatic balance synchronization
- **DOMAIN STATUS**: pallnetworkcommerce.com DNS propagation in progress (up to 48 hours)
- **DEPLOYMENT**: App ready for deployment with continuous mining system

## Next Steps for User
- Wait for DNS propagation completion (can take up to 48 hours from setup)
- Deploy app once domain is verified in Replit dashboard
- Test custom domain access once propagated  
- Submit to Google Play Store with professional Pall branding

# User Preferences

- **Language**: Urdu conversation, English typing
- **Communication style**: Simple, everyday language
- **Patience level**: User worked 10+ hours on authentication issues and needs breaks

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server with HMR support
- **Wouter** for lightweight client-side routing with 8 main pages (home, upgrades, profile, team, invitation, kyc, language, about)
- **TanStack Query** for server state management and API interactions
- **React Hook Form** with Zod validation for form handling
- **Custom hooks** pattern for game logic (`useMining`, `useMobile`, `useToast`, `useUpgrades`)
- **Hamburger menu navigation** with responsive mobile-first design

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
- **Browser localStorage** for client-side game state persistence with user-specific keys (coins, last mine time)
- **User-specific data isolation** via Firebase UID-based storage keys
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Database abstraction layer** with IStorage interface supporting both memory and database backends
- **Migration system** ready for database schema changes

## Authentication System
- **Firebase Authentication** with Google Sign-In integration
- **Protected mining functionality** requiring user authentication
- **User profile display** showing Google account information
- **Secure session management** via Firebase Auth state persistence
- **User-specific mining progress** stored per authenticated user
- **Automatic sign-out functionality** with proper error handling

## Premium Package System (Updated August 9, 2025)
- **Four Package Tiers**: Bronze ($3, 200% faster), Silver ($14, 600% faster), Golden ($55, 3000% faster), Diamond ($100, 6000% faster)
- **Referral Commission System**: F1 referrals earn 5% USDT commission, F2 referrals earn 2.5% USDT commission
- **Web3 Payment Integration** using USDT BEP-20 on BNB Smart Chain via MetaMask
- **One-time Purchase Policy**: Each package can only be purchased once per user (can upgrade to higher tiers)
- **Instant Activation**: Package benefits activate immediately after payment confirmation
- **Monthly Profit Sharing**: All package holders receive monthly PALL token dividends
- **Booster Enhancement**: Increased booster buy percentages for all package holders
- **No KYC Required**: Simplified purchase process without identity verification

## PWA Features
- **Service Worker** for offline caching and background sync
- **Web App Manifest** with proper icons and metadata using custom PALL Network branding
- **Custom App Icons** generated from user's PALL Network logo (favicon.ico, icon-192.png, icon-512.png)
- **Responsive design** optimized for mobile devices
- **Offline-first approach** with localStorage fallback

## Navigation System (Updated August 9, 2025)
- **Hamburger menu** positioned in top-left corner for better accessibility 
- **10 main sections**: Home (mining dashboard), Wallet (PALL/USDT balances), Profile (enhanced with photo upload), Team (referral management), Invitation Code (sharing system), KYC Verification (coming soon), Language (multi-language support), About (project information), plus Sign Out
- **Wallet Features**: Withdraw/Deposit buttons (coming soon), transaction history, commission tracking
- **Profile Enhancement**: Profile picture upload, enhanced user information management
- **Consistent navigation** across all pages with back buttons and menu integration
- **Mobile-optimized** overlay menu with backdrop blur and smooth animations

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

## Web3 & Blockchain
- **Web3.js**: Ethereum/BSC blockchain interaction and smart contract integration
- **Ethers.js**: Alternative Web3 library for blockchain operations
- **MetaMask integration**: Wallet connection and transaction signing
- **BNB Smart Chain**: Blockchain network for USDT BEP-20 payments

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