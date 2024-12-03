import React, {useCallback, useMemo, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useUser} from '../../context/user';
import {rspF, rspH, rspW} from '../../theme/responsive';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../theme/colors';
import {DropdownType} from '../Dropdown/StyledDropdown';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
import fontFM from '../../theme/fontFM';
import Checkbox from './Checkbox';
import SearchInput from '../inputs/SearchInput';

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
  values?: string[];
  onChange?: (val: string[]) => void;
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  disabled?: boolean;
  errorText?: string;
  renderItem?: (item: DropdownType[]) => void;
  search?: boolean;
}

interface ItemProps {
  item: DropdownType;
  onSelect?: (values: string[]) => void;
  selected: string[];
}

const Item = ({item, onSelect, selected}: ItemProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const checked = useMemo(() => {
    return selected.includes(item.value);
  }, [selected, item]);

  const onSelected = useCallback(() => {
    if (checked) {
      const temp = selected.filter(ele => ele !== item.value.toString());
      onSelect?.(temp);
    } else {
      const temp = [...selected, item.value.toString()];
      onSelect?.(temp);
    }
  }, [checked, item, selected]);

  return (
    <View style={{width: '50%'}}>
      <Checkbox checked={checked} title={item.label} onPress={onSelected} />
    </View>
  );
};

const StyledMutiCheckbox = ({
  values = [],
  data = [],
  containerStyle,
  error,
  onChange,
  title,
  disabled,
  errorText,
  search,
}: DropdownProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const [open, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const onPress = useCallback(() => {
    setOpen(val => !val);
  }, []);

  const icon = useMemo(() => {
    return open ? 'chevron-up' : 'chevron-down';
  }, [open]);

  const text = useMemo(() => {
    return !open && values.length > 0 ? `${title} Selected` : title;
  }, [title, values, open]);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.label.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [data, searchText]);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          style={[
            styles.inputContainer,

            Boolean(error || errorText) && styles.error,
          ]}
          onPress={onPress}>
          <Text style={styles.title}>{text}</Text>
          <VectorIcons
            color={theme.black}
            iconSet={IconSets.Feather}
            name={icon}
            size={16}
          />
        </TouchableOpacity>
        {open && (
          <>
            {search && (
              <SearchInput
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
                inputStyle={{
                  marginHorizontal: 12,
                  backgroundColor: theme.lightBlue,
                  marginBottom: 16,
                }}
              />
            )}
            <View style={styles.itemContainer}>
              {filteredData.map(item => {
                return (
                  <Item
                    key={item.value}
                    item={item}
                    onSelect={onChange}
                    selected={values}
                  />
                );
              })}
            </View>
          </>
        )}
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.grey,
      borderRadius: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: rspH(40),
      paddingHorizontal: rspW(12),
    },
    error: {
      borderColor: theme.red,
    },
    title: {
      fontSize: rspF(16),
      fontWeight: '400',
      fontFamily: fontFM.regular,
      color: theme.black,
    },

    errorText: {
      color: theme.red,
      fontSize: rspF(12),
    },
    itemContainer: {
      rowGap: 8,
      flexWrap: 'wrap',
      flexDirection: 'row',
      flex: 1,
      paddingHorizontal: rspW(12),
      paddingBottom: rspW(12),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
export default StyledMutiCheckbox;
