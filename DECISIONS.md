# Engineering Decisions

## Decision: Persisted cart reconciliation

### Problem / ambiguity
Persisted cart entries can refer to deleted products, old prices, zero stock, or quantities above current stock.

### Options considered
- Persist only IDs and quantities, then render after refetching.
- Trust the persisted product snapshots.
- Render persisted data immediately, then reconcile against fresh data.

### Choice made
The cart uses Zustand `persist` for immediate restoration and `syncCart` after `api.getProducts()` resolves.

### Reasoning
`syncCart` removes unknown and zero-stock products, replaces stale product fields including price, and caps quantity to fresh stock. Quantity updates also clamp to at least one and at most stock.

### Trade-off
The UI is fast on refresh, but a short period can exist before background synchronization completes.

### Consequence
Totals are calculated from the reconciled cart items rather than an independently cached total.

## Decision: Stale search protection

### Problem / ambiguity
Variable mock latency lets an older query such as `milk` resolve after a newer query such as `apple`.

### Options considered
Abort requests, add debouncing, or ignore results from effects that have been cleaned up.

### Choice made
`useSearchProducts` uses an effect-local `ignore` flag. Cleanup marks the prior request stale; only the active effect may update results, errors, or loading state.

### Reasoning
This is small, dependency-free, and directly protects every state update for the mock API.

### Trade-off
The mock promise still completes and consumes simulated time. A production API could additionally use `AbortController`.

## Decision: Canonical product/image data

### Problem / ambiguity
Home, search, category, detail, cart, and favorites must not drift into separate product definitions.

### Options considered
Define products inside each screen, use image maps outside the product records, or keep one canonical JSON catalog.

### Choice made
`products.json` is the source of truth. Every view passes the same `Product` object and uses `product.image`, while cart synchronization refreshes that same object from the API.

### Consequence
A corrected image, price, unit, or stock value propagates to all screens without page-specific mapping changes.

## Decision: Separate Zustand stores

The cart, favorites, and lightweight entry/location session use separate persisted Zustand stores. This keeps unrelated state boundaries explicit without introducing Context, Redux, or a backend.
