import React, {useCallback, useMemo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useUser} from '../../context/user';
import {rspF, rspH, rspW} from '../../theme/responsive';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Theme} from '../../theme/colors';

export interface DropdownType {
  label: string;
  value: string;
  image?: string;
}

const data: DropdownType[] = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

interface DropdownProps {
  error?: boolean;
  data: DropdownType[];
  value?: string;
  onChangeText?: (val: string) => void;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  renderItem?: (item: DropdownType[]) => void;
  search?: boolean;
}

const StyledDropdown = ({
  value,
  data = [],
  dropdownStyle,
  error,
  onChangeText,
  placeholder,
  disabled,
  errorText,
  search
}: DropdownProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const selectedValue = useMemo(() => {
    return data.find(item => item.value === value);
  }, [value, data]);

  const onChange = useCallback((item: DropdownType) => {
    onChangeText?.(item.value);
  }, []);

  return (
    <>
      <Dropdown
        data={data}
        placeholder={placeholder}
        labelField="label"
        valueField="value"
        disable={disabled}
        onChange={onChange}
        value={selectedValue}
        placeholderStyle={styles.selected}
        style={[styles.dropdown, dropdownStyle, error && styles.error]}
        selectedTextStyle={styles.selected}
        itemTextStyle={{
          color: theme.grey,
          padding: 0,
          margin: 0,
          height: 30,
        }}
        itemContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 4,
          margin: 0,
          height: 30,
        }}
        renderItem={item => {
          return (
            <View>
              <Text
                style={{
                  color: theme.black,
                }}>
                {item.label}
              </Text>
            </View>
          );
        }}
        containerStyle={{
          padding: 0,
          margin: 0,
        }}
        search={search}
        searchField='label'
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
export default StyledDropdown;
