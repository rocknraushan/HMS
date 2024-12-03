import React, {useCallback, useMemo} from 'react';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import {StyleSheet, View, ViewStyle} from 'react-native';
import StyledButton from '../buttons/StyledButton';
import { StyleProp } from 'react-native';

interface TabButtonProps {
  button1Label: string;
  button2Label: string;
  selected: string;
  onSelect: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>
}

const TabButtons = ({
  button1Label,
  button2Label,
  selected,
  onSelect,
  containerStyle
}: TabButtonProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const onPressButton1 = useCallback(() => {
    onSelect(button1Label);
  }, [button1Label]);
  const onPressButton2 = useCallback(() => {
    onSelect(button2Label);
  }, [button2Label]);

  const button1Color = useMemo(()=>{
    return button1Label === selected ?'#0060C3':"#010201"
  },[button1Label,selected])
  const button2Color = useMemo(()=>{
    return button2Label === selected ?'#0060C3':"#010201"
  },[button2Label,selected])

  return (
    <View style={[styles.container,containerStyle]}>
      <StyledButton
        label={button1Label}
        onPress={onPressButton1}
        containerStyle={[
          styles.button,
          styles.button1,
          selected === button1Label && styles.selectedButton,
        ]}
        color={button1Color}
      />
      <StyledButton
        label={button2Label}
        onPress={onPressButton2}
        containerStyle={[
          styles.button,
          styles.button2,
          selected === button2Label && styles.selectedButton,
        ]}
        color={button2Color}
      />
    </View>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      flex: 1,
      borderRadius: 8,
      backgroundColor: '#E5E6EB',
    },
    button1: {
      marginEnd: 4,
    },
    button2: {
      marginStart: 4,
    },
    selectedButton: {
      backgroundColor: '#EBF5FF',
    },
  });
export default TabButtons;
