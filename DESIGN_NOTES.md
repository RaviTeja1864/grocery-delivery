# Design Notes

This document covers 3 key mobile-to-desktop design adaptation decisions made while building the responsive layout without access to a final Figma file.

## 1. Product Grid Scaling
**Decision:** Instead of simply stretching mobile product cards across the desktop screen (which results in huge, ugly images), the grid dynamically scales from 1 column to 4 columns.
**Reasoning:** 
- Mobile (`grid-cols-1`): Users expect large, easily tappable touch targets and images that span the screen width.
- Desktop (`lg:grid-cols-4`): A 4-column layout maximizes screen real estate, allowing users to browse more products simultaneously without excessive scrolling.

## 2. Category Filters Navigation
**Decision:** Category filters are implemented as a horizontal scrolling list (`overflow-x-auto`) on mobile, but flex-wrap normally on desktop.
**Reasoning:**
- Mobile: Vertical space is premium. A horizontal swipeable list of pills keeps the filters accessible without pushing the main product content below the fold.
- Desktop: Mouse users generally dislike horizontal scrolling. By letting the pills wrap naturally or using adequate spacing, it becomes easier to click with a mouse.

## 3. Cart Layout Architecture
**Decision:** The Cart page stacks the Item List and Order Summary vertically on mobile, but places them side-by-side (`lg:flex-row`) on desktop with a "sticky" order summary.
**Reasoning:**
- Mobile: A stacked layout is the only viable option due to screen width constraints.
- Desktop: Stacking on desktop wastes massive horizontal space and forces users to scroll down just to see their total. A side-by-side layout with `sticky top-24` keeps the "Proceed to Checkout" button constantly visible on the right while the user scrolls through their long list of cart items on the left.
