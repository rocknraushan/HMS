import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CountryCode from '../../../components/inputs/CountryCode';
import StyledInput from '../../../components/inputs/StyledInput';
import StyledButton from '../../../components/buttons/StyledButton';
import {rspF, rspH} from '../../../theme/responsive';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Country} from '../../../interfaces/Country';

export interface PhoneNumber {
  phoneNumber: string;
  code: string;
}
export interface PhoneLayoutProps {
  onRequestOTP: (values: PhoneNumber) => void;
  isLoading: boolean;
}

const schema = Yup.object({
  code: Yup.string()
    .required('Select your country code')
    .matches(/^\+\d{1,3}$/, 'Please enter a valid country code'),
  phoneNumber: Yup.string()
    .required('Enter your phone number')
    .matches(/^[2-9]{1}[0-9]{9}$/, 'Please enter valid phone number'),
});

const PhoneLayout = ({onRequestOTP, isLoading}: PhoneLayoutProps) => {
  const onSubmit = useCallback(
    (values: PhoneNumber) => {
      onRequestOTP(values);
    },
    [onRequestOTP],
  );

  const {handleChange, values, errors, handleSubmit, isValid} = useFormik({
    initialValues: {
      phoneNumber: '',
      code: '+91',
    },
    onSubmit: onSubmit,
    validationSchema: schema,
  });

  return (
    <>
      <Text style={styles.verifyText}>Verify with phone number</Text>
      <View style={styles.phoneContainer}>
        <CountryCode
          value={values.code}
          onChangeText={handleChange('code')}
          error={Boolean(errors.code)}
        />
        <StyledInput
          value={values.phoneNumber}
          placeholder="Phone number"
          onChangeText={handleChange('phoneNumber')}
          maxLength={10}
          keyboardType='number-pad'
          error={Boolean(errors.phoneNumber)}
        />
      </View>
      {(errors.code || errors.phoneNumber) && (
        <Text style={styles.error}>{errors.code || errors.phoneNumber}</Text>
      )}

      <StyledButton
        containerStyle={styles.button}
        fullWidth
        onPress={handleSubmit}
        label="Send OTP"
        disabled={!isValid}
        isLoading={isLoading}
      />
    </>
  );
};

export default PhoneLayout;
const styles = StyleSheet.create({
  verifyText: {
    fontSize: rspF(24),
    color: '#000',
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
});
