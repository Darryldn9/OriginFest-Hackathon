import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, formatCurrency } from '../theme/colors';

export default function PaymentConfirmationScreen({ route, navigation }) {
  const { transactionId, amount, paymentMethod, items = [] } = route.params;
  const [status, setStatus] = useState('pending'); // pending, confirmed, completed
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate checkmark
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Simulate payment confirmation after 8 seconds (slowed down)
    const timer = setTimeout(() => {
      setStatus('confirmed');
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setStatus('completed');
    setTimeout(() => {
      navigation.navigate('Main', { screen: 'Dashboard' });
    }, 1500);
  };

  const getPaymentMethodInfo = () => {
    switch (paymentMethod) {
      case 'card':
        return { icon: 'card', name: 'Card Payment', color: COLORS.green };
      case 'direla':
        return { icon: 'wallet', name: 'Direla', color: COLORS.green };
      case 'mobile':
        return { icon: 'phone-portrait', name: 'Mobile Money', color: COLORS.green };
      case 'cash':
        return { icon: 'cash', name: 'Cash Payment', color: COLORS.green };
      case 'qr':
        return { icon: 'qr-code', name: 'QR Code Payment', color: COLORS.green };
      default:
        return { icon: 'wallet', name: 'Payment', color: COLORS.green };
    }
  };

  const paymentInfo = getPaymentMethodInfo();

  return (
    <View style={styles.container}>
      <View style={[styles.header, status === 'completed' && styles.headerCompleted]}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          {status === 'pending' && (
            <View style={styles.pendingIcon}>
              <Ionicons name="hourglass" size={60} color={COLORS.white} />
            </View>
          )}
          {status === 'confirmed' && (
            <View style={styles.confirmedIcon}>
              <Ionicons name="checkmark-circle" size={80} color={COLORS.yellow} />
            </View>
          )}
          {status === 'completed' && (
            <View style={styles.completedIcon}>
              <Ionicons name="checkmark-done-circle" size={80} color={COLORS.yellow} />
            </View>
          )}
        </Animated.View>

        <Text style={styles.statusTitle}>
          {status === 'pending' && 'Processing Payment...'}
          {status === 'confirmed' && 'Payment Confirmed!'}
          {status === 'completed' && 'Transaction Complete!'}
        </Text>
        <Text style={styles.statusSubtitle}>
          {status === 'pending' && 'Please wait while we process your payment'}
          {status === 'confirmed' && 'Payment has been approved'}
          {status === 'completed' && 'Transaction completed successfully'}
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Transaction Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Transaction Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>{transactionId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.amountValue}>{formatCurrency(amount)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <View style={styles.methodBadge}>
              <Ionicons name={paymentInfo.icon} size={16} color={COLORS.green} />
              <Text style={styles.methodText}>{paymentInfo.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={[styles.statusBadge, status === 'completed' && styles.statusBadgeSuccess]}>
              <Text style={[styles.statusBadgeText, status === 'completed' && styles.statusBadgeTextSuccess]}>
                {status === 'pending' && 'Pending'}
                {status === 'confirmed' && 'Confirmed'}
                {status === 'completed' && 'Completed'}
              </Text>
            </View>
          </View>
        </View>

        {/* QR Code for QR Payment Method */}
        {paymentMethod === 'qr' && status === 'pending' && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Scan to Pay</Text>
            <View style={styles.qrCodeWrapper}>
              <QRCode
                value={JSON.stringify({
                  transactionId,
                  amount: amount,
                  merchantId: 'DIRELA_MERCHANT',
                  currency: 'ZAR',
                })}
                size={200}
                backgroundColor="white"
                color={COLORS.darkGrey}
              />
            </View>
            <Text style={styles.qrSubtext}>Customer should scan this QR code</Text>
          </View>
        )}

        {/* Status Timeline */}
        <View style={styles.timelineCard}>
          <TimelineItem
            icon={paymentInfo.icon}
            title="Payment Initiated"
            time="Just now"
            completed
          />
          <TimelineItem
            icon="sync"
            title="Processing Payment"
            time={status !== 'pending' ? 'Just now' : 'Processing...'}
            completed={status !== 'pending'}
          />
          <TimelineItem
            icon="checkmark-circle"
            title="Payment Confirmed"
            time={status === 'confirmed' || status === 'completed' ? 'Just now' : 'Waiting...'}
            completed={status === 'confirmed' || status === 'completed'}
          />
          <TimelineItem
            icon="wallet"
            title="Funds Transferred"
            time={status === 'completed' ? 'Just now' : 'Pending...'}
            completed={status === 'completed'}
            isLast
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {status === 'confirmed' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Complete Transaction</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {status === 'pending' && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel Transaction</Text>
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
        <Ionicons name={icon} size={20} color={completed ? COLORS.green : COLORS.textLight} />
      </View>
      {!isLast && <View style={[styles.timelineLine, completed && styles.timelineLineCompleted]} />}
    </View>
    <View style={styles.timelineContent}>
      <Text style={[styles.timelineTitle, completed && styles.timelineTitleCompleted]}>{title}</Text>
      <Text style={styles.timelineTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.green,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerCompleted: {
    backgroundColor: COLORS.green,
  },
  iconContainer: {
    marginBottom: 20,
  },
  pendingIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  statusSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
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
    color: COLORS.darkGrey,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGrey,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  methodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  methodText: {
    fontSize: 14,
    color: COLORS.green,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: COLORS.yellowLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusBadgeSuccess: {
    backgroundColor: COLORS.greenLight,
  },
  statusBadgeText: {
    fontSize: 14,
    color: COLORS.yellow,
    fontWeight: '600',
  },
  statusBadgeTextSuccess: {
    color: COLORS.green,
  },
  qrContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginBottom: 20,
  },
  qrCodeWrapper: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  qrSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 16,
  },
  timelineCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineIconCompleted: {
    backgroundColor: COLORS.greenLight,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: COLORS.green,
  },
  timelineContent: {
    flex: 1,
    paddingVertical: 8,
  },
  timelineTitle: {
    fontSize: 15,
    color: COLORS.textLight,
  },
  timelineTitleCompleted: {
    color: COLORS.darkGrey,
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
    opacity: 0.7,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  completeButton: {
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
