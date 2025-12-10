# Contributing to BLT-Hackathon

Thank you for your interest in contributing to BLT-Hackathon! This guide will help you understand the project structure and how to contribute effectively.

## Repository Structure

```
BLT-Hackathon-npm/
├── src/
│   ├── components/          # React components
│   │   ├── leaderboard/     # Leaderboard components
│   │   │   ├── pr-leaderboard.tsx
│   │   │   ├── review-leaderboard.tsx
│   │   │   └── sponser-leaderboard.tsx
│   │   ├── shared/          # Shared components
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── banner.tsx
│   │   ├── blt-hackathon.tsx    # Main component
│   │   ├── description.tsx
│   │   ├── pr-activity-chart.tsx
│   │   ├── prizes.tsx
│   │   ├── repository.tsx
│   │   └── stats.tsx
│   ├── hooks/               # Custom hooks and utilities
│   │   ├── type.d.ts        # Type definitions
│   │   └── useGithubApi.ts  # GitHub API integration
│   ├── styles/              # Styling
│   │   └── tailwind.css
│   └── index.tsx            # Package entry point
├── types/                   # TypeScript type definitions
│   ├── config.d.ts          # Configuration types
│   └── github/              # GitHub API types
│       ├── issue.d.ts
│       ├── pr.d.ts
│       ├── review.d.ts
│       └── user.d.ts
├── dist/                    # Built package (generated)
├── tsup.config.ts           # Build configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Package metadata
```

## Main Files Explained

### Core Components

**`src/components/blt-hackathon.tsx`**

- Main component that orchestrates the entire dashboard
- Fetches data from GitHub API
- Manages state for PRs, issues, reviews, and statistics
- Renders all child components with appropriate props

**`src/hooks/useGithubApi.ts`**

- Handles all GitHub API interactions
- Processes PR, issue, and review data
- Generates leaderboards and statistics
- Implements caching to reduce API calls

### Component Categories

**Leaderboard Components** (`src/components/leaderboard/`)

- `pr-leaderboard.tsx` - Displays top contributors by merged PRs
- `review-leaderboard.tsx` - Shows top reviewers by review count
- `sponser-leaderboard.tsx` - Showcases sponsors grouped by tier

**Data Display Components**

- `pr-activity-chart.tsx` - Stacked bar chart for PR activity over time
- `stats.tsx` - Summary statistics cards
- `repository.tsx` - Repository list with stats
- `prizes.tsx` - Prize showcase

**Information Components**

- `banner.tsx` - Hackathon header with dates and countdown
- `description.tsx` - Hackathon description and rules
- `header.tsx` - Navigation bar with status badge
- `footer.tsx` - Footer section

### Type Definitions

**`types/config.d.ts`**

- Defines the configuration interface for the hackathon
- Includes Prize and Sponsor interfaces

**`src/hooks/type.d.ts`**

- Internal type definitions for data processing
- Leaderboard entry types
- Statistics interfaces

**`types/github/`**

- Type definitions for GitHub API responses
- Ensures type safety when working with GitHub data

## Development Workflow

### 1. Setting Up

See [SETUP.md](SETUP.md) for detailed setup instructions.

### 2. Making Changes

**For New Features:**

1. Create a new branch from `main`
2. Implement your feature in the appropriate component
3. Update types if needed
4. Test your changes locally
5. Build the package and test in a sample app

**For Bug Fixes:**

1. Identify the affected component
2. Write a test case that reproduces the bug
3. Fix the issue
4. Verify the fix works
5. Test the build

### 3. Code Style

**TypeScript**

- Use TypeScript for all new code
- Define proper interfaces for props and data structures
- Avoid using `any` type

**React Components**

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

**Naming Conventions**

- Components: PascalCase (e.g., `PrActivityChart`)
- Files: kebab-case (e.g., `pr-activity-chart.tsx`)
- Functions: camelCase (e.g., `generateLeaderboard`)
- Interfaces: PascalCase with descriptive names (e.g., `LeaderboardEntry`)

### 4. Testing Guidelines

**Manual Testing**

1. Build the package: `npm run build`
2. Link to a test app: `npm link`
3. In test app: `npm link blt-hackathon`
4. Test all components render correctly
5. Verify data fetching works
6. Check responsive design

**Testing Checklist**

- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] Data fetching works correctly
- [ ] Loading states are handled
- [ ] Empty states are displayed when appropriate
- [ ] Responsive design works on mobile
- [ ] No console errors or warnings

### 5. Building

```bash
npm run build
```

This command:

- Compiles TypeScript to JavaScript
- Generates ESM and CJS bundles
- Creates type definition files
- Minifies CSS

## Adding New Components

1. Create component file in appropriate directory
2. Define TypeScript interface for props
3. Implement component logic
4. Export component from `src/index.tsx`
5. Update types if needed
6. Test the component
7. Update documentation

Example:

```tsx
// src/components/my-component.tsx
import React from "react";

interface MyComponentProps {
  data: string;
}

function MyComponent(props: MyComponentProps) {
  return <div>{props.data}</div>;
}

export default MyComponent;
```

## Modifying GitHub API Integration

The GitHub API logic is in `src/hooks/useGithubApi.ts`. When modifying:

1. Understand the existing data flow
2. Maintain backward compatibility
3. Update type definitions
4. Handle API rate limits
5. Implement proper error handling
6. Add caching for expensive operations

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Update documentation if needed
6. Submit a pull request with a clear description

**PR Description Should Include:**

- What changes were made
- Why the changes were necessary
- How to test the changes
- Any breaking changes

## Questions or Issues?

If you have questions or run into issues:

- Check existing issues on GitHub
- Review the documentation
- Ask in the discussion section

Thank you for contributing to BLT-Hackathon!
