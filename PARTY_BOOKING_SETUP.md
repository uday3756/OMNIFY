# 🎉 Party Booking Platform - Setup & Testing Guide

## Quick Start (5 Minutes)

### Step 1: Access the Platform

Open in your browser:
```
file:///C:/Users/unti/omnify-ai-assessment/book-party-index.html
```

Or if deployed to Vercel:
```
https://omnify-ai-assessment.vercel.app/book-party-index.html
```

### Step 2: Create Account or Login

**Option A: Use Demo Account**
- Click "Sign In" → Use these credentials:
  - Email: `demo@example.com`
  - Password: `demo123`

**Option B: Create New Account**
- Click "Get Started"
- Fill in name, email, password
- Accept terms
- Creates account instantly (stored in localStorage)

### Step 3: Test the Party Booking Flow

1. **From Dashboard:**
   - Click "+ Book a Party" button
   
2. **Step 1: Child Information**
   - Child Name: `Emma`
   - Age: `8`
   - Interests: `Robotics, Gaming`
   - Date: Pick any future date
   - Time: Select `2:00 PM`
   - Click "Next"

3. **Step 2: Theme Selection**
   - Click on `🤖 Robotics Robot Party`
   - Click "Next"

4. **Step 3: Guest Count**
   - Set guests to `12`
   - Add special requirements: `Vegetarian option needed`
   - Watch the price update live
   - Click "Next"

5. **Step 4: Add-Ons**
   - Select `🎂 Cake & Snacks Package` (+$8)
   - Select `🎁 Party Favors Bundle` (+$6)
   - Total should now include add-ons
   - Click "Next"

6. **Step 5: Review & Confirm**
   - Review all details
   - Check the final price
   - Click checkbox to accept terms
   - Click "Confirm Booking"

7. **Step 6: Success!**
   - See confirmation with booking ID
   - Click "Create Invitation"

### Step 4: Generate & Share Invitation

- View beautiful invitation card
- See QR code (can scan with phone)
- Try share options:
  - 📧 Email (opens mail client)
  - 💬 SMS (opens message app)
  - 🔗 Copy Link (copies URL to clipboard)
- Try "Print" button

### Step 5: Return to Dashboard

- Click "Go to Dashboard" or "Back to Dashboard"
- See your new booking in the list
- Try "Edit", "Details", or "Share" buttons

### Step 6: Test PartyBot

- Click 🤖 button in bottom-right corner
- Chat opens!
- Try these questions:
  - `How much does it cost?`
  - `What themes do you have?`
  - `How do I book a party?`
  - `What age groups do you serve?`
  - `Can I add decorations?`

---

## Testing Scenarios

### Scenario 1: Complete a Full Booking ✅

**Goal:** Book a party from start to finish

1. Login with demo account
2. Click "+ Book a Party"
3. Fill all fields (see values below)
4. Complete all 6 steps
5. Share invitation

**Test Data:**
```
Child Name: Sophie
Age: 7
Gender: Girl
Interests: Art, Fashion
Date: [tomorrow's date]
Time: 10:00 AM
Theme: Art & Craft Studio Party
Guests: 15
Requirements: Gluten-free snacks
Add-ons: Cake, Photography, Decorations
```

**Expected Result:** Booking confirmed with ID, invitation created

### Scenario 2: Edit Booking ✅

**Goal:** Modify an existing booking

1. From dashboard, find any booking
2. Click "Edit"
3. Change guest count
4. Change date/time
5. Confirm changes

**Expected Result:** Dashboard updates with new details

### Scenario 3: Share Invitation ✅

**Goal:** Test invitation sharing

1. Create a booking
2. Create invitation
3. Test each share option:
   - Click "📧 Email" → Should open mail client
   - Click "💬 SMS" → Should open message app
   - Click "🔗 Copy Link" → Should copy URL
   - Print → Should show print dialog

**Expected Result:** All share methods work without errors

### Scenario 4: Authentication Flow ✅

**Goal:** Test login/register/logout

1. **Register:**
   - Go to `/auth/register.html`
   - Create new account
   - See success message
   - Get redirected to dashboard

2. **Login:**
   - Logout from dashboard
   - Go to `/auth/login.html`
   - Login with new account
   - Verify booking appears in dashboard

3. **Guest Login:**
   - Go to login page
   - Click "Continue as Guest"
   - Access dashboard as guest
   - Try to book (should work but stored temporarily)

**Expected Result:** All auth flows work, data persists

### Scenario 5: Responsive Design ✅

**Goal:** Test on mobile devices

1. Open Chrome DevTools (F12)
2. Click device toggle (📱)
3. Select "iPhone 12" or "Pixel 5"
4. Test:
   - Book party wizard (all steps should fit)
   - Invitation card (readable on small screen)
   - PartyBot chat (accessible and usable)
   - Dashboard (cards stack vertically)

