import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {rspH} from '../../theme/responsive';
import colors from '../../theme/colors';
import gStyles from '../../gStyles/gStyles';
import fontFM from '../../theme/fontFM';

const OfflineC = () => {
  return (
    <View style={styles.offCont}>
      <Text style={styles.offTxt}>No internet connection</Text>
    </View>
  );
};

export default OfflineC;

const styles = StyleSheet.create({
  offCont: {
    height: rspH(26),
    width: '100%',
    backgroundColor: colors.darkRed,
    ...gStyles.colCenter,
    position: 'absolute',
    top: 0,
  },
  offTxt: {
    fontFamily: fontFM.regular,
    fontSize: rspH(16),
    lineHeight: rspH(18),
    color: colors.white,
    marginTop: rspH(4),
  },
});
