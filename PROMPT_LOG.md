# AI Prompt Log

This log summarizes material AI-assisted work performed on the assignment. The developer reviewed, corrected, and verified each change.

## Entry 1 - Architecture and risk audit

### Tool
GitHub Copilot / VS Code Agent

### Purpose
Inspect the existing repository before changing the UI.

### Prompt summary
Asked for routes, reusable components, product data, Zustand cart behavior, mock API, stale search protection, and gaps against the Figma flow.

### Result
Identified the existing Home, ProductCard, Layout, cart store, mock API, and search hook as the owning surfaces. Planned incremental UI work around those contracts.

### Accepted / corrected
Accepted the existing architecture. Rejected a rebuild and preserved the cart, API, and search logic.

### Verification
Read source files and ran the existing production build.

## Entry 2 - Mobile grocery UI

### Tool
GitHub Copilot / VS Code Agent

### Purpose
Adapt the desktop-oriented storefront to the mobile Figma hierarchy.

### Prompt summary
Requested mobile Home sections, compact product cards, bottom navigation, Explore, categories, detail, cart, and favorites.

### Result
Added reusable section components, a five-item `MobileBottomNav`, compact `ProductCard`, Explore/category/search/favorites screens, and mobile-first layouts.

### Accepted / corrected
Accepted existing Tailwind and Lucide patterns. Corrected the first implementation by extracting the inline bottom nav into a reusable component and making nested route active states explicit.

### Verification
Built the app and browser-checked navigation, cart badge behavior, mobile visibility, and desktop hiding.

## Entry 3 - Authentication flow

### Tool
GitHub Copilot / VS Code Agent

### Purpose
Implement the Figma-inspired entry flow without a backend.

### Prompt summary
Requested Splash, Onboarding, Sign In, Phone, OTP, Location, Login, and Sign Up with mocked state.

### Result
Added route-level screens and a persisted Zustand session store. The demo OTP is `1234`; location selection is saved before entering Home.

### Accepted / corrected
Used Zustand instead of Context or a backend. Corrected an unavailable Lucide Facebook export with an available icon while keeping the mock action.

### Verification
Browser-tested Splash through Location to Home, including invalid-free valid phone and OTP flow.

## Entry 4 - Catalog and image audit

### Tool
GitHub Copilot / VS Code Agent

### Purpose
Expand the Figma-aligned catalog and eliminate broken/incorrect imagery.

### Prompt summary
Requested canonical products, local stable images, correct units, semantic image mappings, and reusable Home sections.

### Result
Expanded the catalog to 32 records, added local images under `public/products`, and used one canonical product object everywhere.

### Accepted / corrected
Rejected generic image reuse and emoji fallbacks. Corrected mappings for beverages, pantry, dairy, eggs, meat, and produce.

### Verification
Checked unique IDs, unique image paths, required fields, local file existence, browser image loading, and production build.

## Entry 5 - Search and cart quality

### Tool
GitHub Copilot / VS Code Agent

### Purpose
Preserve async correctness and improve request retry behavior.

### Prompt summary
Review stale search handling, cart persistence, stock limits, price reconciliation, and retry states.

### Result
Kept the effect cleanup guard and added an explicit retry counter to the hook. Cart reconciliation remained in the existing Zustand store.

### Accepted / corrected
Kept the simple `ignore` strategy instead of adding a dependency or rewriting the API.

### Verification
Ran build/lint and documented the behavior. A deterministic automated stale-response test remains a future improvement.

## What AI Got Wrong / What I Corrected

### Example 1 - Product image mapping

The initial catalog expansion reused unrelated images: Diet Coke, Sprite, Coca-Cola, and Pepsi shared one soda image; Cooking Oil used juice imagery; Butter used Milk; and Beef Bone shared Chicken imagery. I corrected the canonical JSON records and added dedicated local files. I verified all 32 records and checked browser image loading.

### Example 2 - Mobile UI structure

The initial Home implementation retained a desktop-style hero and a single product grid. I changed it to the mobile Figma hierarchy with compact horizontal sections, category tiles, a promotion banner, and reusable bottom navigation. I verified the route and viewport behavior in the browser.

### Example 3 - Retry behavior

The first retry controls changed the query to a whitespace value, which was an indirect retry. I added a retry counter to `useSearchProducts` so Home and Search explicitly rerun the current request while preserving stale-response protection. Build and lint passed afterward.
