# PROMPT_LOG.md

# Nectar — Frontend Developer Assignment

This document records the material AI-assisted prompts and development discussions used while building the Nectar grocery-delivery frontend.

## Accuracy and scope

This log is intentionally factual. It records material prompts that affected the project, implementation decisions, debugging, validation, or repository state. Casual conversation and non-development messages are not included.

Some prompts from older conversation turns were not available verbatim because parts of the conversation were collapsed in the chat interface. Where the exact wording was unavailable, the entry is marked as a faithful summary rather than presented as a verbatim quotation.

AI was used as an implementation and reasoning assistant. Final implementation choices, verification, reverts, and submission decisions remained under the developer's control.

---

## 1. Understand the assignment and learning order

### Prompt
> This is the project I am going to work on. I am at zero.Arrange everything in the order to learn it and understand the project.

### Follow-up
> Is Tailwind CSS a framework inside React? Compare React/Tailwind concepts with Django concepts such as router, views, etc. How can I learn React, Tailwind CSS, Zustand, etc. now?

### Outcome
The discussion established the required frontend stack and helped organize the work around React, TypeScript, Tailwind CSS, Zustand, routing, and responsive UI.

---

## 2. Missing Figma reference

### Prompt
> The assignment document mentions a shared Figma design, but there is no Figma link in the DOCX. Is there anything missing?

### Follow-up
> Help me write a message to the group asking the sir/mam about the missing Figma link.

### Outcome
The missing design reference was identified as a practical blocker. The project later used the supplied screenshots as the visual reference when direct Figma access was not available.

---

## 3. Figma MCP investigation

### Prompts
> Which IDE provides a free Figma connection with MCP?

> Guide me to connect MCP.

### Follow-ups
The MCP server was configured in VS Code. Further discussion covered starting the server, the connection working, Figma reporting insufficient access, whether the VS Code account needed to match the Figma account, and the inability to request edit access.

### Outcome
Direct Figma inspection was not usable because of the access limitation. The implementation proceeded from the available screenshots instead of pretending that the original Figma file had been inspected successfully.

---

## 4. Screenshot-based UI implementation

### Prompt
> These are the screenshots of the Figma design.

The supplied references covered splash, onboarding, sign-in, phone number, OTP, location, login/sign-up, home, product detail, Explore, beverages, search, filters, cart, favourites, cards, and buttons.

### Follow-up
> Can I send these screenshots to VS Code and say implement this UI?

### Outcome
The screenshots became the practical visual reference for the implementation.

---

## 5. Authentication and onboarding flow

### Prompt
> When I start the site it is directly coming to Home, but there are several pages before this in the Figma. Login with number, location, OTP, onboarding, and other pages are missing. Implement the complete flow.

### Outcome
The authentication/onboarding journey was added to reflect the reference flow, using frontend/mock behavior rather than a backend.

---

## 6. Product catalog and Home sections

### Prompts
> You saw the images of the items that are there. Note every image and product so we can add them to our site.

> Generate the implementation to add them all and put them into the different sections shown on the Home screen, with some extra products where appropriate.

### Outcome
The product catalog and Home sections were populated with mock JSON data and local product assets.

---

## 7. Mobile bottom navigation

### Prompt
> The Figma has a bottom menu with Shop, Explore, Cart, Favourite, and Account. The sample site does not have those. Add this menu.

### Requirements discussed
- Shop
- Explore
- Cart
- Favourite
- Account
- Fixed mobile placement
- Active state
- Cart count
- Responsive behavior

### Outcome
The mobile navigation was implemented as part of the responsive application.

---

## 8. Product image and name corrections

### Prompt
> Check the product images and names. They are not matching correctly. Correct them. Also add the logo format requested in the previous prompt.

### Outcome
Incorrect product-image/name mappings were identified and corrected.

---

## 9. Dedicated product images

### Prompt
> Replace incorrect reused images and use a distinct, semantically correct image for every product, including Diet Coke, Sprite, Pepsi, Coca-Cola, cooking oil, ghee, pulses, butter, beef bone, chicken, etc.

