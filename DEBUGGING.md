# Debugging Log

This document records real issues encountered and solved during the development process.

## Issue 1: White Screen Crash on App Load
**Symptom:** After setting up the React Router and Zustand store, running `npm run dev` resulted in a completely blank white screen in the browser with no obvious error in the standard terminal output.
**Diagnosis:** We ran `npm run build` (which runs TypeScript checking `tsc -b`) to expose hidden compilation errors. The build failed with `error TS6133: 'React' is declared but its value is never read` and `error TS1484: 'Product' is a type and must be imported using a type-only import`.
**Root Cause:** The newest Vite 5/6 React template enables `verbatimModuleSyntax: true` in `tsconfig.json` by default. This extremely strict TypeScript setting crashes the app if standard `import { Product }` is used instead of `import type { Product }`, and if `import React` is included but unused.
**Fix:** Removed all `import React from 'react'` lines (which are unnecessary in modern React) and updated all type imports to include the `type` keyword.
**Verification:** Re-ran `npm run dev` and the app loaded successfully.

## Issue 2: Search Race Condition (Stale Responses)
**Symptom:** When typing quickly in the search bar, the search results would sometimes show incorrect data. For example, searching "bread" would briefly show bread, but then overwrite the screen with "milk".
**Diagnosis:** The mock API `delay()` function simulates network latency between 200ms and 1200ms. If a previous request ("milk") took 1200ms, and a newer request ("bread") took 200ms, the newer request would finish first. The old request would finish a second later and overwrite the state.
**Root Cause:** The React component was blindly calling `setResults(data)` whenever a Promise resolved, without checking if that Promise belonged to the *most recent* search query.
**Fix:** Created a `useSearchProducts` custom hook using a `useEffect`. Added a local `let ignore = false` flag. The `useEffect` cleanup function (which runs automatically when the query changes) sets `ignore = true`. The Promise resolution now checks `if (!ignore) { setResults(data); }`.
**Verification:** Added a "Run Stale Response Demo" button on the Home page that artificially triggers a 1.5s request followed by a 0.2s request. Confirmed visually and via console logs (`[Stale Response Prevented]`) that the old data is discarded.
