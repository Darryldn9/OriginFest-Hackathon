# Project Structure

## Directory Overview

```
telegram-pos-app/
│
├── App.js                          # Main application entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── README.md                       # Project documentation
├── QUICK_START.md                  # Quick start guide
├── USER_FLOW_DIAGRAM.md            # Detailed user flow visualization
│
├── assets/                         # Static assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
├── src/
│   └── screens/                    # All application screens
│       ├── SplashScreen.js         # Initial splash screen
│       ├── LoginScreen.js          # Telegram authentication
│       ├── DashboardScreen.js      # Main dashboard
│       ├── POSScreen.js            # Point of Sale
│       ├── PaymentConfirmationScreen.js    # Payment confirmation flow
│       ├── SupplierManagementScreen.js     # Supplier listing
│       ├── CreditOrderScreen.js            # Credit order form
│       ├── OrderConfirmationScreen.js      # Order status tracking
│       ├── PaymentReminderScreen.js        # Payment reminders
│       ├── TransactionHistoryScreen.js     # Transaction history
│       └── CreditScoreScreen.js            # Credit score details
│
└── node_modules/                   # Installed dependencies
```

## Screen Breakdown

### 1. SplashScreen.js (Entry Point)
**Purpose**: App branding and initial load
**Features**:
- Gradient background
- App logo/icon
- Auto-navigation to login after 2.5s
**Navigation**: → LoginScreen

### 2. LoginScreen.js
**Purpose**: User authentication via Telegram
**Features**:
- Phone number input
- SMS verification code
- Two-step verification
- Telegram-style UI
**Navigation**: → Main (Dashboard)

### 3. DashboardScreen.js (Main Hub)
**Purpose**: Central business overview
**Features**:
- Current balance display
- Credit score overview
- Pending orders count
- Recent transactions
- Quick action buttons
- Notification badges
**Navigation**: → All other screens via tabs/buttons

### 4. POSScreen.js
**Purpose**: Create sales transactions
**Features**:
- Add items (name, price, quantity)
- Cart management
- Total calculation
- QR code generation
- Payment simulation
**Navigation**: → PaymentConfirmationScreen

### 5. PaymentConfirmationScreen.js
**Purpose**: Track payment status
**Features**:
- Transaction details
- Timeline visualization
- Status updates (pending → confirmed → completed)
- Customer confirmation simulation
- Telegram integration indicators
**Navigation**: → Dashboard (on completion)

### 6. SupplierManagementScreen.js
**Purpose**: Manage supplier relationships
**Features**:
- Supplier list with cards
- Credit limit tracking
- Usage progress bars
- Supplier ratings
- Search functionality
- Summary statistics
**Navigation**: → CreditOrderScreen

### 7. CreditOrderScreen.js
**Purpose**: Place orders on credit
**Features**:
- Supplier selection display
- Order amount input
- Delivery date picker
- Items description
- Notes field
- Credit validation
- Payment terms display
- Order summary
**Navigation**: → OrderConfirmationScreen

### 8. OrderConfirmationScreen.js
**Purpose**: Track order status
**Features**:
- Order details display
- Supplier information
- Status timeline
- Real-time updates (sending → sent → confirmed)
- Credit impact notification
**Navigation**: → Dashboard

### 9. PaymentReminderScreen.js
**Purpose**: Handle payment due notifications
**Features**:
- Payment details
- Due date alerts
- Overdue warnings
- Credit score impact preview
- Payment authorization
- Supplier contact option
**Navigation**: → Dashboard (after payment)

### 10. TransactionHistoryScreen.js
**Purpose**: View all transactions
**Features**:
- Transaction list
- Type filtering (sales, orders, payments)
- Money in/out summary
- Net flow calculation
- Status badges
- Date/time display
**Navigation**: Can view individual transactions

### 11. CreditScoreScreen.js
**Purpose**: Detailed credit information
**Features**:
- Current score display
- Score level (Excellent/Good/Fair)
- 5-month trend chart
- Contributing factors breakdown
- Progress indicators
- Benefits display
- Improvement tips
**Navigation**: Back to Dashboard

