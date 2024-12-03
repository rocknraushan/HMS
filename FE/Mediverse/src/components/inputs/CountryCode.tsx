import { useAtomValue } from 'jotai';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { BASE_URL } from '../../HttpService/AxiosClient';
import { useUser } from '../../context/user';
import { countryListAtom } from '../../store/atoms';
import { Theme } from '../../theme/colors';
import { rspH, rspW } from '../../theme/responsive';
import CountrySelector from '../CountrySelector';
import VectorIcons, { IconSets } from '../Icons/VectorIcons';

interface CountryCodeProps {
  value: string;
  onChangeText?: (val: string) => void;
  error?: boolean;
}

const CountryCode = ({value, onChangeText, error}: CountryCodeProps) => {
  const {theme} = useUser();

  const [show, setShow] = useState<boolean>(false);

  const styles = style(theme);

  const countries = useAtomValue(countryListAtom);

  const country = useMemo(() => {
    return countries.find(c => c.countryCode === value);
  }, [value,countries]);

  const url = useMemo(()=>{
    return BASE_URL+country?.flag;
  },[country?.flag])

  const onPressArrow = useCallback(() => {
    setShow(true);
  }, []);
  const onSelect = useCallback((code: string) => {
    onChangeText?.(code);
    setShow(false);
  }, []);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <View style={[styles.container, error && styles.error]}>
      <View style={styles.itemContainer}>
        <Image
          source={{uri: url}}
          style={styles.flag}
          width={rspH(20)}
          height={rspW(25)}
        />
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={[styles.input]}
          keyboardType="phone-pad"
          editable={false}
        />
        <TouchableOpacity
          onPress={onPressArrow}
          style={{
            width: rspW(20),
            height: rspW(20),
            alignItems:'center',
            justifyContent:'center'
          }}>
          <VectorIcons
            color={'#646464'}
            iconSet={IconSets.AntDesign}
            name="caretdown"
            size={rspW(10)}
          />
        </TouchableOpacity>
      </View>
      <CountrySelector
        visible={show}
        onSelect={onSelect}
        onPressClose={onClose}
      />
    </View>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: rspH(110),
      height: rspH(40),
      borderWidth: 1,
      borderColor: theme.grey,
      borderRadius: 4,
      marginEnd: rspH(16),
      alignItems: 'center',
    },
    error: {
      borderColor: theme.red,
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rspW(8),
    },
    input: {
      padding: 0,
      color: theme.black,
    },
    flag: {
      width: rspW(14),
      height: rspH(10),
      marginEnd: rspW(4),
    },
    down: {
      width: rspW(15),
      height: rspH(10),
    },
  });

export default CountryCode;
