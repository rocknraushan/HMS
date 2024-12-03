import React, {ReactNode} from 'react';
import {
  ColorValue,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import {rspF, rspH, rspW} from '../../theme/responsive';
import fontFM from '../../theme/fontFM';

interface InputProps {
  value: string;
  onChangeText?: (val: string) => void;
  placeholder?: string;
  placeholderColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  maxLength?: number;
  multiline?: boolean;
  disabled?: boolean;
  title?: string;
  right?: ReactNode;
  returnKeyType?: ReturnKeyTypeOptions;
  onEndEditing?: () => void;
  hasFlex?: boolean;
  color?: ColorValue;
  errorText?: string;
  titleStyle?: StyleProp<TextStyle>
}

const StyledInput = ({
  onChangeText,
  value,
  placeholder,
  placeholderColor='#000000',
  inputStyle,
  keyboardType,
  error,
  maxLength,
  multiline,
  title,
  containerStyle,
  disabled,
  right,
  returnKeyType,
  onEndEditing,
  inputContainerStyle,
  color = '#A5A5A5',
  errorText,
  hasFlex = true,
  titleStyle
}: InputProps) => {
  const {theme} = useUser();

  const styles = style(theme);
  
  return (
    <View style={[containerStyle, hasFlex && {flex: 1}]}>
      {title && <Text style={[styles.title,titleStyle]}>{title}</Text>}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          multiline && styles.multiline,

          Boolean(error || errorText) && styles.error,
          disabled && {
            borderColor: '#646464',
            borderWidth: StyleSheet.hairlineWidth
          }
        ]}>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={[
            styles.input,
            inputStyle,
            multiline && styles.multiline,

            disabled && {
              color: color,
            },
          ]}
          returnKeyType={returnKeyType}
          multiline={multiline}
          editable={!disabled}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onEndEditing={onEndEditing}
          maxLength={maxLength}
          placeholderTextColor={placeholderColor}
        />
        {right}
      </View>

      {errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      borderColor: theme.grey,
      borderRadius: 4,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: rspH(40),
    },
    input: {
      flex: 1,
      height: rspH(40),
      paddingHorizontal: rspW(12),
      paddingVertical: 0,
      color: theme.black,
    },
    error: {
      borderColor: theme.red,
    },
    multiline: {
      height: rspH(100),
      // alignItems: 'flex-start',
      // textAlign: 'left',
      textAlignVertical: 'center',
      paddingVertical: rspH(8),
    },
    title: {
      fontSize: rspF(16),
      fontWeight: '400',
      fontFamily: fontFM.regular,
      color: theme.doveGrey,
      marginBottom: 4,
    },

    errorText: {
      color: theme.red,
      fontSize: rspF(12),
    },
  });

export default StyledInput;
