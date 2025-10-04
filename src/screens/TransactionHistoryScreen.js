import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '../theme/colors';

export default function TransactionHistoryScreen() {
  const [filter, setFilter] = useState('all'); // all, sales, orders, payments

  const transactions = [
    {
      id: '1',
      type: 'sale',
      title: 'Payment Received',
      subtitle: 'Customer #1234',
      amount: 125.00,
      date: '2024-10-04T10:30:00',
      status: 'completed',
    },
    {
      id: '2',
      type: 'order',
      title: 'Credit Order Placed',
      subtitle: 'ABC Corporation',
      amount: -450.00,
      date: '2024-10-03T15:45:00',
      status: 'confirmed',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Made',
      subtitle: 'XYZ Supplies Ltd',
      amount: -320.00,
      date: '2024-10-02T09:15:00',
      status: 'completed',
    },
    {
      id: '4',
      type: 'sale',
      title: 'Payment Received',
      subtitle: 'Customer #5678',
      amount: 89.50,
      date: '2024-10-01T14:20:00',
      status: 'completed',
    },
    {
      id: '5',
      type: 'order',
      title: 'Credit Order Placed',
      subtitle: 'Global Tech Partners',
      amount: -1200.00,
      date: '2024-09-30T11:00:00',
      status: 'delivered',
    },
  ];

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'sales') return t.type === 'sale';
    if (filter === 'orders') return t.type === 'order';
    if (filter === 'payments') return t.type === 'payment';
    return true;
  });

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'sale':
        return { name: 'cart', color: COLORS.green };
      case 'order':
        return { name: 'file-tray-full', color: COLORS.yellow };
      case 'payment':
        return { name: 'cash', color: COLORS.green };
      default:
        return { name: 'document', color: COLORS.grey };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return COLORS.green;
      case 'pending':
        return COLORS.yellow;
      case 'failed':
        return '#FF3B30';
      default:
        return COLORS.grey;
    }
  };

  const FilterButton = ({ value, label }) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterButtonText, filter === value && styles.filterButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const TransactionItem = ({ transaction }) => {
    const isPositive = transaction.amount > 0;
    const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const icon = getTransactionIcon(transaction.type);

    return (
      <TouchableOpacity style={styles.transactionCard}>
        <View style={[styles.transactionIcon, { backgroundColor: isPositive ? '#e8f5e9' : '#fff9e6' }]}>
          <Ionicons 
            name={icon.name} 
            size={24} 
            color={icon.color} 
          />
        </View>
        <View style={styles.transactionContent}>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>
          <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
          <Text style={styles.transactionDate}>{formattedDate}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, isPositive && styles.transactionAmountPositive]}>
            {isPositive ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
              {transaction.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Calculate totals
  const totalIn = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalOut = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netFlow = totalIn - totalOut;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <Text style={styles.headerSubtitle}>Track all your business activities</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Ionicons name="arrow-down-circle" size={24} color={COLORS.green} />
          <Text style={styles.summaryLabel}>Money In</Text>
          <Text style={[styles.summaryValue, styles.summaryValuePositive]}>
            {formatCurrency(totalIn)}
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="arrow-up-circle" size={24} color="#FF3B30" />
          <Text style={styles.summaryLabel}>Money Out</Text>
          <Text style={[styles.summaryValue, styles.summaryValueNegative]}>
            {formatCurrency(totalOut)}
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="swap-horizontal" size={24} color={COLORS.green} />
          <Text style={styles.summaryLabel}>Net Flow</Text>
          <Text style={[styles.summaryValue, netFlow >= 0 ? styles.summaryValuePositive : styles.summaryValueNegative]}>
            {formatCurrency(netFlow)}
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.filtersContent}>
          <FilterButton value="all" label="All" />
          <FilterButton value="sales" label="Sales" />
          <FilterButton value="orders" label="Orders" />
          <FilterButton value="payments" label="Payments" />
        </View>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>
          {filter === 'all' ? 'All Transactions' : 
           filter === 'sales' ? 'Sales' :
           filter === 'orders' ? 'Credit Orders' :
           'Payments'} ({filteredTransactions.length})
        </Text>
        
        {filteredTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No transactions found</Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
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
    paddingTop: 60,
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
  summaryContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  summaryValuePositive: {
    color: COLORS.green,
  },
  summaryValueNegative: {
    color: '#FF3B30',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filtersContent: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 70,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  transactionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionAmountPositive: {
    color: '#4CAF50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  bottomPadding: {
    height: 20,
  },
});
