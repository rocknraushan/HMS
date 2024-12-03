import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../../context/user';
import gStyles from '../../../gStyles/gStyles';
import colors, { Theme } from '../../../theme/colors';
import fontFM from '../../../theme/fontFM';
import { rspF, rspFL, rspH, rspW } from '../../../theme/responsive';

export interface LanguageType {
  title: string;
  symbol: string;
  code: string;
  regionalTitle: string;
  color: string;
}
interface LangCompProps {
  item: LanguageType;
  index: number;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const LangComp = ({item, index,selectedLanguage, onSelectLanguage}: LangCompProps) => {
  const { theme } = useUser()
  const styles = style(theme)

  const isSelected = useMemo(() => item.code === selectedLanguage,[selectedLanguage])

  const onSelect = useCallback(()=>{
    onSelectLanguage(item.code)
  },[item.code])

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        {...styles.item, backgroundColor: item.color},
        index % 2 == 0 ? {marginStart: rspW(16)} : {marginEnd: rspW(16)},
        isSelected && styles.selected
      ]}
      onPress={onSelect}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemRTitle}>{item.regionalTitle}</Text>
      <View style={styles.itemSymbolCont}>
        <Text style={styles.itemSymbol}>{item.symbol}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(LangComp);

const style =(theme: Theme)=> StyleSheet.create({
  item: {
    flex: 1,
    height: rspH(100),
    borderRadius: rspW(8),
    backgroundColor: '#D7E8FC',
    paddingHorizontal: rspW(10),
    paddingVertical: rspH(12),
    position: 'relative',
  },
  itemTitle: {
    fontFamily: fontFM.regular,
    fontSize: rspF(24),
    lineHeight: rspFL(24),
    color: colors.black,
  },
  itemRTitle: {
    color: colors.black,
    fontFamily: fontFM.regular,
    fontSize: rspF(16),
    lineHeight: rspFL(24),
  },
  itemSymbolCont: {
    right: rspW(10),
    top: rspH(20),
    position: 'absolute',
    // backgroundColor:'red',
    ...gStyles.colCenter,
  },
  itemSymbol: {
    color: colors.black,
    fontFamily: fontFM.regular,
    fontSize: rspF(60),
    lineHeight: rspFL(80),
    opacity: 0.3,
  },
  selected: {
    borderWidth: 3,
    borderColor: theme.blue
  }
});
