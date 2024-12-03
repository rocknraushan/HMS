import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import {rspH, rspW} from '../../theme/responsive';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';

interface InputProps {
  value: string;
  onChangeText?: (val: string) => void;
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  maxLength?: number;

  placeholderColor?: string;

}

const SearchInput = ({
  onChangeText,
  value,
  placeholder,
  inputStyle,
  keyboardType,
  error,
  maxLength,

  placeholderColor='#000000',
  
}: InputProps) => {
  const {theme} = useUser();

  const styles = style(theme);
  return (
    <View style={[styles.container, inputStyle, error && styles.error]}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        style={[styles.input]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}

        placeholderTextColor={placeholderColor}
      />

      <VectorIcons
        color={theme.grey}
        name={'search'}
        iconSet={IconSets.FontAwesome}
        size={rspW(20)}
      />
    </View>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.grey,
      borderRadius: 4,
      paddingHorizontal: rspW(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      height: rspH(40),
      flex: 1,
      borderWidth: 0,
      padding: 0,

      color: theme.black,
    },
    error: {
      borderColor: theme.grey,
    },
    icon: {
      width: rspW(24),
      height: rspW(24),
    },
  });

export default SearchInput;
