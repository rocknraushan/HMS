import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {LoginWall, Logo} from '../../../assets';
import {rspF, rspH, rspW} from '../../../theme/responsive';
import OTPLayout from './OTPLayout';
import PhoneLayout, {PhoneNumber} from './PhoneLayout';
import {Country} from '../../../interfaces/Country';
import FastImage from 'react-native-fast-image';

interface LoginLayoutProps {
  otpRequested: boolean;
  onRequestOTP: (values: PhoneNumber) => void;
  onSubmitOTP: (otp: string) => void;
  onResendOTP: () => void;
  isLoading: boolean;
}

const LoginLayout = ({
  onRequestOTP,
  onSubmitOTP,
  otpRequested,
  isLoading,
  onResendOTP,
}: LoginLayoutProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <ImageBackground
            source={LoginWall}
            style={styles.image}
            resizeMode="cover">
            <FastImage source={Logo} style={styles.logo} />
          </ImageBackground>
          <View style={styles.fieldsContainer}>
            {!otpRequested ? (
              <PhoneLayout onRequestOTP={onRequestOTP} isLoading={isLoading} />
            ) : (
              <OTPLayout
                onSubmitOTP={onSubmitOTP}
                isLoading={isLoading}
                onResendOTP={onResendOTP}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    height: rspH(550),
    resizeMode: 'stretch',
  },
  fieldsContainer: {
    padding: rspW(12),
  },
  verifyText: {
    fontSize: rspF(24),
    color: '#000',
  },
  button: {
    marginTop: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    marginTop: rspH(65),
    width: rspW(100),
    height: rspW(100),
    alignSelf: 'center',
  },
});

export default LoginLayout;
