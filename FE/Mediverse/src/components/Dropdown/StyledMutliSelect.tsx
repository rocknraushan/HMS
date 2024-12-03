import React, {useCallback, useMemo} from 'react';
import {MultiSelect} from 'react-native-element-dropdown';
import {useUser} from '../../context/user';
import {rspF, rspH, rspW} from '../../theme/responsive';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {Theme} from '../../theme/colors';
import { DropdownType } from './StyledDropdown';


interface DropdownProps {
  error?: boolean;
  data?: DropdownType[];
  values?: string[];
  onChangeText?: (values: string[]) => void;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
}

const StyledMultiSelect = ({
  values,
  data = [],
  dropdownStyle,
  error,
  onChangeText,
  placeholder,
  disabled,
  errorText,
}: DropdownProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const onChange = useCallback((items: string[]) => {
    console.log('ITEMS', items);

    onChangeText?.(items);
  }, []);

  const newPlaceHolder = useMemo(() => {
    if (values?.length === 0) return placeholder;
    const res = data.reduce((val: string[] = [], curr) => {
      if (values?.includes(curr.value)) {
        val.push(curr.label);
      }
      return val;
    }, []);
    return res.join(', ');
  }, [values]);

  return (
    <>
      <MultiSelect
        data={data}
        placeholder={newPlaceHolder}
        labelField="label"
        valueField="value"
        disable={disabled}
        onChange={onChange}
        value={values}
        style={[styles.dropdown, dropdownStyle, error && styles.error]}
        selectedTextStyle={styles.selected}
        itemTextStyle={{
          color: theme.grey,
          padding: 0,
          margin: 0,
        }}
        itemContainerStyle={{
          padding: 0,
          margin: 0,
          borderBottomWidth: 1,
        }}
        containerStyle={{
          padding: 0,
          margin: 0,
        }}
        selectedStyle={{
          backgroundColor: theme.lightBlue,
        }}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    dropdown: {
      borderWidth: 1,
      borderColor: theme.grey,
      borderRadius: 4,

      height: rspH(40),
      paddingHorizontal: rspW(12),
    },
    error: {
      borderColor: theme.grey,
    },
    selected: {
      fontSize: rspF(16),
      lineHeight: rspF(16),
      color: theme.black,
      fontWeight: '500',
    },

    errorText: {
      color: theme.red,
      fontSize: rspF(12),
    },
  });
export default StyledMultiSelect;
