import { Button, StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons';
import StyledDropdown from '../../../components/Dropdown/StyledDropdown';
import { FormikProps } from 'formik';
import DocumentPicker from 'react-native-document-picker';
import CustomInput from '../../../components/CustomInput/CustomInput';

type Props = {
  formikRef: FormikProps<any> | null;
};

const DoctorForm: React.FC<Props> = ({ formikRef }) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    touched,
    errors,
  } = formikRef as FormikProps<any>;

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

      setFieldValue('documents', [...(values.documents || []), ...formattedDocs]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document Picker Error: ', err);
      }
    }
  };

  return (
    <View>
      <CustomInput
        placeholder="Specialization"
        value={values.specialization}
        onChangeText={handleChange('specialization')}
        error={touched.specialization && errors.specialization}
        containerStyle={styles.fieldMargin}
        leftIcon={
          <VectorIcons
            name="medical-services"
            size={20}
            color="#9CA3AF"
            iconSet={IconSets.MaterialIcons}
          />
        }
      />

      <CustomInput
        placeholder="Working Hours"
        value={values.workingHours}
        onChangeText={handleChange('workingHours')}
        error={touched.workingHours && errors.workingHours}
        containerStyle={styles.fieldMargin}
        leftIcon={
          <VectorIcons
            name="schedule"
            size={20}
            color="#9CA3AF"
            iconSet={IconSets.MaterialIcons}
          />
        }
      />

      <CustomInput
        placeholder="Clinic Address"
        value={values.clinicAddress}
        onChangeText={handleChange('clinicAddress')}
        error={touched.clinicAddress && errors.clinicAddress}
        containerStyle={styles.fieldMargin}
        leftIcon={
          <VectorIcons
            name="location-city"
            size={20}
            color="#9CA3AF"
            iconSet={IconSets.MaterialIcons}
          />
        }
      />

      <CustomInput
        placeholder="Bio"
        value={values.bio}
        onChangeText={handleChange('bio')}
        extra={{
          multiline: true,
          numberOfLines: 3,
        }}
        error={touched.bio && errors.bio}
        containerStyle={styles.fieldMargin}
        leftIcon={
          <VectorIcons
            name="info"
            size={20}
            color="#9CA3AF"
            iconSet={IconSets.MaterialIcons}
          />
        }
      />

      <CustomInput
        placeholder="Experience (e.g., 10 years)"
        value={values.experience}
        onChangeText={handleChange('experience')}
        error={touched.experience && errors.experience}
        containerStyle={styles.fieldMargin}
        leftIcon={
          <VectorIcons
            name="school"
            size={20}
            color="#9CA3AF"
            iconSet={IconSets.MaterialIcons}
          />
        }
      />

      <StyledDropdown
        data={[
          { label: 'Available', value: true },
          { label: 'Not Available', value: false },
        ]}
        placeholder="Availability"
        value={values.isAvailable}
        onChangeText={handleChange('isAvailable')}
        style={styles.fieldMargin}
        error={touched.isAvailable && errors.isAvailable}
      />

      <Button title="Upload Document(s)" onPress={handleDocumentPick} />
      {values.documents?.length > 0 && (
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
  );
};

export default memo(DoctorForm);

const styles = StyleSheet.create({
  fieldMargin: {
    marginTop: 20,
  },
});
