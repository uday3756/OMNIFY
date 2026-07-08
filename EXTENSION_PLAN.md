# Party Booking Platform - Extension Plan

## Project Extension Strategy

**Approach:** Extend existing vanilla JS project while maintaining design consistency.

**Tech Stack:** Vanilla HTML/CSS/JS (matching current project)
- CSS animations (instead of Framer Motion)
- Reuse existing component styles
- Keep existing color palette & typography

---

## New Pages to Create

### 1. Authentication Flow
- `auth/login.html` - Login page
- `auth/register.html` - Registration page
- `auth/state.js` - Frontend-only auth state management (localStorage)

### 2. Parent Dashboard
- `dashboard/index.html` - Main dashboard
- `dashboard/components.js` - Dashboard components

### 3. Party Booking Flow
- `book-party/index.html` - Multi-step booking wizard
- `book-party/steps/` - Individual step components
  - step1-child-info.html
  - step2-theme-selection.html
  - step3-ai-recommendations.html
  - step4-add-ons.html
  - step5-summary.html
  - step6-confirmation.html

### 4. Invitation Page
- `invitation/index.html` - Invitation card display
- `invitation/qrcode.js` - QR code generation

### 5. AI Assistant
- `components/party-bot.html` - Floating assistant button
- `components/party-bot.js` - Assistant logic (mock responses)

### 6. Utilities
- `lib/booking-state.js` - Booking data management
- `lib/animations.css` - Reusable animations
- `lib/components.js` - Shared component library

---

## Design System (Reusing Existing)

**From current project:**
- `assets/omnify.css` - Already has color variables, spacing, typography
- Mint/teal palette
- Rounded cards with soft shadows
- Modern spacing and typography

**New additions:**
- Animation library (bounce, fade, slide, confetti effects)
- Step progress indicator
- Modal/modal system

---

## Features to Build

### Phase 1: Core Auth + Dashboard
1. Login/Register (local state only)
2. Parent Dashboard with welcome card
3. Navigation between pages

### Phase 2: Multi-Step Booking
1. Step-by-step wizard for party booking
2. Theme selection with visual cards
3. Add-ons with pricing
4. Booking summary with live updates

### Phase 3: Confirmations + Invitations
1. Success animation (confetti)
2. Invitation card generation
3. QR code display

### Phase 4: Polish
1. AI Assistant floating button
2. Micro-interactions and animations
3. Mobile responsiveness

---

## File Structure

```
omnify-ai-assessment/
├── index.html (keep existing)
├── 01-discovery.html (keep existing)
├── 02-registration.html (keep existing)
├── 03-ai-decision.html (keep existing)
├── assets/
│   ├── omnify.css (keep existing)
│   ├── omnify.js (keep existing)
│   └── animations.css (NEW)
├── lib/
│   ├── auth.js (NEW)
│   ├── booking-state.js (NEW)
│   └── components.js (NEW)
├── auth/
│   ├── login.html (NEW)
│   └── register.html (NEW)
├── dashboard/
│   ├── index.html (NEW)
│   └── components.js (NEW)
├── book-party/
│   ├── index.html (NEW)
│   ├── steps.js (NEW)
│   └── mock-data.js (NEW)
├── invitation/
│   ├── index.html (NEW)
│   └── qrcode.js (NEW)
└── components/
    ├── party-bot.html (NEW)
    └── party-bot.js (NEW)
```

---

## Next Steps

1. Create authentication pages (login/register)
2. Build auth state management
3. Create parent dashboard
4. Build multi-step booking flow
5. Add invitation generation
6. Add floating AI assistant
7. Polish animations and interactions

All while preserving existing project styling and functionality.
