# Mobile POS - Business Management System

A comprehensive mobile application for iOS and Android built with Expo that integrates Mobile POS, credit ordering, and supplier management with Telegram AI Business Manager.

## 🎯 Features

### 1. **Mobile POS System**
- Create sales transactions with multiple items
- Generate QR codes for customer payments
- Real-time payment confirmation via Telegram
- Transaction history tracking

### 2. **Telegram Integration**
- Secure login via Telegram authentication
- Payment confirmations sent to customers
- Automated payment reminders
- Supplier communication through Telegram

### 3. **Credit Order Management**
- Place orders on credit with suppliers
- Track credit limits and utilization
- Automated order confirmation workflow
- Delivery date management

### 4. **Supplier Management**
- Manage multiple supplier relationships
- View supplier ratings and order history
- Track credit limits per supplier
- Quick access to place orders

### 5. **Credit Scoring System**
- Real-time credit score tracking
- Score improvement through timely payments
- Detailed factors affecting credit score
- Historical score trends

### 6. **Dashboard & Analytics**
- Current balance overview
- Recent transaction activity
- Credit score at a glance
- Quick action shortcuts

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper
- **State Management**: React Hooks
- **Icons**: Expo Vector Icons (Ionicons)
- **Gradients**: Expo Linear Gradient
- **QR Codes**: react-native-qrcode-svg
- **Storage**: AsyncStorage

## 📱 User Flow

### Initial Sale Process
1. Merchant processes sale via Mobile POS
2. Customer scans QR code to initiate payment
3. Payment confirmation request sent to customer's Telegram
4. Customer confirms payment in Telegram
5. Transaction completed

### Credit Order Placement
1. Merchant opens Telegram AI Business Manager (Dashboard)
2. Navigates to supplier management section
3. Selects "place order on credit" option
4. Inputs: supplier selection, order amount, delivery date
5. System confirms order details before submission
6. Order details automatically sent to supplier via Telegram
7. Supplier reviews and confirms order
8. Confirmation sent back to merchant
9. Credit order counter incremented

### Payment Reminder & Processing
1. Telegram bot sends automated payment reminder
2. Merchant authorizes payment through bot interface
3. Payment confirmation sent to supplier
4. Merchant's credit score automatically improves

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.17.0 or >=22.9.0)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
cd ~/Documents/EDHE_HACKATHON/telegram-pos-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on specific platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📂 Project Structure

```
telegram-pos-app/
├── App.js                          # Main app entry point
├── src/
│   └── screens/
│       ├── SplashScreen.js         # App splash screen
│       ├── LoginScreen.js          # Telegram login
│       ├── DashboardScreen.js      # Main dashboard
│       ├── POSScreen.js            # Point of sale
│       ├── PaymentConfirmationScreen.js  # Payment confirmation
│       ├── SupplierManagementScreen.js   # Supplier management
│       ├── CreditOrderScreen.js    # Place credit orders
│       ├── OrderConfirmationScreen.js    # Order status
│       ├── PaymentReminderScreen.js      # Payment reminders
│       ├── TransactionHistoryScreen.js   # Transaction history
│       └── CreditScoreScreen.js    # Credit score details
├── package.json
└── README.md
```

## 🎨 Key Screens

### 1. Splash Screen
- Displays app branding
- Auto-navigates to login after 2.5 seconds

### 2. Login Screen
- Telegram-based authentication
- Phone number verification
- Two-step verification process

### 3. Dashboard
- Current balance display
- Credit score overview
- Quick action buttons
- Recent activity feed
- Pending orders summary

### 4. POS Screen
- Add items to cart
- Generate QR codes for payment
- Simulated payment confirmation
- Real-time total calculation

### 5. Supplier Management
- List of all suppliers
- Credit limit tracking
- Supplier ratings
- Quick order placement

### 6. Credit Order Screen
- Select supplier
- Enter order details
- Set delivery date
- View payment terms
- Place order on credit

### 7. Order Confirmation
- Real-time order status
- Timeline visualization
- Supplier confirmation
- Credit impact notification

### 8. Payment Reminder
- Overdue/upcoming payment alerts
- Payment authorization
- Credit score impact preview
- Direct supplier communication

### 9. Transaction History
- All transactions overview
- Filter by type (sales, orders, payments)
- Money in/out summary
- Net flow calculation

### 10. Credit Score
- Current score display
- Score trend chart
- Contributing factors
- Improvement tips
- Available benefits

## 🔐 Security Features

- Telegram-based authentication
- Secure payment processing
- Encrypted data storage
- Two-factor verification

## 📊 Credit Scoring System

### Score Calculation Factors:
1. **Payment History (35%)** - On-time payment record
2. **Credit Utilization (30%)** - Percentage of credit used
3. **Order Frequency (20%)** - Consistency of orders
4. **Account Age (15%)** - Length of business relationship

### Score Ranges:
- 750-850: Excellent
- 700-749: Very Good
- 650-699: Good
- 600-649: Fair
- Below 600: Poor

## 🎯 Business Benefits

- Streamlined payment processing
- Automated payment reminders
- Improved supplier relationships
- Better credit management
- Real-time financial tracking
- Enhanced business credibility

## 📈 Future Enhancements

- [ ] Real Telegram bot integration
- [ ] Actual payment gateway integration
- [ ] Multi-currency support
- [ ] Advanced analytics dashboard
- [ ] Invoice generation
- [ ] Inventory management
- [ ] Multiple user roles
- [ ] Push notifications
- [ ] Offline mode support
- [ ] Export reports (PDF/CSV)

## 🤝 Contributing

This is a hackathon project. For contributions:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is created for the EDHE Hackathon.

## 👥 Support

For support and questions:
- Open an issue in the repository
- Contact the development team

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Navigation for seamless navigation
- The open-source community

---

**Built with ❤️ for EDHE Hackathon 2024**
