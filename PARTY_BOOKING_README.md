# 🎉 Omnify Party Booking Platform - Extension Guide

## Overview

This extension adds a complete party booking platform to Omnify, enabling parents to:
- Create accounts and manage profiles
- Browse and select party themes
- Book parties with multi-step customization
- Generate beautiful invitations with QR codes
- Get AI-powered recommendations from PartyBot

## New Features

### 1. **Authentication System**
- **Login Page** (`auth/login.html`)
  - Email/password authentication
  - Guest login option
  - Demo credentials: `demo@example.com` / `demo123`
  - Frontend-only auth (localStorage)

- **Registration Page** (`auth/register.html`)
  - New parent account creation
  - Password strength indicator
  - Terms & conditions checkbox
  - Success confirmation

### 2. **Parent Dashboard** 
- **Dashboard** (`dashboard/index.html`)
  - View all party bookings
  - Quick action cards
  - Booking status tracking
  - Edit, view details, or share bookings
  - User profile display

### 3. **Multi-Step Party Booking**
- **6-Step Wizard** (`book-party/index.html`)

  **Step 1: Child Information**
  - Child's name, age, gender
  - Interests (free text)
  - Preferred party date & time

  **Step 2: Theme Selection**
  - Choose from 6 party themes:
    - 🤖 Robotics Robot Party
    - 🎨 Art & Craft Studio Party
    - 💃 Dance Party Extravaganza
    - 🔬 Science Lab Party
    - ⚽ Sports Champions Party
    - 🎮 Gaming Arena Party

  **Step 3: Guest Count**
  - Number of children attending
  - Special requirements/dietary restrictions
  - Live pricing calculation

  **Step 4: Add-Ons**
  - Cake & Snacks ($8)
  - Party Favors ($6)
  - Premium Photography ($12)
  - Decoration Package ($7)
  - DJ & Music Setup ($15)

  **Step 5: Review & Confirm**
  - Summary of all selections
  - Final pricing
  - Terms acceptance
  - Booking confirmation

  **Step 6: Confirmation**
  - Success message
  - Booking reference ID
  - Create invitation
  - Return to dashboard

### 4. **Invitation Generation**
- **Invitation Page** (`invitation/index.html`)
  - Beautiful invitation card design
  - QR code generation
  - Party details display
  - Share options:
    - 📧 Email
    - 💬 SMS
    - 🔗 Copy link
  - Print functionality
  - Download as PDF (placeholder)

### 5. **PartyBot AI Assistant**
- **Floating Assistant** (`components/party-bot.js`)
  - 🤖 Sticky chat button (bottom-right)
  - AI-powered responses
  - Mock responses for:
    - Pricing questions
    - Theme recommendations
    - Booking process
    - Age recommendations
    - Add-on information
  - Available on dashboard and booking pages

### 6. **Party Booking Landing Page**
- **Book Party Hub** (`book-party-index.html`)
  - Feature showcase
  - Call-to-action buttons
  - Links to all platforms
  - Platform overview

## Architecture

### State Management

**Frontend-Only Storage (localStorage)**
- `omnify_users` - All registered users
- `omnify_current_user` - Currently logged-in user
- `omnify_bookings` - All party bookings

### File Structure

```
omnify-ai-assessment/
├── auth/
│   ├── login.html          # Login form
│   └── register.html       # Registration form
├── lib/
│   ├── auth.js             # Authentication state
│   └── booking-state.js    # Booking management
├── dashboard/
│   └── index.html          # Parent dashboard
├── book-party/
│   └── index.html          # 6-step booking wizard
├── invitation/
│   └── index.html          # Invitation card generator
├── components/
│   └── party-bot.js        # AI assistant
├── book-party-index.html   # Platform landing page
└── assets/
    ├── omnify.css          # Design system
    └── omnify.js           # Shared utilities
```

## Quick Start

### 1. Access the Platform

**Default Homepage:**
- Visit `/book-party-index.html` for the landing page
- Or visit `index.html` for the original Omnify assessment

### 2. Create Account

- Click **"Get Started"** → `/auth/register.html`
- Or use **demo credentials**:
  - Email: `demo@example.com`
  - Password: `demo123`

### 3. Book a Party

From dashboard:
1. Click **"+ Book a Party"** button
2. Follow the 6-step wizard
3. Review and confirm booking
4. Generate invitation

### 4. Manage Bookings

- View all bookings on dashboard
- Edit existing bookings
- Share invitations
- View booking details

### 5. Get AI Help

