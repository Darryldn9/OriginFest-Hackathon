import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '../theme/colors';

export default function POSScreen({ navigation }) {
  const [amount, setAmount] = useState('0');
  const [stage, setStage] = useState('amount'); // 'amount' or 'payment'
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleNumberPress = (num) => {
    if (amount === '0') {
      setAmount(num);
    } else if (amount.length < 10) {
      setAmount(amount + num);
    }
  };

  const handleDecimal = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleClear = () => {
    setAmount('0');
  };

  const handleNext = () => {
    if (parseFloat(amount) > 0) {
      setStage('payment');
    }
  };

  const handleBack = () => {
    setStage('amount');
    setSelectedPayment(null);
  };

  const handlePaymentMethod = (method) => {
    setSelectedPayment(method);
  };

  const handleProceed = () => {
    if (selectedPayment) {
      const transactionId = 'TX' + Date.now();
      navigation.navigate('PaymentConfirmation', {
        transactionId,
        amount: parseFloat(amount),
        paymentMethod: selectedPayment,
        items: [],
      });
      // Reset
      setAmount('0');
      setStage('amount');
      setSelectedPayment(null);
    }
  };

  const NumberButton = ({ num, onPress }) => (
    <TouchableOpacity style={styles.numButton} onPress={onPress}>
      <Text style={styles.numButtonText}>{num}</Text>
    </TouchableOpacity>
  );

  const PaymentMethodCard = ({ icon, title, onPress, selected, fee }) => (
    <TouchableOpacity
      style={[styles.paymentCard, selected && styles.paymentCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.paymentIcon, selected && styles.paymentIconSelected]}>
        <Ionicons name={icon} size={32} color={selected ? COLORS.white : COLORS.green} />
      </View>
      <View style={styles.paymentInfo}>
        <Text style={[styles.paymentTitle, selected && styles.paymentTitleSelected]}>
          {title}
        </Text>
        {fee && (
          <Text style={styles.paymentFee}>{fee}</Text>
        )}
      </View>
      {selected && (
        <View style={styles.selectedBadge}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.green} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/direla_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Point of Sale</Text>
        {stage === 'payment' && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={COLORS.green} />
          </TouchableOpacity>
        )}
      </View>

      {stage === 'amount' ? (
        // Amount Entry Stage
        <View style={styles.amountStage}>
          {/* Amount Display */}
          <View style={styles.amountDisplay}>
            <Text style={styles.amountLabel}>Enter Amount</Text>
            <Text style={styles.amountText}>{formatCurrency(amount)}</Text>
          </View>

          {/* Numpad */}
          <View style={styles.numpad}>
            <View style={styles.numRow}>
              <NumberButton num="1" onPress={() => handleNumberPress('1')} />
              <NumberButton num="2" onPress={() => handleNumberPress('2')} />
              <NumberButton num="3" onPress={() => handleNumberPress('3')} />
            </View>
            <View style={styles.numRow}>
              <NumberButton num="4" onPress={() => handleNumberPress('4')} />
              <NumberButton num="5" onPress={() => handleNumberPress('5')} />
              <NumberButton num="6" onPress={() => handleNumberPress('6')} />
            </View>
            <View style={styles.numRow}>
              <NumberButton num="7" onPress={() => handleNumberPress('7')} />
              <NumberButton num="8" onPress={() => handleNumberPress('8')} />
              <NumberButton num="9" onPress={() => handleNumberPress('9')} />
            </View>
            <View style={styles.numRow}>
              <TouchableOpacity style={styles.numButton} onPress={handleDecimal}>
                <Text style={styles.numButtonText}>.</Text>
              </TouchableOpacity>
              <NumberButton num="0" onPress={() => handleNumberPress('0')} />
              <TouchableOpacity style={styles.numButton} onPress={handleBackspace}>
                <Ionicons name="backspace-outline" size={28} color={COLORS.darkGrey} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextButton, parseFloat(amount) === 0 && styles.nextButtonDisabled]}
              onPress={handleNext}
              disabled={parseFloat(amount) === 0}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Payment Method Selection Stage
        <View style={styles.paymentStage}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(amount)}</Text>
          </View>

          <Text style={styles.paymentMethodTitle}>Select Payment Method</Text>

          <View style={styles.paymentMethods}>
            <PaymentMethodCard
              icon="card"
              title="Card"
              fee="3.5% fee"
              selected={selectedPayment === 'card'}
              onPress={() => handlePaymentMethod('card')}
            />
            <PaymentMethodCard
              icon="wallet"
              title="Direla"
              fee="0.8% fee"
              selected={selectedPayment === 'direla'}
              onPress={() => handlePaymentMethod('direla')}
            />
            <PaymentMethodCard
              icon="phone-portrait"
              title="Mobile Money"
              fee="1.5% fee"
              selected={selectedPayment === 'mobile'}
              onPress={() => handlePaymentMethod('mobile')}
            />
            <PaymentMethodCard
              icon="cash"
              title="Cash"
              selected={selectedPayment === 'cash'}
              onPress={() => handlePaymentMethod('cash')}
            />
            <PaymentMethodCard
              icon="qr-code"
              title="QR Code"
              selected={selectedPayment === 'qr'}
              onPress={() => handlePaymentMethod('qr')}
            />
          </View>

          <TouchableOpacity
            style={[styles.proceedButton, !selectedPayment && styles.proceedButtonDisabled]}
            onPress={handleProceed}
            disabled={!selectedPayment}
          >
            <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  
  // Amount Stage
  amountStage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  amountDisplay: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  amountLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  amountText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.green,
    letterSpacing: 1,
  },
  numpad: {
    gap: 12,
  },
  numRow: {
    flexDirection: 'row',
    gap: 12,
  },
  numButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    aspectRatio: 1.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  numButtonText: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.darkGrey,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  nextButton: {
    flex: 2,
    backgroundColor: COLORS.green,
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // Payment Stage
  paymentStage: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: COLORS.green,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 1,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginBottom: 16,
  },
  paymentMethods: {
    flex: 1,
    gap: 10,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentCardSelected: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.greenLight,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIconSelected: {
    backgroundColor: COLORS.green,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGrey,
  },
  paymentTitleSelected: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  paymentFee: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  selectedBadge: {
    marginLeft: 8,
  },
  proceedButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  proceedButtonDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
  },
  proceedButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
