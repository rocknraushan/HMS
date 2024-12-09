import React from 'react';
import { TextInput, StyleSheet, View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import colors from '../../theme/colors'

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  touched,
  inputStyle,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <TextInput
        style={[styles.input, inputStyle, touched && error ? styles.errorInput : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={false} 
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
  },
  errorInput: {
    borderColor:colors.darkRed,
  },
  errorText: {
    color: colors.darkRed,
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;
