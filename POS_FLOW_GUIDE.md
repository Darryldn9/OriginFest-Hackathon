# Direla POS - New User Flow

## POS Screen Flow

```
┌─────────────────────────────────────────┐
│                                         │
│  [Direla Logo]  Point of Sale      [←] │
│                                         │
└─────────────────────────────────────────┘

STAGE 1: AMOUNT ENTRY
┌─────────────────────────────────────────┐
│                                         │
│  ╔═══════════════════════════════════╗ │
│  ║       Enter Amount                ║ │
│  ║                                   ║ │
│  ║        R 0                        ║ │
│  ║                                   ║ │
│  ╚═══════════════════════════════════╝ │
│                                         │
│         NUMPAD                          │
│    ┌─────┬─────┬─────┐                 │
│    │  1  │  2  │  3  │                 │
│    ├─────┼─────┼─────┤                 │
│    │  4  │  5  │  6  │                 │
│    ├─────┼─────┼─────┤                 │
│    │  7  │  8  │  9  │                 │
│    ├─────┼─────┼─────┤                 │
│    │  .  │  0  │ ⌫  │                 │
│    └─────┴─────┴─────┘                 │
│                                         │
│  ┌──────────┬────────────────────────┐ │
│  │  Clear   │  Next  →               │ │
│  └──────────┴────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘

            ↓ User taps Next

STAGE 2: PAYMENT METHOD SELECTION
┌─────────────────────────────────────────┐
│                                         │
│  [Direla Logo]  Point of Sale      [←] │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ╔═══════════════════════════════════╗ │
│  ║    Total Amount                   ║ │
│  ║    R 250.00                       ║ │
│  ╚═══════════════════════════════════╝ │
│                                         │
│  Select Payment Method                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 💳  Card                        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 📱  Direla Mobile Money    ✓    │◄──── Selected
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 💵  Cash                        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 📲  QR Code                     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Proceed to Payment  ✓          │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘

            ↓ User taps Proceed

PAYMENT CONFIRMATION SCREEN
┌─────────────────────────────────────────┐
│  ← Confirm Payment                      │
├─────────────────────────────────────────┤
│     ╔═════════════════════════╗         │
│     ║                         ║         │
│     ║     ⏳ Processing       ║         │
│     ║     Payment...          ║         │
│     ║                         ║         │
│     ╚═════════════════════════╝         │
│                                         │
│  Transaction Details                    │
│  ┌─────────────────────────────────┐   │
│  │ Transaction ID: TX1234567890    │   │
│  │ ──────────────────────────────  │   │
│  │ Amount: R 250.00                │   │
│  │ ──────────────────────────────  │   │
│  │ Payment Method:                 │   │
│  │ 📱 Direla Mobile Money          │   │
│  │ ──────────────────────────────  │   │
│  │ Status: Pending                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Timeline                               │
│  ● Payment Initiated      ✓             │
│  │                                      │
│  ● Processing Payment     ⏳            │
│  │                                      │
│  ○ Payment Confirmed                    │
│  │                                      │
│  ○ Funds Transferred                    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Cancel Transaction             │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘

            ↓ After 3 seconds (simulated)

PAYMENT CONFIRMED
┌─────────────────────────────────────────┐
│  ← Confirm Payment                      │
├─────────────────────────────────────────┤
│     ╔═════════════════════════╗         │
│     ║                         ║         │
│     ║     ✅ Payment          ║         │
│     ║     Confirmed!          ║         │
│     ║                         ║         │
│     ╚═════════════════════════╝         │
│                                         │
│  Transaction Details                    │
│  ┌─────────────────────────────────┐   │
│  │ Amount: R 250.00                │   │
│  │ Status: Confirmed ✓             │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Timeline                               │
│  ● Payment Initiated      ✓             │
│  │                                      │
│  ● Processing Payment     ✓             │
│  │                                      │
│  ● Payment Confirmed      ✓             │
│  │                                      │
│  ○ Funds Transferred                    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Complete Transaction  →        │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Payment Method Details

### 1. Card Payment
- Standard debit/credit card processing
- Secure payment gateway integration
- Instant confirmation

### 2. Direla Mobile Money
- Mobile money transfer system
- SMS/App confirmation
- Real-time balance updates

### 3. Cash Payment
- Manual cash handling
- Receipt generation
- Cash drawer integration ready

### 4. QR Code Payment
- Generates unique QR code
- Customer scans with their banking app
- Automatic payment confirmation

## Color Scheme

```
Primary:    ████ #006A4E (Direla Green)
Secondary:  ████ #FFD403 (Direla Yellow)
Background: ████ #F6F6F6 (Light Grey)
Text:       ████ #1E1E1E (Dark Grey)
White:      ████ #FFFFFF
```

## Key Features

✓ **Simple 2-step process** - No complex item management
✓ **Large touch targets** - Easy to use on mobile
✓ **Visual feedback** - Clear selection states
✓ **South African** - Rand currency, local branding
✓ **Professional** - Consistent Direla brand identity
✓ **Flexible payments** - 4 payment options
✓ **Real-time updates** - Live transaction tracking
✓ **Error prevention** - Disabled states, validation
