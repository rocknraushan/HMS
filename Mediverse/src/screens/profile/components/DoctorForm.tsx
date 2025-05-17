import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons';
import StyledDropdown from '../../../components/Dropdown/StyledDropdown';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import DocumentPicker from 'react-native-document-picker';
import CustomInput from '../../../components/CustomInput/CustomInput';
import Toast from 'react-native-toast-message';
import { callProfileUpdateApi, profileValidation } from '../ProfileFunctions';
import { get, values } from 'lodash';
import PhoneInput from './PhoneInput';
import ProfilePicUploader from './ProfilePicUploader';
import { DoctorFormValues, UserVal } from './ProfileVal';
import Geolocation from '@react-native-community/geolocation';
import CustomDatePicker from '../../../components/customDatePicker/CustomDatePicker';
import PromiseButton from '../../../components/CustomButton/PromiseButton';
import FastImage from 'react-native-fast-image';
import { Icons } from '../../../assets/icons';

type Props = {
  data: any;
  navigation: any;
};
const doctorSpecializations = [
  { label: "General Physician", value: "general_physician" },
  { label: "Cardiologist", value: "cardiologist" },
  { label: "Dermatologist", value: "dermatologist" },
  { label: "Neurologist", value: "neurologist" },
  { label: "Pediatrician", value: "pediatrician" },
  { label: "Orthopedic Surgeon", value: "orthopedic_surgeon" },
  { label: "Gynecologist", value: "gynecologist" },
  { label: "Ophthalmologist", value: "ophthalmologist" },
  { label: "Psychiatrist", value: "psychiatrist" },
  { label: "ENT Specialist", value: "ent_specialist" },
  { label: "Dentist", value: "dentist" },
  { label: "Urologist", value: "urologist" },
  { label: "Oncologist", value: "oncologist" },
  { label: "Nephrologist", value: "nephrologist" },
  { label: "Endocrinologist", value: "endocrinologist" },
  { label: "Gastroenterologist", value: "gastroenterologist" },
  { label: "Pulmonologist", value: "pulmonologist" },
  { label: "Rheumatologist", value: "rheumatologist" },
  { label: "Allergist/Immunologist", value: "allergist_immunologist" },
  { label: "Plastic Surgeon", value: "plastic_surgeon" },
  { label: "Anesthesiologist", value: "anesthesiologist" },
  { label: "Hematologist", value: "hematologist" },
  { label: "Infectious Disease Specialist", value: "infectious_disease_specialist" },
  { label: "Geriatrician", value: "geriatrician" },
  { label: "Sports Medicine Specialist", value: "sports_medicine_specialist" }
];

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" }
]

export const doctorVal: DoctorFormValues = {
  ...UserVal,
  specialization: '',
  clinicName: '',
  clinicPhone: '',
  workingHours: {
    start: '',
    end: ''
  },
  coverImage: {
    uri: '',
    name: '',
    type: ''
  },
  location
    : {
    type: "Point",
    coordinates: [0, 0]
  },
  clinicAddress: {
    city: '',
    country: '',
    line1: "",
    line2: "",
    pincode: "",
    state: ""
  },
  isAvailable: true,
  bio: '',
  experience: '',
  homeVisit: false,
  licenseNumber: '',
  education: '',
};


