import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {rspF, rspFL, rspH} from '../../theme/responsive';
import colors from '../../theme/colors';
import fontFM from '../../theme/fontFM';

const SHeader = ({
  children,
  label = '',
  marginTop = 0,
  marginBottom = 2.75,
  labelContBottom = 1.8,
}) => {
  return (
    <View
      style={{
        marginBottom: rspH(marginBottom),
        marginTop: rspH(marginTop),
        position: 'absolute',
      }}>
      <View style={{marginBottom: rspH(labelContBottom)}}>
        <Text style={styles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
};

export default SHeader;

const styles = StyleSheet.create({
  label: {
    color: colors.black,
    lineHeight: rspFL(36),
    fontSize: rspF(24),
    fontFamily: fontFM.regular,
  },
});