## Navigation Structure

```
Stack Navigator
├── Splash Screen (Initial)
├── Login Screen
└── Main Tabs (After login)
    ├── Tab 1: Dashboard
    ├── Tab 2: POS
    ├── Tab 3: Suppliers
    └── Tab 4: History

Additional Screens (Modal/Push)
├── Payment Confirmation (from POS)
├── Credit Order (from Suppliers)
├── Order Confirmation (from Credit Order)
├── Payment Reminder (from Dashboard/Notifications)
└── Credit Score (from Dashboard)
```

## Component Patterns

### Card Components
Used throughout for consistent UI:
- White background
- Border radius: 12-16px
- Shadow/elevation
- Padding: 16-20px

### Icon Usage
- Ionicons for all icons
- Consistent color scheme
- Size: 20-24px (standard), 32-80px (featured)

### Color Palette
```javascript
Primary: #0088cc (Telegram Blue)
Success: #4CAF50 (Green)
Warning: #FF9800 (Orange)
Error: #FF3B30 (Red)
Info: #2196F3 (Light Blue)
Purple: #9C27B0

Backgrounds:
- Main: #f5f5f5 (Light gray)
- Cards: #ffffff (White)
- Gradients: Primary colors

Text:
- Primary: #333333
- Secondary: #666666
- Tertiary: #999999
- Light: #e0e0e0
```

### Typography Scale
```javascript
Headers: 24-28px, bold
Titles: 18-20px, bold
Body: 14-16px, regular
Caption: 12-13px, regular
```

## State Management

Currently using React Hooks:
- `useState` for local state
- `useEffect` for side effects
- Props for data passing

Future considerations:
- Context API for global state
- Redux for complex state
- AsyncStorage for persistence

## Data Flow

```
User Action → Screen Component → State Update → UI Re-render
                                      ↓
                               Simulated API Call
                                      ↓
                               Update Related Screens
```

## Key Dependencies Purpose

| Package | Purpose |
|---------|---------|
| @react-navigation | App navigation |
| react-native-paper | UI components |
| expo-linear-gradient | Gradient backgrounds |
| react-native-qrcode-svg | QR code generation |
| @react-native-async-storage | Data persistence |
| expo-camera | Camera access (future) |
| @react-native-community/datetimepicker | Date selection |

## Testing Strategy

1. **Manual Testing**
   - Each screen individually
   - Full user flows
   - Edge cases

2. **User Flow Testing**
   - Sale → Payment → Completion
   - Order → Confirmation → Payment
   - Dashboard navigation

3. **UI Testing**
   - Different screen sizes
   - iOS vs Android
   - Dark mode (future)

## Performance Considerations

- Lazy loading for images
- Memoization for expensive calculations
- Virtual lists for long lists (future)
- Image optimization

## Future Structure Additions

```
src/
├── components/          # Reusable components
│   ├── Button.js
│   ├── Card.js
│   ├── Input.js
│   └── ...
├── navigation/          # Navigation configuration
│   └── index.js
├── services/           # API services
│   ├── telegram.js
│   ├── payment.js
│   └── supplier.js
├── utils/              # Helper functions
│   ├── validation.js
│   ├── formatting.js
│   └── constants.js
├── hooks/              # Custom hooks
│   └── useAuth.js
└── context/            # Context providers
    └── AuthContext.js
```

## Development Workflow

1. **Start Development**
   ```bash
   npm start
   ```

2. **Test on Device**
   - Scan QR with Expo Go
   - Or use simulator/emulator

3. **Make Changes**
   - Edit screens
   - Auto-reload on save

4. **Build for Production**
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

## Deployment

### Development
- Expo Go app
- QR code sharing

### Production
- App Store (iOS)
- Google Play (Android)
- Via Expo EAS Build

---

This structure provides a clean, scalable foundation for the Telegram POS application with clear separation of concerns and easy navigation.
