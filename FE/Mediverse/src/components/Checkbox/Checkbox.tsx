import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';

interface CheckboxProps {
  checked?: boolean;
  title?: string;
  subtitle?: string;
  onPress: () => void;
}

const Checkbox = ({checked, title, subtitle, onPress}: CheckboxProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.checkbox, checked && styles.checked]}
          onPress={onPress}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 16,
      height: 16,
      borderWidth: 1,
      borderColor: theme.black,
      borderRadius: 2,
    },
    checked: {
      backgroundColor: theme.black,
    },
    title: {
      fontSize: 16,
      color: theme.black,
      marginStart: 8
    },
    subtitle: {
      fontSize: 12,
      color: theme.black,

      marginStart: 24,
    },
  });

export default Checkbox;