### Outcome
Dedicated local product images were added/corrected for the catalog.

Later corrections specifically included:
- Avocado
- Red bell pepper
- Ginger
- Whole bean coffee
- Cooking oil
- Ghee
- Eggless mayonnaise
- Beef Bone → Mutton
- Broiler Chicken
- Artisan Sourdough Bread → Bread
- Egg Chicken White
- Yogurt
- Butter
- Egg Noodles
- Diet Coke
- Sprite
- Coca-Cola
- Pepsi

These changes were treated as catalog/image corrections rather than UI redesign.

---

## 10. Nectar branding

### Prompt
> Replace the placeholder Nectar logo/text treatment with a proper reusable Nectar logo matching the reference design.

### Outcome
The project branding was changed to Nectar.

---

## 11. Responsive desktop adaptation

### Prompt
> The Figma design is mobile-first. Implement the mobile interface faithfully and adapt it cleanly to desktop without breaking the mobile layout.

### Requirements discussed
- Mobile-first layout
- Responsive product grids
- Responsive navigation
- No horizontal overflow
- Desktop adaptation
- Tablet support
- Appropriate spacing and typography

### Outcome
The application was adapted beyond the mobile reference rather than simply stretching the mobile layout.

---

## 12. Assignment audit

### Prompt
> Check the assignment DOCX and the current repository. Audit everything against the requirements and list what has been completed and what has not been executed.

### Outcome
The project was reviewed against the assignment requirements and scoring areas before final cleanup.

---

## 13. Weightage-based final audit

### Prompt
> Based on the assignment scoring, cover all weightages. Figma/responsiveness/core UX is 40%, state/async correctness is 25%, and documentation/AI supervision together are 20%. Create one final VS Code Agent prompt that fixes all remaining issues, validates everything, and then stops.

### Outcome
The remaining work was prioritized around the assignment rather than adding unrelated features.

---

## 14. Documentation

### Prompt
> Update the relevant markdown files so the project documentation is accurate and complete. Make the documentation look natural and human-written, including implementation decisions, debugging information, design notes, and the AI prompt log.

### Files
- README.md
- DESIGN_NOTES.md
- DECISIONS.md
- DEBUGGING.md
- PROMPT_LOG.md

### Outcome
Documentation became a submission requirement rather than an afterthought.

---

## 15. Git history

### Prompt
> Make multiple reasonable commits with natural human commit messages rather than putting everything into one huge commit. Keep the commit history clean and realistic.

### Outcome
The repository was maintained with incremental commits rather than one artificial final dump. The repository later reached a multi-commit history.

---

## 16. README repository details

### Prompt
> Update README.md with the correct repository name, GitHub clone URL, and correct `cd grocery-delivery` command. Confirm the documentation for React 19, local product images, `npm run build`, and `npm run lint`.

### Outcome
README setup instructions were corrected and a documentation commit was created:

`9cf3efb docs: clarify repository setup instructions`

---

## 17. Deployment

### Prompts
> Can we deploy and check this?

> I will rename the Vercel URL to Nectar.

### Outcome
The application was deployed and the public deployment was tested during development.

---

## 18. Direct-route/session behavior

### Prompt
> If I open the site in one browser and open the site again in the same browser, it directly goes to Home. `/splash` is the loading screen, but once the browser is logged in, opening `/splash` can show an error. Similar behavior can happen with remaining pages. How can this be fixed?

### Outcome
The behavior was investigated as part of session persistence and direct-route handling. The deployed application was manually checked afterward.

---

## 19. Persistence verification

### Prompt
> On my phone I add something to Favourite, close the tab, and reopen the site. The item from the previous tab is still there. Is this expected?

### Outcome
Client-side persistence was confirmed from the observed behavior.

A similar persistence check was performed for cart state: an item added to the cart remained available after closing and reopening the site.

---

## 20. Final repository review

