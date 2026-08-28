# DEBUGGING.md

# Nectar — Debugging and Testing Notes

This document records real issues and failed assumptions encountered during development. It does not list hypothetical bugs.

---

## 1. Figma access was unavailable

### Symptom

The assignment referred to a shared Figma design, but the design could not be inspected through the configured Figma MCP connection.

### Diagnosis

The MCP connection itself was working, but the Figma file reported that the account did not have the required access.

### Root cause

The implementation environment did not have usable access to the original Figma file.

### Fix

The supplied design screenshots were used as the implementation reference.

### Verification

The required application screens were implemented from the available references and then reviewed through the application itself.

---

## 2. Search requests could return out of order

### Symptom

When a user changes a search query quickly, an earlier request can finish after a newer request. Without protection, the older result can overwrite the newer search state.

### Diagnosis

The issue is caused by asynchronous request timing rather than by the search input itself.

### Root cause

Multiple asynchronous searches can be in flight simultaneously, and network/mock latency is variable.

### Fix

Search responses are associated with the current request/query identity. A response is applied only if it is still the current request.

### Verification

Rapid-search behavior was manually reproduced and the stale response was confirmed not to replace the newer result.

### Limitation

The repository did not have a deterministic automated test for this behavior in the final validation; browser/reproducible verification was used.

---

## 3. Persisted cart behavior

### Symptom

An item added to the cart remained available after closing the browser tab and reopening the application.

### Diagnosis

This was expected behavior for persisted client-side cart state rather than a duplicate cart entry.

### Root cause

The cart store persists its state on the client.

### Fix

No fix was required. The behavior was validated as persistence.

### Verification

An item was added, the tab was closed, the site was reopened, and the cart state remained available.

### Important edge-case policy

Persisted cart data must still be reconciled against the current product dataset rather than being treated as permanently authoritative. This covers missing products, changed prices, and invalid quantities.

---

## 4. Direct-route/session behavior around `/splash`

### Symptom

When a session was already established, opening `/splash` directly could behave differently from the initial unauthenticated visit. Similar direct-route questions arose for other pages.

### Diagnosis

The application has session/onboarding state, so a route that represents an initial loading/onboarding state cannot always be treated as an unconditional first page.

### Root cause

Persisted session state changes the valid navigation path after authentication/onboarding.

### Fix

The routing/session behavior was reviewed so that the existing application flow could handle authenticated state without treating every direct URL as a fresh session.

### Verification

The deployed application was manually checked by reopening routes in the same browser/session.

---

## 5. Incorrect product image mappings

### Symptom

Several catalog items showed images that did not semantically match their names.

### Diagnosis

The issue was in the product data/image mapping rather than the ProductCard rendering itself.

### Root cause

Images were reused or assigned to the wrong product records.

### Fix

Dedicated local assets were added and product mappings were corrected. Specific name corrections included Beef Bone → Mutton and Artisan Sourdough Bread → Bread, along with correction of the Butter spelling.

### Verification

The catalog was manually inspected after the image replacements.

---

## 6. AI-generated checkout sheet did not match the intended responsive behavior

### Symptom

The attempted Checkout sheet appeared as a centered modal on desktop instead of the intended bottom-sheet presentation.

### Diagnosis

The implementation technically opened an overlay, but its positioning and responsive behavior did not match the visual requirement.

### Root cause

The generated implementation treated the checkout UI too much like a generic centered modal rather than a viewport-aware bottom sheet.

### Fix

The experimental implementation was reverted.

### Verification

The project was returned to the previously working Cart → Checkout flow.

### Why this matters

This was a deliberate AI-supervision decision: keeping a stable existing flow was preferred to retaining a visually incorrect optional feature.

---

## 7. AI-generated filter drawer caused responsive problems

### Symptom

The attempted Filter drawer did not reliably keep the Apply Filter action visible, and later changes made the layout behave poorly at different zoom levels.

### Diagnosis

The problem was not the checkbox state itself. The drawer's height, scroll area, and action/footer layout were not consistently constrained to the viewport.

### Root cause

The generated responsive structure allowed the filter content and footer to extend beyond the usable viewport.

### Fix

The filter experiment was reverted rather than continuing to modify the stable project close to submission.

### Verification

The stable pre-experiment version was restored and the project was kept unchanged afterward.

---

## 8. Validation commands

The project was repeatedly validated with:

```bash
npm run build
npm run lint
```

The reported final build and lint runs passed during the final implementation checks.

No automated test suite was available for the final repository, so the stale-search behavior was verified through reproducible browser interaction instead.
