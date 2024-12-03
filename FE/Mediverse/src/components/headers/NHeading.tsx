import {StyleSheet, Text, View} from 'react-native';
import React, { memo } from 'react';
import {rspF, rspFL, rspH} from '../../theme/responsive';
import fontFM from '../../theme/fontFM';
import colors from '../../theme/colors';

interface NheadProps {
  heading: string;
}

const NHeading = ({heading = ''}: NheadProps) => {
  return (
    <View style={styles.headCont}>
      <Text style={styles.headTxt}>{heading}</Text>
    </View>
  );
};

export default memo(NHeading);

const styles = StyleSheet.create({
  headCont: {
    marginBottom: rspH(20),
  },
  headTxt: {
    fontFamily: fontFM.regular,
    fontSize: rspF(20),
    lineHeight: rspFL(24),
    color: colors.black,
  },
});