**Expected Result:** No horizontal scrolling, all elements accessible

### Scenario 6: PartyBot AI ✅

**Goal:** Test AI assistant

1. Open dashboard or booking page
2. Click 🤖 button
3. Ask different questions:
   - Pricing questions
   - Theme recommendations
   - Process questions
   - Age-related questions
4. Type message and press Enter (or click Send)
5. Verify AI responds appropriately

**Expected Result:** Responses are relevant and helpful

---

## Browser DevTools Inspection

### Check localStorage

1. Open browser DevTools (F12)
2. Go to "Application" or "Storage" tab
3. Click "Local Storage"
4. Select your domain
5. Look for these keys:

```
omnify_users         # Array of registered users
omnify_current_user  # Currently logged-in user
omnify_bookings      # All party bookings
```

### Verify Data Structure

**User Object:**
```javascript
{
  id: "abc123xyz",
  name: "John Doe",
  email: "john@example.com",
  password: "mypassword123",
  createdAt: "2026-07-08T10:00:00.000Z",
  isGuest: false
}
```

**Booking Object:**
```javascript
{
  id: "party_xyz123",
  userId: "abc123xyz",
  childName: "Emma",
  childAge: "8",
  childGender: "girl",
  childInterests: "Robots, Gaming",
  partyDate: "2026-07-15",
  partyTime: "2:00 PM",
  selectedTheme: { id: "pkg_1", name: "Robotics", icon: "🤖" },
  guestCount: 12,
  specialRequirements: "Vegetarian",
  selectedAddons: [{ id: "addon_1", name: "Cake", price: 8 }],
  totalPrice: 157,
  basePrice: 25,
  pricePerGuest: 12,
  status: "confirmed",
  date: "2026-07-15",
  bookingRef: "PARTY-123456",
  icon: "🤖",
  partyName: "Robotics Robot Party",
  createdAt: "2026-07-08T10:00:00.000Z"
}
```

---

## Troubleshooting

### Problem: Login doesn't work

**Solution:**
1. Clear localStorage: DevTools → Application → Clear Site Data
2. Go back to login page
3. Try demo credentials again
4. Check console (F12) for errors

### Problem: Booking not showing in dashboard

**Solution:**
1. Reload page
2. Check localStorage for booking data
3. Verify logged-in user ID matches booking userId
4. Clear cache and refresh

### Problem: PartyBot not responding

**Solution:**
1. Check browser console for JS errors
2. Verify `components/party-bot.js` is loaded
3. Try refreshing the page
4. Test in different browser

### Problem: Invitation QR code not showing

**Solution:**
1. Verify QRCode library loaded: `<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>`
2. Check console for errors
3. QR code should appear after page loads

### Problem: Styling looks broken

**Solution:**
1. Verify `assets/omnify.css` exists and loads
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+F5)
4. Check all CSS is inline in HTML

---

## Feature Verification Checklist

### Authentication ✅
- [ ] Register new account works
- [ ] Login with email/password works
- [ ] Guest login works
- [ ] Logout works
- [ ] Password validation shows errors
- [ ] Email uniqueness validated

### Dashboard ✅
- [ ] Shows user name and avatar
- [ ] Shows all bookings
- [ ] Empty state when no bookings
- [ ] Edit button opens booking
- [ ] Delete button removes booking
- [ ] Share button works

### Booking Wizard ✅
- [ ] Step 1: All form fields work
- [ ] Step 2: Theme selection works
- [ ] Step 3: Price updates with guest count
- [ ] Step 4: Add-ons toggle and add to price
- [ ] Step 5: Review shows all info correctly
- [ ] Step 6: Confirmation with booking ID

### Invitation ✅
- [ ] Beautiful card design
- [ ] Party details display correctly
- [ ] QR code generates
- [ ] Email share works
- [ ] SMS share works
- [ ] Copy link works
- [ ] Print works

### PartyBot ✅
- [ ] Button appears on pages
- [ ] Chat opens/closes
- [ ] Messages send
- [ ] AI responds appropriately
- [ ] Scrolls to latest message
- [ ] Responsive on mobile

---

## Performance Tips

1. **Clear localStorage periodically** during testing to avoid data accumulation
2. **Check console** (F12) for any warnings/errors
3. **Use mobile view** to test responsive design
4. **Test different booking scenarios** to verify calculations
5. **Monitor DevTools Network** to verify no external API calls unless intended

---

## Next Steps

After testing:

1. ✅ Verify all features work as expected
2. ✅ Test on different browsers
3. ✅ Test on mobile devices
4. ✅ Clear data and test fresh installation
5. 📦 Deploy to Vercel
6. 🎉 Share with stakeholders

---

**Ready to test? Start here:** `/book-party-index.html`

Demo login: `demo@example.com` / `demo123`

Happy booking! 🎉
