import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '../theme/colors';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { supplier, amount, deliveryDate, notes, items } = route.params;
  const [status, setStatus] = useState('sending'); // sending, sent, confirmed
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate icon
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Simulate sending to supplier
    const sendTimer = setTimeout(() => {
      setStatus('sent');
    }, 2000);

    // Simulate supplier confirmation
    const confirmTimer = setTimeout(() => {
      setStatus('confirmed');
    }, 5000);

    return () => {
      clearTimeout(sendTimer);
      clearTimeout(confirmTimer);
    };
  }, []);

  const handleComplete = () => {
    navigation.navigate('Main', { 
      screen: 'Dashboard',
      params: { orderPlaced: true }
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { backgroundColor: status === 'confirmed' ? COLORS.green : COLORS.green }
        ]}
      >
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          {status === 'sending' && (
            <Ionicons name="paper-plane" size={60} color="#fff" />
          )}
          {status === 'sent' && (
            <Ionicons name="checkmark-done" size={70} color="#fff" />
          )}
          {status === 'confirmed' && (
            <Ionicons name="checkmark-circle" size={80} color="#fff" />
          )}
        </Animated.View>

        <Text style={styles.statusTitle}>
          {status === 'sending' && 'Sending Order to Supplier'}
          {status === 'sent' && 'Order Sent Successfully'}
          {status === 'confirmed' && 'Order Confirmed!'}
        </Text>
        <Text style={styles.statusSubtitle}>
          {status === 'sending' && 'Sending order details via Telegram...'}
          {status === 'sent' && 'Awaiting supplier confirmation...'}
          {status === 'confirmed' && 'Supplier has confirmed your order'}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Supplier Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Supplier</Text>
          <View style={styles.supplierRow}>
            <View style={styles.supplierIcon}>
              <Ionicons name="business" size={24} color={COLORS.green} />
            </View>
            <View style={styles.supplierInfo}>
              <Text style={styles.supplierName}>{supplier.name}</Text>
              <Text style={styles.supplierCategory}>{supplier.category}</Text>
            </View>
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order Amount</Text>
            <Text style={styles.detailAmount}>${amount.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Date</Text>
            <Text style={styles.detailValue}>
              {new Date(deliveryDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>

          {items && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Items</Text>
                <Text style={styles.detailValue}>{items}</Text>
              </View>
            </>
          )}

          {notes && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailColumn}>
                <Text style={styles.detailLabel}>Notes</Text>
                <Text style={styles.detailValue}>{notes}</Text>
              </View>
            </>
          )}
        </View>

        {/* Timeline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Status</Text>
          
          <View style={styles.timeline}>
            <TimelineItem
              icon="create"
              title="Order Created"
              time="Just now"
              completed
            />
            <TimelineItem
              icon="paper-plane"
              title="Sent to Supplier via Telegram"
              time={status !== 'sending' ? 'Just now' : 'Sending...'}
              completed={status !== 'sending'}
            />
            <TimelineItem
              icon="checkmark-circle"
              title="Supplier Confirmed Order"
              time={status === 'confirmed' ? 'Just now' : 'Waiting...'}
              completed={status === 'confirmed'}
            />
            <TimelineItem
              icon="cube"
              title="Order Delivery"
              time={new Date(deliveryDate).toLocaleDateString()}
              completed={false}
            />
            <TimelineItem
              icon="wallet"
              title="Payment Due"
              time="30 days after delivery"
              completed={false}
              isLast
            />
          </View>
        </View>

        {/* Credit Impact */}
        <View style={styles.impactCard}>
          <View style={styles.impactHeader}>
            <Ionicons name="information-circle" size={24} color={COLORS.green} />
            <Text style={styles.impactTitle}>Credit Impact</Text>
          </View>
          <Text style={styles.impactText}>
            • Your credit order counter has been increased by +1
          </Text>
          <Text style={styles.impactText}>
            • Payment reminder will be sent via Telegram before due date
          </Text>
          <Text style={styles.impactText}>
            • Timely payment will improve your credit score
          </Text>
        </View>
      </View>

      {/* Action Button */}
      {status === 'confirmed' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Back to Dashboard</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const TimelineItem = ({ icon, title, time, completed, isLast }) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineIconContainer}>
      <View style={[styles.timelineIcon, completed && styles.timelineIconCompleted]}>
        <Ionicons name={icon} size={18} color={completed ? '#4CAF50' : '#ccc'} />
      </View>
      {!isLast && (
        <View style={[styles.timelineLine, completed && styles.timelineLineCompleted]} />
      )}
    </View>
    <View style={styles.timelineContent}>
      <Text style={[styles.timelineTitle, completed && styles.timelineTitleCompleted]}>
        {title}
      </Text>
      <Text style={styles.timelineTime}>{time}</Text>
    </View>
  </View>
);

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
  iconContainer: {
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 20,
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  timeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineIconCompleted: {
    backgroundColor: '#e8f5e9',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
    paddingVertical: 6,
  },
  timelineTitle: {
    fontSize: 14,
    color: '#666',
  },
  timelineTitleCompleted: {
    color: '#333',
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  impactCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  impactText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
