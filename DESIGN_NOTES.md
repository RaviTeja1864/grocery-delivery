# Design Notes

## Decision 1 - Mobile-first navigation

### Problem
The Figma uses a fixed five-item mobile navigation while desktop needs more horizontal space and a different interaction pattern.

### Decision
`MobileBottomNav` renders Shop, Explore, Cart, Favourite, and Account with Lucide line icons. It is fixed to the mobile viewport, hidden at the `md` breakpoint, and the shared `Layout` keeps a separate desktop navigation row.

### Reasoning
The fixed bar keeps the primary grocery destinations available during vertical browsing. Route-aware matching also keeps product, category, and search pages associated with their parent destination.

### Trade-off
Mobile content needs bottom padding, and the navigation consumes some viewport height. Desktop gets a lighter header instead of duplicating the mobile bar.

## Decision 2 - Responsive product layout

### Problem
The reference uses compact horizontally browsable product cards on mobile, while a desktop screen can show more products at once.

### Decision
`HorizontalProductRow` uses fixed-width cards in a horizontally scrollable row on mobile and becomes a four-column grid from the medium breakpoint upward. `ProductCard` owns all product rendering and the real Zustand add action.

### Reasoning
Fixed mobile card widths preserve readable product names and touch targets. The desktop grid increases product density without stretching cards to an awkward size.

### Trade-off
Mobile users scroll within sections as well as down the page. Desktop rows lose the horizontal browsing gesture in exchange for faster comparison.

## Decision 3 - Desktop adaptation

### Problem
A phone-sized Figma cannot be stretched across a desktop without creating excessive whitespace or oversized controls.

### Decision
The app uses centered max-width containers, desktop navigation, multi-column product grids, and a side-by-side cart with a sticky order summary. Authentication screens retain a centered mobile-width layout on larger screens.

### Reasoning
These adaptations preserve the mobile visual language while using desktop space for comparison and checkout efficiency.

### Trade-off
Desktop does not reproduce the Figma frame literally. It prioritizes usable density and keeps the mobile hierarchy intact.

## Decision 4 - Section composition

Home is composed from reusable section headers, category tiles, and horizontal product rows. Each `See all` action routes to an existing category, Explore, or Search view instead of being decorative.
