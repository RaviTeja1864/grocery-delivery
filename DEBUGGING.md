# Debugging Log

## Issue 1 - Incorrect product image mappings

### Symptom
Several catalog products displayed semantically incorrect imagery: drinks shared one soda image, Pulses used the Rice image, Cooking Oil used a juice image, Butter used Milk, and Beef Bone shared Chicken imagery.

### Diagnosis
The problem was in `products.json`, where unrelated records pointed to reused generic files rather than product-specific assets.

### Root cause
The initial catalog expansion created records before dedicated image assets were available, so placeholder reuse was carried into the canonical data.

### Fix
Downloaded and stored dedicated local assets under `public/products` and `src/assets/products`, then updated the canonical records. Each catalog record now has a local image path, including separate paths for Diet Coke, Sprite, Coca-Cola, Pepsi, Rice, Pulses, Cooking Oil, Ghee, Butter, Beef Bone, and Broiler Chicken.

### Verification
A catalog audit checked 32 records, unique IDs, missing fields, missing files, remote URLs, and duplicate image paths. Browser inspection reported zero broken images on the Home catalog.

## Issue 2 - Stale asynchronous search responses

### Symptom
A slower earlier search could finish after a newer query and overwrite the visible results.

### Diagnosis
The mock API intentionally varies latency between 200ms and 1200ms, making response order different from request order.

### Root cause
Updating React state unconditionally when each promise resolved allowed an old request to update the current screen.

### Fix
`useSearchProducts` uses an effect-local `ignore` flag. Cleanup marks the old request stale, and result, error, and loading updates are ignored after cleanup. The hook also exposes an explicit retry action.

### Verification
The hook logs `[Stale Response Prevented]` when a cleaned-up request resolves. The implementation was exercised during rapid-query browser checks. A deterministic automated test is not currently included.

## Issue 3 - Strict TypeScript build failure

### Symptom
The initial application produced a blank screen because the strict build rejected unused React imports and non-type imports.

### Diagnosis
`npm run build` exposed TypeScript errors that were not obvious from the dev server output.

### Fix
Removed unused React imports and changed type-only imports to `import type`. Later unused catch parameters were also removed.

### Verification
`npm run build` and `npm run lint` now pass.
