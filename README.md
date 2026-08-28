# Ahoum Grocery Delivery

## Overview

A mobile-first React grocery delivery prototype built for the Ahoum Frontend Developer Candidate Assignment. It follows the supplied Nectar-style Figma flow while preserving a responsive desktop adaptation and resilient client-side state.

## Features

- Splash, onboarding, sign-in, phone, OTP, location, login, and signup entry flow.
- Mobile-first Home catalog with promotional, offer, category, and product sections.
- Category browsing and product detail pages.
- Search with variable-latency mock API and stale-response protection.
- Zustand cart with persistence, stock limits, and fresh-data reconciliation.
- Persisted favorites.
- Checkout with success and failure result routes.
- Loading skeletons, empty states, and request error/retry states.
- Fixed mobile bottom navigation with cart count.
- Responsive desktop navigation, grids, cart, and checkout layout, with Shop, Explore, Favourite, Account, and Cart actions.
- Account access page with Login and Sign Up actions that open the existing sign-in flow.
- Clickable delivery address on Home that opens the existing location form and updates from persisted session data.
- Auto-rotating Home promotional banners with product imagery, offers, and coming-soon messaging every five seconds.
- Keyboard-accessible links, controls, form labels, and visible focus states.

## Tech Stack

- React 19
- Vite
- TypeScript strict mode
- Tailwind CSS v4
- Zustand
- React Router
- Lucide React

## Getting Started

Repository: `grocery-delivery`

```bash
git clone https://github.com/RaviTeja1864/grocery-delivery.git
cd grocery-delivery
npm install
npm run dev
```

Validation commands:

```bash
npm run build
npm run lint
```

## Routes

Storefront: `/`, `/explore`, `/category/:category`, `/search`, `/product/:id`, `/cart`, `/favorites`, `/account`, `/checkout`, `/checkout/success`, `/checkout/failure`.

Entry flow: `/splash`, `/onboarding`, `/signin`, `/phone`, `/verification`, `/location`, `/login`, `/signup`.

## Architecture

- `src/components/`: Layout, mobile navigation, product cards, category tiles, section headers, and horizontal product rows.
- `src/pages/`: Route-level storefront and authentication screens.
- `src/store/`: Separate persisted Zustand stores for cart, favorites, and session/location state.
- `src/services/api.ts`: Mock product API with variable latency.
- `src/hooks/useSearchProducts.ts`: Async search state and stale-response protection.
- `src/data/products.json`: Canonical 32-product catalog.
- `public/products/`: Local product imagery used by canonical records.

## State Management

Cart state is kept in `cartStore.ts`. It supports add, remove, quantity updates, persistence, stock limits, and `syncCart` reconciliation. Favorites and entry/location session state use separate persisted Zustand stores. No backend or Context API is used.

## Search Architecture

Search input updates `useSearchProducts`, which calls the mock API. The API simulates 200-1200ms latency. The hook marks its previous effect as stale during cleanup, so an older response cannot overwrite a newer query. Home and Search expose explicit retry actions.

## Cart Persistence

Persisted cart snapshots render immediately, then fresh API data reconciles them. Unknown or zero-stock products are removed, current product fields and prices replace stale values, and quantities are capped to current stock. Quantity updates never allow values below one.

## Responsive Design

Mobile uses compact cards, horizontal product rows, a fixed five-item bottom nav, and a padded scroll area so content is not covered. Desktop uses centered max-width containers, navigation links, four-column product grids where space permits, and a side-by-side sticky cart summary.

## UX States

Data-driven screens provide skeleton loading states, empty states for carts/search/favorites/categories, and meaningful request error states with functional Retry buttons.

## Accessibility

Primary interactions use semantic links, buttons, labels, `aria-label` values where needed, keyboard focus styles, and accessible quantity, favorite, cart, and navigation controls.

## Testing / Verification

- `npm run build` passes.
- `npm run lint` passes.
- Catalog audit verifies 32 unique IDs, required fields, local image paths, and existing image files.
- Browser checks covered the authentication flow, Home, mobile bottom navigation destinations, Account access, address selection, cart count, product routes, promotional banners, and local image loading.
- Stale search protection is reproducibly exercised by changing queries quickly; the hook logs `[Stale Response Prevented]` for a cleaned-up request. No deterministic automated test is currently committed.

## Known Limitations

- Product data and checkout are mocked; no backend or real payment provider exists.
- The demo OTP is fixed at `1234`.
- Exact original Figma assets were not available, so local visually appropriate grocery images and a reusable logo approximation are used.
- Stale-response verification is a reproducible browser check rather than an automated test.

## What I Would Improve With Another Day

1. Add deterministic unit tests for stale search ordering and cart reconciliation.
2. Add a real filter screen with multiple persisted filter dimensions.
3. Refine typography and spacing against pixel-level Figma measurements.
4. Add product image optimization and responsive image sources.
5. Add checkout form validation and a mock order service with retryable failures.
