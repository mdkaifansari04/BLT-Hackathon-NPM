# BLT-Hackathon NPM Package - Pull Request

## What This PR Does

This PR introduces **blt-hackathon**, a plug-and-play React component library that creates beautiful hackathon dashboards powered by GitHub data.

## Key Features

- **Zero Configuration Needed** - Just provide your GitHub token and repository list
- **Automatic Data Fetching** - Pulls PRs, issues, and reviews from GitHub API
- **Beautiful UI Components** - Pre-built leaderboards, charts, and stats
- **Progressive Loading** - Skeleton loaders for better UX
- **Fully Typed** - Complete TypeScript support
- **Responsive Design** - Works on all screen sizes

## What's Included

### Components

- PR and Review Leaderboards
- Activity Charts (stacked bar chart by repository)
- Repository Stats
- Prize Showcase
- Sponsor Display
- Real-time Countdown Timer

### Features

- Tracks merged PRs and reviews
- Calculates participant rankings
- Shows hackathon status (Upcoming/Ongoing/Ended)
- Displays contribution history

## How to Test

### 1. Install the Package

```bash
npm install blt-hackathon chart.js react-chartjs-2
```

### 2. Create a Test App

```bash
npm create vite@latest test-app -- --template react-ts
cd test-app
npm install
npm install blt-hackathon chart.js react-chartjs-2
```

### 3. Configure Vite

Update `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "chart.js", "react-chartjs-2"],
  },
});
```

### 4. Use the Component

Update `src/App.tsx`:

```tsx
import { BLTHackathon } from "blt-hackathon";
import "blt-hackathon/styles.css";

function App() {
  const config = {
    name: "Test Hackathon 2024",
    description: "A test hackathon to showcase the BLT-Hackathon package",
    rules: "Submit PRs to any listed repository during the hackathon period",
    startTime: "2024-01-01T00:00:00Z",
    endTime: "2024-12-31T23:59:59Z",
    github: {
      token: "your_github_token_here", // Get from GitHub Settings > Developer settings
      repositories: ["OWASP-BLT/BLT"], // Replace with your repos
    },
    prizes: [
      {
        position: 1,
        title: "First Place",
        description: "Best contributor",
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

export default App;
```

### 5. Get a GitHub Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate new token (classic)
3. Select scope: `public_repo` (for public repos)
4. Copy the token

### 6. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` to see the dashboard.

## Testing Checklist

- [ ] Install package successfully
- [ ] Import component without errors
- [ ] Configure with your GitHub token
- [ ] See loading skeletons appear
- [ ] Data loads and displays correctly
- [ ] Leaderboards show participants
- [ ] Charts render properly
- [ ] Responsive on mobile
- [ ] No console errors

## Expected Behavior

**On Load:**

- Shows skeleton loaders for data-dependent components
- Static content (banner, description, prizes) renders immediately

**After Data Loads:**

- PR Activity Chart shows merged PRs over time
- PR Leaderboard displays top contributors
- Review Leaderboard shows top reviewers
- Repository stats appear
- All data is accurate

## Common Issues & Solutions

**"Invalid hook call" error:**

- Make sure Vite config includes `dedupe` for React and chart.js

**No data showing:**

- Verify GitHub token has correct permissions
- Check repository names are in "owner/repo" format
- Ensure date range includes activity

**Chart not rendering:**

- Confirm `chart.js` and `react-chartjs-2` are installed

## Documentation

- [README.md](README.md) - Full package documentation
- [SETUP.md](SETUP.md) - Development setup guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

## Screenshots

(Add screenshots of the dashboard here)

## Questions?

If you encounter any issues while testing, please comment on this PR or open an issue.

---

**Ready to merge?** Please test the package and provide feedback!
