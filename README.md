# Ahoum Grocery App

A responsive frontend e-commerce prototype built for the Ahoum Frontend Developer Candidate Assignment. 

## Project Overview
This application is a mock grocery delivery storefront. It demonstrates complex frontend state management, responsive UI design, and asynchronous API handling (including stale response protection) entirely in the browser using a mock JSON data layer.

## Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Routing:** React Router

## Setup Instructions
1. Ensure you have Node.js installed (v18+ recommended).
2. Clone or download this repository.
3. Navigate to the project folder in your terminal:
   ```bash
   cd responsive-grocery-app
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```

## Run Instructions
Start the local Vite development server:
```bash
npm run dev
```
Open the provided local URL (typically `http://localhost:5173`) in your browser.

## Architecture Summary
The project follows a modular, feature-separated architecture:
- `src/components/`: Reusable UI elements (`ProductCard`, `Layout` navbar).
- `src/pages/`: Main route views (`Home`, `Cart`, `Checkout`, `ProductDetail`).
- `src/store/`: Zustand global state management (`cartStore.ts`) with localStorage persistence and validation logic.
- `src/services/`: Mock API layer that simulates network latency and handles searching/fetching.
- `src/hooks/`: Custom React hooks, including `useSearchProducts` which implements a cleanup pattern to prevent stale response race conditions.
- `src/data/`: Static `products.json` acting as the mock database.

## Known Limitations
- **Mock Data Only:** The checkout process is simulated. No real payments are processed.
- **Cart Sync on Load:** The cart synchronizes with the "server" (JSON file) on initial app load. If a product price changes on the server *while* the user is actively browsing without refreshing, they will see the old price until they refresh. Realtime WebSockets would solve this in a production app.
- **Local Images:** Some product images rely on Unsplash URLs which require an internet connection to render.

## What I would improve with another day
1. **Debouncing:** Add a `useDebounce` hook to the search bar so it waits 300ms after the user stops typing before hitting the mock API. This saves network bandwidth.
2. **Animations & Polish:** Add Framer Motion to animate items sliding in and out of the cart, and create a more complex skeleton loading cascade.
3. **Pagination:** The current mock API returns all products. For a real app, I would implement cursor-based pagination or infinite scroll for the Home catalog.
4. **Toast Notifications:** Add a global toast system to give the user immediate visual feedback when an item is added to the cart (instead of relying entirely on the nav badge).
