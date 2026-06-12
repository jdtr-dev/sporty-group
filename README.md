# Sporty Group - React Application

A React application for browsing and exploring sports leagues, built with React 19, TypeScript, Vite, and comprehensive unit testing using Jest and React Testing Library.

## 📋 Project Overview

This project provides a user-friendly interface to:
- Browse sports leagues across different categories
- Search for specific leagues
- View league details and season badges
- Filter leagues by sport category

### Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Bulma CSS** - Styling framework
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

## 📦 Available Scripts

### Development

```bash
# Start development server with hot module replacement
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm test:watch

# Generate coverage report
npm test:coverage
```

### Linting

```bash
# Check code quality
npm run lint
```

### Preview

```bash
# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── BadgeModal/      # Modal for displaying league badges
│   ├── DropdownLeague/  # Category selector dropdown
│   ├── ListLeague/      # Main league list table
│   ├── NavBar/          # Navigation header
│   └── SearchLeague/    # League search input
├── pages/               # Page components
│   └── LeaguePage.jsx   # Main page layout
├── services/            # API services
│   └── leaguesApi.js    # League data fetching
├── App.tsx              # Root component
└── main.tsx             # Application entry point
```

## 🧪 Testing

This project includes comprehensive unit tests for all components using Jest and React Testing Library.

### Test Coverage

- **NavBar** (4 tests) - Navigation component rendering and styling
- **BadgeModal** (7 tests) - Modal visibility, content, and user interactions
- **SearchLeague** (6 tests) - Search input functionality and value updates
- **DropdownLeague** (10 tests) - Dropdown toggle, selection, and filtering
- **ListLeague** (14 tests) - Table rendering, filtering, API integration, and loading states

**Total: 41 tests - All passing ✅**

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

### Test Examples

#### Component Rendering
```jsx
test('renders without crashing', () => {
  render(<NavBar />);
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
```

#### User Interactions
```jsx
test('calls setCategory when category is clicked', async () => {
  const user = userEvent.setup();
  render(<DropdownLeague {...props} />);
  
  const items = screen.getAllByRole('link');
  await user.click(items[0]);
  
  expect(setCategory).toHaveBeenCalled();
});
```

#### API Mocking
```jsx
test('shows badge modal with fetched data', async () => {
  leaguesApi.fetchSeasonBadge.mockResolvedValue({
    seasons: [{ strBadge: 'https://example.com/badge.png' }]
  });
  
  // ... render and interact
  expect(screen.getByTestId('badge-modal')).toBeInTheDocument();
});
```

## 🔧 Components

### NavBar
Displays the Sporty Group logo and navigation header with proper accessibility attributes.

**Features:**
- Logo image from Sporty Group CDN
- Centered layout using Bulma CSS
- Semantic navigation element

### SearchLeague
Input field for filtering leagues by name in real-time.

**Props:**
- `value` - Current search term
- `onChange` - Callback when search input changes

### DropdownLeague
Dropdown selector for filtering leagues by sport category.

**Props:**
- `categories` - Array of available categories
- `category` - Currently selected category
- `setCategory` - Callback to update selected category

### ListLeague
Main table displaying all leagues with filtering and badge viewing functionality.

**Props:**
- `leagues` - Array of league objects
- `search` - Search filter term

**Features:**
- Responsive table layout
- Real-time search filtering (case-insensitive)
- Modal popup for viewing league badges
- Loading states during API calls
- Error handling

### BadgeModal
Modal dialog for displaying league season badges.

**Props:**
- `imagen` - Badge image URL
- `seasonYears` - Season display text
- `isOpen` - Modal visibility state
- `onClose` - Callback when modal should close

## 🔌 API Integration

The application integrates with an external sports API for fetching league data and season badges.

### Services

**leaguesApi.js**
- `fetchSeasonBadge(leagueId)` - Fetch season badge data for a specific league

All API calls are properly mocked in tests for reliable, fast test execution.

## 📝 Development Notes

### Code Quality

- ESLint configured for code consistency
- React best practices followed
- Proper error handling in async operations
- Accessibility attributes implemented (aria-label, role attributes)

### Performance

- Vite provides fast build times and HMR
- Component lazy loading ready
- Optimized rendering with proper key usage
- Memoization opportunities identified

## 🐛 Troubleshooting

### Tests not running
```bash
# Clear Jest cache and reinstall
npm run test -- --clearCache
npm install
npm test
```

### Port 5173 already in use
```bash
# Specify a different port
npm run dev -- --port 3000
```

### Module resolution issues
```bash
# Clean node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is private and maintained by Sporty Group.

## 👥 Contributing

When adding new components:
1. Create component directory with JSX file
2. Create corresponding `.test.jsx` file with comprehensive tests
3. Update this README with component documentation
4. Ensure all tests pass: `npm test`
5. Check linting: `npm run lint`
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
