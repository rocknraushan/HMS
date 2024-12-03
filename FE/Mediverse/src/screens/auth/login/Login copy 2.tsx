import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {getCountries} from '../../../Services/Countries';
import {createUser, resendOTP, verifyUser} from '../../../Services/Signup';
import {RootStackParamList} from '../../../navigation/navStrings';
import Storage from '../../../storage/Storage';
import {
  countryListAtom,
  selectedCountry,
  userDataAtom,
  userTypeAtom,
  welcomModalAtom,
} from '../../../store/atoms';
import LoginLayout from './LoginLayout';
import {PhoneNumber} from './PhoneLayout';

import {OTPWidget} from '@msg91comm/sendotp-react-native';

const widgetId = '346673674437353036393732';
const tokenAuth = '422374T2CxlXgOLNih66716beeP1';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'LOGIN'>;

const Login = ({route, navigation}: LoginProps) => {
  const [otpRequested, setOTPRequested] = useState<boolean>(false);
  const [phone, setPhone] = useState<PhoneNumber>();

  const setCountries = useSetAtom(countryListAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [countryValue, setCountryValue] = useAtom(selectedCountry);
  const [userType, setUserType] = useAtom(userTypeAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setWelcome = useSetAtom(welcomModalAtom);

  const [requestId, setRequestId] = useState<string>();

  useEffect(() => {
    OTPWidget.initializeWidget(widgetId, tokenAuth); //Widget initialization
  }, []);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getCountries();
      setCountryValue(result.data[0]);
      setCountries(result.data);
      setIsLoading(false);
    } catch (e) {
      console.error('ERROR', e);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const onRequestOTP = useCallback(
    async (value: PhoneNumber) => {
      if (countryValue && userType) {
        try {
          setIsLoading(true);
          const result = await createUser(
            value.phoneNumber,
            countryValue,
            userType,
          );
          setUserData(result.data.user);

          const otpRequest = {
            identifier: '91' + value.phoneNumber,
          };
          const response = await OTPWidget.sendOTP(otpRequest);
          console.log('OYTP REQ', response);

          if (response?.type === 'error' || response?.hasError) {
            Toast.show({
              text1: response?.message,
              type: 'error',
            });

            setIsLoading(false);
            return;
          }
          if (response?.type == 'success') {
            setRequestId(response?.message);
          }
          setPhone(value);
          setOTPRequested(true);
          setIsLoading(false);
        } catch (e: any) {
          if (e?.error || e?.message) {
            Toast.show({
              type: 'error',
              text1: e?.error ?? e?.message,
            });
          }
          setIsLoading(false);
        }
      }
    },
    [countryValue, userType],
  );
  const onResendOTP = useCallback(async () => {
    if (phone) {
      try {
        setIsLoading(true);

        const otpRequest = {
          reqId: requestId,
        };
        const response = await OTPWidget.retryOTP(otpRequest);
        if (response?.type === 'error' || response?.hasError) {
          Toast.show({
            text1: response?.message,
            type: 'error',
          });

          setIsLoading(false);
          return;
        }
        console.log('RETRY', response);

        console.log('result', response);
        setOTPRequested(true);
        setIsLoading(false);
      } catch (e: any) {
        if (e?.error || e?.message) {
          Toast.show({
            type: 'error',
            text1: e?.error ?? e?.message,
          });
        }
        setIsLoading(false);
      }
    }
  }, [phone, requestId]);

  const onSubmitOTP = useCallback(
    async (otp: string) => {
      if (phone && userData) {
        try {
          setIsLoading(true);
          const data = {
            reqId: requestId,
            otp: otp,
          }
          const response = await OTPWidget.verifyOTP(data);
          if (response?.type === 'error') {
            Toast.show({
              text1: response?.message,
              type: 'error',
            });

            setIsLoading(false);
            return;
          }
          if (response?.hasError) {
            Toast.show({
              text1: 'Please enter valid OTP',
              type: 'error',
            });

            setIsLoading(false);
            return;
          }
          console.log('VERIFIED', response);

          console.log("userData",userData);
          
          const result = await verifyUser(userData.id);
          console.log('result', result);
          Storage.setUserData(result.data.user_data);
          Storage.setTokenData(result.data);
          setUserData(result.data.user_data);
          setUserType(result.data.user_data.user_type);
          setWelcome(result.data.user_data.isVerified);
          navigation.popToTop();
          navigation.replace('SELECT_LANGUAGE', {
            hideBack: true,
          });
          setIsLoading(false);
        } catch (e: any) {
          console.log('ERRPR', e);

          if (e?.error || e?.message) {
            Toast.show({
              type: 'error',
              text1: e?.error ?? e?.message,
            });
          }
          setIsLoading(false);
        }
      }
    },
    [phone],
  );

  return (
    <LoginLayout
      onRequestOTP={onRequestOTP}
      onSubmitOTP={onSubmitOTP}
      otpRequested={otpRequested}
      onResendOTP={onResendOTP}
      isLoading={isLoading}
    />
  );
};

export default Login;
