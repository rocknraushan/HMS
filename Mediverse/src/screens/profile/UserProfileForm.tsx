import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VectorIcons, { IconSets } from '../../components/Icons/VectorIcons';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navStrings';
import ProfilePicUploader from './components/ProfilePicUploader';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import CustomInput from '../../components/CustomInput/CustomInput';
import StyledDropdown from '../../components/Dropdown/StyledDropdown';
import PhoneInput from './components/PhoneInput';
import PromiseButton from '../../components/CustomButton/PromiseButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import getAxiosClient from '../../HttpService/AxiosClient';
import { Services } from '../../HttpService';
import { callProfileUpdateApi, fetchProfile, profileValidation } from './ProfileFunctions';
import SuccessModal from '../../components/loaders/SuccessModal';
import PatientForm from './components/PatientForm';
import DoctorForm from './components/DoctorForm';
import { getInitialValues } from './components/ProfileVal';
import { bufferToImageUrl, BufferType } from '../../utils/commonFunction';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'UserProfileForm'>;
};
type ProfilePicType = { uri: string; type: string; name: string } | BufferType;
const initialValues = {
  name: '',
  age: '',
  bloodGroup: '',
  phone: '',
  profilePic: {
    uri: '',
    type: '',
    name: '',
  } as { uri: string; type: string; name: string } | BufferType,
  gender: '',
  email: '',
  dob: '',
};
const UserProfileForm = (props: Props) => {
  const [initVal, setInitVal] = useState(getInitialValues())
  const [profiledata, setProfiledata] = useState<any>(null);
  const formikRef = React.useRef<FormikProps<any>>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const handleBackPress = () => {
    props.navigation.goBack();
  };
  const updateProfile = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    try {
      console.log('Form values:', values);
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === 'profilePic' && 'uri' in values.profilePic && values.profilePic.uri) {
          formData.append('profilePic', {
            uri: 'uri' in values.profilePic ? values.profilePic.uri : '',
            type: values.profilePic.type || 'image/jpeg',
            name: 'name' in values.profilePic ? values.profilePic.name : 'profile.jpg',
          });
        } else if (values[key as keyof typeof initVal] !== undefined) {
          formData.append(key, String(values[key as keyof typeof initVal]));
        }
      });
      await callProfileUpdateApi(formData, props.navigation)
    } catch (error: any) {
      console.log('Error:', error?.response?.data || error.message);
    }
  };

  const handleVerify = () => { };
  const handleOtpSubmit = (otp: string) => {
    console.log('OTP submitted:', otp);
    if (otp != '1234' || otp.length < 4) {
      setVerificationError('Invalid OTP');
      return;
    }
    setVerificationError(null);
    setIsVerified(true);
  };

  const handleResend = () => {
    setResendLoading(true);
    if (formikRef.current?.values)
      console.log('🔁 Resending OTP to', formikRef.current.values.phone);
    setTimeout(() => {
      setResendLoading(false);
      Alert.alert(
        'OTP Resent',
        `OTP has been resent to ${formikRef?.current?.values.phone}`,
      );
    }, 1500);
  };

  async function getProfileData() {
    try {
      const data = await fetchProfile();
      if (data.profile) {
        const { profile } = data
        console.log(profile, "data prof")
        const initValues = {
          name: profile.name || "",
          age: profile.age || '',
          bloodGroup: profile.bloodGroup || '',
          phone: profile.phone || '',
          profilePic: { uri: profile.profilePic || '', type: '', name: '' },
          gender: profile.gender || '',
          email: profile.email || '',
          dob: profile.dob || '',
        };
        setInitVal({
          ...initVal,
          ...initValues,
        });
      }
    } catch (error) {

    }
  }

  const handleDobChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    formikRef.current?.setFieldValue(
      'dob',
      currentDate.toLocaleDateString(),
    );
    const age = new Date().getFullYear() - currentDate.getFullYear();
    formikRef.current?.setFieldValue('age', String(age));
  }

  useEffect(() => {
    getProfileData();
  }, [])
  return (
    <View style={styles.flex}>
      <SuccessModal title='Congratulations!' subTitle='Your account is ready to use. You will be redirected to the Home Page in a few seconds...' duration={5000} visible={showSuccess} onClose={() => setShowSuccess(false)} />
      <SafeAreaView>
        <View style={styles.container}>
          <VectorIcons
            name="arrow-back"
            size={24}
            color="#000"
            iconSet={IconSets.Ionicons}
          />
          <TouchableOpacity
            onPress={handleBackPress}
            hitSlop={{
              top: 30,
              bottom: 30,
              left: 30,
              right: 30,
            }}></TouchableOpacity>
          <Text style={styles.profileText}>Profile</Text>
        </View>
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          style={styles.scrollContainer}>
          <Formik
            initialValues={getInitialValues()}
            innerRef={formikRef}
            validationSchema={profileValidation}
            enableReinitialize
            onSubmit={updateProfile}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isSubmitting,
              touched,
              setFieldValue
            }) => (
              <>
                <ProfilePicUploader
                  onSelect={(e) => setFieldValue('profilePic', e)}
                  image={
                    values.profilePic && 'data' in values.profilePic
                      ? values.profilePic 
                      : values.profilePic?.uri || ''
                  }
                />


                <CustomInput
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  error={touched.name && errors.name}
                  containerStyle={styles.fieldMargin}
                  leftIcon={
                    <VectorIcons
                      name="person"
                      size={20}
                      color="#9CA3AF"
                      iconSet={IconSets.MaterialIcons}
                    />
                  }
                />
                <PhoneInput
                  value={values.phone}
                  onChange={handleChange('phone')}
                  onVerify={handleVerify}
                  onResend={handleResend}
                  error={touched.phone && errors.phone}
                  verificationError={verificationError}
                  resendError={resendError}
                  resendLoading={resendLoading}
                  isVerified={isVerified}
                  onSubmitOtp={handleOtpSubmit}
                />
                <StyledDropdown
                  data={[
                    { label: 'A+', value: 'A+' },
                    { label: 'B+', value: 'B+' },
                    { label: 'O+', value: 'O+' },
                    { label: 'A-', value: 'A-' },
                    { label: 'B-', value: 'B-' },
                    { label: 'O-', value: 'O-' },
                    { label: 'AB+', value: 'AB+' },
                    { label: 'AB-', value: 'AB-' }
                  ]}
                  placeholder="Blood Group"
                  value={values.bloodGroup}
                  onChangeText={handleChange('bloodGroup')}
                  error={touched.bloodGroup && errors.bloodGroup}
                  style={styles.fieldMargin}
                />
                <StyledDropdown
                  data={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]}
                  placeholder="Gender"
                  value={values.gender}
                  onChangeText={handleChange('gender')}
                  style={styles.fieldMargin}
                  error={touched.gender && errors.gender}
                />
                <CustomInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email}
                  extra={{
                    keyboardType: 'email-address',
                    inputMode: 'email',
                    editable: false
                  }}
                  leftIcon={
                    <VectorIcons
                      name="email"
                      size={20}
                      color="#9CA3AF"
                      iconSet={IconSets.MaterialCommunityIcons}
                    />
                  }
                  containerStyle={styles.fieldMargin}
                />
                
                {
                  profiledata && profiledata.role ==="patient" && (
                    <PatientForm formikRef={formikRef?.current} />
                  )
                }
                {
                  profiledata && profiledata.role ==="doctor" && (
                    <DoctorForm formikRef={formikRef?.current} />
                  )
                }
                <PromiseButton
                  onPress={handleSubmit}
                  text="Login"
                  loading={isSubmitting}
                  style={styles.fieldMargin}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserProfileForm;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginEnd: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-bold',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    marginTop: 24,
  },
  fieldMargin: {
    marginTop: 20,
  },
});
