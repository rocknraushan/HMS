import React, {useCallback, useMemo, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useUser} from '../../context/user';
import {rspF, rspH, rspW} from '../../theme/responsive';
import {
  Image,
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
import {BASE_URL} from '../../HttpService/AxiosClient';

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
  data?: DropdownType[];
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

  const url = useMemo(() => {
    return BASE_URL + item.image;
  }, [item]);

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
      <View style={styles.row}>
        <TouchableOpacity  onPress={onSelected}>
          <Image source={{uri: url}} style={[styles.itemImage,checked && styles.selected]} />
        </TouchableOpacity>

        <Text style={styles.itemTitle}>{item.label}</Text>
      </View>
    </View>
  );
};

const StyledMutiItems = ({
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

  const onPress = useCallback(() => {
    setOpen(val => !val);
  }, []);

  const icon = useMemo(() => {
    return open ? 'chevron-up' : 'chevron-down';
  }, [open]);

  const text = useMemo(()=>{
    return values.length> 0 ?title + ' Selected' : title 
  },[values,title])

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
          <View style={styles.itemContainer}>
            {data.map(item => {
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
      paddingHorizontal: rspW(12),
      height: rspH(40),
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
      gap: 8,
      flex: 1,
    },

    itemTitle: {
      fontSize: 14,
      color: theme.black,
      flex: 1
    },
    itemImage: {
      height: rspH(50),
      width: rspH(80),

      borderRadius: rspW(4),
      overflow: 'hidden',
    },
    selected: {
      borderWidth: 2,
      borderColor: theme.blue,
    },
  });
export default StyledMutiItems;
