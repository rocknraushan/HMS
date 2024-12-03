import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useUser} from '../../context/user';
import gStyles from '../../gStyles/gStyles';
import {Theme} from '../../theme/colors';
import fontFM from '../../theme/fontFM';
import {rspF, rspFL, rspH, rspW} from '../../theme/responsive';

interface BtnCProps {
  label: string;
  type?: number;
  buttonType?: 'SQUARE' | 'RECT';
  onPress: any;
  containerStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  disabled?: boolean;
  transparent?: boolean;
  color?: string;
  isLoading?: boolean;
}
const StyledButton = ({
  label = '',
  type = 1,
  onPress = () => {},
  buttonType = 'RECT',
  fullWidth,
  containerStyle,
  disabled,
  transparent,
  color,
  isLoading,
  disabledStyle
}: BtnCProps) => {
  const {theme} = useUser();
  const styles = style(theme);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: type == 1 ? theme.blue : theme.white,
          borderWidth: type == 1 ? 0 : 1,
          borderColor: theme.blue,
        },
        buttonType === 'SQUARE' ? styles.squareBtnCont : styles.btnCont,
        containerStyle,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        transparent && styles.transparent,
        disabled && disabledStyle
      ]}>
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={type == 1 ? theme.white : theme.blue}
        />
      ) : (
        <Text
          style={{
            ...styles.btnTxt,
            color: color ? color : type == 1 ? theme.white : theme.blue,
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default StyledButton;

const style = (theme: Theme) =>
  StyleSheet.create({
    btnCont: {
      width: rspW(168),
      height: rspH(40),
      ...gStyles.colCenter,
      borderRadius: rspW(20),
      marginBottom: rspH(12),
    },
    squareBtnCont: {
      width: rspW(60),
      height: rspH(60),
      ...gStyles.colCenter,
      borderRadius: rspW(12),
    },
    btnTxt: {
      fontFamily: fontFM.medium,
      fontSize: rspF(16),
      lineHeight: rspFL(24),
    },
    fullWidth: {
      width: '100%',
    },
    disabled: {
      backgroundColor: theme.grey,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  });
