import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function CreditScoreScreen() {
  const creditScore = 780;
  const scoreHistory = [
    { month: 'Jun', score: 720 },
    { month: 'Jul', score: 735 },
    { month: 'Aug', score: 750 },
    { month: 'Sep', score: 765 },
    { month: 'Oct', score: 780 },
  ];

  const factors = [
    {
      title: 'Payment History',
      impact: 'Excellent',
      score: 95,
      icon: 'checkmark-circle',
      color: COLORS.green,
      description: '12/12 on-time payments',
    },
    {
      title: 'Credit Utilization',
      impact: 'Good',
      score: 75,
      icon: 'pie-chart',
      color: COLORS.green,
      description: '35% of available credit used',
    },
    {
      title: 'Order Frequency',
      impact: 'Very Good',
      score: 85,
      icon: 'trending-up',
      color: COLORS.yellow,
      description: 'Consistent ordering pattern',
    },
    {
      title: 'Account Age',
      impact: 'Good',
      score: 70,
      icon: 'time',
      color: COLORS.grey,
      description: '8 months active',
    },
  ];

  const getScoreLevel = (score) => {
    if (score >= 750) return { label: 'Excellent', color: '#4CAF50' };
    if (score >= 700) return { label: 'Very Good', color: '#8BC34A' };
    if (score >= 650) return { label: 'Good', color: '#FF9800' };
    if (score >= 600) return { label: 'Fair', color: '#FF5722' };
    return { label: 'Poor', color: '#F44336' };
  };

  const scoreLevel = getScoreLevel(creditScore);

  return (
    <ScrollView style={styles.container}>
      {/* Credit Score Header */}
      <LinearGradient
        colors={[scoreLevel.color, scoreLevel.color + 'dd']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Credit Score</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{creditScore}</Text>
          <Text style={styles.scoreMax}>/850</Text>
        </View>
        <Text style={styles.scoreLevel}>{scoreLevel.label}</Text>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(creditScore / 850) * 100}%` }]} />
        </View>
      </LinearGradient>

      {/* Score Trend */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Score Trend</Text>
          <View style={styles.trendBadge}>
            <Ionicons name="trending-up" size={16} color="#4CAF50" />
            <Text style={styles.trendText}>+60 points</Text>
          </View>
        </View>
        
        <View style={styles.chartCard}>
          <View style={styles.chart}>
            {scoreHistory.map((item, index) => {
              const height = ((item.score - 700) / 100) * 120; // Scale for visualization
              const isLast = index === scoreHistory.length - 1;
              
              return (
                <View key={item.month} style={styles.chartBar}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: Math.max(height, 20) },
                      isLast && styles.barActive
                    ]} 
                  >
                    {isLast && <Text style={styles.barValue}>{item.score}</Text>}
                  </View>
                  <Text style={styles.barLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Score Factors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Affects Your Score</Text>
        
        {factors.map((factor, index) => (
          <View key={index} style={styles.factorCard}>
            <View style={[styles.factorIcon, { backgroundColor: factor.color + '20' }]}>
              <Ionicons name={factor.icon} size={24} color={factor.color} />
            </View>
            <View style={styles.factorContent}>
              <View style={styles.factorHeader}>
                <Text style={styles.factorTitle}>{factor.title}</Text>
                <Text style={[styles.factorImpact, { color: factor.color }]}>
                  {factor.impact}
                </Text>
              </View>
              <Text style={styles.factorDescription}>{factor.description}</Text>
              <View style={styles.factorProgress}>
                <View style={[styles.factorProgressFill, { width: `${factor.score}%`, backgroundColor: factor.color }]} />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Benefits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Benefits</Text>
        
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <Ionicons name="cash" size={32} color="#4CAF50" />
            <Text style={styles.benefitValue}>$75,000</Text>
            <Text style={styles.benefitLabel}>Total Credit Limit</Text>
          </View>
          <View style={styles.benefitCard}>
            <Ionicons name="time" size={32} color="#2196F3" />
            <Text style={styles.benefitValue}>45 days</Text>
            <Text style={styles.benefitLabel}>Payment Terms</Text>
          </View>
          <View style={styles.benefitCard}>
            <Ionicons name="trending-up" size={32} color="#FF9800" />
            <Text style={styles.benefitValue}>2.5%</Text>
            <Text style={styles.benefitLabel}>Interest Rate</Text>
          </View>
          <View style={styles.benefitCard}>
            <Ionicons name="people" size={32} color="#9C27B0" />
            <Text style={styles.benefitValue}>15+</Text>
            <Text style={styles.benefitLabel}>Verified Suppliers</Text>
          </View>
        </View>
      </View>

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Improve Your Score</Text>
        
        <View style={styles.tipsCard}>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Pay all invoices on time or early</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Keep credit utilization below 50%</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Maintain consistent order patterns</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Communicate with suppliers proactively</Text>
          </View>
        </View>
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
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreMax: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 4,
  },
  scoreLevel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 40,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
  },
  barActive: {
    backgroundColor: COLORS.green,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  factorCard: {
    flexDirection: 'row',
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
  factorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  factorContent: {
    flex: 1,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  factorTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  factorImpact: {
    fontSize: 13,
    fontWeight: '600',
  },
  factorDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  factorProgress: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  factorProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  benefitLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    gap: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});
