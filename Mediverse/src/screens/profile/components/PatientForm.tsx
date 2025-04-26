import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons'
import StyledDropdown from '../../../components/Dropdown/StyledDropdown'
import { FormikProps } from 'formik'
import DocumentPicker from 'react-native-document-picker';
import CustomInput from '../../../components/CustomInput/CustomInput';
import RNDateTimePicker from '@react-native-community/datetimepicker'

type Props = {
  formikRef: FormikProps<any> | null;

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

const PatientForm: React.FC<Props> = ({ formikRef }) => {
  const { handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors } = formikRef as FormikProps<any>;
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDobChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setFieldValue(
      'dob',
      currentDate.toLocaleDateString(),
    );
    const age = new Date().getFullYear() - currentDate.getFullYear();
    setFieldValue('age', String(age));
  }
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

      setFieldValue("documents", [...values.documents, ...formattedDocs]);
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
      <StyledDropdown
        data={bloodGroups}
        placeholder="Blood Group"
        value={values.bloodGroup}
        onChangeText={handleChange('bloodGroup')}
        error={touched.bloodGroup && errors.bloodGroup}
        style={styles.fieldMargin}
      />
      <Pressable onPress={() => setShowDatePicker(true)}>
        <CustomInput
          placeholder="Date of Birth"
          value={values.dob}
          onChangeText={handleChange('dob')}
          error={touched.dob && errors.dob}
          extra={{
            keyboardType: 'numeric',
            inputMode: 'numeric',
            editable: false,
          }}
          leftIcon={
            <VectorIcons
              name="calendar"
              size={20}
              color="#9CA3AF"
              iconSet={IconSets.MaterialCommunityIcons}
            />
          }
          containerStyle={styles.fieldMargin}
        />
      </Pressable>
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
      <CustomInput
        placeholder="Address"
        value={values.address}
        onChangeText={handleChange('address')}
        extra={{
          onBlur: handleBlur('address'),
          multiline: true,
        }}
        error={touched.address && errors.address}
        containerStyle={{ marginBottom: 12 }}
        leftIcon={
          <VectorIcons
            name="location-on"
            size={20}
            color="#9CA3AF"
            iconSet={IconSets.MaterialIcons}
          />
        }
      />

      <Button title="Upload Document(s)" onPress={handleDocumentPick} />
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
      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          // minimumDate={new Date()}
          maximumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          onTouchCancel={() => setShowDatePicker(false)}
          onTouchEnd={() => setShowDatePicker(false)}
          themeVariant="light"
          display="default"
          onChange={handleDobChange}
        />
      )}
    </View>
  )
}

export default memo(PatientForm)

const styles = StyleSheet.create({
  fieldMargin: {
    marginTop: 20,
  },
})