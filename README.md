# Vote View

A website to help people get their local district ballot measures and candidates running for office, with a breakdown of positions and candidate platforms.

## Overview

Vote View helps Ohio residents (MVP scope) find and view:
- Local district ballot measures
- Candidates running for office
- Candidate platforms and positions
- Collapsible position breakdowns

## Architecture

### Tech Stack
- **Framework**: Astro 5 with TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Cloudflare (via `@astrojs/cloudflare` adapter)
- **Package Manager**: pnpm

### Project Structure

```
src/
├── pages/
│   ├── index.astro              # Homepage with location selector
│   ├── [state]/[district].astro # Dynamic route for ballot data (e.g., /oh/cuyahoga-2)
│   └── api/
│       └── lookup.ts            # API endpoint for zip code lookup
├── components/
│   ├── LocationSelector.astro   # Location selection (zip code or manual)
│   ├── BallotLayout.astro       # Reusable layout for ballot display
│   ├── Position.astro           # Collapsible position wrapper
│   ├── Candidate.astro          # Candidate wrapper component
│   ├── Platform.astro           # Platform text display
│   └── BallotMeasure.astro     # Ballot measure display
├── services/
│   └── ballotService.ts         # Abstracted API service layer
├── data/
│   └── mockOhioData.ts          # Mock data for Ohio districts
├── types/
│   └── ballot.ts                # TypeScript type definitions
└── styles/
    └── global.css               # Global styles (Tailwind import)
```

## Component Architecture

The project uses a **composable component structure** that allows for easy extension:

```
<Position title="Mayor" id="...">
  <Candidate name="John Doe" id="...">
    <Platform>
      Platform text here...
    </Platform>
  </Candidate>
</Position>
```

### Component Hierarchy
- **Position**: Collapsible wrapper that contains Candidate components via Astro slots
- **Candidate**: Wraps Platform component via slots
- **Platform**: Displays platform text (extensible for future features)
- **BallotMeasure**: Separate component for ballot measures

All entities include unique IDs for future extensibility (favorites, comparisons, sharing, etc.).

## URL Routing

The application uses URL-based routing with slugs:

- **Homepage**: `/` - Shows location selector
- **Ballot View**: `/[state]/[district]` - Displays ballot data
  - Example: `/oh/cuyahoga-2` for Cuyahoga County District 2
  - Example: `/oh/franklin-1` for Franklin County District 1

### Location Selection

Users can select their location via:
1. **Zip Code Lookup**: Enter a 5-digit zip code to find the district
2. **Manual Selection**: Choose state from dropdown, then select district

The LocationSelector component dynamically filters districts based on the selected state and navigates to the appropriate URL route.

## Data Structure

### Core Types

- **District**: Contains id, state, stateSlug, districtSlug, name, and zipCodes
- **Position**: Office or measure with id, title, description, and type
- **Candidate**: Contains id, name, positionId, and platform text
- **BallotMeasure**: Contains id, name, description, text, and districtId
- **BallotData**: Aggregates district, positions, candidates, and measures

### Service Layer

The `ballotService` provides an abstracted API layer that:
- Currently uses mock data for MVP
- Can be easily replaced with real API calls
- Provides methods for:
  - `getBallotData(district)`: Get all ballot data for a district
  - `findDistrictByZipCode(zipCode)`: Lookup district by zip
  - `getDistrictBySlugs(stateSlug, districtSlug)`: Get district by URL slugs
  - `getAllDistricts()`: Get all available districts
  - `getDistrictsByState(state)`: Filter districts by state

## MVP Scope

Currently focused on **Ohio** with mock data for:
- 3 sample districts (Franklin, Cuyahoga, Hamilton counties)
- Multiple positions (Mayor, City Council, School Board)
- 2-3 candidates per position with platform text
- 1-2 ballot measures per district

## Development

### Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build for production
pnpm preview    # Preview production build locally
```

### Key Features

- **Composable Components**: Easy to extend and modify
- **URL-based Routing**: Clean, shareable URLs
- **Responsive Design**: Mobile-friendly with Tailwind CSS
- **Accessible**: Semantic HTML and ARIA-friendly components
- **Type-safe**: Full TypeScript support

## Future Enhancements

The architecture is designed to support:
- Real API integration (replace mock data service)
- Additional states beyond Ohio
- Candidate photos, endorsements, voting history
- Issue-based position tracking
- Favorites and comparisons
- Social sharing
- Search functionality

## Technical Decisions

- **Single Responsibility Principle**: Each component has one clear purpose
- **Abstracted Service Layer**: Easy to swap mock data for real APIs
- **Composable Architecture**: Components can be nested and extended
- **URL-based State**: Shareable, bookmarkable ballot views
- **No @apply Directives**: Direct Tailwind classes for better maintainability
