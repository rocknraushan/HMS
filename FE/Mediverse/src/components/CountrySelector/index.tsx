import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useUser } from '../../context/user';
import { Theme } from '../../theme/colors';
import fontFM from '../../theme/fontFM';
import { rspF, rspH, rspW } from '../../theme/responsive';
import VectorIcons, { IconSets } from '../Icons/VectorIcons';
import SearchInput from '../inputs/SearchInput';
import { useAtomValue, useSetAtom } from 'jotai';
import { countryListAtom, selectedCountry } from '../../store/atoms';
import { Country } from '../../interfaces/Country';
import { BASE_URL } from '../../HttpService/AxiosClient';

interface CountryItemProps {
  item: Country;
  onSelect: (code: string) => void;
}
const CountryItem = ({item, onSelect}: CountryItemProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const setCountryValue = useSetAtom(selectedCountry)

  const onPress = useCallback(() => {
    onSelect(item.countryCode);
    setCountryValue(item)
  }, [item]);

  const url = useMemo(()=>{
    return BASE_URL+item.flag;
  },[item.flag])

  return (
    <TouchableOpacity style={styles.countryContainer} onPress={onPress}>
      <Text style={styles.name}>{item.country}</Text>
      <View style={styles.flagContainer}>
        <Image
          source={{uri: url}}
          style={styles.flag}
          width={rspH(20)}
          height={rspW(25)}
        />
        <Text style={styles.name}>{item.countryCode}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface CountrySelectorProps {
  onSelect: (code: string) => void;
  visible: boolean;
  onPressClose: () => void;
}
const CountrySelector = ({
  onSelect,
  visible,
  onPressClose,
}: CountrySelectorProps) => {
  const {theme} = useUser();
  const [search, setSearch] = useState<string>('');
  const countries = useAtomValue(countryListAtom);

  useEffect(() => {
    setSearch('');
  }, [visible]);

  const styles = style(theme);

  const filteredData = useMemo(() => {
    return countries.filter(val =>
      val.country.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search,countries]);


  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.itemsContainer}>
          <TouchableOpacity
            onPress={onPressClose}
            style={{
              alignSelf: 'flex-end',
              marginBottom: rspH(16),
              padding: 4,
            }}>
            <VectorIcons
              color={theme.black}
              iconSet={IconSets.MaterialCommunityIcons}
              name="close"
              size={rspW(25)}
            />
          </TouchableOpacity>
          <SearchInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            inputStyle={{
              marginBottom: rspH(16),
            }}
          />
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={() => {
              return <></>;
            }}
            renderItem={({item}) => {
              return <CountryItem item={item} onSelect={onSelect} />;
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    itemsContainer: {
      height: '90%',
      backgroundColor: '#FFF',
      borderRadius: rspH(20),
      borderBottomEndRadius: 0,
      borderBottomStartRadius: 0,
      padding: rspW(16),
      marginTop: rspH(24),
    },
    countryContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: rspW(12),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.grey,
      justifyContent: 'space-between',
      marginVertical: 8,
      borderRadius: 4,
    },
    flagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      marginHorizontal: rspW(8),
      color: theme.darkGrey,
      fontSize: rspF(16),
      lineHeight: rspF(16),
    },
    code: {
      fontFamily: fontFM.bold,
    },
    flag: {
      width: rspW(25),
      height: rspH(20),
    },
    close: {
      width: rspW(24),
      height: rspH(24),
    },
  });

export default CountrySelector;
