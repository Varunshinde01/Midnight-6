# Developer Setup Guide — GovBid Midnight Level 6

Follow these instructions to set up, test, build, and run **GovBid Midnight** locally.

---

## Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Git**: Installed and configured

---

## Quickstart Steps

```bash
# 1. Clone Repository & Navigate to Folder
git clone https://github.com/Varunshinde01/Midnight-6.git
cd Midnight-6

# 2. Install Project Dependencies
npm install

# 3. Run Vitest Unit Test Suite (15 passing tests)
npm test

# 4. Execute Production Build Verification
npm run build

# 5. Launch Development Server
npm run dev
```

---

## Available Scripts

- `npm run dev`: Starts local Vite dev server at `http://localhost:5173`.
- `npm test`: Runs Vitest test suite (`preprodUsers`, `feedback`, `procurement`).
- `npm run build`: Compiles TypeScript and builds production distribution bundle in `dist/`.
- `npm run preview`: Previews the production build locally.
