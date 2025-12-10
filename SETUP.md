# Development Setup Guide

This guide will help you set up the BLT-Hackathon package for local development and test it in a Vite application.

## Prerequisites

Before you begin, make sure you have:

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- A code editor (VS Code recommended)
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/BLT-Hackathon-npm.git
cd BLT-Hackathon-npm
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- TypeScript
- React (dev dependency)
- Tailwind CSS
- Chart.js and react-chartjs-2 (dev dependencies)
- Build tools (tsup, etc.)

### 3. Understanding the Build Process

The package uses `tsup` for building. The build configuration is in `tsup.config.ts`:

```typescript
export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"], // Builds both ESM and CommonJS
  dts: true, // Generates TypeScript definitions
  external: ["react", "react-dom", "chart.js", "react-chartjs-2"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
```

### 4. Build the Package

```bash
npm run build
```

This command:

- Compiles TypeScript files
- Generates ESM (`dist/index.mjs`) and CJS (`dist/index.js`) bundles
- Creates type definition files (`dist/index.d.ts`)
- Minifies Tailwind CSS to `dist/styles.css`

### 5. Watch Mode (Optional)

For development, you can use watch mode to automatically rebuild on changes:

```bash
npx tsup --watch
```

## Testing in a Vite Application

### Method 1: Using npm link (Recommended for Development)

This method creates a symlink, so changes to the package are immediately reflected in your test app.

**Step 1: Link the Package**

In the BLT-Hackathon-npm directory:

```bash
npm link
```

**Step 2: Create a Test Vite App**

```bash
npm create vite@latest my-test-app -- --template react-ts
cd my-test-app
npm install
```

**Step 3: Install Required Dependencies**

```bash
npm install chart.js react-chartjs-2
```

**Step 4: Link the Package**

```bash
npm link blt-hackathon
```

**Step 5: Configure Vite**

Create or update `vite.config.ts`:

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

**Step 6: Use the Component**

Update `src/App.tsx`:

```tsx
import { BLTHackathon } from "blt-hackathon";
import "blt-hackathon/styles.css";

function App() {
  const config = {
    name: "Test Hackathon",
    description: "Testing the BLT-Hackathon package",
    rules: "Submit PRs to participate",
    startTime: "2024-01-01T00:00:00Z",
    endTime: "2024-12-31T23:59:59Z",
    github: {
      token: "your_github_token",
      repositories: ["owner/repo"],
    },
    prizes: [
      {
        position: 1,
        title: "First Place",
        description: "Winner prize",
        value: "$100",
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

**Step 7: Run the Test App**

```bash
npm run dev
```

Visit `http://localhost:5173` to see your changes.

### Method 2: Using Local File Path

This method installs the package from the local file system.

**Step 1: Build the Package**

In the BLT-Hackathon-npm directory:

```bash
npm run build
```

**Step 2: Install from Local Path**

In your test app:

```bash
npm install ../BLT-Hackathon-npm
```

**Note:** You'll need to rebuild and reinstall after each change.

### Method 3: Using npm pack

This method creates a tarball that can be installed like a real npm package.

**Step 1: Create Package Tarball**

In the BLT-Hackathon-npm directory:

```bash
npm pack
```

This creates a file like `blt-hackathon-1.0.0.tgz`.

**Step 2: Install the Tarball**

In your test app:

```bash
npm install ../BLT-Hackathon-npm/blt-hackathon-1.0.0.tgz
```

## Development Workflow

### Making Changes

1. **Edit Source Files**

   - Make changes in `src/` directory
   - Update types in `types/` if needed

2. **Build the Package**

   ```bash
   npm run build
   ```

3. **Test in Your App**

   - If using `npm link`, changes are automatic
   - If using file path, reinstall: `npm i ../BLT-Hackathon-npm`

4. **Verify Changes**
   - Check the test app in your browser
   - Look for console errors
   - Test all affected components

### Common Development Tasks

**Adding a New Component**

1. Create component file in `src/components/`
2. Export from `src/index.tsx`
3. Build and test

**Updating Types**

1. Edit type files in `types/` or `src/hooks/type.d.ts`
2. Rebuild to generate new type definitions
3. Verify TypeScript errors are resolved

**Modifying Styles**

1. Edit `src/styles/tailwind.css`
2. Rebuild (CSS is minified automatically)
3. Verify styles in test app

## Debugging

### Build Errors

**TypeScript Errors**

```bash
npx tsc --noEmit
```

This checks for type errors without building.

**Build Configuration Issues**

Check `tsup.config.ts` and ensure all external dependencies are listed.

### Runtime Errors

**"Invalid hook call" Error**

Make sure your Vite config includes:

```typescript
resolve: {
  dedupe: ['react', 'react-dom', 'chart.js', 'react-chartjs-2'],
}
```

**Module Not Found**

1. Verify the package is built: check `dist/` directory
2. Ensure `package.json` exports are correct
3. Try unlinking and relinking: `npm unlink blt-hackathon && npm link`

**Chart Not Rendering**

Ensure peer dependencies are installed in the test app:

```bash
npm install chart.js react-chartjs-2
```

### Checking Package Contents

To see what will be published:

```bash
npm pack --dry-run
```

## Testing Before Publishing

1. **Build the Package**

   ```bash
   npm run build
   ```

2. **Test in Multiple Scenarios**

   - Fresh Vite app
   - Existing React app
   - Different Node versions

3. **Verify Package Size**

   ```bash
   npm pack
   ls -lh blt-hackathon-*.tgz
   ```

4. **Check Type Definitions**
   - Import the package in a TypeScript file
   - Verify autocomplete works
   - Check for type errors

## Cleaning Up

**Remove npm link**

In the test app:

```bash
npm unlink blt-hackathon
npm install
```

In the package:

```bash
npm unlink
```

**Clean Build Files**

```bash
rm -rf dist/
npm run build
```

## Tips for Efficient Development

1. **Use Watch Mode**: Run `npx tsup --watch` in one terminal and your test app in another
2. **Keep Test App Simple**: Use minimal configuration to isolate issues
3. **Check Browser Console**: Look for errors and warnings
4. **Use React DevTools**: Inspect component props and state
5. **Test Edge Cases**: Empty data, missing fields, API errors

## Getting Help

If you encounter issues:

1. Check the [CONTRIBUTING.md](CONTRIBUTING.md) for code guidelines
2. Review the [README.md](README.md) for configuration help
3. Look for similar issues on GitHub
4. Ask in the discussion section

Happy developing!
