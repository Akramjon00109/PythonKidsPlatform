# Python Learning Platform

## Overview

An interactive Python learning platform designed for children aged 10+, delivering daily programming lessons through both a web application and Telegram bot. The platform uses AI-generated content (Google Gemini) to create engaging, age-appropriate lessons that teach Python fundamentals through simple language and interactive exercises.

**Core Purpose**: Provide structured, gamified Python education with daily lessons that are automatically generated and distributed through multiple channels.

**Target Audience**: Children 10+ years old learning programming for the first time.

**Primary Language**: Uzbek (Cyrillic script)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: 
- Shadcn/UI component library (New York style variant)
- Radix UI primitives for accessible components
- TailwindCSS for styling with custom design tokens

**Design Philosophy**:
- Child-friendly interface inspired by Duolingo's gamification and Khan Academy's educational clarity
- Mobile-first responsive design targeting tablets and phones
- Playful yet structured learning environment with generous whitespace
- Typography: Inter/Nunito for readability, JetBrains Mono/Fira Code for code blocks

**State Management**:
- TanStack Query (React Query) for server state management
- No global state management (relies on server state and local component state)

**Routing**: Wouter for lightweight client-side routing

**Key Pages**:
- Home page with Hero section, Daily Dashboard, and Lesson Detail views
- Projects page with project catalog, filters, and project detail views
- Conditional rendering between lesson/project list and detailed views with proper state management

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful endpoints serving JSON

Lessons:
- `GET /api/lessons/daily` - Fetch today's lessons
- `GET /api/lessons/:id` - Fetch specific lesson details
- `POST /api/lessons/generate` - Trigger lesson generation for a date

Projects:
- `GET /api/projects` - Fetch all mini projects
- `GET /api/projects/:id` - Fetch specific project details
- `GET /api/user-projects/:userId/:projectId` - Get user's progress for a project
- `POST /api/user-projects` - Create new user project progress
- `PATCH /api/user-projects/:id` - Update user project progress (code, completed steps, status)

**Development Setup**: 
- Vite middleware integration for HMR in development
- Static file serving in production

**Error Handling**: Centralized error responses with appropriate HTTP status codes

**Logging**: Custom request/response logging middleware tracking API calls with duration metrics

### Data Storage

**Database**: PostgreSQL (configured for Neon serverless)

**ORM**: Drizzle ORM with TypeScript-first schema definitions

**Schema Design**:
- `users` table: Basic user authentication structure (id, username, password)
- `lessons` table: Core lesson content with fields:
  - Metadata: title, description, difficulty, duration, lesson number, lesson date
  - Content: full lesson content, code examples, exercise prompts, starter code, expected output
  - Optional icon URL for visual representation
  - Timestamps for tracking creation
- `projects` table: Mini project templates for hands-on practice:
  - Metadata: title, category, difficulty, estimated duration
  - Content: description, detailed steps array, starter code, example code, expected output
  - Optional icon URL for visual representation
  - Timestamps for tracking creation
- `user_projects` table: User progress tracking for projects:
  - Foreign keys: userId, projectId
  - Progress: completedSteps array, userCode, status (not_started/in_progress/completed)
  - Timestamps: startedAt, completedAt

**Connection Pooling**: Uses Neon's serverless connection pooling with WebSocket support

**Migration Strategy**: Drizzle Kit for schema migrations to `./migrations` directory

### AI Content Generation

**AI Provider**: Google Gemini 2.5 Flash API

**Content Generation Strategy**:
- Pre-defined lesson topics covering Python fundamentals (variables, conditionals, loops, lists, etc.)
- Structured prompts requesting JSON-formatted lesson content in Uzbek
- Each lesson includes: explanatory content, code examples with comments, interactive exercises, starter code, and expected outputs

**Daily Lesson Workflow**:
- Automated daily generation of 5 lessons
- Scheduled task (cron job) runs at 09:00 daily
- Lessons stored in database and distributed via web app and Telegram

**Content Structure**: Age-appropriate language targeting 10+ year olds with simple explanations and relatable examples

### External Dependencies

**Third-Party Services**:
- **Google Gemini API** (`@google/genai`): AI-powered lesson content generation
- **Telegram Bot API** (via `telegraf`): Lesson delivery through Telegram bot and channel
- **Neon Database**: Serverless PostgreSQL hosting

**Telegram Integration**:
- Bot commands: `/start`, `/daily`, `/lesson <ID>`, `/help`
- Channel broadcasting for daily lesson announcements
- Direct message support for interactive lesson retrieval

**Scheduling**: Node-cron for automated daily lesson generation tasks

**Development Tools**:
- Replit-specific plugins for runtime error overlay and development banner
- TypeScript for full type safety across client and server

**Key NPM Dependencies**:
- UI: React, TailwindCSS, Radix UI components
- Backend: Express, Drizzle ORM, Telegraf
- Build: Vite, ESBuild, TypeScript
- Utilities: date-fns for date handling, zod for schema validation, nanoid for ID generation

**Session Management**: PostgreSQL-based session store via `connect-pg-simple`

**Asset Handling**: Custom alias for attached assets directory containing generated images and documentation

## Recent Changes

### November 5, 2025 - Mini Projects Feature

**Added**: Complete mini projects system for hands-on Python practice

**Database Changes**:
- Added `projects` table with step-by-step project templates
- Added `user_projects` table for progress tracking
- Created seed data with 5 starter projects (games and practical tools)

**Backend Changes**:
- Implemented full CRUD API for projects management
- Added user progress tracking endpoints
- Created idempotent seed function for initial projects

**Frontend Changes**:
- Built ProjectsPage with grid layout and category filters
- Created ProjectDetail component with step-by-step guidance
- Integrated Monaco code editor for project exercises
- Added project cards with difficulty indicators and progress tracking
- Fixed navigation state management to properly handle view switching

**Seed Projects**:
1. Son topish o'yini (Number Guessing Game) - oson
2. Oddiy kalkulyator (Simple Calculator) - oson
3. Parol yaratuvchi (Password Generator) - o'rta
4. Tosh-Qaychi-Qog'oz o'yini (Rock-Paper-Scissors) - oson
5. To-Do List dasturi (To-Do List App) - o'rta

**Navigation**: Added "Loyihalar" button to header for easy access to projects catalog