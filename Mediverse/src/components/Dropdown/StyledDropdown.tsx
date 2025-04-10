import React, {memo, useCallback, useContext, useMemo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {rspF, rspH, rspW} from '../../theme/responsive';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Theme} from '../../theme/colors';
import { ThemeContext } from '../../../App';

export interface DropdownType {
  label: string;
  value: string;
  image?: string;
}


interface DropdownProps {
  error?: any;
  data: DropdownType[];
  value?: string;
  onChangeText?: (val: string) => void;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  disabled?: boolean;
  renderItem?: (item: DropdownType[]) => void;
  search?: boolean;
  style?: StyleProp<ViewStyle>;
}

const StyledDropdown = ({
  value,
  data = [],
  dropdownStyle,
  error,
  onChangeText,
  placeholder,
  disabled,
  search,
  style,
}: DropdownProps) => {
  const {theme} = useContext(ThemeContext);
  const styles = styleSheet(theme);

  const selectedValue = useMemo(() => {
    return data.find(item => item.value === value);
  }, [value, data]);

  const onChange = useCallback((item: DropdownType) => {
    onChangeText?.(item.value);
  }, []);

  return (
    <View style={style}>
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
          color: "#9CA3AF",
          padding: 0,
          margin: 0,
          height: 30,
        }}
        itemContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 4,
          margin: 0,
        }}

        renderItem={item => {
          return (
            <View style={{padding:10}} >
              <Text
                style={{
                  color: theme.Black,

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

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
const styleSheet = (theme: Theme) =>
  StyleSheet.create({
    dropdown: {
      paddingHorizontal: rspW(12),
      height: 50,
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
    width: '100%',
    },
    error: {
      borderColor: "#9CA3AF",
    },
    selected: {
      fontSize: rspF(16),
      lineHeight: rspF(16),
      color: "#9CA3AF",
      fontWeight: '500',
    },

    errorText: {
      color: theme.darkRed,
      fontSize: rspF(12),
    },
  });
export default memo(StyledDropdown);
