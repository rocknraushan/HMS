import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { memo } from "react";
import { rspF, rspH, rspW } from "../../theme/responsive";
import colors from "../../theme/colors";
import gStyles from "../../gStyles/gStyles";
import { moderateScale } from "react-native-size-matters";
import fontFM from "../../theme/fontFM";
type Props = {
  title: string;
  onPress: () => void;
  extraStyle?: ViewStyle,
  extraStyleTxt?: TextStyle,
  disabled?: boolean,
  outlined?: boolean,
}
const CButton = ({
  title = "",
  onPress = () => { },
  extraStyle = {},
  extraStyleTxt = {},
  disabled = false,
  outlined = false,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        backgroundColor: disabled
          ? colors.grey300
          : outlined
            ? colors.lightTeal
            : colors.midnightBlue,
        borderWidth: outlined ? rspW(1) : 0,

        ...styles.btnCont,
        ...extraStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.btnTxt, ...extraStyleTxt }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(CButton);

const styles = StyleSheet.create({
  btnCont: {
    width: rspW(311),
    height: rspH(48),
    borderRadius: moderateScale(63),
    borderColor: colors.Black,
    ...gStyles.colCenter,
  },
  btnTxt: {
    color: colors.white,
    fontSize: rspF(14),
    lineHeight: rspF(20),
    fontFamily: fontFM.bold,
  },
});
