import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React, { useEffect, useRef, useState } from 'react';
  import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons';
  import CustomInput from '../../../components/CustomInput/CustomInput';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
  
  type Props = {
    onChange: (e: string) => void;
    value: string;
    isVerified?: boolean;
    error?: any;
    onVerify?: () => void;
    onResend?: () => void;
    verificationError?: any;
    resendError?: any;
    resendLoading?: boolean;
    onSubmitOtp?: (otp:string) => void;
  };
  
  const PhoneInput: React.FC<Props> = ({
    error,
    isVerified,
    onChange,
    onResend,
    onVerify,
    value,
    verificationError,
    resendError,
    resendLoading,
    onSubmitOtp
  }) => {
    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const [timer, setTimer] = useState(60);
    const [verifying, setVerifying] = useState(false);
  
    const fadeAnim = useSharedValue(0);

useEffect(() => {
  if (showOtpField) {
    fadeAnim.value = withTiming(1, { duration: 400 });
  }
}, [showOtpField]);

const animatedStyle = useAnimatedStyle(() => {
  return {
    opacity: fadeAnim.value,
  };
});
  
    useEffect(() => {
      let countdown: NodeJS.Timeout;
      if (showOtpField && timer > 0) {
        countdown = setInterval(() => {
          setTimer(prev => prev - 1);
        }, 1000);
      }
      return () => clearInterval(countdown);
    }, [showOtpField, timer]);
  
    const handleVerify = () => {
      if (!value || value.length < 10) return;
      setShowOtpField(true);
      setVerifying(true);
      onVerify?.();
  
      setTimeout(() => {
        setVerifying(false);
        setTimer(60);
      }, 1500); // Mock loading duration
    };
  
    const handleResend = () => {
      if (resendLoading) return;
      setTimer(60);
      onResend?.();
    };
    const onOtpSubmit = () => {
        onSubmitOtp?.(otp);
    }
  
    return (
      <View>
        {/* Phone Number Input */}
        <CustomInput
          placeholder="Phone"
          value={value}
          onChangeText={onChange}
          error={error}
          extra={{
            keyboardType: 'numeric',
            inputMode: 'numeric',
            editable: !isVerified,
            maxLength:10
          }}
          
          leftIcon={
            <VectorIcons
              name="phone"
              size={20}
              color="#9CA3AF"
              iconSet={IconSets.MaterialIcons}
            />
          }
          rightIcon={
            <View style={{marginRight: 10}}>
                {
            isVerified ? (
                <Animated.View entering={FadeIn} exiting={FadeOut} style={animatedStyle}>
              <VectorIcons
                name="checkcircle"
                size={20}
                color="rgb(4, 124, 30)"
                iconSet={IconSets.AntDesign}
              />
              </Animated.View>
            ) : (
              <VectorIcons
                name="arrow-forward"
                size={20}
                color="#1C2A3A"
                iconSet={IconSets.MaterialIcons}
              />
            )}
            </View>
          }
          onActionPress={handleVerify}
          
          // containerStyle={styles.fieldMargin}
        />
  
        {/* OTP Field with Animation */}
        {showOtpField && (
          <Animated.View style={[{ opacity: fadeAnim }]}>
            <CustomInput
              placeholder="Verification Code"
              value={otp}
              onChangeText={setOtp}
              error={verificationError}
              extra={{
                keyboardType: 'numeric',
                inputMode: 'numeric',
                maxLength: 4,
              }}
              leftIcon={
                <VectorIcons
                  name="lock"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialIcons}
                />
              }
              rightIcon={
                isVerified ? (
                  <VectorIcons
                    name="checkcircle"
                    size={20}
                    color="rgb(4, 124, 30)"
                    iconSet={IconSets.AntDesign}
                    style={{ marginRight: 10 }}
                  />
                ) : (
                verifying ? (
                  <ActivityIndicator size="small" color="#1C2A3A" style={{ marginRight: 10 }} />
                ) : (
                  <Text style={styles.verifyText}>Verify</Text>
                )
                )
              }
              onActionPress={onOtpSubmit}
              containerStyle={styles.fieldMargin}
            />
  
            {/* Timer / Resend */}
            {!isVerified && (
            <View style={styles.timerRow}>
              {timer > 0 ? (
                <Text style={styles.timerText}>
                  Resend OTP in <Text style={styles.bold}>{timer}s</Text>
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendBtn}>
                    {resendLoading ? 'Sending...' : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              )}
              {resendError && <Text style={styles.error}>{resendError}</Text>}
            </View>
            )}
          </Animated.View>
        )}
      </View>
    );
  };
  
  export default PhoneInput;
  
  const styles = StyleSheet.create({
    fieldMargin: {
      marginTop: 20,
    },
    verifyText: {
      color: 'rgba(28, 42, 58, 1)',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      paddingRight: 10,
    },
    timerRow: {
      alignItems: 'flex-end',
    },
    timerText: {
      fontSize: 13,
      color: '#6B7280',
      fontFamily: 'Poppins-Regular',
    },
    bold: {
      fontFamily: 'Poppins-SemiBold',
      color: '#1C2A3A',
    },
    resendBtn: {
      fontSize: 13,
      fontFamily: 'Poppins-SemiBold',
      color: '#1C2A3A',
    },
    error: {
      marginTop: 4,
      fontSize: 12,
      color: 'red',
    },
  });
  