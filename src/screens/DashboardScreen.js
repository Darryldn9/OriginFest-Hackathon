import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, formatCurrency } from '../theme/colors';

export default function DashboardScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    balance: 25450.00,
    creditScore: 780,
    pendingOrders: 3,
    totalCreditOrders: 12,
    recentTransactions: [],
    notifications: 2,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const StatCard = ({ icon, title, value, color, onPress }) => (
    <TouchableOpacity 
      style={[styles.statCard, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.statIcon}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.border} />
    </TouchableOpacity>
  );

  const QuickAction = ({ icon, title, color, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionButton, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color={COLORS.white} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.businessName}>My Business</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={COLORS.darkGrey} />
            {dashboardData.notifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{dashboardData.notifications}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>
            {formatCurrency(dashboardData.balance)}
          </Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceActionButton}>
              <Ionicons name="add-circle" size={20} color={COLORS.green} />
              <Text style={styles.balanceActionText}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceActionButton}>
              <Ionicons name="download" size={20} color={COLORS.green} />
              <Text style={styles.balanceActionText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="trophy"
          title="Credit Score"
          value={dashboardData.creditScore}
          color={COLORS.green}
          onPress={() => navigation.navigate('CreditScore')}
        />
        <StatCard
          icon="time"
          title="Pending Orders"
          value={dashboardData.pendingOrders}
          color={COLORS.yellow}
          onPress={() => navigation.navigate('History')}
        />
        <StatCard
          icon="cart"
          title="Total Credit Orders"
          value={dashboardData.totalCreditOrders}
          color={COLORS.green}
          onPress={() => navigation.navigate('History')}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            icon="cart"
            title="New Sale"
            color={COLORS.green}
            onPress={() => navigation.navigate('POS')}
          />
          <QuickAction
            icon="add-circle"
            title="Credit Order"
            color={COLORS.green}
            onPress={() => navigation.navigate('CreditOrder')}
          />
          <QuickAction
            icon="people"
            title="Suppliers"
            color={COLORS.green}
            onPress={() => navigation.navigate('Suppliers')}
          />
          <QuickAction
            icon="stats-chart"
            title="Reports"
            color={COLORS.green}
            onPress={() => navigation.navigate('History')}
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityList}>
          <ActivityItem
            icon="checkmark-circle"
            title="Payment Received"
            subtitle="Customer #1234"
            amount={formatCurrency(125.00)}
            time="2h ago"
            positive
          />
          <ActivityItem
            icon="cart"
            title="Credit Order Placed"
            subtitle="Supplier: ABC Corp"
            amount={formatCurrency(-450.00)}
            time="5h ago"
          />
          <ActivityItem
            icon="wallet"
            title="Payment Made"
            subtitle="Supplier: XYZ Ltd"
            amount={formatCurrency(-320.00)}
            time="1d ago"
          />
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const ActivityItem = ({ icon, title, subtitle, amount, time, positive }) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, positive && styles.activityIconPositive]}>
      <Ionicons name={icon} size={20} color={positive ? COLORS.green : COLORS.textLight} />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activitySubtitle}>{subtitle}</Text>
    </View>
    <View style={styles.activityRight}>
      <Text style={[styles.activityAmount, positive && styles.activityAmountPositive]}>
        {amount}
      </Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  businessName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: COLORS.darkGrey,
    fontSize: 12,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.green,
    marginTop: 8,
    letterSpacing: 1,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  balanceActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.greenLight,
    borderRadius: 10,
    gap: 6,
  },
  balanceActionText: {
    color: COLORS.green,
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    padding: 20,
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
    marginTop: 2,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
  },
  seeAllText: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
  },
  quickActionButton: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  quickActionText: {
    fontSize: 14,
    color: COLORS.darkGrey,
    fontWeight: '600',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconPositive: {
    backgroundColor: COLORS.greenLight,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGrey,
  },
  activitySubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.darkGrey,
  },
  activityAmountPositive: {
    color: COLORS.green,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
    opacity: 0.7,
  },
  bottomPadding: {
    height: 20,
  },
});
