# DESIGN_NOTES.md

# Nectar — Responsive Design Notes

The reference design is mobile-first. The desktop implementation therefore treats the mobile screens as the visual foundation while adapting layout and interaction density for larger screens.

---

## 1. Navigation: mobile bottom navigation → desktop layout

### Mobile decision

The mobile interface uses a fixed bottom navigation pattern for Shop, Explore, Cart, Favourite, and Account. This preserves the navigation hierarchy visible in the reference design.

### Desktop adaptation

Desktop has substantially more horizontal space and does not need the same persistent bottom-navigation treatment. The layout therefore uses a wider content area and desktop-appropriate navigation positioning rather than stretching the mobile bottom navigation across the page.

### Reasoning

A fixed bottom bar is efficient on a phone because primary navigation is reachable with a thumb. On desktop, permanently consuming horizontal/vertical space for the same pattern is less useful.

### Trade-off

The navigation presentation differs between mobile and desktop, but the destinations and hierarchy remain consistent.

---

## 2. Product layout: mobile cards → responsive product grid

### Mobile decision

Product cards remain compact and vertically stacked within a narrow viewport. Image, category/unit, name, price, and cart interaction retain the hierarchy of the reference.

### Desktop adaptation

The available width is used for a multi-column product grid. The assignment specifically calls for at least four columns where space permits.

### Reasoning

Keeping the mobile card width unchanged on desktop would waste space. A responsive grid lets the catalog become denser without changing the individual product information hierarchy.

### Trade-off

The number of visible products per row changes with viewport width. This means the desktop screenshot cannot have exactly the same wrapping as mobile.

---

## 3. Content width and spacing: mobile edge-to-edge → desktop max-width

### Mobile decision

Content uses compact horizontal spacing suitable for phone screens while maintaining touch-friendly controls.

### Desktop adaptation

Desktop content is constrained by a max-width rather than expanding indefinitely across very wide monitors. Product grids, sections, and major controls use the available space inside that container.

### Reasoning

An unlimited desktop content width would create very long lines and oversized gaps. A max-width keeps the application readable and visually coherent.

### Trade-off

Very large monitors will have some surrounding whitespace rather than filling every pixel with application content.

---

## 4. Overlays and responsive experiments

### Decision

Optional Filter-drawer and Checkout-bottom-sheet experiments were not retained in the final stable implementation.

### Reasoning

The experiments demonstrated a practical responsive-design lesson: an overlay must adapt to viewport dimensions without changing the underlying page layout or becoming clipped at unusual zoom levels. The attempted implementations introduced presentation problems, including an incorrectly centered checkout modal and a filter action that was not reliably visible.

### Trade-off

The final submission contains less optional overlay polish, but the stable required application is not compromised by unfinished responsive behavior.

---

## 5. Desktop navigation: keep search discoverable through Explore

### Decision

The desktop header shows Shop, Explore, Favourite, Account, and Cart. The standalone desktop Search link was removed because Explore already provides the product search field.

### Reasoning

This avoids presenting two competing search entry points while preserving the `/search` route, Search page, search hook, and mobile behavior.

### Trade-off

Desktop users reach the full search page through Explore rather than a dedicated header item.

---

## 6. Delivery address editing

### Decision

The Home delivery location is a single clickable control linked to `/location`. It displays the persisted zone and area from the session store when available.

### Reasoning

The existing location form already validates and saves the address, so reusing it keeps address changes consistent with onboarding.

### Interaction detail

When a returning user opens `/location` from Shop, the onboarding back button is hidden. The back button remains available during the initial verification-to-location flow.

---

## 7. Account access template

### Decision

The Account route uses a dedicated responsive access page with a primary login action, a secondary sign-up action, and a short list of account benefits.

### Interaction detail

Both Account actions open `/signin`, matching the shared sign-in screen. The sign-in back button is hidden only when that screen was reached from Account; direct onboarding access retains its back button.

---

## 8. Home promotional carousel

### Decision

The Home promotion is a three-state carousel featuring fresh produce savings, an apple offer, and a coming-soon dairy offer. It advances automatically every five seconds and also provides keyboard-accessible indicators for direct selection.

### Reasoning

Rotating the existing banner area adds promotional variety without increasing page height or changing the surrounding catalog structure.
