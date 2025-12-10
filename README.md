# BLT-Hackathon

A plug-and-play React component library for creating beautiful hackathon dashboards powered by GitHub data. Display leaderboards, track pull requests, showcase sponsors, and more with minimal setup.

## About

BLT-Hackathon is a ready-to-use npm package that transforms your GitHub repository activity into an interactive hackathon dashboard. Simply provide your configuration, and the package handles everything from fetching GitHub data to rendering beautiful, responsive components.

Perfect for organizing hackathons, coding competitions, or open-source contribution events.

## Installation

```bash
npm install blt-hackathon chart.js react-chartjs-2
```

The package requires `chart.js` and `react-chartjs-2` as peer dependencies for chart functionality.

## Quick Start

```tsx
import { BLTHackathon } from "blt-hackathon";
import "blt-hackathon/styles.css";

function App() {
  const config = {
    name: "My Awesome Hackathon",
    description: "Join us for an exciting coding challenge!",
    rules: "Submit PRs to any of the listed repositories during the hackathon period.",
    startTime: "2024-01-01T00:00:00Z",
    endTime: "2024-01-31T23:59:59Z",
    github: {
      token: "your_github_token_here",
      repositories: ["owner/repo1", "owner/repo2"],
    },
    prizes: [
      {
        position: 1,
        title: "First Place",
        description: "Amazing prize for the winner",
        value: "$500",
      },
    ],
    display: {
      showRepoStats: true,
      maxLeaderboardEntries: 10,
      showPRsInLeaderboard: true,
    },
  };

  return <BLTHackathon config={config} />;
}
```

## Configuration

### Required Fields

| Field                 | Type     | Description                                  |
| --------------------- | -------- | -------------------------------------------- |
| `name`                | string   | Hackathon name                               |
| `startTime`           | string   | Start date in ISO 8601 format                |
| `endTime`             | string   | End date in ISO 8601 format                  |
| `github.token`        | string   | GitHub personal access token                 |
| `github.repositories` | string[] | Array of repositories in "owner/repo" format |
| `prizes`              | Prize[]  | Array of prize objects                       |
| `display`             | object   | Display configuration options                |

### Optional Fields

| Field         | Type      | Description              |
| ------------- | --------- | ------------------------ |
| `description` | string    | Hackathon description    |
| `rules`       | string    | Hackathon rules          |
| `sponsors`    | Sponsor[] | Array of sponsor objects |
| `sponsorNote` | string    | Note about sponsorship   |
| `sponsorLink` | string    | Link to become a sponsor |

### Prize Object

```typescript
{
  position: number;        // 1, 2, 3, etc.
  title: string;          // "First Place"
  description: string;    // Prize description
  value?: string;         // "$500" (optional)
}
```

### Sponsor Object

```typescript
{
  name: string; // Sponsor name
  level: "platinum" | "gold" | "silver" | "bronze" | "partner";
  logo: string; // URL to logo image
  website: string; // Sponsor website URL
}
```

### Display Options

```typescript
{
  showRepoStats: boolean; // Show PR/issue counts per repository
  maxLeaderboardEntries: number; // Maximum entries in leaderboards
  showPRsInLeaderboard: boolean; // Show PR list in leaderboard cards
}
```

## GitHub Token Setup

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (for private repos) or `public_repo` (for public repos only)
4. Copy the token and add it to your configuration

**Important:** Never commit your GitHub token to version control. Use environment variables:

```tsx
github: {
  token: process.env.REACT_APP_GITHUB_TOKEN,
  repositories: ["owner/repo"],
}
```

## Components Included

The package automatically renders:

- **Header** - Navigation with hackathon status (Upcoming/Ongoing/Ended)
- **Banner** - Hackathon name, dates, and countdown timer
- **Stats** - Participant count, PRs, issues, and repository count
- **PR Activity Chart** - Stacked bar chart showing merged PRs by repository over time
- **Description** - Hackathon description and rules
- **Repositories** - List of participating repositories with stats
- **Prizes** - Prize tiers with descriptions
- **PR Leaderboard** - Top contributors by merged PRs
- **Review Leaderboard** - Top reviewers by review count
- **Sponsors** - Sponsor showcase grouped by tier
- **Footer** - Footer with links

## Troubleshooting

### "Invalid hook call" Error

This error occurs when there are multiple React instances. Make sure:

1. Your Vite config includes React deduplication:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "chart.js", "react-chartjs-2"],
  },
});
```

2. The package is installed correctly with peer dependencies

### No Data Showing

Check that:

1. Your GitHub token has the correct permissions
2. Repository names are in "owner/repo" format
3. The date range includes activity (PRs, issues, reviews)
4. Your token hasn't expired

### Chart Not Rendering

Ensure you've installed the required peer dependencies:

```bash
npm install chart.js react-chartjs-2
```

### TypeScript Errors

The package includes TypeScript definitions. If you encounter type errors, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Browser Support

The package supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Support

For issues, questions, or contributions, please visit the GitHub repository.
