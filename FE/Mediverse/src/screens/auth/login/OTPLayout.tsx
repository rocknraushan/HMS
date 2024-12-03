import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Yup from 'yup';
import StyledButton from '../../../components/buttons/StyledButton';
import StyledInput from '../../../components/inputs/StyledInput';
import {rspF, rspH} from '../../../theme/responsive';
import {useUser} from '../../../context/user';
import {Theme} from '../../../theme/colors';

export interface PhoneLayoutProps {
  onSubmitOTP?: (otp: string) => void;

  onResendOTP: () => void;
  isLoading: boolean;
}

const schema = Yup.object({
  otp: Yup.string()
    .required('Please enter your otp')
    .matches(/^[0-9]{6}$/, 'Please enter valid OTP'),
});

const OTPLayout = ({onSubmitOTP, isLoading, onResendOTP}: PhoneLayoutProps) => {
  const {theme} = useUser();
  const styles = style(theme);
  const [seconds, setSeconds] = useState<number>(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const onSubmit = useCallback((values: {otp: string}) => {
    onSubmitOTP?.(values.otp);
  }, []);

  const {handleChange, values, errors, handleSubmit, isValid} = useFormik({
    initialValues: {
      otp: '',
    },
    onSubmit: onSubmit,
    validationSchema: schema,
  });

  const time = useMemo(() => {
    if (seconds < 10) {
      return `0:0${seconds}`;
    }
    return `0:${seconds}`;
  }, [seconds]);

  const onResend = useCallback(() => {
    onResendOTP();
    setSeconds(60);
  }, [onResendOTP]);

  return (
    <>
      <Text style={styles.verifyText}>
        Enter six digit code sent on registered number.
      </Text>
      <Text style={styles.title}>
        Your phone number will be your unique identity on HeyHari.
      </Text>
      <View style={styles.phoneContainer}>
        <StyledInput
          value={values.otp}
          placeholder="Enter Code"
          onChangeText={handleChange('otp')}
          maxLength={6}
          error={Boolean(errors.otp)}
          keyboardType="number-pad"
        />
      </View>
      {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}

      <StyledButton
        containerStyle={styles.button}
        fullWidth
        onPress={handleSubmit}
        disabled={!isValid}
        label="Continue"
        isLoading={isLoading}
      />
      <TouchableOpacity disabled={seconds > 0} onPress={onResend}>
        <Text style={styles.resendContainer}>
          <Text style={styles.resend}>Resend OTP</Text>
          {seconds > 0 && (
            <Text>
              {' '}
              In <Text style={styles.time}>{time}</Text>{' '}
            </Text>
          )}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default OTPLayout;
const style = (theme: Theme) =>
  StyleSheet.create({
    verifyText: {
      fontSize: rspF(24),
      color: '#000',
    },
    title: {
      fontSize: rspF(16),
      color: theme.blue,
      marginTop: rspH(16),
    },
    button: {},
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: rspH(16),
    },
    error: {
      color: '#FF3D3D',
      fontSize: rspF(12),
      marginBottom: rspH(16),
    },
    resendContainer: {
      fontSize: rspF(14),
      lineHeight: rspF(21),
      color: theme.black,
      marginTop: rspH(8),
      alignSelf: 'flex-end',
      padding: 4,
    },
    resend: {
      textDecorationLine: 'underline',
    },
    time: {
      color: theme.blue,
    },
  });
