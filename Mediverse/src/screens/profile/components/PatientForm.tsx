import { Button, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons'
import StyledDropdown from '../../../components/Dropdown/StyledDropdown'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import DocumentPicker from 'react-native-document-picker';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomDatePicker from '../../../components/customDatePicker/CustomDatePicker'
import PromiseButton from '../../../components/CustomButton/PromiseButton'
import PhoneInput from './PhoneInput'
import ProfilePicUploader from './ProfilePicUploader'
import { callProfileUpdateApi, profileValidation } from '../ProfileFunctions'
import Toast from 'react-native-toast-message'
import { patientVal } from './ProfileVal'
import DocumentUploader from '../../../components/DocUploader/DocumentUploader'
import { PermissionsAndroid } from 'react-native'
import { bufferToImageUrl, BufferType } from '../../../utils/commonFunction'

type Props = {
  data: any;
  navigation: any;
}

const bloodGroups = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];



const PatientForm: React.FC<Props> = ({data,navigation}) => {
  const [initialValues, setInitialValues] = useState(patientVal);
  const formikRef = React.useRef<FormikProps<any>>(null);

  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasStoragePermission, setHasStoragePermission] = useState(false);

  useEffect(() => {
    if (data) {
      let address = {};
      if (data?.address) {
        address = JSON.parse(data.address);
      }
      setInitialValues({
        ...patientVal,
        ...data,
        profilePic: {
          uri: data?.profilePic ? bufferToImageUrl(data.profilePic as BufferType) : '',
          type: 'image/jpeg',
          name: 'profile.jpg',
        },
        address
        
      })
    }
  
    return () => {
      
    }
  }, [data])
  

  const handleDobChange = (selectedDate: any) => {
    const age = new Date().getFullYear() - new Date(selectedDate).getFullYear();
    formikRef.current?.setFieldValue('age', String(age));
  }

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
        }else if (key === 'documents' && values.documents.length > 0) {
          values.documents.forEach((doc: any) => {
            formData.append('documents', {
              uri: doc.uri,
              type: doc.type || 'application/pdf',
              name: doc.name || 'document.pdf',
            });
          });
        }
        else if (key === 'address') {
          Object.keys(values.address).forEach((addressKey) => {
            formData.append(`address[${addressKey}]`, values.address[addressKey]);
          });
        }
         else if (values[key as typeof values] !== undefined) {
          formData.append(key, String(values[key as keyof typeof values]));
        }
      });

      await callProfileUpdateApi(formData, navigation)
    } catch (error: any) {
      console.log('Error:', error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    requestStoragePermission()
  }, [data]);


  const handleVerify = () => { };

  const handleOtpSubmit = (otp: string) => {
    console.log('OTP submitted:', otp);
    if (otp !== '1234' || otp.length < 4) {
      setVerificationError('Invalid OTP');
      return;
    }
    setVerificationError(null);
    setIsVerified(true);
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select documents.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );
        setHasStoragePermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      setHasStoragePermission(true); // Android 13+ or iOS doesn't need this
      return true;
    }
  };
  

  const handleResend = () => {
    setResendLoading(true);
    if (formikRef.current?.values)
      console.log('🔁 Resending OTP to', formikRef.current.values.phone);
    setTimeout(() => {
      setResendLoading(false);
      Toast.show({
        type: 'success',
        text1: 'OTP Resent',
        text2: `OTP has been resent to ${formikRef?.current?.values.phone}`,
      });
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
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
            data={bloodGroups}
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
              editable: false,
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
          <CustomDatePicker
            handleChange={handleChange('dob')}
            onDateChange={handleDobChange}
            value={values.dob}
            error={touched.dob && errors.dob}
          />
          <CustomInput
            placeholder="Age"
            value={values.age}
            onChangeText={handleChange('age')}
            error={touched.age && errors.age}
            extra={{
              keyboardType: 'numeric',
              inputMode: 'numeric',
              editable: false,
            }}
            leftIcon={
              <VectorIcons
                name="cake"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
            containerStyle={styles.fieldMargin}
          />
          <DocumentUploader
            value={values.documents}
            onChange={(docs: any[]) => setFieldValue('documents', docs)}
            hasPermission={hasStoragePermission}
          />

          <View>
            <CustomDatePicker
              handleChange={handleChange('dob')}
              onDateChange={handleDobChange}
              value={values.dob}
              error={touched.dob && errors.dob}
              placeholder='Date of Birth'
              containerStyle={styles.fieldMargin}
              mode='date'
              format='DD-MMM-YYYY'
              extra={{
                maximumDate: new Date(),
                minimumDate: new Date('1900-01-01')
              }}
            />
            <CustomInput
              placeholder="Age"
              value={`${values.age}`}
              onChangeText={handleChange('age')}
              error={touched.age && errors.age}
              extra={{
                keyboardType: 'numeric',
                inputMode: 'numeric',
                editable: false,
              }}
              leftIcon={
                <VectorIcons
                  name="cake"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder="Height (cm)"
              value={`${values.height}`}
              onChangeText={handleChange('height')}
              error={touched.height && errors.height}
              extra={{
                keyboardType: 'numeric',
                inputMode: 'numeric',
              }}
              leftIcon={
                <VectorIcons
                  name="height"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder="Weight (kg)"
              value={`${values.weight}`}
              onChangeText={handleChange('weight')}
              error={touched.weight && errors.weight}
              extra={{
                keyboardType: 'numeric',
                inputMode: 'numeric',
              }}
              leftIcon={
                <VectorIcons
                  name="weight"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialCommunityIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder="Allergies (Comma separated)"
              value={values.allergies}
              extra={{
                multiline: true,
                numberOfLines: 4,
                textAlignVertical: 'top',
                keyboardType: 'default',
                inputMode: 'text',
                textAlign: 'left',
              }}
              inputStyle={{ height: 100 }}
              onChangeText={handleChange('allergies')}
              error={touched.allergies && errors.allergies}
              leftIcon={
                <VectorIcons
                  name="allergy"
                  size={20}
                  color="#9CA3AF"
                  style={{alignSelf:"baseline",marginTop: 12}}
                  iconSet={IconSets.MaterialCommunityIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            {/* <CustomInput
              placeholder="Medical Conditions"
              value={values.medicalConditions}
              onChangeText={handleChange('medicalConditions')}
              error={touched.medicalConditions && errors.medicalConditions}
              leftIcon={
                <VectorIcons
                  name="medical-bag"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialCommunityIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder="Medical History"
              value={values.medicalHistory}
              onChangeText={handleChange('medicalHistory')}
              error={touched.medicalHistory && errors.medicalHistory}
              leftIcon={
                <VectorIcons
                  name="history"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder="Prescriptions"
              value={values.prescriptions}
              onChangeText={handleChange('prescriptions')}
              error={touched.prescriptions && errors.prescriptions}
              leftIcon={
                <VectorIcons
                  name="prescription"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialCommunityIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            /> */}
            <Text style={styles.addresstxt}>Address</Text>
            <CustomInput
              placeholder='Line 1'
              value={values.address.line1}
              onChangeText={handleChange('address.line1')}
              error={touched.address && errors.address}
              leftIcon={
                <VectorIcons
                  name="home"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialIcons}
                />
              }
            />
            <CustomInput
              placeholder='Line 2'
              value={values.address.line2}
              onChangeText={handleChange('address.line2')}
              error={touched.address && errors.address}
              leftIcon={
                <VectorIcons
                  name="home"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialIcons}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder='City'
              value={values.address.city}
              onChangeText={handleChange('address.city')}
              error={touched.address && errors.address}
              leftIcon={
                <VectorIcons
                  name="city"
                  size={20}
                  color="#9CA3AF"
                  iconSet={IconSets.FontAwesome5}
                />
              }
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder='State'
              value={values.address.state}
              onChangeText={handleChange('address.state')}
              error={touched.address && errors.address}
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder='Country'
              value={values.address.country}
              onChangeText={handleChange('address.country')}
              error={touched.address && errors.address}
              containerStyle={styles.fieldMargin}
            />
            <CustomInput
              placeholder='Pincode'
              value={values.address.pincode}
              onChangeText={handleChange('address.pincode')}
              error={touched.address && errors.address}
              containerStyle={styles.fieldMargin}
            />

            {values.documents.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text>Selected Documents:</Text>
                {values.documents.map((doc: any, idx: number) => (
                  <Text key={idx} style={{ fontSize: 12 }}>
                    • {doc.title}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <PromiseButton
            onPress={handleSubmit}
            text="Update Profile"
            loading={isSubmitting}
            style={styles.fieldMargin}
          />
        </>
      )}
    </Formik>
  )
}

export default memo(PatientForm)

const styles = StyleSheet.create({
  addresstxt: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  fieldMargin: {
    marginTop: 20,
  },
})
