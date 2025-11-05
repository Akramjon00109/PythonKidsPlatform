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
- Conditional rendering between lesson list and detailed lesson view

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful endpoints serving JSON
- `GET /api/lessons/daily` - Fetch today's lessons
- `GET /api/lessons/:id` - Fetch specific lesson details
- `POST /api/lessons/generate` - Trigger lesson generation for a date

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