### Prompt
> Go through the repository again and check everything. Is there anything that needs to be added?

### Follow-up
> Based on the suggestions, what needs to change? Generate a clean prompt.

### Outcome
The repository was reviewed again before submission. The remaining work was narrowed to genuine requirements and corrections rather than continuing to expand the project.

---

# Optional UI experiments and reverts

These entries are intentionally retained because they demonstrate AI supervision and explain why certain attempted changes are not present in the final stable implementation.

## 21. ProductCard Add-to-Cart animation

### Prompt
> Make ONE small UI enhancement only. When the user clicks the existing "+" Add to Cart button on a product card, replace it with a compact Added/Add to Cart state and animate the transition without changing the card, cart logic, persistence, routing, or responsive behavior.

### Outcome
The animation was experimented with as an isolated UI enhancement. It was later reverted when the decision was made to preserve the stable implementation rather than continue optional UI polish.

---

## 22. Product-detail Add-to-Cart animation

### Prompt
> Add the same Add-to-Cart success animation to the Product Detail page.

### Requirements
- Preserve layout
- Press/scale feedback
- Show Added to Cart
- Preserve cart/Zustand behavior
- Preserve persistence and routing
- Preserve accessibility

### Outcome
This was treated as optional polish and was not retained in the final stable state.

---

## 23. Checkout bottom sheet

### Prompt
> The Checkout bottom sheet shown in the Figma reference is currently missing. When the user clicks Go to Checkout from Cart, open a bottom sheet with Checkout, Delivery, Payment, Promo Code, Total Cost, terms, and Place Order while preserving the existing checkout flow.

### Outcome
The checkout sheet was temporarily implemented. It did not match the intended responsive presentation: on desktop it appeared as a centered modal instead of the desired bottom-sheet behavior. The change was therefore reverted.

---

## 24. Checkout revert

### Decision
> Leave the Checkout box out. The existing Cart → Checkout flow is functional, so do not risk the stable project for optional UI polish.

### Outcome
The experimental checkout sheet was removed. The existing checkout flow remained the submission implementation.

---

## 25. Filter drawer experiment

### Prompt
A responsive Explore filter drawer was requested, with category/brand selections, an Apply Filter action, side-panel animation, and responsive behavior.

### Outcome
The implementation became increasingly problematic at different viewport/zoom conditions, and the Apply Filter control was not reliably visible. The changes were reverted rather than leaving the project in a worse state.

### Decision
Preserve the stable Explore implementation instead of continuing a risky optional UI experiment close to submission.

---

## 26. Final validation and submission state

### Validation discussed/performed
- `npm run build`
- `npm run lint`
- Responsive viewport checks
- Search behavior
- Loading state
- Empty state
- Failure/retry state
- Cart persistence
- Stale-search behavior
- Accessibility
- Direct routes
- Deployment

### Final principle
The project was stopped when further optional UI changes began introducing risk. The final submission prioritizes the assignment's required functionality and documented engineering work over unfinished visual experiments.

---

# What AI got wrong / what I corrected

## Example 1 — Checkout presentation

AI-generated checkout-sheet work produced a centered modal on desktop rather than the intended bottom-sheet interaction.

**Correction:** The implementation was reviewed manually, judged against the reference, and reverted instead of accepting a visually incorrect implementation.

**Reason:** A working existing checkout flow was more valuable than introducing an inaccurate optional UI layer.

## Example 2 — Filter drawer responsiveness

The filter experiment did not maintain a reliable Apply Filter control across the intended viewport/zoom conditions. Attempts to make the drawer dynamically fit different screens made the surrounding UI worse.

**Correction:** The filter changes were reverted.

**Reason:** The final project should not trade a stable responsive application for an unfinished optional overlay.

---

# Final documentation principle

The project uses AI openly. AI suggestions were not automatically accepted. Implementation results were tested, reviewed, corrected, or reverted when necessary.

The final repository should be judged from the code that is actually present, not from attempted features that were later removed.
