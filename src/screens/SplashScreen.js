import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../theme/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/direla_logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Point of Sale</Text>
        <Text style={styles.tagline}>
          Seamless Payments • Credit Management • Supplier Integration
        </Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>🇿🇦 Made in South Africa</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.green,
    marginTop: 8,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 14,
    color: COLORS.darkGrey,
    marginTop: 30,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.darkGrey,
  },
});
