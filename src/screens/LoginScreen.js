import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone');

  const handleSendCode = () => {
    if (phoneNumber.length >= 10) {
      setStep('verify');
    }
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/direla_logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Sign in to your business account</Text>
        </View>

        <View style={styles.formContainer}>
          {step === 'phone' ? (
            <>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call" size={20} color={COLORS.green} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="+27 XX XXX XXXX"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
              </View>
              <TouchableOpacity
                style={[styles.button, phoneNumber.length < 10 && styles.buttonDisabled]}
                onPress={handleSendCode}
                disabled={phoneNumber.length < 10}
              >
                <Text style={styles.buttonText}>Send Verification Code</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setStep('phone')} style={styles.linkText}>
                <Ionicons name="arrow-back" size={20} color={COLORS.green} />
                <Text style={{ color: COLORS.green, marginLeft: 8 }}>Change Number</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Verification Code</Text>
              <Text style={styles.hint}>
                We sent a 6-digit code to {phoneNumber}
              </Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color={COLORS.green} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  placeholderTextColor="#999"
                />
              </View>
              <TouchableOpacity
                style={[styles.button, verificationCode.length !== 6 && styles.buttonDisabled]}
                onPress={handleVerify}
                disabled={verificationCode.length !== 6}
              >
                <Text style={styles.buttonText}>Verify & Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log('Resend code')}>
                <Text style={styles.linkText}>Resend Code</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.secureRow}>
            <Ionicons name="shield-checkmark" size={16} color={COLORS.green} />
            <Text style={styles.secureText}>
              Secure verification via SMS
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🇿🇦 Made in South Africa</Text>
          <Text style={styles.footerText}>
            Powered by Telegram Business API
          </Text>
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
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.darkGrey,
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGrey,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: COLORS.background,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: COLORS.darkGrey,
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: COLORS.green,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  footerText: {
    color: COLORS.darkGrey,
    fontSize: 14,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  secureText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
