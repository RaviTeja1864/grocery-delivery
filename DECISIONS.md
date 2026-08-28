# DECISIONS.md

# Nectar — Engineering Decisions

This document records non-trivial engineering decisions made during the project. Each decision includes the problem, alternatives considered, chosen approach, and trade-off.

The decisions below are based on the actual development process rather than decisions that were simply required by the assignment.

---

## 1. Use screenshot references when direct Figma access was unavailable

### Problem / ambiguity

The assignment referred to a shared Figma file, but the design link/access was not usable during implementation. Figma MCP was configured and connected, but the original design could not be inspected because of access limitations.

### Options considered

1. Wait for or request edit/access permissions.
2. Implement the application without a visual reference.
3. Use the supplied screenshots as the working design reference.

### Decision

Use the provided screenshots as the visual source for implementation while documenting that the original Figma file was not directly inspectable.

### Reasoning

The screenshots contained the relevant screens and visual hierarchy needed to implement the assignment. Continuing without a reference would have increased the risk of inventing the design.

### Trade-off

The implementation could be close to the screenshots but could not guarantee pixel-level parity with the original Figma file.

---

## 2. Keep the application mobile-first but create a deliberate desktop adaptation

### Problem

The supplied design was mobile-first, while the assignment explicitly required desktop adaptation. Simply stretching the mobile UI would produce poor desktop composition.

### Options considered

1. Stretch the mobile layout across the desktop viewport.
2. Keep a single narrow mobile-sized content area on desktop.
3. Preserve mobile hierarchy and use a centered/max-width desktop layout with responsive grids and spacing.

### Decision

Use the third approach.

### Reasoning

The mobile layout remains the primary visual reference, while desktop receives a wider content area, responsive product grids, and spacing appropriate for larger screens.

### Trade-off

Desktop cannot be an exact copy of the mobile screenshot because the available space and interaction model are different.

---

## 3. Keep cart state in Zustand and persist it on the client

### Problem

Cart state needs to survive refreshes/reopening, and the assignment also asks for explicit handling of stale persisted data.

### Options considered

1. Keep cart state only in React component state.
2. Store the cart only in local storage without a state store.
3. Use Zustand for application state and persist the cart data.

### Decision

Use the existing Zustand cart architecture with persistence.

### Reasoning

The cart is shared across multiple screens and must survive browser reloads. A dedicated store keeps cart operations separate from presentation components.

### Trade-off

Persisted client state can become stale when the source product dataset changes, so reconciliation is necessary rather than blindly trusting stored values.

---

## 4. Protect search state from stale asynchronous responses

### Problem

Search requests have variable latency. An older request can return after a newer request and overwrite the current search result.

### Options considered

1. Accept whichever request resolves last.
2. Debounce input only.
3. Track request/query identity and ignore responses that are no longer current.

### Decision

Use request identity/current-query protection so stale responses cannot replace newer search results.

### Reasoning

Debouncing reduces request frequency but does not by itself solve out-of-order responses. The actual correctness requirement is that an older response must not win after a newer request has started.

### Trade-off

The search implementation needs additional asynchronous bookkeeping, but the resulting behavior is deterministic.

---

## 5. Use mock JSON data instead of introducing a backend

### Problem

The assignment requires a frontend implementation and explicitly states that no backend is required.

### Options considered

1. Build a backend API.
2. Hardcode product objects inside components.
3. Keep product data in mock JSON and expose asynchronous mock API behavior where needed.

### Decision

Use mock JSON data with a small asynchronous layer for data-driven behavior.

### Reasoning

This keeps the project within the assignment scope while still allowing loading, failure, retry, and stale-response behavior to be demonstrated.

### Trade-off

The application does not provide real server-side persistence or real transactions.

---

## 6. Use local product images

### Problem

Product images initially contained incorrect or reused mappings.

### Options considered

1. Keep reused images.
2. Use remote image URLs.
3. Use dedicated local assets with semantic product-to-image mappings.

### Decision

Use dedicated local product assets.

### Reasoning

Local assets make the assignment deterministic and prevent external image availability from affecting the demo.

### Trade-off

The repository contains more image files and therefore has a larger asset footprint.

---

## 7. Preserve stable functionality instead of retaining risky optional UI experiments

### Problem

Several optional UI improvements were attempted late in the project, including a ProductCard animation, Product Detail animation, checkout bottom sheet, and filter drawer. Some of the overlay experiments did not behave correctly across viewport/zoom conditions.

### Options considered

1. Keep iterating until the optional UI matched the reference.
2. Keep a partially working version.
3. Revert the risky experiments and submit the stable required implementation.

### Decision

Revert the unstable optional changes.

### Reasoning

The assignment evaluates a working, well-reasoned solution. A visually ambitious feature that introduces responsive regressions is worse than a smaller stable implementation.

### Trade-off

Some reference-inspired UI polish is not present in the final stable version.

---

## 8. Keep the documentation truthful about AI usage

### Problem

The assignment explicitly evaluates AI supervision and asks for prompts, corrections, and examples of what AI got wrong.

### Options considered

1. Document only successful AI changes.
2. Hide failed experiments.
3. Document successful work, rejected suggestions, failures, corrections, and reverts.

### Decision

Document both accepted and rejected AI work.

### Reasoning

The development process included genuine cases where AI output was reviewed and rejected. Those cases are stronger evidence of supervision than a list of successful prompts alone.

### Trade-off

The documentation openly acknowledges imperfections and failed experiments instead of presenting an artificially perfect development history.

## 9. Use Explore as the desktop search entry point

### Problem

The desktop header had a separate Search link even though Explore already contains the search interface.

### Decision

Remove only the desktop Search header link. Keep the Search page, `/search` route, search logic, and mobile navigation unchanged.

### Trade-off

Desktop navigation is simpler, but users must enter search through Explore.

## 10. Reuse the location flow for address changes

### Problem

The Home location text needed to become an address-changing control without adding a second location form.

### Decision

Make the Home address a link to `/location` and use the persisted session store's zone and area values for its label.

### Trade-off

The existing onboarding form is reused for returning users, so it remains intentionally simple rather than becoming a separate address-management screen.

## 11. Distinguish entry navigation from returning-user navigation

### Problem

The Location and Sign In screens need different back-button behavior depending on where the user came from.

### Decision

Use the existing persisted `entryComplete` state for Location and React Router navigation state for Account-to-SignIn navigation. Hide the back button only for those returning-user entry points.

### Trade-off

Navigation state is intentionally lightweight and only controls presentation; the route architecture remains unchanged.

## 12. Rotate promotions within the existing Home banner

### Problem

The Home page had one static promotional banner.

### Decision

Keep the existing banner layout and rotate three local-image offers with a five-second interval, cleanup on unmount, and manual indicators.

### Trade-off

The carousel is client-side presentation only. It does not add backend promotion scheduling or product availability rules.
