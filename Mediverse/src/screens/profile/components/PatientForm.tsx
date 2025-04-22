import { Button, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons'
import StyledDropdown from '../../../components/Dropdown/StyledDropdown'
import { FormikProps } from 'formik'
import DocumentPicker from 'react-native-document-picker';
import CustomInput from '../../../components/CustomInput/CustomInput';

type Props = {
  formikRef:FormikProps<any> | null;

}

const PatientForm:React.FC<Props> = ({formikRef}) => {
  const { handleChange, handleBlur, handleSubmit, setFieldValue, values, touched, errors } = formikRef as FormikProps<any>;
  
  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      const formattedDocs = res.map((doc:any) => ({
        title: doc.name,
        url: doc.uri,
      }));

      setFieldValue("documents",[...values.documents, ...formattedDocs]);
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
                onBlur:handleBlur('address'),
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
                {values.documents.map((doc:any, idx:number) => (
                  <Text key={idx} style={{ fontSize: 12 }}>
                    • {doc.title}
                  </Text>
                ))}
              </View>
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