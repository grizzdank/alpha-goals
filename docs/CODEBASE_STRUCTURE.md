# Codebase Structure

This document outlines the organization and structure of our React + Vite goal-tracking application.

## Directory Structure

```
.
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── mission/     # Mission and vision components
│   │   ├── sprint/      # Sprint management components
│   │   └── ui/          # Shared UI components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations
│   └── services/        # Business logic and API calls
├── docs/                # Documentation
│   ├── CODEBASE_STRUCTURE.md
│   └── project_requirements_document.md
├── public/              # Static assets
├── scripts/            # Build and utility scripts
├── supabase/           # Supabase configuration and types
└── config files        # Various configuration files
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── eslint.config.js
```

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth

## Component Organization

### Mission Components (`src/components/mission/`)
Mission components handle the user's mission statement, vision goals, and ikigai components:
- `MissionContainer.tsx` - Main container for mission-related features
- `MissionHeader.tsx` - Displays mission statement and vision goals
- `MissionDialog.tsx` - Dialog for editing mission details
- `EditMissionDialog.tsx` - Form for editing mission statement

### Sprint Components (`src/components/sprint/`)
Sprint components manage sprint planning, tracking, and reviews:
- `CurrentSprintView.tsx` - Displays current sprint status and objectives
- `SprintProgressView.tsx` - Shows sprint progress
- `SprintObjectivesList.tsx` - Lists and manages sprint objectives
- `SprintArchive.tsx` - Displays completed sprints
- `AlphaScoreRecorder.tsx` - Records alpha scores for sprint reviews
- `CreateSprintDialog.tsx` - Creates new sprints
- `SprintEdit.tsx` - Edits existing sprints
- `HabitForm.tsx` - Manages sprint-related habits

### UI Components (`src/components/ui/`)
Reusable UI components following the shadcn/ui pattern:
- `button.tsx` - Button component
- `card.tsx` - Card component
- `progress.tsx` - Progress bar component
- `toast.tsx` - Toast notifications

## Services (`src/services/`)

### Database Services
Each service module handles specific domain operations:
- `missionService.ts` - Mission and vision goal operations
- `sprintService.ts` - Sprint management operations
- `alphaScoreService.ts` - Alpha score recording and retrieval

## Authentication

Authentication is handled through Supabase:
- `contexts/auth/` - Authentication context provider
- `hooks/use-auth.ts` - Custom hook for auth state
- `integrations/supabase/` - Supabase client configuration

## Routing

The application uses React Router DOM for routing:
- Routes are defined in the root App component
- Each major feature has its own route
- Protected routes are wrapped with authentication checks

## Best Practices

1. **Component Organization**
   - Group components by feature (mission, sprint)
   - Keep UI components separate and reusable
   - Use clear, descriptive file names

2. **Type Safety**
   - Use TypeScript types from Supabase schema
   - Define clear interfaces for props
   - Avoid using `any` type

3. **State Management**
   - Use React hooks for local state
   - Use contexts for shared state (auth)
   - Keep state close to where it's used

4. **Error Handling**
   - Use toast notifications for user feedback
   - Implement proper error boundaries
   - Log errors appropriately

5. **Performance**
   - Implement loading states
   - Use proper dependency arrays in hooks
   - Optimize database queries

## Development Workflow

1. **Local Development**
   ```bash
   npm install    # Install dependencies
   npm run dev    # Start development server
   ```

2. **Building**
   ```bash
   npm run build  # Build for production
   npm run serve  # Preview production build
   ```

3. **Testing**
   ```bash
   npm run test   # Run tests
   npm run lint   # Run linter
   ```

## Future Improvements

1. Consider adding:
   - Unit tests directory
   - E2E tests directory
   - Storybook for component documentation
   - API documentation
   - Migration scripts directory

2. Potential reorganization:
   - Move types to a dedicated types directory
   - Add constants directory for shared constants
   - Consider feature-based directory structure 