- Click the 🤖 PartyBot button (bottom-right)
- Ask questions about:
  - Pricing and packages
  - Available themes
  - Booking process
  - Age recommendations

## Mock Data

### Party Packages (6 Themes)

| Theme | Price | Per Guest | Duration |
|-------|-------|-----------|----------|
| Robotics | $25 | $12 | 90 min |
| Art & Craft | $20 | $10 | 75 min |
| Dance | $22 | $11 | 60 min |
| Science Lab | $28 | $14 | 90 min |
| Sports | $18 | $9 | 120 min |
| Gaming | $24 | $12 | 120 min |

### Add-Ons Available

- Cake & Snacks ($8)
- Party Favors ($6)
- Premium Photography ($12)
- Decoration Package ($7)
- DJ & Music Setup ($15)

### Time Slots

- 10:00 AM
- 12:00 PM
- 2:00 PM
- 4:00 PM
- 6:00 PM

## Design System

All pages use the existing Omnify design system from `assets/omnify.css`:

**Color Palette:**
- Primary Green: `#16C172`
- Teal: `#4ECDC4`
- Mint: `#C8F7DC`
- Accent Orange: `#FF7A59`
- Cream Background: `#FFFBF4`
- Lavender: `#EEE9FF`

**Typography:**
- Display: Outfit (700 weight)
- Body/UI: Plus Jakarta Sans (400-600 weight)

**Components:**
- Rounded cards (16-24px border-radius)
- Soft shadows (0 4px-10px with 8% opacity)
- Generous spacing
- Smooth transitions

## Animations

**Included Animations:**
- Fade-in on page transitions
- Scale/transform on hover
- Bounce on success icons
- Slide animations for modals
- Progress indicator updates

## Data Flow

```
User Registration
    ↓
Login (creates session in localStorage)
    ↓
Dashboard (displays user's bookings)
    ↓
Book Party Wizard (6 steps)
    ↓
Booking Confirmation (saves to localStorage)
    ↓
Invitation Generation (creates shareable card)
    ↓
Dashboard (booking appears in list)
```

## Development Notes

### Frontend-Only Approach

All data is stored in browser's `localStorage`:
- ✅ No backend required
- ✅ No database needed
- ✅ Works offline
- ✅ Fast & responsive
- ❌ Data lost if localStorage cleared
- ❌ Not suitable for production

### To Migrate to Backend

1. Replace `localStorage` calls with API endpoints
2. Create user authentication API (JWT tokens)
3. Build booking CRUD endpoints
4. Add database (PostgreSQL/MongoDB)
5. Deploy backend (Node.js/Python)

### PartyBot AI Integration

Current: Mock responses based on keywords

To upgrade with real AI:
1. Call OpenRouter API (like main discovery)
2. Create `api/party-bot.js` endpoint
3. Stream responses to chat UI
4. Implement conversation history

## Testing Checklist

- [ ] Login with demo credentials
- [ ] Register a new account
- [ ] Create a party booking (all 6 steps)
- [ ] Edit existing booking
- [ ] Generate invitation with QR code
- [ ] Share invitation via email/SMS/link
- [ ] Ask PartyBot questions
- [ ] Verify responsive design (mobile)
- [ ] Check localStorage in browser DevTools
- [ ] Test logout and re-login

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ IE 11 (no support for modern CSS/JS)

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios > 7:1
- Form validation messages

## Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables (if needed)
4. Deploy!

**Live URL:** `omnify-ai-assessment.vercel.app/book-party-index.html`

### Local Testing

```bash
# Serve locally (Python)
python -m http.server 8000

# Then visit
http://localhost:8000/book-party-index.html
```

## Future Enhancements

1. **Real Backend**
   - User authentication with JWT
   - Persistent booking storage
   - Email confirmations

2. **Payment Integration**
   - Stripe/PayPal checkout
   - Invoice generation
   - Refund handling

3. **Admin Panel**
   - Manage party packages
   - View all bookings
   - Customer support tools

4. **Mobile App**
   - Native iOS/Android apps
   - Push notifications
   - Offline booking

5. **AI Enhancements**
   - Real Claude API integration
   - Conversation memory
   - Smart theme recommendations
   - Personalized add-on suggestions

## Support

For issues or questions:
1. Check the EXTENSION_PLAN.md
2. Review localStorage in DevTools
3. Verify URLs are correct
4. Clear browser cache if needed

---

**Built with ❤️ for Omnify**

Extension created 2026-07-08
Vanilla HTML/CSS/JS • Frontend-Only • No Dependencies
