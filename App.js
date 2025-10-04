import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/theme/colors';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import POSScreen from './src/screens/POSScreen';
import PaymentConfirmationScreen from './src/screens/PaymentConfirmationScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import SupplierManagementScreen from './src/screens/SupplierManagementScreen';
import CreditOrderScreen from './src/screens/CreditOrderScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';
import PaymentReminderScreen from './src/screens/PaymentReminderScreen';
import TransactionHistoryScreen from './src/screens/TransactionHistoryScreen';
import CreditScoreScreen from './src/screens/CreditScoreScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'POS') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Suppliers') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.textLight,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 28,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="POS" component={POSScreen} />
      <Tab.Screen name="Suppliers" component={SupplierManagementScreen} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Main" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PaymentConfirmation" 
            component={PaymentConfirmationScreen}
            options={{ 
              title: 'Confirm Payment',
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="CreditOrder" 
            component={CreditOrderScreen}
            options={{ 
              title: 'Place Credit Order',
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="OrderConfirmation" 
            component={OrderConfirmationScreen}
            options={{ 
              title: 'Order Status',
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="PaymentReminder" 
            component={PaymentReminderScreen}
            options={{ 
              title: 'Payment Due',
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="CreditScore" 
            component={CreditScoreScreen}
            options={{ 
              title: 'Credit Score',
              headerStyle: {
                backgroundColor: COLORS.green,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
