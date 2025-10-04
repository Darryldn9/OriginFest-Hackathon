# Quick Start Guide - Telegram POS App

## 🚀 Running the Application

### Option 1: Using Expo Go (Recommended for Testing)

1. **Install Expo Go on your mobile device**
   - iOS: Download from [App Store](https://apps.apple.com/app/apple-store/id982107779)
   - Android: Download from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server**
   ```bash
   cd ~/Documents/EDHE_HACKATHON/telegram-pos-app
   npm start
   ```

3. **Scan the QR code**
   - iOS: Use the Camera app to scan the QR code
   - Android: Use the Expo Go app to scan the QR code

### Option 2: Using iOS Simulator (Mac only)

```bash
npm run ios
```

### Option 3: Using Android Emulator

```bash
npm run android
```

### Option 4: Web Browser (Limited functionality)

```bash
npm run web
```

## 📱 Demo Flow

### 1. Login
- App opens to **Splash Screen** (auto-navigates after 2.5 seconds)
- Enter any phone number (e.g., +1234567890)
- Click "Send Verification Code"
- Enter any 6-digit code (e.g., 123456)
- Click "Verify & Login"

### 2. Dashboard Tour
- View current balance: $25,450.00
- Check credit score: 780
- See pending orders: 3
- Explore recent activity

### 3. Create a Sale (POS)
- Tap "POS" tab at bottom
- Add items:
  - Item: "Coffee", Price: 5.00, Qty: 2
  - Item: "Sandwich", Price: 8.50, Qty: 1
- Tap "Add Item" for each
- Review cart (Total: $18.50)
- Tap "Generate QR"
- Customer scans QR code
- Tap "Simulate Payment Confirmation"
- See payment confirmation timeline
- Tap "Complete Transaction"

### 4. Place Credit Order
- Tap "Suppliers" tab
- View supplier list (ABC Corporation, XYZ Supplies, etc.)
- Tap "Place Credit Order" on any supplier
- Or tap supplier card, then "Place Credit Order"
- Fill in order details:
  - Amount: 5000
  - Delivery Date: Select future date
  - Items: "100 units of Product A"
  - Notes: "Urgent delivery needed"
- Tap "Place Order"
- Watch order confirmation flow
- See "Order Confirmed" status
- Tap "Back to Dashboard"

### 5. View Payment Reminder
- Navigate to: Dashboard → Payment Due notification
- Or use navigation menu to access Payment Reminder screen
- Review payment details
- See credit score impact preview
- Tap "Authorize Payment"
- Confirm payment
- Watch credit score increase (+15 points)

### 6. Check Credit Score
- Tap Dashboard
- Tap on "Credit Score" stat card
- View detailed credit score: 780
- See score trend chart (5-month history)
- Review factors affecting score:
  - Payment History: 95%
  - Credit Utilization: 75%
  - Order Frequency: 85%
  - Account Age: 70%
- View benefits (credit limit, payment terms, etc.)
- Read improvement tips

### 7. Transaction History
- Tap "History" tab
- View all transactions
- Filter by type:
  - All
  - Sales
  - Orders
  - Payments
- See money in/out summary
- Review individual transactions

## 🎯 Key Features to Demo

### Mobile POS
✓ Add multiple items to cart  
✓ Real-time total calculation  
✓ QR code generation  
✓ Payment confirmation flow  
✓ Transaction timeline  

### Dashboard
✓ Balance overview  
✓ Credit score display  
✓ Quick actions  
✓ Recent activity feed  
✓ Notification badges  

### Supplier Management
✓ Supplier list with ratings  
✓ Credit limit tracking  
✓ Progress bar for credit usage  
✓ Contact information  
✓ Quick order placement  

### Credit Orders
✓ Supplier selection  
✓ Order form with validation  
✓ Delivery date picker  
✓ Payment terms display  
✓ Order summary  
✓ Real-time confirmation  

### Payment Reminders
✓ Due date alerts  
✓ Overdue warnings  
✓ Credit score impact preview  
✓ One-tap payment authorization  
✓ Success confirmation  

### Credit Score
✓ Current score with rating  
✓ 5-month trend chart  
✓ Factor breakdown  
✓ Benefits display  
✓ Improvement tips  

### Transaction History
✓ Complete transaction list  
✓ Type filtering  
✓ Money flow summary  
✓ Status badges  
✓ Date/time stamps  

## 🎨 Design Highlights

- **Color Scheme**: 
  - Primary: #0088cc (Telegram Blue)
  - Success: #4CAF50
  - Warning: #FF9800
  - Error: #FF3B30

- **Typography**:
  - Clear hierarchy
  - Readable font sizes
  - Bold for emphasis

- **Icons**:
  - Ionicons throughout
  - Consistent style
  - Intuitive meanings

- **Navigation**:
  - Bottom tabs for main sections
  - Stack navigation for flows
  - Back buttons where needed

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and restart
cd ~/Documents/EDHE_HACKATHON/telegram-pos-app
rm -rf node_modules
npm install
npm start -- --clear
```

### QR Code not showing?
- Make sure you added items to cart
- Check that all dependencies are installed
- Try refreshing the POS screen

### DatePicker issues on iOS?
- This is expected - DateTimePicker works best on physical devices
- Use the web version for testing on desktop

### Navigation errors?
- Make sure all screen files are in `src/screens/`
- Check that imports in App.js are correct
- Restart the development server

## 📊 Test Data

### Sample Login Credentials
- Phone: Any 10+ digit number
- Code: Any 6 digits

### Sample Suppliers
1. ABC Corporation (Electronics) - ⭐ 4.8
2. XYZ Supplies Ltd (Office Supplies) - ⭐ 4.5  
3. Global Tech Partners (Technology) - ⭐ 4.9

### Sample Credit Limits
- ABC Corporation: $50,000 (Used: $12,500)
- XYZ Supplies: $30,000 (Used: $8,200)
- Global Tech: $75,000 (Used: $25,000)

## 💡 Tips for Best Demo

1. **Start with a sale** - Shows immediate value
2. **Demo the QR code** - Visual and impressive
3. **Show credit ordering** - Core feature
4. **Highlight credit score** - Unique differentiator
5. **Walk through payment reminder** - Shows automation
6. **End with dashboard** - Ties everything together

## 🎓 Explaining the Business Model

**Problem Solved:**
- Merchants need better payment solutions
- Suppliers want reliable payment tracking
- Both need credit management tools

**Solution Provided:**
- Instant QR code payments via Telegram
- Credit orders with automated tracking
- Credit scoring for better business relationships
- All integrated in one mobile app

**Value Proposition:**
- Reduces payment delays
- Improves cash flow
- Builds supplier trust
- Grows business capacity

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review the main README.md
3. Check the USER_FLOW_DIAGRAM.md
4. Restart the development server
5. Clear cache and reinstall dependencies

---

**Happy Testing! 🚀**
