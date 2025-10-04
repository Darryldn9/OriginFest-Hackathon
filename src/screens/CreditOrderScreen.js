import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, formatCurrency } from '../theme/colors';

export default function CreditOrderScreen({ route, navigation }) {
  const { supplier } = route.params || {};
  const [selectedSupplier, setSelectedSupplier] = useState(supplier);
  const [orderAmount, setOrderAmount] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [orderItems, setOrderItems] = useState('');

  const handlePlaceOrder = () => {
    if (!orderAmount || parseFloat(orderAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid order amount');
      return;
    }

    if (!selectedSupplier) {
      Alert.alert('Error', 'Please select a supplier');
      return;
    }

    // Navigate to confirmation screen
    navigation.navigate('OrderConfirmation', {
      supplier: selectedSupplier,
      amount: parseFloat(orderAmount),
      deliveryDate: deliveryDate.toISOString(),
      notes: orderNotes,
      items: orderItems,
    });
  };

  const availableCredit = selectedSupplier 
    ? selectedSupplier.creditLimit - selectedSupplier.currentCredit 
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Place Credit Order</Text>
        <Text style={styles.headerSubtitle}>Order from your trusted suppliers</Text>
      </View>

      {/* Supplier Info */}
      {selectedSupplier && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supplier</Text>
          <View style={styles.supplierCard}>
            <View style={styles.supplierHeader}>
              <View style={styles.supplierIcon}>
                <Ionicons name="business" size={28} color={COLORS.green} />
              </View>
              <View style={styles.supplierInfo}>
                <Text style={styles.supplierName}>{selectedSupplier.name}</Text>
                <Text style={styles.supplierCategory}>{selectedSupplier.category}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFB900" />
                <Text style={styles.ratingText}>{selectedSupplier.rating}</Text>
              </View>
            </View>

            <View style={styles.creditSummary}>
              <View style={styles.creditItem}>
                <Text style={styles.creditItemLabel}>Credit Limit</Text>
                <Text style={styles.creditItemValue}>
                  {formatCurrency(selectedSupplier.creditLimit)}
                </Text>
              </View>
              <View style={styles.creditItem}>
                <Text style={styles.creditItemLabel}>Current Credit</Text>
                <Text style={styles.creditItemValue}>
                  {formatCurrency(selectedSupplier.currentCredit)}
                </Text>
              </View>
              <View style={styles.creditItem}>
                <Text style={styles.creditItemLabel}>Available</Text>
                <Text style={[styles.creditItemValue, styles.availableCredit]}>
                  {formatCurrency(availableCredit)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Order Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Order Amount *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="cash" size={20} color={COLORS.green} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={orderAmount}
              onChangeText={setOrderAmount}
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>
          {orderAmount && selectedSupplier && parseFloat(orderAmount) > availableCredit && (
            <Text style={styles.errorText}>
              Exceeds available credit limit
            </Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Delivery Date *</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color={COLORS.green} />
            <Text style={styles.dateText}>
              {deliveryDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={deliveryDate}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDeliveryDate(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Order Items</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter items description (e.g., 100 units of Product A, 50 units of Product B)"
            value={orderItems}
            onChangeText={setOrderItems}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any special instructions or notes..."
            value={orderNotes}
            onChangeText={setOrderNotes}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Payment Terms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Terms</Text>
        <View style={styles.termsCard}>
          <View style={styles.termRow}>
            <Ionicons name="time" size={20} color={COLORS.green} />
            <Text style={styles.termText}>Payment due: 30 days after delivery</Text>
          </View>
          <View style={styles.termRow}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.green} />
            <Text style={styles.termText}>Credit score will improve upon timely payment</Text>
          </View>
          <View style={styles.termRow}>
            <Ionicons name="paper-plane" size={20} color={COLORS.green} />
            <Text style={styles.termText}>Payment reminders sent via Telegram</Text>
          </View>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Amount</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(parseFloat(orderAmount || 0))}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Date</Text>
            <Text style={styles.summaryValue}>
              {deliveryDate.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelTotal}>Total Credit Order</Text>
            <Text style={styles.summaryValueTotal}>
              {formatCurrency(parseFloat(orderAmount || 0))}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!orderAmount || !selectedSupplier || parseFloat(orderAmount) > availableCredit) && 
            styles.submitButtonDisabled
          ]}
          onPress={handlePlaceOrder}
          disabled={!orderAmount || !selectedSupplier || parseFloat(orderAmount) > availableCredit}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: COLORS.green,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  supplierCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9e6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  creditSummary: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  creditItem: {
    flex: 1,
    alignItems: 'center',
  },
  creditItemLabel: {
    fontSize: 12,
    color: '#666',
  },
  creditItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  availableCredit: {
    color: COLORS.green,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    gap: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  termsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  termText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValueTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 2,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});
