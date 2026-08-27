# Prompt Log

This document records the material AI interactions used to guide the development of this assignment.

## AI Supervision Strategy
The development was completed in a pair-programming style using a step-by-step 13-phase prompt strategy. Instead of generating the entire application at once, I prompted the AI to act as a "Senior Frontend Developer + Mentor", strictly adhering to the assignment's technology constraints.

## Example Interactions

### 1. Handling Stale Responses
**Tool:** Code Assistant
**Prompt:** "Imagine a scenario where the mock API has random delays. You search for 'milk' (slow request) then quickly change to 'bread' (fast request). Request B finishes first, but Request A finishes later and overwrites the screen. Implement a proper solution and explain why stale responses happen."
**What I used:** The custom hook approach with the `ignore` flag cleanup function.
**What I changed/rejected:** I rejected the initial AI suggestion to use complex external debouncing libraries or `AbortController` in favor of a simpler, pure-React `useEffect` cleanup pattern because it is much easier to read and maintain for this specific assignment scope.
**How I verified it:** I asked the AI to build a "Stale Response Demo" button that artificially triggers this exact race condition to prove the fix works.

### 2. Cart Persistence Edge Cases
**Tool:** Code Assistant
**Prompt:** "Persist the cart across browser refreshes. We must handle: 1. A persisted product no longer exists. 2. A persisted product's price differs. 3. Quantity becomes zero. 4. Quantity exceeds stock. The UI must never crash or show silently incorrect totals. Explain possible approaches."
**What I used:** The AI provided three approaches. We selected "Option C: Save Everything, but Sync on Load".
**What I changed/rejected:** The AI initially suggested using just `zustand/middleware` `persist` without a sync step, which I rejected as it violated the assignment requirement ("A persisted product's price differs from the latest dataset"). I instructed the AI to add a `syncCart` function to validate the cache against fresh API data on app mount.
**How I verified it:** Verified by changing a price directly in `products.json`, refreshing the page, and watching the cart automatically update to the new price without crashing.

### What AI Got Wrong / What I Corrected
1. **TypeScript Strict Mode:** The AI generated standard imports like `import { Product } from '../types'` and `import React from 'react'`. This caused a white screen crash because Vite's latest strict TS config requires `import type { Product }`. I identified the white screen, pulled the TS compilation error logs, and instructed the AI to fix all imports across the project.
2. **Global State Violation:** During early planning, the AI briefly suggested using React Context for the Cart. I explicitly corrected it to use `Zustand` as required by the assignment restrictions ("No Context API for global state").
