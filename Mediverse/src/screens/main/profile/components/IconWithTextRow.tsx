import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IconWithTextRowProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const IconWithTextRow: React.FC<IconWithTextRowProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default IconWithTextRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    width: 28,
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});
