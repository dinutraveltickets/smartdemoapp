# Replit.md

## Overview

This is a full-stack web application built with a React frontend and Express.js backend, using TypeScript throughout. The application appears to be a business dashboard or rate management system with authentication capabilities. It follows a modern monorepo structure with shared TypeScript schemas and uses Drizzle ORM for database operations with PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **API Design**: RESTful APIs with JSON responses
- **Development**: Hot reloading with tsx

### Project Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared TypeScript schemas and types
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Authentication with username/password
- **Rates Table**: Business rate management with categories, multipliers, and status tracking
- **Validation**: Zod schemas for runtime type checking and validation

### Authentication System
- Simple username/password authentication
- In-memory storage for development (MemStorage class)
- Session-based authentication ready for PostgreSQL sessions
- Client-side auth context with localStorage persistence

### UI Component System
- Complete Shadcn/ui component library
- Consistent design system with CSS variables
- Dark/light theme support
- Responsive design with mobile-first approach

### API Structure
- `/api/login` - User authentication
- `/api/dashboard/stats` - Dashboard statistics
- `/api/dashboard/activity` - Recent activity data
- `/api/rates` - Rate management endpoints (CRUD operations)

### Page Structure
- **Login Page**: Smart modern design with glassmorphism effects and gradient backgrounds
- **Dashboard Home**: Statistics cards, activity feed, and chart components
- **Rate Matrix**: Data table with filtering, pagination, and CRUD operations
- **Client Spread Template**: Complex form layout with product search, margins setup, and tenor management table

## Data Flow

1. **Authentication Flow**: Users log in via `/api/login`, credentials validated against storage, session established
2. **Dashboard Data**: Client fetches stats and activity data for dashboard display
3. **Rate Management**: CRUD operations for business rates with category and status filtering
4. **Real-time Updates**: React Query handles cache invalidation and background refetching

## External Dependencies

### Core Dependencies
- **Database**: Neon Database for serverless PostgreSQL
- **ORM**: Drizzle ORM for type-safe database operations
- **UI**: Radix UI primitives for accessible components
- **Validation**: Zod for schema validation
- **HTTP Client**: Fetch API with React Query

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server and building
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast bundling for production backend

## Deployment Strategy

### Build Process
- Frontend: Vite builds to `dist/public/`
- Backend: ESBuild bundles server to `dist/index.js`
- Shared schemas compiled with TypeScript

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment setting (development/production)

### Production Setup
- Single Node.js process serving both API and static files
- PostgreSQL database (Neon Database recommended)
- Environment variables for database connection

### Development Workflow
- `npm run dev`: Start development server with hot reloading
- `npm run build`: Build for production
- `npm run db:push`: Push database schema changes
- `npm run check`: TypeScript type checking

The application is designed for easy deployment on platforms like Replit, Vercel, or any Node.js hosting service with PostgreSQL support.