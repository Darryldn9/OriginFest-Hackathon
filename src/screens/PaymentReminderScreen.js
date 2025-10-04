import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '../theme/colors';

export default function PaymentReminderScreen({ navigation }) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Sample payment reminder data
  const reminder = {
    orderId: 'ORD-2024-1001',
    supplier: {
      name: 'ABC Corporation',
      category: 'Electronics',
    },
    amount: 12500.00,
    orderDate: '2024-09-04',
    dueDate: '2024-10-04',
    daysUntilDue: 0,
    items: '500 units of Product X, 200 units of Product Y',
  };

  const handleAuthorizePayment = () => {
    Alert.alert(
      'Confirm Payment',
      `Are you sure you want to pay $${reminder.amount.toFixed(2)} to ${reminder.supplier.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Authorize',
          onPress: () => {
            setPaymentCompleted(true);
            // Simulate payment processing
            setTimeout(() => {
              navigation.navigate('Main', { 
                screen: 'Dashboard',
                params: { paymentCompleted: true }
              });
            }, 2000);
          },
        },
      ]
    );
  };

  if (paymentCompleted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.successContainer}
        >
          <Ionicons name="checkmark-circle" size={100} color="#fff" />
          <Text style={styles.successTitle}>Payment Authorized!</Text>
          <Text style={styles.successSubtitle}>
            Payment confirmation sent to supplier
          </Text>
          <View style={styles.successInfo}>
            <View style={styles.successRow}>
              <Ionicons name="trophy" size={24} color="#fff" />
              <Text style={styles.successText}>Your credit score has improved!</Text>
            </View>
            <View style={styles.successRow}>
              <Ionicons name="checkmark-done" size={24} color="#fff" />
              <Text style={styles.successText}>Supplier has been notified</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const isOverdue = reminder.daysUntilDue < 0;
  const isDueToday = reminder.daysUntilDue === 0;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={isOverdue ? ['#FF3B30', '#cc0000'] : isDueToday ? ['#FF9800', '#F57C00'] : ['#0088cc', '#005599']}
        style={styles.header}
      >
        <View style={styles.urgencyBadge}>
          <Ionicons 
            name={isOverdue ? 'warning' : isDueToday ? 'time' : 'calendar'} 
            size={24} 
            color="#fff" 
          />
          <Text style={styles.urgencyText}>
            {isOverdue 
              ? 'PAYMENT OVERDUE' 
              : isDueToday 
                ? 'DUE TODAY' 
                : `DUE IN ${reminder.daysUntilDue} DAYS`}
          </Text>
        </View>
        <Text style={styles.headerTitle}>Payment Reminder</Text>
        <Text style={styles.headerAmount}>${reminder.amount.toFixed(2)}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Alert Message */}
        <View style={[styles.alertCard, isOverdue && styles.alertCardDanger]}>
          <Ionicons 
            name="information-circle" 
            size={24} 
            color={isOverdue ? '#FF3B30' : '#0088cc'} 
          />
          <Text style={styles.alertText}>
            {isOverdue 
              ? 'This payment is overdue. Please pay immediately to maintain your credit score.'
              : isDueToday
                ? 'This payment is due today. Authorize payment to improve your credit score.'
                : 'Your payment is coming due soon. Prepare to authorize payment.'}
          </Text>
        </View>

        {/* Supplier Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Supplier</Text>
          <View style={styles.supplierRow}>
            <View style={styles.supplierIcon}>
              <Ionicons name="business" size={28} color="#0088cc" />
            </View>
            <View style={styles.supplierInfo}>
              <Text style={styles.supplierName}>{reminder.supplier.name}</Text>
              <Text style={styles.supplierCategory}>{reminder.supplier.category}</Text>
            </View>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>{reminder.orderId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Date</Text>
            <Text style={styles.detailValue}>
              {new Date(reminder.orderDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Due Date</Text>
            <Text style={[styles.detailValue, isOverdue && styles.overdueText]}>
              {new Date(reminder.dueDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>Items Ordered</Text>
            <Text style={styles.detailValue}>{reminder.items}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.amountLabel}>Amount Due</Text>
            <Text style={styles.amountValue}>${reminder.amount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Credit Score Impact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Credit Score Impact</Text>
          
          <View style={styles.impactItem}>
            <View style={styles.impactIconGood}>
              <Ionicons name="trending-up" size={20} color="#4CAF50" />
            </View>
            <View style={styles.impactContent}>
              <Text style={styles.impactTitle}>On-Time Payment</Text>
              <Text style={styles.impactDescription}>
                +15 points to your credit score
              </Text>
            </View>
          </View>

          <View style={styles.impactItem}>
            <View style={styles.impactIconBad}>
              <Ionicons name="trending-down" size={20} color="#FF3B30" />
            </View>
            <View style={styles.impactContent}>
              <Text style={styles.impactTitle}>Late Payment</Text>
              <Text style={styles.impactDescription}>
                -25 points from your credit score
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <Ionicons name="paper-plane" size={24} color="#0088cc" />
            <View style={styles.paymentMethodInfo}>
              <Text style={styles.paymentMethodTitle}>Telegram Pay</Text>
              <Text style={styles.paymentMethodDescription}>
                Secure payment via Telegram bot
              </Text>
            </View>
            <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => Alert.alert('Contact Supplier', 'Opening Telegram chat...')}
        >
          <Ionicons name="chatbubble" size={20} color="#0088cc" />
          <Text style={styles.contactButtonText}>Contact Supplier</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.authorizeButton}
          onPress={handleAuthorizePayment}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.authorizeButtonText}>Authorize Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    marginBottom: 16,
  },
  urgencyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  headerAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  alertCardDanger: {
    backgroundColor: '#ffebee',
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  supplierRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  supplierCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailColumn: {
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  overdueText: {
    color: '#FF3B30',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  amountValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0088cc',
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  impactIconGood: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactIconBad: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactContent: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  impactDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentMethodDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0088cc',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: '#0088cc',
    fontSize: 15,
    fontWeight: '600',
  },
  authorizeButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  authorizeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 8,
    textAlign: 'center',
  },
  successInfo: {
    marginTop: 40,
    width: '100%',
    gap: 20,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  successText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
