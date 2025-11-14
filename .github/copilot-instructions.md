# AutoBit Frontend - AI Coding Instructions

## Project Overview
**AutoBit** is a React + Vite + Tailwind CSS financial market dashboard UI. It displays live market data (Forex prices) in a responsive, dark-mode-enabled layout with a sidebar navigation and card-based market grid.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Lucide React (icons), React Country Flag

## Architecture Patterns

### Component Structure
- **Single-page layout**: `App.jsx` is the root component managing global state (dark mode, active tab)
- **Sidebar**: Responsive navigation hidden on mobile (`hidden md:flex`), includes tab buttons ("Favourites", "Forex", "Crypto") and nav buttons
- **Main content**: Market grid displaying `MarketCard` components in responsive 3-column layout on desktop
- **MarketCard**: Presentational component for market data with currency flag icons and price formatting

### Data Flow
- Static mock data: `App.jsx` generates 10 mock market items with properties: `time`, `pair`, `price1`, `price2`, `change`, `low`, `high`, `id`
- No external API integration yet (intended for future expansion)
- Tab clicks and sidebar clicks show placeholder message: "It wasn't the part of the assignment"

### Dark Mode Implementation
- **CSS-based toggle**: Controlled via `dark` state in App.jsx
- **Class-based strategy**: Adds/removes `dark` class on `document.documentElement`
- **Tailwind config**: Uses `darkMode: "class"` (required in `tailwind.config.cjs`)
- **Conditional styling**: Dark variants applied throughout (e.g., `dark:bg-slate-800`, `dark:text-white`)
- **Persistent preference**: Checks system preference on load: `window.matchMedia("(prefers-color-scheme: dark)").matches`

## Development Workflow

### Commands
```bash
npm run dev       # Start Vite dev server (hot reload enabled)
npm run build     # Production build to /dist
npm run preview   # Preview built output locally
```

### Key Configuration Files
- **`vite.config.js`** (auto-generated): Vite defaults, no overrides needed
- **`tailwind.config.cjs`**: Must keep `darkMode: "class"` for dark mode
- **`postcss.config.cjs`**: Autoprefixer + Tailwind integration (required for Tailwind)
- **`index.html`**: Entry point with `<div id="root">` mount point

## Code Conventions & Patterns

### Styling Approach
- **Tailwind-first**: All styling via Tailwind classes, no CSS modules or styled-components
- **Responsive breakpoints**: Mobile-first (`md:` for 768px+, `lg:` for 1024px+)
- **Color palette**: Slate-based grays (`slate-50`, `slate-900`), accent colors (green/red for gains/losses, yellow/orange/purple for theme toggle)
- **Spacing**: Consistent use of `gap-` and padding classes (e.g., `p-6`, `px-4 py-2`)

### Component Patterns
- **Functional components**: All React components use function syntax
- **Inline state**: `useState` for component-local state (dark mode, tab selection)
- **Effect side effects**: `useEffect` for DOM updates tied to state changes (e.g., updating `dark` class)
- **Props spreading**: `MarketCard` destructures props (`{time, pair, price1, ...}`) directly as parameters

### Reusable Logic
- **SidebarButton**: Helper component for nav items with icon + label + click handler
- **Currency mapping**: `MarketCard` uses hardcoded object: `{ EUR: "EU", GBP: "GB", ... }` to convert currency codes to React Country Flag country codes
- **Price formatting**: Manual string manipulation to highlight the last digit of price1 (e.g., "1478.256" → "147" + highlight "8.256")
- **Change indicator**: Parses `change` string to determine if positive (green) or negative (red)

## Integration Points

### External Dependencies
- **`lucide-react`**: Icon library for Home, LineChart, History, User, Sun, Moon icons
- **`react-country-flag`**: SVG flag component (requires `countryCode` prop, e.g., "EU" for Europe)

### Styling Dependencies
- **`autoprefixer`**: Automatically adds vendor prefixes (configured in postcss.config.cjs)
- **`postcss`**: CSS transformation pipeline

## Future Expansion Notes
- API integration: Replace mock `items` with real market data from a service
- Tab functionality: "Favourites" and "Crypto" tabs currently show placeholder message
- Sidebar navigation: Same for "Trade", "History", "Profile" buttons
- State management: Consider Redux/Context API if data complexity grows
