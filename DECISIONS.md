# Engineering and Design Decisions

## 1. Cart Persistence Strategy
**Problem:** The assignment requires persisting the cart across browser refreshes, but explicitly states we must handle edge cases where a persisted product no longer exists, its price has changed, or its available stock has changed since the user last visited. The UI must never show incorrect totals.

**Options considered:**
- *Option A:* Save only Product IDs and Quantities. Re-fetch all product data on load. (Trade-off: Users see an empty cart for a second while data loads).
- *Option B:* Save everything and trust the saved data. (Trade-off: Fails the assignment requirement as prices could become stale).
- *Option C:* Save everything so the UI renders instantly, but run a silent background validation function immediately on load to sync the cart with fresh API data.

**Choice made:** Option C (Optimistic UI with Background Sync).
**Trade-off:** Slightly higher complexity in the Zustand store, but it provides the best user experience (no empty flashes) while guaranteeing strict adherence to the data correctness requirements.

## 2. State Management Tool
**Problem:** The app requires global state for the shopping cart (accessible by Nav, Cart, and Product components) without using Redux, MobX, or the Context API (as per assignment restrictions).
**Options considered:**
- *Option A:* Zustand. A small, fast, unopinionated state management solution.
- *Option B:* Jotai or Recoil (Atomic state).
**Choice made:** Zustand.
**Trade-off:** Zustand is extremely lightweight and easy for beginners to read. It requires less boilerplate than atomic state managers for a simple cart implementation.

## 3. Stale Response Protection Strategy
**Problem:** Mock API search requests have random variable latency (200ms - 1200ms). If a user searches "milk" (slow request) then quickly changes to "bread" (fast request), the older "milk" request could finish last and overwrite the correct "bread" UI.
**Options considered:**
- *Option A:* AbortController. Cancel the actual network request when the query changes.
- *Option B:* React `useEffect` cleanup function with a local boolean `ignore` flag.
**Choice made:** Option B (`ignore` flag).
**Trade-off:** AbortController is technically better for real networks to save bandwidth, but for a mock API and a beginner-friendly architecture, a simple `ignore` flag is completely foolproof, much easier to read, and perfectly solves the UI race condition.