const DoctorForm: React.FC<Props> = ({ data, navigation }) => {
  const formikRef = React.useRef<FormikProps<any>>(null);
  const [formVal, setFormVal] = useState(doctorVal);

  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log('DoctorForm data:', data);
    setFormVal({
      ...doctorVal,
      ...data,
      workingHours: {
        start: data?.workingHours?.start,
        end: data?.workingHours?.end
      },
      profilePic: {
        uri: data?.profilePic,
        type: "image/jpeg",
        name: "",
      }
    });

    return () => {

    }
  }, [data]);

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      const formattedDocs = res.map((doc: any) => ({
        title: doc.name,
        url: doc.uri,
      }));

      formikRef.current?.setFieldValue('documents', [...(formikRef.current?.values.documents || []), ...formattedDocs]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document Picker Error: ', err);
      }
    }
  };
  const updateProfile = async (
    values: DoctorFormValues,
    formikHelpers: FormikHelpers<any>
  ) => {
    try {
      console.log('Form values:', values);
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === 'profilePic' && 'uri' in values?.profilePic && values.profilePic.uri) {
          formData.append('profilePic', {
            uri: values.profilePic.uri,
            type: values.profilePic.type || 'image/jpeg',
            name: values.profilePic.name || 'profile.jpg',
          } as any); // Add `as any` to satisfy FormData type in React Native
        }else if(key === 'coverImage' && 'uri' in values?.coverImage && values.coverImage.uri){
          formData.append('coverImage', {
            uri: values.coverImage.uri,
            type: values.coverImage.type || 'image/jpeg',
            name: values.coverImage.name || 'profile.jpg',
          } as any);
        }
        
        else if (
          typeof values[key as keyof DoctorFormValues] === 'object'
        ) {
          formData.append(key, JSON.stringify(values[key as keyof DoctorFormValues]));
        } else if (values[key as keyof DoctorFormValues] !== undefined) {
          formData.append(key, String(values[key as keyof DoctorFormValues]));
        }
      });

      await callProfileUpdateApi(formData, navigation);
    } catch (error: any) {
      console.log('Error:', error?.response?.data || error.message);
    }
  };


  const handleShift = (key: string) => (value: string) => {
    if (key === 'workingHoursFrom') {
      formikRef.current?.setFieldValue('workingHours', value);
    } else if (key === 'workingHoursTo') {
      formikRef.current?.setFieldValue('workingHours', formikRef.current?.values.workingHours + ' - ' + value);
    }
  }

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
  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(formikRef.current?.values.location, 'Latitude:', latitude, 'Longitude:', longitude, position);
        formikRef.current?.setFieldValue('location', {
          type: "Point",
          coordinates: [longitude, latitude]
        });
      },
      (error) => {
        console.error('Error getting location:', error.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unable to get location. Please try again.',
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
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
      initialValues={formVal}
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
            style={{ marginBottom: 10 }}
            hasCoverImg={data?.role === "doctor"}
            // style={{ marginTop: 100, backgroundColor: "#fff", borderRadius: 1000,width:180,height:180,marginBottom:20,alignSelf:'center' }}
            onSelect={(e) => setFieldValue('profilePic', e)}
            image={values.profilePic?.uri}
            coverImage={values.coverImage.uri}
            onCoverSelect={(e) => setFieldValue("coverImage", e)}
          />
          <CustomInput
            placeholder="Full Name"
            value={values.name}
            onChangeText={handleChange('name')}
            error={touched.name && errors.name}
            // containerStyle={styles.fieldMargin}
            leftIcon={
              <VectorIcons
                name="person"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
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
                iconSet={IconSets.MaterialIcons}
              />
            }
          // containerStyle={[styles.fieldMargin]}
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
            data={genderData}
            value={values.gender}
            placeholder='Gender'
            onChangeText={handleChange("gender")}
            error={touched.gender && errors.gender}
          />

          <StyledDropdown
            style={[styles.fieldMargin]}
            data={doctorSpecializations}
            placeholder="Select Specialization"
            label="Specialization"
            value={values.specialization}
            onChangeText={handleChange('specialization')}
            leftIcon={
              <VectorIcons
                name="medical-services"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
                style={{ alignSelf: 'center' }}
              />}
          />
          <CustomInput
            placeholder="License Number"
            value={values.licenseNumber}
            onChangeText={handleChange('licenseNumber')}
            error={touched.licenseNumber && errors.licenseNumber}
            containerStyle={[styles.fieldMargin]}
            leftIcon={
              <VectorIcons
                name="card-membership"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
          />
          <CustomInput
            placeholder="Education"
            value={values.education}
            onChangeText={handleChange('education')}
            error={touched.education && errors.education}
            containerStyle={[styles.fieldMargin]}
            leftIcon={
              <VectorIcons
                name="school"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
          />
          <CustomInput
            placeholder="Experience (in years)"
            value={`${values.experience}`}
            extra={{
              keyboardType: 'numeric',
              inputMode: 'numeric',
            }}
            onChangeText={handleChange('experience')}
            error={touched.experience && errors.experience}
            containerStyle={[styles.fieldMargin]}
          />
          <Text style={styles.labelStyleBase} >Working Hour</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <CustomDatePicker
              mode='time'
              is24Hour={true}
              value={values.workingHours.start}
              handleChange={handleChange('workingHours.start')}
              error={touched.workingHours && errors.workingHours}
              containerStyle={[{ width: "40%" }]}
              placeholder='Start Time'
              format='HH:mm'
            />
            <Text style={styles.labelStyleBase} >To</Text>
            <CustomDatePicker
              mode='time'
              is24Hour={true}
              value={values.workingHours.end}
              format='HH:mm'
              handleChange={handleChange('workingHours.end')}
              error={touched.workingHours && errors.workingHours}
              containerStyle={[{ width: "40%" }]}
              placeholder='End Time'
            />
          </View>
          <StyledDropdown
            data={[{ label: "Yes", value: true }, { label: "No", value: false }]}
            placeholder="Home Visit"
            label="Home Visit"
            value={values.homeVisit}
            onChangeText={(val) => setFieldValue('homeVisit', val)}
            leftIcon={
              <VectorIcons
                name="home"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
                style={{ alignSelf: 'center' }}
              />}
          />
          <CustomInput
            placeholder="Clinic Name"
            value={values.clinicName}
            onChangeText={handleChange('clinicName')}
            error={touched.clinicName && errors.clinicName}
            containerStyle={[styles.fieldMargin]}
            leftIcon={
              <VectorIcons
                name="business"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
          />
          <CustomInput
            placeholder="Clinic Phone"
            value={values.clinicPhone}
            onChangeText={handleChange('clinicPhone')}
            error={touched.clinicPhone && errors.clinicPhone}
            containerStyle={[styles.fieldMargin]}
            extra={{
              keyboardType: 'phone-pad',
              inputMode: 'numeric',
            }}
            leftIcon={
              <VectorIcons
                name="phone"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialIcons}
              />
            }
          />
          <Text style={styles.labelStyleBase} >Clinic Address</Text>
          <CustomInput
            placeholder="Address Line 1"
            value={`${values.clinicAddress?.line1}`}
            onChangeText={handleChange('clinicAddress.line1')}
            error={touched.clinicAddress && errors.clinicAddress}
          />
          <CustomInput
            placeholder="Address Line 2"
            value={`${values.clinicAddress?.line2}`}
            onChangeText={handleChange('clinicAddress.line2')}
            error={touched.clinicAddress && errors.clinicAddress}
            containerStyle={[styles.fieldMargin]}
          />
          <CustomInput
            placeholder="City"
            value={`${values.clinicAddress?.city}`}
            onChangeText={handleChange('clinicAddress.city')}
            error={touched.clinicAddress && errors.clinicAddress}
            containerStyle={[styles.fieldMargin]}
          />
          <CustomInput
            placeholder="State"
            value={`${values.clinicAddress?.state}`}
            onChangeText={handleChange('clinicAddress.state')}
            error={touched.clinicAddress && errors.clinicAddress}
            containerStyle={[styles.fieldMargin]}
          />
          <CustomInput
            placeholder="Country"
            value={`${values.clinicAddress?.country}`}
            onChangeText={handleChange('clinicAddress.country')}
            error={touched.clinicAddress && errors.clinicAddress}
            containerStyle={[styles.fieldMargin]}
          />
          <CustomInput
            placeholder="Pincode"
            value={`${values.clinicAddress?.pincode}`}
            onChangeText={handleChange('clinicAddress.pincode')}
            error={touched.clinicAddress && errors.clinicAddress}
            containerStyle={[styles.fieldMargin]}
          />
          <View style={styles.rowCenter}>
            <Text style={{ color: 'rgba(28, 42, 58, 1)' }}>{`${JSON.stringify(values.location.coordinates)}`}</Text>
            <Pressable style={{ flexDirection: 'row', alignSelf: 'flex-end' }} onPress={getLocation}>
              <Text style={{ color: 'rgba(28, 42, 58, 1)' }}>{`Get Current Location`}</Text>
              <VectorIcons
                name="location-on"
                size={20}
                color="rgba(28, 42, 58, 1)"
                iconSet={IconSets.MaterialIcons} />
            </Pressable>
          </View>
          <CustomInput
            placeholder="Bio"
            value={values.bio}
            onChangeText={handleChange('bio')}
            error={touched.bio && errors.bio}
            containerStyle={[styles.fieldMargin]}
          />
          <PromiseButton
            text='Update Profile'
            loading={isSubmitting}
            onPress={() => updateProfile(values, {} as FormikHelpers<any>)}
            style={[styles.fieldMargin]}
          />
        </>
      )}
    </Formik>
  );
};

export default memo(DoctorForm);

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldMargin: {
    marginTop: 10,
  },
  labelStyleBase: {
    fontSize: 14,
    color: "rgba(28, 42, 58, 1)",
    marginBottom: 5,
  }
});
