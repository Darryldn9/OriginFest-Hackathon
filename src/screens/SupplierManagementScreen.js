import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, formatCurrency } from '../theme/colors';

export default function SupplierManagementScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suppliers, setSuppliers] = useState([
    {
      id: '1',
      name: 'ABC Corporation',
      category: 'Electronics',
      rating: 4.8,
      totalOrders: 45,
      creditLimit: 50000,
      currentCredit: 12500,
      status: 'active',
      contact: '+1234567890',
    },
    {
      id: '2',
      name: 'XYZ Supplies Ltd',
      category: 'Office Supplies',
      rating: 4.5,
      totalOrders: 32,
      creditLimit: 30000,
      currentCredit: 8200,
      status: 'active',
      contact: '+1234567891',
    },
    {
      id: '3',
      name: 'Global Tech Partners',
      category: 'Technology',
      rating: 4.9,
      totalOrders: 67,
      creditLimit: 75000,
      currentCredit: 25000,
      status: 'active',
      contact: '+1234567892',
    },
  ]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SupplierCard = ({ supplier }) => {
    const creditUsagePercent = (supplier.currentCredit / supplier.creditLimit) * 100;

    return (
      <TouchableOpacity 
        style={styles.supplierCard}
        onPress={() => navigation.navigate('CreditOrder', { supplier })}
      >
        <View style={styles.supplierHeader}>
          <View style={styles.supplierIcon}>
            <Ionicons name="business" size={24} color={COLORS.green} />
          </View>
          <View style={styles.supplierInfo}>
            <Text style={styles.supplierName}>{supplier.name}</Text>
            <Text style={styles.supplierCategory}>{supplier.category}</Text>
          </View>
          <View style={styles.supplierRating}>
            <Ionicons name="star" size={16} color="#FFB900" />
            <Text style={styles.ratingText}>{supplier.rating}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.supplierStats}>
          <View style={styles.statItem}>
            <Ionicons name="cart-outline" size={18} color="#666" />
            <Text style={styles.statLabel}>{supplier.totalOrders} orders</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="call-outline" size={18} color="#666" />
            <Text style={styles.statLabel}>{supplier.contact}</Text>
          </View>
        </View>

        <View style={styles.creditInfo}>
          <View style={styles.creditHeader}>
            <Text style={styles.creditLabel}>Credit Usage</Text>
            <Text style={styles.creditAmount}>
              {formatCurrency(supplier.currentCredit)} / {formatCurrency(supplier.creditLimit)}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${creditUsagePercent}%` },
                creditUsagePercent > 80 && styles.progressFillHigh
              ]} 
            />
          </View>
          <Text style={styles.creditPercent}>{creditUsagePercent.toFixed(1)}% used</Text>
        </View>

        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => navigation.navigate('CreditOrder', { supplier })}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.orderButtonText}>Place Credit Order</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Supplier Management</Text>
        <Text style={styles.headerSubtitle}>Manage your supplier relationships</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search suppliers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.miniStat}>
            <Text style={styles.miniStatValue}>{suppliers.length}</Text>
            <Text style={styles.miniStatLabel}>Total Suppliers</Text>
          </View>
          <View style={styles.miniStat}>
            <Text style={styles.miniStatValue}>
              {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
            </Text>
            <Text style={styles.miniStatLabel}>Total Orders</Text>
          </View>
          <View style={styles.miniStat}>
            <Text style={styles.miniStatValue}>
              {formatCurrency(suppliers.reduce((sum, s) => sum + s.currentCredit, 0))}
            </Text>
            <Text style={styles.miniStatLabel}>Active Credit</Text>
          </View>
        </View>

        <View style={styles.suppliersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Active Suppliers ({filteredSuppliers.length})
            </Text>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={24} color={COLORS.green} />
            </TouchableOpacity>
          </View>

          {filteredSuppliers.map(supplier => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </View>

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  miniStat: {
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
  miniStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  miniStatLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  suppliersSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  supplierCard: {
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
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supplierIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e9',
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
  supplierRating: {
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
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  supplierStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  creditInfo: {
    marginBottom: 16,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  creditLabel: {
    fontSize: 13,
    color: '#666',
  },
  creditAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.green,
    borderRadius: 3,
  },
  progressFillHigh: {
    backgroundColor: COLORS.yellow,
  },
  creditPercent: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  orderButton: {
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});
