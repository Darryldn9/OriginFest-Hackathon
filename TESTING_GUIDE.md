# Testing Guide - Direla POS App

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Run on Device/Simulator
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Testing the New POS Flow

### Step-by-Step Test Scenario

#### 1. Launch & Login
1. App opens with **Direla splash screen** (green gradient, logo)
2. After 2.5 seconds, auto-navigates to **Login screen**
3. Enter phone number: `+27 82 123 4567`
4. Tap "Send Verification Code"
5. Enter any 6-digit code (e.g., `123456`)
6. Tap "Verify & Login"

#### 2. Navigate to POS
1. App opens on **Dashboard** with Direla branding
2. Notice:
   - Direla logo in header
   - Green and yellow color scheme
   - Balance shown in **R** (Rand)
3. Tap **POS tab** at the bottom

#### 3. Test Amount Entry (Stage 1)
1. You'll see a clean interface with:
   - Direla logo in header
   - Large amount display showing "R 0"
   - Number pad (0-9, decimal, backspace)
   - Clear and Next buttons

2. **Test the numpad:**
   - Tap numbers to enter amount (e.g., 2, 5, 0)
   - Display should show "R 250"
   - Tap decimal point (.)
   - Add cents (e.g., 0, 0)
   - Display should show "R 250.00"

3. **Test Clear button:**
   - Tap "Clear" - amount resets to "R 0"

4. **Test Backspace:**
   - Enter amount again
   - Tap backspace button (⌫) - removes last digit

5. **Test Next button:**
   - With R 0, Next button is disabled (grey)
   - Enter amount (e.g., R 250)
   - Next button becomes enabled (green)
   - Tap "Next"

#### 4. Test Payment Method Selection (Stage 2)
1. You'll see:
   - Green summary card showing total amount
   - "Select Payment Method" title
   - Four payment method cards

2. **Test each payment method:**
   - Tap **Card** - card highlights with green border
   - Tap **Direla Mobile Money** - selection moves to this option
   - Tap **Cash** - selection moves to cash
   - Tap **QR Code** - selection moves to QR

3. **Test Back button:**
   - Tap back arrow (←) in header
   - Returns to amount entry stage
   - Amount is preserved

4. **Test Proceed button:**
   - Without selection, button is disabled
   - Select a payment method
   - Button becomes enabled (green)
   - Tap "Proceed to Payment"

#### 5. Test Payment Confirmation Flow

##### For Card/Mobile Money/Cash:
1. **Pending state** (0-3 seconds):
   - Green gradient header
   - Hourglass icon
   - "Processing Payment..."
   - Transaction details showing:
     - Transaction ID
     - Amount in Rand
     - Selected payment method
     - Status: Pending
   - Timeline showing progress
   - "Cancel Transaction" button

2. **Confirmed state** (after 3 seconds):
   - Yellow checkmark icon
   - "Payment Confirmed!"
   - Status changes to "Confirmed"
   - Timeline updates
   - "Complete Transaction" button appears

3. **Complete:**
   - Tap "Complete Transaction"
   - Returns to Dashboard

##### For QR Code Payment:
1. Same flow as above, PLUS:
2. QR code displayed in middle section
3. Customer can scan QR code
4. Same confirmation flow

### 6. Test Dashboard Integration
1. After completing payment:
   - Dashboard should still show Rand currency
   - Recent activity shows transactions in Rand
   - Green and yellow color scheme throughout

## Visual Checks

### ✓ Branding Checklist
- [ ] Direla logo appears on splash screen
- [ ] Direla logo in POS header
- [ ] Direla logo in Dashboard header
- [ ] Green (#006A4E) used as primary color
- [ ] Yellow (#FFD403) used for accents
- [ ] South African flag emoji (🇿🇦) on splash/login

### ✓ Currency Checklist
- [ ] All amounts show "R" instead of "$"
- [ ] Format is "R X,XXX.XX"
- [ ] Dashboard balance in Rand
- [ ] Transaction amounts in Rand
- [ ] POS amount display in Rand

### ✓ UI/UX Checklist
- [ ] Numpad buttons are large and easy to tap
- [ ] Payment method cards have clear selection state
- [ ] Green border on selected payment method
- [ ] Checkmark icon on selected payment
- [ ] Disabled buttons are grey
- [ ] Enabled buttons are green
- [ ] Smooth transitions between stages
- [ ] Back button works correctly

## Test Scenarios

### Scenario 1: Quick Cash Sale
1. POS → Enter R 50 → Next
2. Select Cash
3. Proceed → Wait for confirmation
4. Complete Transaction

### Scenario 2: Mobile Money Payment
1. POS → Enter R 1,250.50 → Next
2. Select Direla Mobile Money
3. Proceed → Wait for confirmation
4. Complete Transaction

### Scenario 3: QR Code Payment
1. POS → Enter R 499.99 → Next
2. Select QR Code
3. View QR code on confirmation screen
4. Proceed → Wait for confirmation
5. Complete Transaction

### Scenario 4: Cancel Transaction
1. POS → Enter R 100 → Next
2. Select any payment method
3. Proceed → Wait (don't complete)
4. Tap "Cancel Transaction"
5. Returns to POS

### Scenario 5: Change Amount
1. POS → Enter R 200 → Next
2. Tap Back arrow
3. Change amount to R 300
4. Next → Select payment → Proceed

## Known Features

✅ **Working:**
- Amount entry with numpad
- Payment method selection
- Visual feedback and animations
- Currency formatting (Rand)
- Transaction confirmation flow
- Navigation between screens
- Direla branding throughout

⏳ **Simulated:**
- Payment processing (3-second delay)
- Customer confirmation
- Actual payment gateway integration

## Troubleshooting

### App won't start
```bash
# Clear cache and restart
npm start -- --clear
```

### SVG logos not showing
```bash
# Install SVG support
npm install react-native-svg
```

### Colors not updating
- Make sure you've imported COLORS from '../theme/colors'
- Check that all files are saved

### Navigation errors
```bash
# Reinstall navigation dependencies
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

## Next Steps After Testing

1. **Integrate Real Payment Gateway**
   - Connect to actual payment processor
   - Implement card payment SDK
   - Add mobile money API

2. **Add Receipt Printing**
   - Install thermal printer library
   - Design receipt template
   - Add print functionality

3. **Implement Database**
   - Set up Firebase/Supabase
   - Store transactions
   - Sync across devices

4. **Add Analytics**
   - Track sales
   - Monitor payment methods
   - Generate reports

## Support

For issues or questions:
- Check console for error messages
- Verify all dependencies are installed
- Ensure you're using Node.js v20+ or v22+
- Check React Native / Expo documentation

## Success Criteria

Your testing is successful when:
✓ All screens show Direla branding
✓ Currency displays in South African Rand
✓ POS flow works smoothly (amount → payment → confirmation)
✓ All 4 payment methods are selectable
✓ Visual feedback is clear and immediate
✓ Navigation works correctly
✓ No error messages in console
