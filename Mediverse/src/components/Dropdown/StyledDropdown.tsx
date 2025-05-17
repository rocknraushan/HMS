import React, {memo, useCallback, useContext, useMemo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {rspF, rspH, rspW} from '../../theme/responsive';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Theme} from '../../theme/colors';
import { ThemeContext } from '../../../App';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export interface DropdownType {
  label: string;
  value: any;
  image?: string;
}


interface DropdownProps {
  error?: any;
  data: DropdownType[];
  value?: any;
  onChangeText?: (val: any) => void;
  dropdownStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  disabled?: boolean;
  renderItem?: (item: DropdownType[]) => void;
  search?: boolean;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  multiple?: boolean;
  selected?: DropdownType[];
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
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
  leftIcon,
  label,
  labelStyle,
  multiple,
  selected,
  renderItem
}: DropdownProps) => {
  const {theme} = useContext(ThemeContext);
  const styles = styleSheet(theme);

  const selectedValue = useMemo(() => {
    return data?.find(item => item?.value == value);
  }, [value, data]);

  const onChange = useCallback((item: DropdownType) => {
    onChangeText?.(item.value);
  }, []);

  return (
    <Animated.View
      style={style}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      >
      {label && (
        <Text style={[styles.labelStyleBase, labelStyle]}>{label}</Text>
      )}
    <View style={[styles.listWrapper]}>
      {leftIcon && (
        leftIcon
      )}
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
    </Animated.View>
  );
};
const styleSheet = (theme: Theme) =>
  StyleSheet.create({
  listWrapper: {
    flexDirection:"row",
    width:'100%',
    alignContent:'center',
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent:"flex-start",
    overflow:"hidden",
    paddingStart:10,
    backgroundColor: theme.white,
  },
    labelStyleBase: {
      fontSize: rspF(14),
      color: theme.Black,
      marginBottom: 5,
    },
    dropdown: {
      paddingHorizontal: rspW(12),
      height: 50,
    paddingLeft: 15,
    backgroundColor: '#fff',
    flex:1
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
